import React, { CSSProperties } from 'react';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '@/utils/constants';

interface BaseButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick: () => void;
  style?: CSSProperties;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  style,
}) => {
  const getButtonStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: `${BORDER_RADIUS.xxl}px`,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      boxShadow: SHADOWS.sm,
      outline: 'none',
      ...style,
    };

    // 尺寸样式
    switch (size) {
      case 'small':
        Object.assign(baseStyle, {
          height: '40px',
          padding: '0 16px',
          fontSize: TYPOGRAPHY.caption.fontSize,
        });
        break;
      case 'medium':
        Object.assign(baseStyle, {
          height: '56px',
          padding: '0 24px',
          fontSize: TYPOGRAPHY.body.fontSize,
        });
        break;
      case 'large':
        Object.assign(baseStyle, {
          height: '64px',
          padding: '0 32px',
          fontSize: TYPOGRAPHY.title3.fontSize,
        });
        break;
    }

    // 宽度样式
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // 类型样式
    switch (type) {
      case 'primary':
        Object.assign(baseStyle, {
          backgroundColor: COLORS.primary,
          color: '#FFFFFF',
        });
        break;
      case 'secondary':
        Object.assign(baseStyle, {
          backgroundColor: COLORS.background.primary,
          color: COLORS.primary,
          border: `2px solid ${COLORS.primary}`,
        });
        break;
      case 'danger':
        Object.assign(baseStyle, {
          backgroundColor: COLORS.error,
          color: '#FFFFFF',
        });
        break;
      case 'success':
        Object.assign(baseStyle, {
          backgroundColor: COLORS.success,
          color: '#FFFFFF',
        });
        break;
    }

    // 禁用状态
    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'scale(0.95)';
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <button
      style={getButtonStyle()}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
    >
      {loading ? (
        <div
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        title
      )}
    </button>
  );
};