'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Assignment, Submission } from '@/types';
import { 
  FileUp, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  AlertCircle, 
  X, 
  Link as LinkIcon,
  FileText,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentAssignments: React.FC = () => {
  const { currentUser, assignments, submissions, addSubmission } = useApp();

  const [activeModalAsg, setActiveModalAsg] = useState<Assignment | null>(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [submissionNote, setSubmissionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenSubmitModal = (asg: Assignment) => {
    setActiveModalAsg(asg);
    setSubmissionLink('https://github.com/fiktif-lab/project-tugas');
    setSubmissionFileName(`Tugas_${asg.courseCode}_${currentUser?.name?.replace(/\s+/g, '')}.pdf`);
    setSubmissionNote('Berikut berkas dan repositori implementasi tugas fiktif saya.');
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAsg || !currentUser) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addSubmission({
        assignmentId: activeModalAsg.id,
        assignmentTitle: activeModalAsg.title,
        courseId: activeModalAsg.courseId,
        courseName: activeModalAsg.courseName,
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentNim: currentUser.identifier,
        fileUrl: submissionLink,
        fileName: submissionFileName,
        note: submissionNote,
      });

      setIsSubmitting(false);
      setActiveModalAsg(null);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileUp className="w-5 h-5 text-blue-600" />
            Modul Tugas Kelas Terbuka
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kumpulkan berkas simulasi laporan atau tautan repositori tugas perkuliahan Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map((asg) => {
          // Check if current student has submitted
          const mySubmission = submissions.find(
            (s) => s.assignmentId === asg.id && s.studentId === currentUser?.id
          );

          return (
            <div
              key={asg.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs transition flex flex-col justify-between ${
                mySubmission ? 'border-emerald-200/90' : 'border-slate-200 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                    {asg.courseCode} • {asg.courseName}
                  </span>
                  
                  {mySubmission ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Terkumpul
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      Belum Dikirim
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {asg.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Batas: {new Date(asg.deadline).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} WIB
                  </span>
                  <span>Maks: <strong>{asg.maxScore} poin</strong></span>
                </div>
              </div>

              {/* Status Submission / Detail Nilai */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                {mySubmission ? (
                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-2 border border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Status Evaluasi Dosen:</span>
                      {mySubmission.status === 'graded' ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Award className="w-3.5 h-3.5" />
                          Nilai: {mySubmission.score} / 100
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">Menunggu Pemeriksaan</span>
                      )}
                    </div>

                    {mySubmission.feedback && (
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700 italic">
                        &quot;{mySubmission.feedback}&quot;
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="truncate max-w-[200px]">{mySubmission.fileName}</span>
                      {mySubmission.fileUrl && (
                        <a
                          href={mySubmission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-3 h-3" /> Tautan Terkirim
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenSubmitModal(asg)}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FileUp className="w-4 h-4" />
                    Kumpulkan Tugas Sekarang
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form Unggah Tugas Mahasiswa */}
      {activeModalAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-blue-600" />
                  Kirim Berkas Tugas Kuliah
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeModalAsg.courseCode} - {activeModalAsg.courseName}
                </p>
              </div>
              <button
                onClick={() => setActiveModalAsg(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Tugas
                </label>
                <input
                  type="text"
                  disabled
                  value={activeModalAsg.title}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                  Tautan Repositori / Demo Web (Fiktif) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/..."
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Nama File Laporan (Simulasi Upload) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Laporan_Tugas.pdf"
                  value={submissionFileName}
                  onChange={(e) => setSubmissionFileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Tambahan untuk Dosen
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan keterangan mengenai fitur khusus atau ringkasan tugas Anda..."
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveModalAsg(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Mengirim...' : 'Kirim Tugas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
