'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { AdminDashboard } from '@/components/AdminDashboard';
import { LecturerDashboard } from '@/components/LecturerDashboard';
import { StudentOverview } from '@/components/StudentOverview';
import { StudentAssignments } from '@/components/StudentAssignments';
import { StudentGrades } from '@/components/StudentGrades';
import { ForumDiscussion } from '@/components/ForumDiscussion';
import { LoginPage } from '@/components/LoginPage';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  MessagesSquare, 
  Users, 
  FileCheck2,
  Sparkles,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  LogOut
} from 'lucide-react';

export default function Home() {
  const { currentUser, switchRoleDemo, logout } = useApp();

  // Navigation tab for Mahasiswa
  const [studentTab, setStudentTab] = useState<'overview' | 'assignments' | 'khs' | 'forum'>('overview');

  // Navigation tab for Admin
  const [adminTab, setAdminTab] = useState<'users' | 'forum'>('users');

  // Navigation tab for Dosen
  const [lecturerTab, setLecturerTab] = useState<'classes' | 'forum'>('classes');

  // If user is not logged in, show dedicated role-based LoginPage
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Banner Quick Switch Helper untuk Penguji */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Mode Demo Akses Cepat (RBAC)
              </p>
              <p className="text-xs text-slate-300">
                Pilih peran untuk menguji hak akses: Anda saat ini login sebagai{' '}
                <strong className="text-white font-extrabold underline underline-offset-2">
                  {currentUser?.role}: {currentUser?.name}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => switchRoleDemo('ADMIN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                currentUser?.role === 'ADMIN'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
            <button
              onClick={() => switchRoleDemo('DOSEN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                currentUser?.role === 'DOSEN'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Dosen
            </button>
            <button
              onClick={() => switchRoleDemo('MAHASISWA')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                currentUser?.role === 'MAHASISWA'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Mahasiswa
            </button>
            <button
              onClick={() => logout()}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30"
              title="Keluar ke Halaman Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Tabs based on Role */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap gap-1">
          {currentUser?.role === 'MAHASISWA' && (
            <>
              <button
                onClick={() => setStudentTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  studentTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Beranda Mahasiswa
              </button>

              <button
                onClick={() => setStudentTab('assignments')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  studentTab === 'assignments'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Tugas Kuliah & Pengumpulan
              </button>

              <button
                onClick={() => setStudentTab('khs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  studentTab === 'khs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Kartu Hasil Studi (KHS)
              </button>

              <button
                onClick={() => setStudentTab('forum')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  studentTab === 'forum'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessagesSquare className="w-4 h-4" />
                Forum Diskusi Kelas
              </button>
            </>
          )}

          {currentUser?.role === 'DOSEN' && (
            <>
              <button
                onClick={() => setLecturerTab('classes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  lecturerTab === 'classes'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                Kelas Pengampu & Penilaian Tugas
              </button>

              <button
                onClick={() => setLecturerTab('forum')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  lecturerTab === 'forum'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessagesSquare className="w-4 h-4" />
                Forum Tanya Jawab Kelas
              </button>
            </>
          )}

          {currentUser?.role === 'ADMIN' && (
            <>
              <button
                onClick={() => setAdminTab('users')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  adminTab === 'users'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                Manajemen Akun (CRUD User)
              </button>

              <button
                onClick={() => setAdminTab('forum')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  adminTab === 'forum'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessagesSquare className="w-4 h-4" />
                Moderasi Forum Diskusi
              </button>
            </>
          )}
        </div>

        {/* Content Render based on Role & Selected Tab */}
        {currentUser?.role === 'ADMIN' && (
          <div>
            {adminTab === 'users' && <AdminDashboard />}
            {adminTab === 'forum' && <ForumDiscussion />}
          </div>
        )}

        {currentUser?.role === 'DOSEN' && (
          <div>
            {lecturerTab === 'classes' && <LecturerDashboard />}
            {lecturerTab === 'forum' && <ForumDiscussion />}
          </div>
        )}

        {currentUser?.role === 'MAHASISWA' && (
          <div>
            {studentTab === 'overview' && <StudentOverview onNavigate={setStudentTab} />}
            {studentTab === 'assignments' && <StudentAssignments />}
            {studentTab === 'khs' && <StudentGrades />}
            {studentTab === 'forum' && <ForumDiscussion />}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 <strong>Universitas Nusantara Digital</strong> (LMS & Academic Portal Fiktif).
          </p>
          <p className="text-slate-400">
            Dibuat untuk kebutuhan evaluasi antarmuka dan role-based access control fiktif.
          </p>
        </div>
      </footer>

    </div>
  );
}
