export type Role = 'ADMIN' | 'DOSEN' | 'MAHASISWA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  identifier: string; // NIM for Mahasiswa, NIDN for Dosen, NIP for Admin
  avatar?: string;
  department?: string; // Program Studi / Jurusan
  semester?: number; // for Mahasiswa
  phone?: string;
  status: 'Aktif' | 'Cuti' | 'Nonaktif';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  sks: number;
  semester: number;
  lecturerId: string;
  lecturerName: string;
  room: string;
  schedule: string;
  description: string;
  totalStudents: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  title: string;
  description: string;
  deadline: string;
  maxScore: number;
  totalSubmissions?: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle?: string;
  courseId: string;
  courseName?: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  submittedAt: string;
  fileUrl?: string;
  fileName?: string;
  note?: string;
  score?: number | null;
  feedback?: string | null;
  status: 'submitted' | 'graded';
}

export interface ForumComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  createdAt: string;
  comments: ForumComment[];
}

export interface GradeItem {
  id: string;
  studentId: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  sks: number;
  semester: number;
  score: number; // 0-100
  gradeLetter: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  gradePoint: number; // 4.0, 3.7, etc
}
