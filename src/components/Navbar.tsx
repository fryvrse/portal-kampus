'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/types';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  RotateCcw,
  BookOpen,
  Bell
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, users, switchUserById, switchRoleDemo, resetAllData, logout } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMIN
          </span>
        );
      case 'DOSEN':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
            <UserCheck className="w-3.5 h-3.5" />
            DOSEN
          </span>
        );
      case 'MAHASISWA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <GraduationCap className="w-3.5 h-3.5" />
            MAHASISWA
          </span>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Campus Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Nusantara<span className="text-blue-600">Cyber</span>
                </span>
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                  LMS & ACADEMIC
                </span>
              </div>
              <p className="text-xs text-slate-500 -mt-0.5">Universitas Nusantara Digital (Fiktif)</p>
            </div>
          </div>

          {/* Quick Demo Switcher Toolbar */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <span className="text-xs font-medium text-slate-500 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Switch Role:
            </span>
            <button
              onClick={() => switchRoleDemo('ADMIN')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentUser?.role === 'ADMIN'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => switchRoleDemo('DOSEN')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentUser?.role === 'DOSEN'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Dosen
            </button>
            <button
              onClick={() => switchRoleDemo('MAHASISWA')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentUser?.role === 'MAHASISWA'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Mahasiswa
            </button>
          </div>

          {/* Right Section: User Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* Reset data demo button */}
            <button
              onClick={() => {
                if (confirm('Reset seluruh data ke konfigurasi awal seed?')) {
                  resetAllData();
                }
              }}
              title="Reset Data Awal Demo"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Notification Indicator */}
            <div className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
            </div>

            {/* Active User Dropdown */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[140px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[140px]">
                      {currentUser.identifier}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Masuk Sebagai
                        </span>
                        {getRoleBadge(currentUser.role)}
                      </div>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{currentUser.identifier}</p>
                    </div>

                    {/* Switch User List */}
                    <div className="px-3 py-2">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                        Ganti Akun Demo:
                      </p>
                      <div className="space-y-1 max-h-56 overflow-y-auto">
                        {users.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUserById(u.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between text-xs transition ${
                              u.id === currentUser.id
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <p className="truncate font-medium">{u.name}</p>
                              <p className="text-[10px] text-slate-400">{u.identifier}</p>
                            </div>
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600 shrink-0">
                              {u.role}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1 px-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold transition"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        Keluar Akun (Logout)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
