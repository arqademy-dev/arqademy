'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
}

export default function EnrollModal({ isOpen, onClose, programTitle }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('=== ENROLL FORM SUBMITTED ===', {
        program: programTitle,
        ...formData,
        timestamp: new Date().toISOString()
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      toast.success("Registration Received!", {
        description: "We will contact you on WhatsApp within 24 hours.",
      });

      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setFormData({ name: '', phone: '', state: '' });
      }, 2800);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {!showSuccess ? (
          <>
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="font-syne text-2xl font-bold text-[#0D1B2A]">
                  {programTitle.includes("Founders") ? "Join Waitlist" : "Enrol Now"}
                </h2>
                <p className="text-sm text-[#6B7A8D] mt-1">We will reach you on WhatsApp</p>
              </div>
              <button onClick={onClose} className="text-[#6B7A8D] hover:text-black">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#1A2332] mb-2">FULL NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Fatima Usman"
                  className="w-full px-4 py-3 border border-[#E4E9F0] rounded-2xl focus:outline-none focus:border-[#009E8E]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2332] mb-2">WHATSAPP NUMBER</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 08012345678"
                  className="w-full px-4 py-3 border border-[#E4E9F0] rounded-2xl focus:outline-none focus:border-[#009E8E]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2332] mb-2">STATE</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Lagos, Abuja..."
                  className="w-full px-4 py-3 border border-[#E4E9F0] rounded-2xl focus:outline-none focus:border-[#009E8E]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#009E8E] hover:bg-[#008478] text-white font-semibold py-4 rounded-2xl transition-all mt-4 disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit & Get Started →"}
              </button>
            </form>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-[#E6F7EF] rounded-full flex items-center justify-center mb-6">
              <Check className="w-9 h-9 text-[#00A870]" strokeWidth={3} />
            </div>
            <h3 className="font-syne text-2xl font-bold text-[#0D1B2A] mb-2">Registration Received!</h3>
            <p className="text-[#6B7A8D]">We will contact you on WhatsApp within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}