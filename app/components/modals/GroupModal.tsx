'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GroupModal({ isOpen, onClose }: GroupModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', group: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== JOIN STUDY GROUP SUBMITTED ===', formData);

    setShowSuccess(true);
    toast.success("You're In!");

    setTimeout(() => {
      onClose();
      setShowSuccess(false);
      setFormData({ name: '', phone: '', group: '' });
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
              <div className="modal-title font-bold text-lg">Join a Study Group</div>
              <div className="modal-sub text-black text-sm">Pick your group and we will add you. It is free and takes 30 seconds.</div>
            </div>

            <div className="modal-field">
              <label>Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Amina Bello"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                required
              />
            </div>

            <div className="modal-field">
              <label>WhatsApp Number</label>
              <input
                type="tel"
                placeholder="e.g. 08012345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                required
              />
            </div>

            <div className="modal-field">
              <label>Which Group?</label>
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332] bg-white"
                required
              >
                <option value="">Select a group...</option>
                <option>Exam Resit Group</option>
                <option>Pathway Programme Group</option>
                <option>Qampus Programme Group</option>
              </select>
            </div>

            <button type="submit" className="modal-submit">Add Me to the Group →</button>
          </form>
        ) : (
          <div className="modal-success text-center py-8">
            <div className="tick mx-auto mb-4 bg-[#E6F7EF] w-14 h-14 rounded-full flex items-center justify-center">
              <Check size={28} strokeWidth={3} className="text-[#00A870]" />
            </div>
            <h3>You're In!</h3>
            <p>We've received your details. Expect a WhatsApp message from us within 24 hours with the group link.</p>
          </div>
        )}
      </div>
    </div>
  );
}