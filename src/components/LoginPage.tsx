'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/types';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  KeyRound,
  IdCard,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoleConfig {
  role: Role;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  themeColor: {
    tabActive: string;
    tabInactive: string;
    gradient: string;
    button: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    inputRing: string;
    demoBorder: string;
    demoBg: string;
  };
  identifierPlaceholder: string;
  identifierLabel: string;
  demoAccounts: {
    id: string;
    name: string;
    identifier: string;
    email: string;
    info: string;
  }[];
}

export const LoginPage: React.FC = () => {
  const { login, switchUserById } = useApp();

  const [activeRole, setActiveRole] = useState<Role>('MAHASISWA');
  const [identifierInput, setIdentifierInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('demo1234');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roleConfigs: Record<Role, RoleConfig> = {
    MAHASISWA: {
      role: 'MAHASISWA',
      title: 'Portal Mahasiswa (SIAKAD & LMS)',
      subtitle: 'Akses KHS, materi perkuliahan, penyerahan tugas, dan forum diskusi kelas.',
      badge: 'MAHASISWA',
      icon: <GraduationCap className="w-5 h-5" />,
      themeColor: {
        tabActive: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
        tabInactive: 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50',
        gradient: 'from-emerald-700 via-teal-700 to-slate-900',
        button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30',
        border: 'border-emerald-200',
        badgeBg: 'bg-emerald-50',
        badgeText: 'text-emerald-700',
        badgeBorder: 'border-emerald-200',
        inputRing: 'focus:ring-emerald-500',
        demoBorder: 'hover:border-emerald-400 hover:bg-emerald-50/50',
        demoBg: 'bg-emerald-50/60 text-emerald-800',
      },
      identifierLabel: 'Nomor Induk Mahasiswa (NIM) atau Email Kampus',
      identifierPlaceholder: '220101901 atau faiz.ahmad@fiktif-univ.ac.id',
      demoAccounts: [
        {
          id: 'usr-mhs-1',
          name: 'Ahmad Faiz Al-Fathir',
          identifier: '220101901',
          email: 'faiz.ahmad@fiktif-univ.ac.id',
          info: 'Teknik Informatika • Sem 5 (IPK 3.80)',
        },
        {
          id: 'usr-mhs-2',
          name: 'Nadia Rahmawati',
          identifier: '220101902',
          email: 'nadia.rahma@fiktif-univ.ac.id',
          info: 'Teknik Informatika • Sem 5 (IPK 3.65)',
        },
        {
          id: 'usr-mhs-3',
          name: 'Dimas Aditya Nugraha',
          identifier: '220101903',
          email: 'dimas.aditya@fiktif-univ.ac.id',
          info: 'Sistem Informasi • Sem 5 (IPK 3.15)',
        },
      ],
    },

    DOSEN: {
      role: 'DOSEN',
      title: 'Portal Dosen (E-Learning & Grading)',
      subtitle: 'Kelola kelas perkuliahan, penugasan mahasiswa, penilaian & evaluasi tugas.',
      badge: 'DOSEN PENGAMPU',
      icon: <UserCheck className="w-5 h-5" />,
      themeColor: {
        tabActive: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20',
        tabInactive: 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50',
        gradient: 'from-indigo-900 via-indigo-800 to-slate-900',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30',
        border: 'border-indigo-200',
        badgeBg: 'bg-indigo-50',
        badgeText: 'text-indigo-700',
        badgeBorder: 'border-indigo-200',
        inputRing: 'focus:ring-indigo-500',
        demoBorder: 'hover:border-indigo-400 hover:bg-indigo-50/50',
        demoBg: 'bg-indigo-50/60 text-indigo-800',
      },
      identifierLabel: 'Nomor Induk Dosen Nasional (NIDN) atau Email Dosen',
      identifierPlaceholder: '0415068201 atau dosen.budi@fiktif-univ.ac.id',
      demoAccounts: [
        {
          id: 'usr-dosen-1',
          name: 'Dr. Budi Santoso, S.T., M.T.',
          identifier: '0415068201',
          email: 'dosen.budi@fiktif-univ.ac.id',
          info: 'Dosen Teknik Informatika (Pemrograman Web)',
        },
        {
          id: 'usr-dosen-2',
          name: 'Siti Aminah, S.Kom., M.Cs.',
          identifier: '0422088502',
          email: 'dosen.siti@fiktif-univ.ac.id',
          info: 'Dosen Sistem Informasi (Basis Data Terdistribusi)',
        },
      ],
    },

    ADMIN: {
      role: 'ADMIN',
      title: 'Portal Administrator (Admin Console)',
      subtitle: 'Kelola master data civitas, akun pengguna (RBAC), prodi, dan pengaturan sistem.',
      badge: 'SUPER ADMIN',
      icon: <ShieldCheck className="w-5 h-5" />,
      themeColor: {
        tabActive: 'bg-rose-600 text-white shadow-md shadow-rose-600/20',
        tabInactive: 'text-slate-600 hover:text-rose-700 hover:bg-rose-50',
        gradient: 'from-slate-950 via-rose-950 to-slate-900',
        button: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30',
        border: 'border-rose-200',
        badgeBg: 'bg-rose-50',
        badgeText: 'text-rose-700',
        badgeBorder: 'border-rose-200',
        inputRing: 'focus:ring-rose-500',
        demoBorder: 'hover:border-rose-400 hover:bg-rose-50/50',
        demoBg: 'bg-rose-50/60 text-rose-800',
      },
      identifierLabel: 'Nomor Induk Pegawai (NIP) atau Email Administrator',
      identifierPlaceholder: '198503142010121001 atau admin@fiktif-univ.ac.id',
      demoAccounts: [
        {
          id: 'usr-admin-1',
          name: 'Ir. Hendra Pratama, M.Kom',
          identifier: '198503142010121001',
          email: 'admin@fiktif-univ.ac.id',
          info: 'Biro Administrasi Akademik & TI (Akses Penuh)',
        },
      ],
    },
  };

  const currentConfig = roleConfigs[activeRole];

  const handleRoleTabChange = (role: Role) => {
    setActiveRole(role);
    setErrorMessage(null);
    setIdentifierInput('');
  };

  const handleQuickDemoPick = (accountId: string) => {
    switchUserById(accountId);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifierInput.trim()) {
      setErrorMessage(`Silakan masukkan ${currentConfig.identifierLabel}.`);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = login(identifierInput.trim(), activeRole);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(
          result.message ||
            `Kredensial tidak cocok untuk role ${activeRole}. Silakan periksa kembali atau gunakan tombol Quick Demo.`
        );
      } else {
        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-extrabold text-white text-base tracking-tight leading-none">
                Universitas Nusantara Digital
              </p>
              <p className="text-[10px] text-blue-300 font-semibold tracking-wider uppercase mt-1">
                LMS & Academic Portal Terpadu (Fiktif)
              </p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Portal Masuk Civitas Akademika
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Silakan pilih tab peran otentikasi Anda di bawah untuk masuk ke ruang kerja yang sesuai.
          </p>
        </div>

        {/* 3 ROLE SELECTOR TABS */}
        <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 max-w-xl mx-auto grid grid-cols-3 gap-1 shadow-xl">
          {(['MAHASISWA', 'DOSEN', 'ADMIN'] as Role[]).map((r) => {
            const config = roleConfigs[r];
            const isActive = activeRole === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleTabChange(r)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? config.themeColor.tabActive
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {config.icon}
                <span>{r === 'MAHASISWA' ? 'Mahasiswa' : r === 'DOSEN' ? 'Dosen' : 'Admin'}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN LOGIN CARD */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
          
          {/* Left / Top Banner: Role Accent */}
          <div className={`lg:col-span-5 bg-gradient-to-br ${currentConfig.themeColor.gradient} p-8 text-white flex flex-col justify-between relative`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/20">
                {currentConfig.icon}
                <span>{currentConfig.badge}</span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {currentConfig.title}
                </h2>
                <p className="text-xs text-white/80 mt-2 leading-relaxed">
                  {currentConfig.subtitle}
                </p>
              </div>
            </div>

            {/* Quick Demo Selector in Card */}
            <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Masuk Cepat Demo ({activeRole}):
              </p>
              <div className="space-y-2">
                {currentConfig.demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickDemoPick(acc.id)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white group-hover:underline">
                        {acc.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[10px] text-white/70 font-mono mt-0.5">{acc.identifier}</p>
                    <p className="text-[10px] text-white/60 mt-0.5">{acc.info}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    Formulir Masuk {activeRole}
                  </h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${currentConfig.themeColor.badgeBg} ${currentConfig.themeColor.badgeText} ${currentConfig.themeColor.badgeBorder}`}>
                    100% Data Fiktif
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Masukkan identitas yang terdaftar pada sistem akademik.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Gagal Masuk: </strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Identifier Input (NIM / NIDN / NIP) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <IdCard className="w-3.5 h-3.5 text-slate-400" />
                    {currentConfig.identifierLabel} *
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 font-mono">
                    Contoh: {currentConfig.demoAccounts[0]?.identifier}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={currentConfig.identifierPlaceholder}
                    value={identifierInput}
                    onChange={(e) => setIdentifierInput(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 ${currentConfig.themeColor.inputRing} transition`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                    Kata Sandi (Password) *
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Default demo: <code className="bg-slate-100 px-1 py-0.2 rounded font-mono text-slate-600">demo1234</code>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Masukkan kata sandi..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 ${currentConfig.themeColor.inputRing} transition`}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 ${currentConfig.themeColor.button}`}
                >
                  {isLoading ? (
                    <span>Memverifikasi Akun...</span>
                  ) : (
                    <>
                      <span>Masuk Sebagai {activeRole}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Helper Tips */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Butuh bantuan akun demo?
              </span>
              <span>Klik akun pada banner kiri untuk demo instan</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
