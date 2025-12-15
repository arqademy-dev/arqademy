import { DollarSign, Target, Clock, CheckCircle } from "lucide-react";

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="p-6 text-center bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100 rounded-2xl">
        <DollarSign className="w-10 h-10 text-[#0ECB83] mx-auto mb-2" />
        <p className="text-3xl font-bold text-[#0ECB83]">$21</p>
        <p className="text-gray-600 text-sm">Reward Earned</p>
      </div>
      <div className="p-6 text-center bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-100 rounded-2xl">
        <Target className="w-10 h-10 text-cyan-600 mx-auto mb-2" />
        <p className="text-3xl font-bold text-cyan-600">96%</p>
        <p className="text-gray-600 text-sm">Top Engagement</p>
      </div>
      <div className="p-6 text-center bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl">
        <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
        <p className="text-3xl font-bold text-[#0A3E49]">11AM</p>
        <p className="text-gray-600 text-sm">Next: Math</p>
      </div>
      <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 rounded-2xl">
        <CheckCircle className="w-10 h-10 text-purple-600 mx-auto mb-2" />
        <p className="text-3xl font-bold text-purple-600">68%</p>
        <p className="text-gray-600 text-sm">Curriculum Done</p>
      </div>
    </div>
  );
}