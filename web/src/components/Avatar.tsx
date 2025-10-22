import React, { CSSProperties } from 'react';
import { COLORS, TYPOGRAPHY } from '@/utils/constants';

interface AvatarProps {
  src?: string;
  size?: 'small' | 'medium' | 'large';
  level?: number;
  showLevel?: boolean;
  username?: string;
  style?: CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 'medium',
  level,
  showLevel = false,
  username,
  style,
}) => {
  const sizeConfig = {
    small: { size: 40, fontSize: 16, levelSize: 18 },
    medium: { size: 60, fontSize: 24, levelSize: 20 },
    large: { size: 80, fontSize: 32, levelSize: 24 },
  };

  const config = sizeConfig[size];

  const getLevelColor = (level?: number) => {
    if (!level) return COLORS.text.secondary;
    
    if (level >= 30) return '#9C27B0'; // 紫色 - 大师
    if (level >= 20) return '#FF9800'; // 橙色 - 专家
    if (level >= 10) return '#4CAF50'; // 绿色 - 进阶
    return COLORS.primary; // 蓝色 - 新手
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.slice(0, 2).toUpperCase();
  };

  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style,
  };

  const avatarStyle: CSSProperties = {
    width: `${config.size}px`,
    height: `${config.size}px`,
    borderRadius: '50%',
    border: `2px solid ${getLevelColor(level)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
    overflow: 'hidden',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  };

  const placeholderStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  };

  const placeholderTextStyle: CSSProperties = {
    fontSize: `${config.fontSize}px`,
    fontWeight: '600',
    color: COLORS.text.secondary,
  };

  const levelBadgeStyle: CSSProperties = {
    position: 'absolute',
    right: '-2px',
    bottom: '-2px',
    width: `${config.levelSize}px`,
    height: `${config.levelSize}px`,
    borderRadius: '50%',
    backgroundColor: getLevelColor(level),
    border: `2px solid ${COLORS.background.primary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const levelTextStyle: CSSProperties = {
    fontSize: `${config.levelSize * 0.5}px`,
    fontWeight: '700',
    color: '#FFFFFF',
  };

  return (
    <div style={containerStyle}>
      <div style={avatarStyle}>
        {src ? (
          <img src={src} alt={username} style={imageStyle} />
        ) : (
          <div style={placeholderStyle}>
            <span style={placeholderTextStyle}>
              {getInitials(username)}
            </span>
          </div>
        )}
      </div>

      {showLevel && level && (
        <div style={levelBadgeStyle}>
          <span style={levelTextStyle}>{level}</span>
        </div>
      )}
    </div>
  );
};