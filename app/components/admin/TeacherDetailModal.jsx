"use client";

import { Dialog } from "@headlessui/react";
import { X, Printer, Upload, FileAudio, GraduationCap } from "lucide-react";
import { useAdminStore } from "@/app/stores/useAdminStore";
import { useTeacherStore } from "@/app/stores/useTeacherStore";
import { useRef, useState } from "react";
import TeacherAnalysisModal from "./TeacherAnalysisModal";


export default function TeacherDetailModal() {
  const { selectedTeacher, clearSelected } = useAdminStore();
  const { uploadAudio } = useTeacherStore();

  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
    }
  };

  const handleUploadAudio = () => {
    if (uploadedFile && selectedTeacher) {
      uploadAudio(uploadedFile, selectedTeacher.id);
      setUploadedFile(null);
    }
  };

  if (!selectedTeacher) return null;

  return (
    <Dialog open={true} onClose={clearSelected} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-[#0A3E49]" />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    {selectedTeacher.first_name} {selectedTeacher.last_name}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">
                    {selectedTeacher.schools?.school_name || "No school assigned"}
                  </p>
                </div>
              </div>
              <button onClick={clearSelected} className="text-gray-400 hover:text-gray-600 transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Contact & Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTeacher.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Join Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedTeacher.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Placeholder Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {/* You can add real metrics later */}
                  <div className="p-3 text-center bg-gray-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Performance</p>
                  </div>
                  <div className="p-3 text-center bg-gray-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <div className="p-3 text-center bg-gray-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="p-3 text-center bg-gray-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Sessions</p>
                  </div>
                </div>
              </div>

              {/* Assigned Subjects & Classes */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Assigned Subjects & Classes</h3>
                {selectedTeacher.assignments?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTeacher.assignments.map((a, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border">
                        <p className="font-medium text-gray-900">{a.subject}</p>
                        <p className="text-sm text-gray-600">{a.class}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No subjects assigned yet</p>
                )}
              </div>

              {/* Upload Audio Section */}
              {/* // Inside the modal content, after Assigned Subjects section */}
            <div className="mt-8">
            <TeacherAnalysisModal teacherId={selectedTeacher.id} />
            </div>

              {/* Print Report */}
              <button
                onClick={() => window.print()}
                className="w-full px-5 py-3 bg-[#0A3E49] text-white rounded-lg hover:bg-[#34D2A2] transition font-medium inline-flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Teacher Report
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}