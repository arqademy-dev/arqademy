import { create } from "zustand";
import { toast } from "sonner";
import {
  uploadAudio,
  transcribeAudio,
  getAudioMetrics,
  evaluateText,
  evaluateAudio,
  getFinalEvaluation,
} from "@/app/api/fastapi";
import { supabase } from "@/app/lib/supabaseClient";



const BASE_PROGRESS = {
  isProcessing: false,
  progress: 0,
  stage: "",
};

export const useTeacherStore = create((set, get) => ({
  user: null,
  loading: false,
  processing: BASE_PROGRESS,
  
  latestAnalysis: null,
  
  analyses: [],

  selectedAnalysis: null,

startAnalysisPipeline: async (audioFile, curriculum_id) => {
  const storedId = sessionStorage.getItem("arq_user_id");
  if (!storedId) {
    toast.error("You must be logged in");
    return;
  }

  const teacher_id = storedId;

  // Start with fresh state
  set({ 
    processing: { isProcessing: true, progress: 0, stage: "Starting upload..." } 
  });

  let file_id, transcribeRes, metricsRes;

  try {
    // Each set must be a NEW object
    set({ processing: { isProcessing: true, progress: 10, stage: "Uploading audio..." } });
    file_id = await uploadAudio(audioFile, teacher_id, curriculum_id);
    set({ processing: { isProcessing: true, progress: 15, stage: "Upload complete" } });


    // 2. Transcribe
    set({ processing: { isProcessing: true, progress: 25, stage: "Transcribing audio..." } });
    transcribeRes = await transcribeAudio(file_id);
    console.log("Transcribe Response:", transcribeRes);

    // Save directly to Supabase without saveToAnalysis function
    try {
    const { data: existing } = await supabase
        .from("analysis")
        .select("id")
        .eq("file_id", file_id)
        .maybeSingle();

    const transcribeData = {
        transcribe: {
        text: transcribeRes.text || "",
        usage: transcribeRes.usage || null
        }
    };

    if (existing) {
        await supabase
        .from("analysis")
        .update(transcribeData)
        .eq("file_id", file_id);
    } else {
        await supabase
        .from("analysis")
        .insert({
            file_id,
            teacher_id,           // keep if needed (or remove if causing issues)
            rubric_id: curriculum_id,
            ...transcribeData
        });
    }

    console.log("Saved transcribe to DB directly");
    } catch (err) {
    console.error("Failed to save transcribe:", err);
    }

    set({ processing: { isProcessing: true, progress: 40, stage: "Transcription complete" } });



    // 3. Analyzing voice features
    set({ processing: { isProcessing: true, progress: 50, stage: "Analyzing voice features..." } });
    metricsRes = await getAudioMetrics(file_id);
    await get().saveToAnalysis(file_id, { audio_metrics: metricsRes });
    set({ processing: { isProcessing: true, progress: 60, stage: "Voice analysis complete" } });

    set({ processing: { isProcessing: true, progress: 70, stage: "Evaluating lesson content..." } });
    const evalTextRes = await evaluateText(transcribeRes.text, curriculum_id);
    await get().saveToAnalysis(file_id, { evaluate_text: evalTextRes });
    set({ processing: { isProcessing: true, progress: 80, stage: "Content evaluation complete" } });

    set({ processing: { isProcessing: true, progress: 85, stage: "Evaluating delivery..." } });
    const evalAudioRes = await evaluateAudio(metricsRes, file_id);
    await get().saveToAnalysis(file_id, { evaluate_audio: evalAudioRes });
    set({ processing: { isProcessing: true, progress: 90, stage: "Delivery evaluation complete" } });

    set({ processing: { isProcessing: true, progress: 95, stage: "Generating final report..." } });
    const finalRes = await getFinalEvaluation({
      text: transcribeRes.text,
      rubric: curriculum_id,
      file_id,
      audio_metrics: metricsRes,
    });
    await get().saveToAnalysis(file_id, { final_evaluation: finalRes });
    set({ processing: { isProcessing: true, progress: 100, stage: "All done!" } });

    toast.success("Lesson analysis complete!");

    // After saving final_evaluation
        set({ 
        selectedAnalysis: {
            final_evaluation: finalRes,
            created_at: new Date().toISOString(),
            rubric_id: curriculum_id,
            file_id
        }
        });
  } catch (err) {
    console.error("Pipeline error:", err);
    toast.error(err.message || "Analysis failed");
    set({ processing: { isProcessing: true, progress: 0, stage: "Error occurred" } });
  } finally {
    // Reset after 3 seconds
    setTimeout(() => {
      set({ processing: BASE_PROGRESS });
    }, 3000);
  }
},

  setSelectedAnalysis: (analysis) => set({ selectedAnalysis: analysis }),

  setAnalyses: (analyses) => set({ analyses }),

  saveToAnalysis: async (file_id, data, teacher_id, rubric_id = null) => {
    const { data: existing } = await supabase
      .from("analysis")
      .select("id")
      .eq("file_id", file_id)
      .maybeSingle();

    const payload = {
      file_id,
      teacher_id,
      rubric_id,
      ...data,
    };

    if (existing) {
      await supabase.from("analysis").update(payload).eq("file_id", file_id);
    } else {
      await supabase.from("analysis").insert(payload);
    }
  },
}));