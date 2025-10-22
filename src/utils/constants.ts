// 设计规范常量 - 基于DRD文档

// 颜色系统
export const COLORS = {
  // 主色调
  primary: '#4A90F4',
  primaryDark: '#357AE8',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FFCC02',
  
  // 辅助色彩
  purple: '#AF52DE',
  orange: '#FF9500',
  lightBlue: '#5AC8FA',
  lightGreen: '#30D158',
  
  // 中性色彩
  text: {
    primary: '#1C1C1E',
    secondary: '#8E8E93',
    tertiary: '#C7C7CC',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#F8F9FA',
  },
  
  // 深色模式
  dark: {
    background: {
      primary: '#1C1C1E',
      secondary: '#2C2C2E',
      tertiary: '#38383A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#98989D',
      tertiary: '#48484A',
    },
  },
} as const;

// 字体系统
export const TYPOGRAPHY = {
  title1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  title2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;

// 间距系统
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// 圆角系统
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 999,
} as const;

// 阴影系统
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// 动画时长
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
  celebration: 2000,
} as const;

// 游戏配置
export const GAME_CONFIG = {
  // 知识点消除配置
  eliminationThreshold: 3, // 连续答对3次消除
  
  // 经验值配置
  experiencePerPoint: 1, // 每消灭一个知识点的经验
  bonusExperienceMultiplier: 1.5, // 连击奖励倍数
  
  // 等级配置
  levelExperienceBase: 10, // 第1级需要10经验
  levelExperienceMultiplier: 1.5, // 每级递增倍数
  
  // 星级评价
  starThresholds: {
    one: 0.6, // 60%正确率1星
    two: 0.8, // 80%正确率2星  
    three: 0.95, // 95%正确率3星
  },
  
  // 时间配置
  questionTimeLimit: 30000, // 30秒答题时间
  autoNextDelay: 1500, // 答题后1.5秒自动下一题
  
  // Boss战配置
  bossHealthMultiplier: 3, // Boss血量倍数
  bossExperienceBonus: 2, // Boss经验奖励倍数
} as const;

// 音效配置
export const SOUND_CONFIG = {
  // UI音效
  buttonClick: 'button_click.aac',
  pageSwipe: 'page_swipe.aac',
  
  // 游戏音效
  correctAnswer: 'correct_answer.aac',
  wrongAnswer: 'wrong_answer.aac',
  levelComplete: 'level_complete.aac',
  levelUp: 'level_up.aac',
  pointEliminated: 'point_eliminated.aac',
  
  // 背景音乐
  homeMusic: 'home_bg.mp3',
  gameMusic: 'game_bg.mp3',
  bossMusic: 'boss_bg.mp3',
  
  // 默认音量
  defaultMusicVolume: 0.3,
  defaultSoundVolume: 0.7,
} as const;

// 震动配置
export const HAPTIC_CONFIG = {
  light: { type: 'light' as const, duration: 50 },
  medium: { type: 'medium' as const, duration: 100 },
  heavy: { type: 'heavy' as const, duration: 200 },
} as const;

// 屏幕尺寸
export const SCREEN_CONFIG = {
  minTouchTarget: 44, // 最小触摸区域
  tabBarHeight: 83, // 底部导航高度
  headerHeight: 120, // 顶部区域高度
  
  // 断点
  tablet: 768,
  phone: 375,
} as const;

// API配置
export const API_CONFIG = {
  baseUrl: __DEV__ ? 'http://localhost:3000/api' : 'https://api.englishadventure.com',
  timeout: 10000,
  retryAttempts: 3,
} as const;

// 存储Key
export const STORAGE_KEYS = {
  user: '@user',
  settings: '@settings',
  gameProgress: '@gameProgress',
  dailyTasks: '@dailyTasks',
  achievements: '@achievements',
  onboardingCompleted: '@onboardingCompleted',
} as const;

// 错误信息
export const ERROR_MESSAGES = {
  networkError: '网络连接错误，请检查网络设置',
  serverError: '服务器繁忙，请稍后再试',
  invalidInput: '输入内容不正确',
  permissionDenied: '权限不足',
  notFound: '内容未找到',
  timeout: '请求超时，请重试',
} as const;

// 成功信息
export const SUCCESS_MESSAGES = {
  levelCompleted: '恭喜完成关卡！',
  pointEliminated: '知识点消灭成功！',
  achievementUnlocked: '获得新成就！',
  levelUp: '恭喜升级！',
  streakMaintained: '保持连续学习！',
} as const;