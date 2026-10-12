'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Course, Assignment, Submission } from '@/types';
import { 
  BookOpen, 
  Clock, 
  FileCheck2, 
  GraduationCap, 
  Search, 
  PlusCircle, 
  CheckCircle, 
  ExternalLink,
  MessageSquare,
  Award,
  Calendar,
  X,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LecturerDashboard: React.FC = () => {
  const { currentUser, courses, assignments, submissions, addAssignment, gradeSubmission } = useApp();

  // Courses taught by this lecturer
  const myCourses = courses.filter((c) => c.lecturerId === currentUser?.id);
  const activeCourseId = myCourses[0]?.id || courses[0]?.id;
  const [selectedCourseId, setSelectedCourseId] = useState<string>(activeCourseId || '');

  const [activeTab, setActiveTab] = useState<'assignments' | 'grading' | 'students'>('grading');
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(85);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  // New assignment modal
  const [newAsgModalOpen, setNewAsgModalOpen] = useState(false);
  const [newAsgTitle, setNewAsgTitle] = useState('');
  const [newAsgDesc, setNewAsgDesc] = useState('');
  const [newAsgDeadline, setNewAsgDeadline] = useState('2026-11-15T23:59');

  const currentCourse = courses.find((c) => c.id === selectedCourseId);
  const courseAssignments = assignments.filter((a) => a.courseId === selectedCourseId);
  const courseSubmissions = submissions.filter((s) => s.courseId === selectedCourseId);

  const pendingGradingCount = courseSubmissions.filter((s) => s.status === 'submitted').length;
  const gradedCount = courseSubmissions.filter((s) => s.status === 'graded').length;

  const handleOpenGradeModal = (sub: Submission) => {
    setSelectedSubmission(sub);
    setGradeInput(sub.score || 85);
    setFeedbackInput(sub.feedback || 'Analisis tugas sangat komprehensif, implementasi kode bekerja dengan baik.');
    setGradingModalOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    gradeSubmission(selectedSubmission.id, Number(gradeInput), feedbackInput);
    setGradingModalOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsgTitle || !selectedCourseId) return;

    addAssignment({
      courseId: selectedCourseId,
      courseName: currentCourse?.name || 'Mata Kuliah',
      courseCode: currentCourse?.code || 'IF-000',
      title: newAsgTitle,
      description: newAsgDesc,
      deadline: newAsgDeadline,
      maxScore: 100,
    });

    setNewAsgTitle('');
    setNewAsgDesc('');
    setNewAsgModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Lecturer Header Profile & Quick Stats */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-1">
                Portal Dosen Pengampu
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {currentUser?.name}
              </h1>
              <p className="text-xs text-indigo-200 mt-0.5">
                {currentUser?.identifier} • {currentUser?.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewAsgModalOpen(true)}
              className="px-4 py-2 bg-white text-indigo-900 hover:bg-indigo-50 text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              Buat Tugas Baru
            </button>
          </div>
        </div>

        {/* Course Selector Tabs */}
        <div className="mt-8 pt-6 border-t border-indigo-700/50 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-indigo-300 mr-2">Pilih Mata Kuliah:</span>
          {courses.map((c) => {
            const isMine = c.lecturerId === currentUser?.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCourseId(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                  selectedCourseId === c.id
                    ? 'bg-white text-indigo-950 shadow-md'
                    : 'bg-indigo-800/60 hover:bg-indigo-700 text-indigo-100 border border-indigo-600/40'
                }`}
              >
                <span>{c.code} - {c.name}</span>
                {isMine && (
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded">
                    Diampu
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Course Overview */}
      {currentCourse && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {currentCourse.code}
                </span>
                <span className="text-xs text-slate-500">{currentCourse.sks} SKS • Semester {currentCourse.semester}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{currentCourse.name}</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-3xl">{currentCourse.description}</p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400">Jadwal Kuliah</p>
                <p className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {currentCourse.schedule}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] text-slate-400">Ruangan</p>
                <p className="font-semibold text-slate-800 mt-0.5">{currentCourse.room}</p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] text-slate-400">Total Mahasiswa</p>
                <p className="font-semibold text-slate-800 mt-0.5">{currentCourse.totalStudents} Mahasiswa</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'grading'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Penilaian Tugas Masuk
            {pendingGradingCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {pendingGradingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'assignments'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Daftar Modul Tugas ({courseAssignments.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Penilaian Tugas (Grading & Feedback) */}
      {activeTab === 'grading' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Unggahan Tugas Mahasiswa untuk Mata Kuliah Ini
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Periksa berkas mahasiswa, berikan skor 0-100 serta catatan koreksi konstruktif.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg font-medium border border-amber-200">
                {pendingGradingCount} Belum Dinilai
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-medium border border-emerald-200">
                {gradedCount} Selesai Dinilai
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Mahasiswa</th>
                  <th className="px-6 py-3.5">Judul Tugas</th>
                  <th className="px-6 py-3.5">Waktu Submit & File</th>
                  <th className="px-6 py-3.5">Catatan / Tautan</th>
                  <th className="px-6 py-3.5">Nilai & Status</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      Belum ada kiriman tugas dari mahasiswa pada mata kuliah ini.
                    </td>
                  </tr>
                ) : (
                  courseSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{sub.studentName}</p>
                        <p className="text-[11px] font-mono text-slate-500">NIM: {sub.studentNim}</p>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="font-semibold text-slate-800 line-clamp-1">{sub.assignmentTitle}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-600 font-mono text-[11px]">
                          {new Date(sub.submittedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        {sub.fileName && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1">
                            {sub.fileName}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-600 italic line-clamp-2">{sub.note || '-'}</p>
                        {sub.fileUrl && (
                          <a
                            href={sub.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:underline mt-1 font-medium"
                          >
                            <ExternalLink className="w-3 h-3" /> Buka Tautan Demo
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {sub.status === 'graded' ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <Award className="w-3.5 h-3.5" />
                              Skor: {sub.score} / 100
                            </span>
                            {sub.feedback && (
                              <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-1">
                                &quot;{sub.feedback}&quot;
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" />
                            Menunggu Dinilai
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenGradeModal(sub)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
                        >
                          {sub.status === 'graded' ? 'Koreksi Nilai' : 'Beri Nilai'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Daftar Modul Tugas Kuliah */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Modul Tugas Kelas Terbuka</h3>
            <button
              onClick={() => setNewAsgModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs hover:bg-indigo-700 transition"
            >
              <PlusCircle className="w-4 h-4" />
              Tambah Tugas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseAssignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                    {asg.courseCode}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Deadline: {new Date(asg.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-3">{asg.title}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">{asg.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Maks. Nilai: <strong className="text-slate-800">{asg.maxScore} poin</strong></span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                    {submissions.filter((s) => s.assignmentId === asg.id).length} Mengumpulkan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Beri Nilai & Feedback */}
      {gradingModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Form Penilaian & Umpan Balik Dosen
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mahasiswa: <strong className="text-slate-800">{selectedSubmission.studentName}</strong> ({selectedSubmission.studentNim})
                </p>
              </div>
              <button
                onClick={() => setGradingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="p-5 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-100">
                <p className="font-semibold text-slate-800">{selectedSubmission.assignmentTitle}</p>
                {selectedSubmission.note && (
                  <p className="text-slate-600 italic">&quot;{selectedSubmission.note}&quot;</p>
                )}
                {selectedSubmission.fileUrl && (
                  <p className="text-indigo-600 truncate font-mono text-[11px]">
                    Tautan: {selectedSubmission.fileUrl}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nilai Angka (Skala 0 - 100) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-20 px-3 py-1.5 text-xs font-bold text-center border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Umpan Balik / Catatan Dosen (Feedback) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Berikan saran perbaikan atau apresiasi terhadap hasil pengerjaan mahasiswa..."
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setGradingModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition"
                >
                  Simpan & Rilis Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Buat Tugas Baru */}
      {newAsgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-indigo-600" />
                Tambah Penugasan Modul Kelas
              </h3>
              <button
                onClick={() => setNewAsgModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mata Kuliah
                </label>
                <input
                  type="text"
                  disabled
                  value={`${currentCourse?.code} - ${currentCourse?.name}`}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Penugasan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tugas 3: Implementasi Redux / Zustand State..."
                  value={newAsgTitle}
                  onChange={(e) => setNewAsgTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi & Petunjuk Pengumpulan *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan instruksi tugas secara rinci..."
                  value={newAsgDesc}
                  onChange={(e) => setNewAsgDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batas Waktu Pengumpulan (Deadline)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newAsgDeadline}
                  onChange={(e) => setNewAsgDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewAsgModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition"
                >
                  Terbitkan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
