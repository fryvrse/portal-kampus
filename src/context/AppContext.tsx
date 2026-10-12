'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course, Assignment, Submission, ForumThread, GradeItem, Role } from '@/types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_FORUM_THREADS,
  INITIAL_GRADES,
} from '@/data/seedData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchUserById: (userId: string) => void;
  switchRoleDemo: (role: Role) => void;

  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;

  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;

  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;

  forumThreads: ForumThread[];
  addForumThread: (courseId: string, title: string, content: string) => void;
  addForumComment: (threadId: string, content: string) => void;

  grades: GradeItem[];
  login: (identifierOrEmail: string, role: Role) => { success: boolean; message?: string };
  logout: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'portal_kampus_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);
  const [grades, setGrades] = useState<GradeItem[]>(INITIAL_GRADES);

  // Default logged in user: Mahasiswa Faiz
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[3]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY_PREFIX + 'users');
      const savedCourses = localStorage.getItem(STORAGE_KEY_PREFIX + 'courses');
      const savedAssignments = localStorage.getItem(STORAGE_KEY_PREFIX + 'assignments');
      const savedSubmissions = localStorage.getItem(STORAGE_KEY_PREFIX + 'submissions');
      const savedThreads = localStorage.getItem(STORAGE_KEY_PREFIX + 'threads');
      const savedGrades = localStorage.getItem(STORAGE_KEY_PREFIX + 'grades');
      const savedCurrentUserId = localStorage.getItem(STORAGE_KEY_PREFIX + 'current_user_id');

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedCourses) setCourses(JSON.parse(savedCourses));
      if (savedAssignments) setAssignments(JSON.parse(savedAssignments));
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      if (savedThreads) setForumThreads(JSON.parse(savedThreads));
      if (savedGrades) setGrades(JSON.parse(savedGrades));

      if (savedCurrentUserId) {
        const found = (savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS).find(
          (u: User) => u.id === savedCurrentUserId
        );
        if (found) setCurrentUser(found);
      }
    } catch (e) {
      console.warn('Gagal memuat local storage:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'users', JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'courses', JSON.stringify(courses));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'assignments', JSON.stringify(assignments));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'submissions', JSON.stringify(submissions));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'threads', JSON.stringify(forumThreads));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'grades', JSON.stringify(grades));
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_PREFIX + 'current_user_id', currentUser.id);
      }
    } catch (e) {
      console.warn('Gagal menyimpan ke local storage:', e);
    }
  }, [users, courses, assignments, submissions, forumThreads, grades, currentUser]);

  const switchUserById = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const switchRoleDemo = (role: Role) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id: string, updatedFields: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
    }
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser?.id === id) {
      const fallback = users.find((u) => u.id !== id) || null;
      setCurrentUser(fallback);
    }
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `crs-${Date.now()}`,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const addAssignment = (asgData: Omit<Assignment, 'id'>) => {
    const newAsg: Assignment = {
      ...asgData,
      id: `asg-${Date.now()}`,
      totalSubmissions: 0,
    };
    setAssignments((prev) => [newAsg, ...prev]);
  };

  const addSubmission = (data: Omit<Submission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: Submission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };
    setSubmissions((prev) => [newSub, ...prev]);

    // Update assignment submission count
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === data.assignmentId
          ? { ...a, totalSubmissions: (a.totalSubmissions || 0) + 1 }
          : a
      )
    );
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, score, feedback, status: 'graded' as const }
          : s
      )
    );

    // Optional: sync to grades list
    const sub = submissions.find((s) => s.id === submissionId);
    if (sub) {
      const asg = assignments.find((a) => a.id === sub.assignmentId);
      if (asg) {
        // Calculate grade letter
        let gradeLetter: GradeItem['gradeLetter'] = 'C';
        let gradePoint = 2.0;
        if (score >= 85) {
          gradeLetter = 'A';
          gradePoint = 4.0;
        } else if (score >= 80) {
          gradeLetter = 'A-';
          gradePoint = 3.7;
        } else if (score >= 75) {
          gradeLetter = 'B+';
          gradePoint = 3.3;
        } else if (score >= 70) {
          gradeLetter = 'B';
          gradePoint = 3.0;
        } else if (score >= 65) {
          gradeLetter = 'B-';
          gradePoint = 2.7;
        } else if (score >= 60) {
          gradeLetter = 'C+';
          gradePoint = 2.3;
        } else if (score >= 50) {
          gradeLetter = 'D';
          gradePoint = 1.0;
        } else {
          gradeLetter = 'E';
          gradePoint = 0.0;
        }

        setGrades((prev) => {
          const existing = prev.find(
            (g) => g.studentId === sub.studentId && g.courseId === sub.courseId
          );
          if (existing) {
            return prev.map((g) =>
              g.id === existing.id
                ? { ...g, score, gradeLetter, gradePoint }
                : g
            );
          } else {
            return [
              ...prev,
              {
                id: `grd-${Date.now()}`,
                studentId: sub.studentId,
                courseId: sub.courseId,
                courseCode: asg.courseCode,
                courseName: asg.courseName,
                sks: 3,
                semester: 5,
                score,
                gradeLetter,
                gradePoint,
              },
            ];
          }
        });
      }
    }
  };

  const addForumThread = (courseId: string, title: string, content: string) => {
    if (!currentUser) return;
    const course = courses.find((c) => c.id === courseId);
    const newThread: ForumThread = {
      id: `th-${Date.now()}`,
      courseId,
      courseName: course?.name || 'Mata Kuliah',
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setForumThreads((prev) => [newThread, ...prev]);
  };

  const addForumComment = (threadId: string, content: string) => {
    if (!currentUser) return;
    const newComment = {
      id: `cm-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString(),
    };

    setForumThreads((prev) =>
      prev.map((th) =>
        th.id === threadId ? { ...th, comments: [...th.comments, newComment] } : th
      )
    );
  };

  const login = (identifierOrEmail: string, role: Role) => {
    const cleanQuery = identifierOrEmail.trim().toLowerCase();
    const foundUser = users.find(
      (u) =>
        u.role === role &&
        (u.email.toLowerCase() === cleanQuery ||
          u.identifier.toLowerCase().includes(cleanQuery) ||
          u.identifier.toLowerCase().replace(/[^0-9a-z]/g, '').includes(cleanQuery.replace(/[^0-9a-z]/g, '')))
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem(STORAGE_KEY_PREFIX + 'current_user_id', foundUser.id);
      return { success: true };
    }

    return {
      success: false,
      message: `Akun ${role} dengan kredensial "${identifierOrEmail}" tidak ditemukan dalam sistem.`,
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'current_user_id');
  };

  const resetAllData = () => {
    setUsers(INITIAL_USERS);
    setCourses(INITIAL_COURSES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setForumThreads(INITIAL_FORUM_THREADS);
    setGrades(INITIAL_GRADES);
    setCurrentUser(null);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserById,
        switchRoleDemo,
        users,
        addUser,
        updateUser,
        deleteUser,
        courses,
        addCourse,
        assignments,
        addAssignment,
        submissions,
        addSubmission,
        gradeSubmission,
        forumThreads,
        addForumThread,
        addForumComment,
        grades,
        login,
        logout,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
