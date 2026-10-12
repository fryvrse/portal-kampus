'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  Printer
} from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const { currentUser, grades } = useApp();

  const myGrades = grades.filter((g) => g.studentId === currentUser?.id);

  const totalSks = myGrades.reduce((acc, curr) => acc + curr.sks, 0);
  const totalQualityPoints = myGrades.reduce((acc, curr) => acc + curr.sks * curr.gradePoint, 0);
  const ipk = totalSks > 0 ? (totalQualityPoints / totalSks).toFixed(2) : '0.00';

  const averageScore = myGrades.length > 0 
    ? (myGrades.reduce((acc, curr) => acc + curr.score, 0) / myGrades.length).toFixed(1)
    : '0';

  const getGradeColor = (letter: string) => {
    if (letter.startsWith('A')) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (letter.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (letter.startsWith('C')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-rose-100 text-rose-800 border-rose-200';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* KHS Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <FileText className="w-3.5 h-3.5" />
              Kartu Hasil Studi (KHS) Resmi Fiktif
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Ringkasan Capaian Prestasi Akademik
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Program Sarjana (S1) • Semester Ganjil 2026/2027
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Cetak Transkrip (PDF)
            </button>
          </div>
        </div>

        {/* Student Meta & IPK Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium">Mahasiswa Terdaftar</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentUser?.name}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">NIM: {currentUser?.identifier}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium">Program Studi</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{currentUser?.department}</p>
            <p className="text-xs text-slate-500 mt-0.5">Semester {currentUser?.semester || 5} (Reguler)</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-semibold">Total SKS Tempuh</p>
              <p className="text-2xl font-black text-blue-950 mt-0.5">{totalSks} SKS</p>
              <p className="text-[11px] text-blue-600">Beban Maks: 24 SKS</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500/40" />
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-100 font-semibold">Indeks Prestasi (IPK)</p>
              <p className="text-3xl font-black tracking-tight mt-0.5">{ipk}</p>
              <p className="text-[11px] text-emerald-100">Predikat: Pujian / Cumlaude</p>
            </div>
            <Award className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </div>

      {/* Tabel KHS */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            Daftar Nilai Mata Kuliah Semester Berjalan
          </h3>
          <span className="text-xs text-slate-500">
            Rata-rata Nilai Angka: <strong className="text-slate-800">{averageScore}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Kode MK</th>
                <th className="px-6 py-3.5">Mata Kuliah</th>
                <th className="px-6 py-3.5 text-center">Beban SKS</th>
                <th className="px-6 py-3.5 text-center">Nilai Angka</th>
                <th className="px-6 py-3.5 text-center">Nilai Huruf</th>
                <th className="px-6 py-3.5 text-center">Bobot Mutu</th>
                <th className="px-6 py-3.5 text-right">Status Kelulusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myGrades.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Belum ada nilai yang tercatat untuk mahasiswa ini.
                  </td>
                </tr>
              ) : (
                myGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-700">
                      {grade.courseCode}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {grade.courseName}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 font-medium">
                      {grade.sks} SKS
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-800">
                      {grade.score}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-black text-xs border ${getGradeColor(grade.gradeLetter)}`}>
                        {grade.gradeLetter}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-slate-700">
                      {grade.gradePoint.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {myGrades.length > 0 && (
              <tfoot className="bg-slate-50 font-bold text-slate-800 border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="px-6 py-3.5 text-right uppercase tracking-wider text-[11px]">
                    Total Kumulatif:
                  </td>
                  <td className="px-6 py-3.5 text-center">{totalSks} SKS</td>
                  <td className="px-6 py-3.5 text-center">{averageScore}</td>
                  <td className="px-6 py-3.5 text-center">-</td>
                  <td className="px-6 py-3.5 text-center font-mono">{totalQualityPoints.toFixed(1)}</td>
                  <td className="px-6 py-3.5 text-right font-black text-emerald-700">
                    IPK: {ipk}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

    </div>
  );
};
