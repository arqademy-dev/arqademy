import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_FASTAPI || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const uploadAudio = async (file, teacher_id, curriculum_id) => {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("teacher_id", teacher_id);
  formData.append("curriculum_id", curriculum_id);

  try {
    const response = await api.post("/upload-audio", formData);
    return response.data.file_id;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Upload failed");
  }
};

export const transcribeAudio = async (file_id) => {
  try {
    const response = await api.post(`/transcribe/${file_id}`, {file_id});
    return response.data; // expect { text: "..." }
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Transcription failed");
  }
};

export const getAudioMetrics = async (file_id) => {
  try {
    const response = await api.post(`/audio-metrics/${file_id}`, {file_id});
    return response.data; // full metrics object
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Audio metrics failed");
  }
};

export const evaluateText = async (text, curriculum_id) => {
  try {
    const response = await api.post("/evaluate_text", {
      transcript: text,
      curriculum_id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Text evaluation failed");
  }
};

export const evaluateAudio = async (metrics, file_id) => {
  try {
    const response = await api.post("/evaluate_audio", {
      audio_features: metrics,
      file_id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Audio evaluation failed");
  }
};

export const getFinalEvaluation = async (payload) => {
  try {
    const response = await api.post("/final_evaluation", {
      transcript: payload.text,
      curriculum_id: payload.rubric,
      file_id: payload.file_id,
      audio_features: payload.audio_metrics,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Final evaluation failed");
  }
};