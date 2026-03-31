'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== ASK FOR HELP SUBMITTED ===', formData);

    setShowSuccess(true);
    toast.success("Message Received!");

    setTimeout(() => {
      onClose();
      setShowSuccess(false);
      setFormData({ name: '', contact: '', message: '' });
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="modal-box bg-white rounded-3xl w-full max-w-[420px] p-8 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="modal-close absolute top-5 right-5 text-3xl text-[#6B7A8D] hover:text-black"
        >
          &times;
        </button>

        {!showSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="modal-title font-bold text-black text-2xl">Ask for Help</div>
              <div className="modal-sub text-black text-sm">Tell us what you need. We will get back to you on WhatsApp or email within 24 hours.</div>
            </div>

            <div className="modal-field">
              <label className='text-black text-sm'>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Emeka Obi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                required
              />
            </div>

            <div className="modal-field">
              <label className='text-black text-sm'>WhatsApp or Email</label>
              <input
                type="text"
                placeholder="08012345678 or email@gmail.com"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                required
              />
            </div>

            <div className="modal-field">
              <label className='text-black text-sm'>WhatsApp or Email</label>
              <label className='text-black text-sm'>What do you need help with?</label>
              <textarea
                placeholder="Describe your question or challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332] resize-y min-h-[90px]"
                required
              />
            </div>

            <button type="submit" className="modal-submit">Send My Message →</button>
          </form>
        ) : (
          <div className="modal-success text-center py-8">
            <div className="tick mx-auto mb-4 bg-[#E6F7EF] w-14 h-14 rounded-full flex items-center justify-center">
              <Check size={28} strokeWidth={3} className="text-[#00A870]" />
            </div>
            <h3>Message Received!</h3>
            <p>We've got your message and will reply within 24 hours. You're not alone in this.</p>
          </div>
        )}
      </div>
    </div>
  );
}