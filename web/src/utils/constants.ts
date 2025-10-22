// Web版本的设计常量

export const COLORS = {
  primary: '#4A90F4',
  primaryDark: '#357AE8',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FFCC02',
  
  purple: '#AF52DE',
  orange: '#FF9500',
  lightBlue: '#5AC8FA',
  lightGreen: '#30D158',
  
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
} as const;

export const TYPOGRAPHY = {
  title1: {
    fontSize: '32px',
    fontWeight: '700' as const,
    lineHeight: '40px',
  },
  title2: {
    fontSize: '24px',
    fontWeight: '600' as const,
    lineHeight: '32px',
  },
  title3: {
    fontSize: '20px',
    fontWeight: '600' as const,
    lineHeight: '28px',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400' as const,
    lineHeight: '24px',
  },
  bodyBold: {
    fontSize: '16px',
    fontWeight: '600' as const,
    lineHeight: '24px',
  },
  caption: {
    fontSize: '14px',
    fontWeight: '400' as const,
    lineHeight: '20px',
  },
  small: {
    fontSize: '12px',
    fontWeight: '400' as const,
    lineHeight: '16px',
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 999,
} as const;

export const SHADOWS = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
  celebration: 2000,
} as const;