import React, { CSSProperties } from 'react';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '@/utils/constants';

interface BaseCardProps {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large' | 'xlarge';
  backgroundColor?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  padding = 'medium',
  shadow = 'small',
  borderRadius = 'large',
  backgroundColor = COLORS.background.primary,
  style,
  onClick,
}) => {
  const getCardStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...style,
    };

    // 内边距
    switch (padding) {
      case 'none':
        baseStyle.padding = '0';
        break;
      case 'small':
        baseStyle.padding = `${SPACING.sm}px`;
        break;
      case 'medium':
        baseStyle.padding = `${SPACING.md}px`;
        break;
      case 'large':
        baseStyle.padding = `${SPACING.lg}px`;
        break;
    }

    // 阴影
    if (shadow !== 'none') {
      baseStyle.boxShadow = SHADOWS[shadow];
    }

    // 圆角
    switch (borderRadius) {
      case 'small':
        baseStyle.borderRadius = `${BORDER_RADIUS.sm}px`;
        break;
      case 'medium':
        baseStyle.borderRadius = `${BORDER_RADIUS.md}px`;
        break;
      case 'large':
        baseStyle.borderRadius = `${BORDER_RADIUS.lg}px`;
        break;
      case 'xlarge':
        baseStyle.borderRadius = `${BORDER_RADIUS.xl}px`;
        break;
    }

    // 可点击样式
    if (onClick) {
      baseStyle.cursor = 'pointer';
      baseStyle.transition = 'all 0.2s ease';
    }

    return baseStyle;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = SHADOWS.md;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = shadow !== 'none' ? SHADOWS[shadow] : 'none';
    }
  };

  return (
    <div
      style={getCardStyle()}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};