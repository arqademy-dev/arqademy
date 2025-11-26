import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { School, Mic } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#34D2A2]/10 via-white to-[#0A3E49]/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#34D2A2] to-[#0A3E49] p-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <Mic className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Arqademy</h1>
          <p className="text-white/80 mt-2 text-lg">Voice-Powered Learning Platform</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div>
            <Label>Email Address</Label>
            <Input placeholder="teacher@arqademy.edu" type="email" />
          </div>

          <div>
            <Label>Password</Label>
            <Input placeholder="••••••••••" type="password" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-[#34D2A2] rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-[#34D2A2] hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <Button size="lg" className="w-full text-lg">
            Sign In to Arqademy
          </Button>

          <div className="text-center text-xs text-gray-500 mt-6">
            © 2025 Arqademy • Empowering Teachers & Students
          </div>
        </div>
      </Card>
    </div>
  );
}