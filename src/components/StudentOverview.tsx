'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface StudentOverviewProps {
  onNavigate: (tab: 'assignments' | 'khs' | 'forum') => void;
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({ onNavigate }) => {
  const { currentUser, courses, assignments, submissions, grades } = useApp();

  const mySubmissions = submissions.filter((s) => s.studentId === currentUser?.id);
  const myGrades = grades.filter((g) => g.studentId === currentUser?.id);
  const pendingAssignments = assignments.filter(
    (a) => !submissions.some((s) => s.assignmentId === a.id && s.studentId === currentUser?.id)
  );

  const totalSks = myGrades.reduce((acc, curr) => acc + curr.sks, 0);
  const totalQualityPoints = myGrades.reduce((acc, curr) => acc + curr.sks * curr.gradePoint, 0);
  const ipk = totalSks > 0 ? (totalQualityPoints / totalSks).toFixed(2) : '0.00';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Student Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mahasiswa Aktif Fiktif
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">
                Selamat Datang, {currentUser?.name}!
              </h1>
              <p className="text-xs text-blue-100 mt-0.5 font-medium">
                NIM: {currentUser?.identifier} • {currentUser?.department} • Semester {currentUser?.semester || 5}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('assignments')}
              className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
            >
              Kumpulkan Tugas
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => onNavigate('khs')}
              className="px-4 py-2.5 bg-blue-500/30 hover:bg-blue-500/40 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-xs transition"
            >
              Lihat KHS (IPK)
            </button>
          </div>
        </div>

        {/* 3 Quick KPI Cards */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-blue-200">Indeks Prestasi Kumulatif</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black">{ipk}</span>
              <span className="text-xs text-emerald-300 font-bold">Cumlaude</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-blue-200">Tugas Terkumpul</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black">{mySubmissions.length}</span>
              <span className="text-xs text-blue-200">dari {assignments.length} penugasan</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-blue-200">Tugas Belum Dikirim</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-amber-300">{pendingAssignments.length}</span>
              <span className="text-xs text-amber-200">Segera lengkapi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Pending Assignments & Courses Taken */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pending Assignments List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Tugas Mendatang yang Perlu Diselesaikan
            </h3>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          {pendingAssignments.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              Semua penugasan saat ini telah Anda kirimkan! Kerja bagus.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {asg.courseCode}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1">{asg.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Deadline: {new Date(asg.deadline).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('assignments')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition"
                  >
                    Kirim
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Courses Taken */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Mata Kuliah Diambil Semester Ini
          </h3>

          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700">{course.code}</span>
                    <span className="text-[10px] text-slate-400">• {course.sks} SKS</span>
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 mt-0.5">{course.name}</h4>
                  <p className="text-[11px] text-slate-500">{course.lecturerName}</p>
                </div>
                <div className="text-right text-[11px] font-mono text-slate-400">
                  {course.room}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
