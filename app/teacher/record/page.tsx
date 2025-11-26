// app/(teacher)/record/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Play, Square, Download, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export default function RecordAudioPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!audioURL) setDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, audioURL]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Waveform animation
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording) return;
      animationRef.current = requestAnimationFrame(draw);

      analyserRef.current!.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#f0fdfa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#34D2A2";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Volume level for meter
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avg = sum / bufferLength;
      setVolumeLevel(Math.round(((avg - 128) / 128) * 100));
    };

    draw();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      drawWaveform();
    } catch (err) {
      alert("Please allow microphone access");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setAudioURL(null);
    setDuration(0);
    setVolumeLevel(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Record Audio Session</h1>
        <p className="text-gray-600 mt-2">Speak clearly • Stay consistent • Earn rewards</p>
      </div>

      {/* Recording Studio Card */}
      <Card className="p-8 sm:p-12 bg-gradient-to-b from-[#f0fdfa] to-white">
        {!audioURL ? (
          <>
            {/* Timer & Volume */}
            <div className="text-center mb-10">
              <div className="text-5xl sm:text-6xl font-bold text-[#0A3E49] font-mono">
                {formatTime(duration)}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-sm text-gray-500">Volume</span>
                <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#34D2A2] to-emerald-600 transition-all duration-150"
                    style={{ width: `${Math.min(volumeLevel, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-[#0A3E49]">{volumeLevel}%</span>
              </div>
            </div>

            {/* Waveform */}
            <div className="mb-10">
              <canvas
                ref={canvasRef}
                width={600}
                height={160}
                className="w-full max-w-2xl mx-auto rounded-2xl bg-teal-50 shadow-inner"
              />
            </div>

            {/* Big Record Button */}
            <div className="flex justify-center">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`relative w-32 h-32 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-br from-[#34D2A2] to-[#0A3E49]"
                }`}
              >
                {isRecording ? (
                  <Square className="w-16 h-16 text-white" />
                ) : (
                  <Mic className="w-16 h-16 text-white" />
                )}
                {isRecording && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full animate-ping" />
                )}
              </button>
            </div>

            <p className="text-center mt-8 text-gray-600">
              {isRecording ? "Recording in progress..." : "Click the microphone to start"}
            </p>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-12">
            <CheckCircle className="w-24 h-24 text-[#34D2A2] mx-auto mb-6" />

            <h2 className="text-3xl font-bold text-[#0A3E49] mb-4">Recording Complete!</h2>
            <p className="text-xl text-gray-700 mb-2">Duration: {formatTime(duration)}</p>

            <audio controls src={audioURL} className="w-full max-w-md mx-auto mb-8" />

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-emerald-800 font-semibold text-lg mb-2">
                AI Analysis (Mock Result)
              </p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-sm text-gray-600">Clarity</span>
                  <div className="text-2xl font-bold text-emerald-600">94%</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Engagement</span>
                  <div className="text-2xl font-bold text-emerald-600">89%</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Pacing</span>
                  <div className="text-2xl font-bold text-emerald-600">91%</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reward Earned</span>
                  <div className="text-2xl font-bold text-emerald-600">+$18.50</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Recording
              </Button>
              <Button size="lg" variant="secondary" onClick={resetRecording}>
                Record Another
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}