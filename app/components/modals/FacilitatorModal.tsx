'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FacilitatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FacilitatorModal({ isOpen, onClose }: FacilitatorModalProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', school: '', state: '', role: ''
  });

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FACILITATOR SIGNUP ===', formData);

    setShowSuccess(true);
    toast.success("Application Received!");

    setTimeout(() => {
      onClose();
      setShowSuccess(false);
      setFormData({ name: '', phone: '', email: '', school: '', state: '', role: '' });
    }, 3200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="modal-box bg-white rounded-3xl w-full max-w-[420px] p-8 relative shadow-2xl max-h-[92vh] overflow-y-auto">
        <button onClick={onClose} className="modal-close absolute top-5 right-5 text-3xl text-[#6B7A8D] hover:text-black">&times;</button>

        {!showSuccess ? (
          <>
            <div className="flex border border-[#E4E9F0] rounded-xl overflow-hidden mb-8">
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'signup' ? 'bg-[#009E8E] text-white' : 'bg-transparent text-[#6B7A8D]'}`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'login' ? 'bg-[#009E8E] text-white' : 'bg-transparent text-[#6B7A8D]'}`}
              >
                Login
              </button>
            </div>

            {activeTab === 'signup' ? (
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div className="modal-title">Become a Facilitator</div>
                <div className="modal-sub">Register students and earn 20% commission on every enrolment.</div>

                <div className="earn-note bg-[#E6F7F5] border border-[#009E8E]/25 rounded-xl p-4 text-sm text-[#009E8E] font-medium">
                  You earn 10–20% on every student you register. We handle the rest.
                </div>

                <div className="modal-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Adeyemi Balogun"
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
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. teacher@school.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>School Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sunrise Secondary School"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="e.g. Abuja, Lagos, Taraba..."
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]"
                    required
                  />
                </div>

                <div className="modal-field">
                  <label>Your Role at the School</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332] bg-white"
                    required
                  >
                    <option value="">Select your role...</option>
                    <option>Teacher</option>
                    <option>Vice Principal</option>
                    <option>Principal</option>
                    <option>School Admin Staff</option>
                    <option>Other</option>
                  </select>
                </div>

                <button type="submit" className="modal-submit">Apply as Facilitator →</button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="modal-title">Facilitator Login</div>
                <div className="modal-sub">Enter your credentials to access the Facilitator Portal.</div>

                <div className="modal-field">
                  <label>Email or Phone</label>
                  <input type="text" placeholder="08012345678 or email" className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]" />
                </div>

                <div className="modal-field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-[#E4E9F0] rounded-xl focus:border-[#009E8E] focus:bg-white outline-none text-[#1A2332]" />
                </div>

                <button type="button" className="modal-submit" onClick={() => toast.info("Login coming soon")}>
                  Login to Portal →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="modal-success text-center py-10">
            <div className="tick mx-auto mb-6 bg-[#E6F7EF] w-14 h-14 rounded-full flex items-center justify-center">
              <Check size={28} strokeWidth={3} className="text-[#00A870]" />
            </div>
            <h3>Application Received!</h3>
            <p>Our team will contact you on WhatsApp within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}