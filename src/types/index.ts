// 核心类型定义

// 用户相关类型
export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  experience: number;
  experienceToNext: number;
  totalExperience: number;
  streak: number; // 连续学习天数
  gems: number; // 钻石数量
  achievements: Achievement[];
  createdAt: string;
  lastActiveAt: string;
}

// 成就系统
export interface Achievement {
  id: string;
  type: 'progress' | 'skill' | 'challenge';
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
}

// 关卡系统
export interface Level {
  id: string;
  name: string;
  description: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6; // 年级
  order: number;
  type: 'normal' | 'boss';
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: 0 | 1 | 2 | 3;
  knowledgePoints: KnowledgePoint[];
  requirements?: string[]; // 解锁条件
}

// 知识点
export interface KnowledgePoint {
  id: string;
  word: string;
  pronunciation?: string;
  meaning: string;
  example?: string;
  image?: string;
  audio?: string;
  category: 'vocabulary' | 'grammar' | 'listening' | 'speaking';
  difficulty: 1 | 2 | 3 | 4 | 5;
  status: 'not_encountered' | 'encountered' | 'eliminated';
  correctCount: number; // 答对次数
  totalAttempts: number; // 总尝试次数
}

// 题目类型
export interface Question {
  id: string;
  type: 'listening_image' | 'listening_word' | 'listening_sentence' | 'reading_image' | 'word_spelling' | 'sentence_order' | 'speaking_word' | 'speaking_sentence';
  knowledgePointId: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audio?: string;
  image?: string;
  hints?: string[];
  explanation?: string;
}

// 答题会话
export interface QuizSession {
  id: string;
  levelId: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startTime: string;
  endTime?: string;
  score: number;
  accuracy: number;
  stars: 0 | 1 | 2 | 3;
  experienceGained: number;
  isCompleted: boolean;
}

// 答题记录
export interface QuizAnswer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  timeSpent: number; // 毫秒
  attempts: number;
  hintsUsed: number;
}

// 每日任务
export interface DailyTask {
  id: string;
  type: 'complete_levels' | 'eliminate_points' | 'daily_streak' | 'social_battle';
  title: string;
  description: string;
  target: number;
  progress: number;
  isCompleted: boolean;
  reward: {
    experience: number;
    gems?: number;
    achievement?: string;
  };
  expiresAt: string;
}

// 社交功能
export interface Friend {
  id: string;
  username: string;
  avatar: string;
  level: number;
  isOnline: boolean;
  lastActive: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'username' | 'avatar' | 'level'>;
  score: number;
  period: 'weekly' | 'monthly' | 'all_time';
}

// 应用状态
export interface AppState {
  user: User | null;
  currentLevel: Level | null;
  quizSession: QuizSession | null;
  dailyTasks: DailyTask[];
  friends: Friend[];
  leaderboard: LeaderboardEntry[];
  settings: AppSettings;
  loading: boolean;
  error: string | null;
}

// 应用设置
export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  hapticEnabled: boolean;
  musicVolume: number; // 0-1
  soundVolume: number; // 0-1
  theme: 'light' | 'dark' | 'auto';
  language: 'zh' | 'en';
  parentalControls: {
    enabled: boolean;
    dailyTimeLimit: number; // 分钟
    bedtimeStart?: string; // HH:mm
    bedtimeEnd?: string; // HH:mm
  };
}

// 导航类型
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  Quiz: { levelId: string };
  Result: { sessionId: string };
  LevelDetail: { levelId: string };
  Profile: undefined;
  Settings: undefined;
  Achievements: undefined;
  Leaderboard: undefined;
  Friends: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Social: undefined;
  Profile: undefined;
};

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 游戏化元素
export interface GameElement {
  type: 'particle' | 'animation' | 'sound';
  trigger: 'correct' | 'wrong' | 'levelup' | 'achievement';
  config: any;
}

// 统计数据
export interface UserStats {
  totalPlayTime: number; // 分钟
  levelsCompleted: number;
  knowledgePointsEliminated: number;
  averageAccuracy: number;
  longestStreak: number;
  favoriteCategory: string;
  weeklyProgress: {
    date: string;
    experience: number;
    timeSpent: number;
  }[];
}