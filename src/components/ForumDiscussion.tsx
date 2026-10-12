'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  MessagesSquare, 
  MessageSquare, 
  Send, 
  PlusCircle, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const ForumDiscussion: React.FC = () => {
  const { currentUser, courses, forumThreads, addForumThread, addForumComment } = useApp();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');
  const [activeThreadId, setActiveThreadId] = useState<string>(forumThreads[0]?.id || '');
  const [commentInput, setCommentInput] = useState<string>('');

  // Modal new thread
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newThreadCourseId, setNewThreadCourseId] = useState(courses[0]?.id || '');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');

  const filteredThreads = forumThreads.filter((th) => {
    return selectedCourseFilter === 'ALL' || th.courseId === selectedCourseFilter;
  });

  const currentThread = forumThreads.find((th) => th.id === activeThreadId) || filteredThreads[0];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !currentThread) return;

    addForumComment(currentThread.id, commentInput.trim());
    setCommentInput('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    addForumThread(newThreadCourseId, newThreadTitle.trim(), newThreadContent.trim());
    setNewThreadTitle('');
    setNewThreadContent('');
    setIsNewThreadOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'DOSEN':
        return <UserCheck className="w-3.5 h-3.5 text-indigo-600" />;
      case 'ADMIN':
        return <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Forum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessagesSquare className="w-5 h-5 text-blue-600" />
            Forum Diskusi Kelas & Akademik
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ruang kolaborasi interaktif antara Dosen dan Mahasiswa per mata kuliah.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">Semua Mata Kuliah</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsNewThreadOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Mulai Diskusi Baru
          </button>
        </div>
      </div>

      {/* Main Forum Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Thread List */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Topik Pembahasan ({filteredThreads.length})
          </p>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredThreads.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
                Belum ada topik diskusi pada mata kuliah ini. Jadilah yang pertama memulai diskusi!
              </div>
            ) : (
              filteredThreads.map((th) => {
                const isSelected = currentThread?.id === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => setActiveThreadId(th.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400/80 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {th.courseName}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(th.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                      {th.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium truncate max-w-[180px]">
                        {getRoleIcon(th.authorRole)}
                        {th.authorName}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[10px] font-semibold">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        {th.comments.length} Balasan
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Thread Detail & Conversation Stream */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col min-h-[580px]">
          {currentThread ? (
            <>
              {/* Thread Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                    {currentThread.courseName}
                  </span>
                  <span className="text-xs text-slate-400">
                    Dibuat {new Date(currentThread.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })} WIB
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {currentThread.title}
                </h3>

                <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                    {getRoleIcon(currentThread.authorRole)}
                    <span className="font-bold text-slate-900">{currentThread.authorName}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">
                      {currentThread.authorRole}
                    </span>
                  </div>
                  {currentThread.content}
                </div>
              </div>

              {/* Comments Stream */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4 max-h-[380px]">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                  <span>Tanggapan & Diskusi ({currentThread.comments.length})</span>
                </div>

                {currentThread.comments.length === 0 ? (
                  <p className="text-center py-6 text-slate-400 text-xs italic">
                    Belum ada komentar. Berikan tanggapan pertama untuk topik ini!
                  </p>
                ) : (
                  currentThread.comments.map((cm) => (
                    <div key={cm.id} className="flex gap-3 text-xs">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-600 text-xs">
                        {cm.authorName.charAt(0)}
                      </div>
                      <div className="flex-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{cm.authorName}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-white border border-slate-200 text-slate-600">
                              {cm.authorRole}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(cm.createdAt).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed mt-1">{cm.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Comment Input Box */}
              <form onSubmit={handleSendComment} className="p-4 border-t border-slate-100 bg-slate-50/60 flex gap-2">
                <input
                  type="text"
                  required
                  placeholder={`Ketik balasan sebagai ${currentUser?.name}...`}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 text-xs">
              Pilih salah satu topik diskusi dari panel kiri.
            </div>
          )}
        </div>

      </div>

      {/* Modal Thread Baru */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                Buka Topik Diskusi Baru
              </h3>
              <button
                onClick={() => setIsNewThreadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mata Kuliah *
                </label>
                <select
                  value={newThreadCourseId}
                  onChange={(e) => setNewThreadCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Pertanyaan / Bahasan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Diskusi Penanganan Error Boundary di React..."
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Pertanyaan / Penjelasan *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan pertanyaan Anda secara mendalam agar dosen dan mahasiswa lain dapat merespons..."
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition"
                >
                  Publikasikan Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
