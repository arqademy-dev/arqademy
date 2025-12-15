import { FileAudio, Target, TrendingUp, Clock } from "lucide-react";

const audioMetrics = [
  { label: "Audio Clarity", value: 96, icon: FileAudio },
  { label: "Alignment", value: 91, icon: Target },
  { label: "Engagement", value: 88, icon: TrendingUp },
  { label: "Voice Tone", value: 93, icon: FileAudio },
  { label: "Pacing", value: 90, icon: Clock },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {audioMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="p-5 text-center hover:shadow-lg transition-all duration-200 border rounded-2xl bg-white"
          >
            <Icon className="w-8 h-8 text-[#0ECB83] mx-auto mb-3" />
            <p className="text-gray-600 text-xs sm:text-sm">{metric.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#0ECB83] mt-1">
              {metric.value}%
            </p>
          </div>
        );
      })}
    </div>
  );
}