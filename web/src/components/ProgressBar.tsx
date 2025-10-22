import React, { useEffect, useState, CSSProperties } from 'react';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from '@/utils/constants';

interface ProgressBarProps {
  progress: number; // 0-1 之间的值
  total?: number;
  current?: number;
  height?: number;
  showText?: boolean;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  style?: CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  current,
  height = 8,
  showText = false,
  color = COLORS.primary,
  backgroundColor = COLORS.background.secondary,
  animated = true,
  style,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated]);

  const progressText = React.useMemo(() => {
    if (total && current !== undefined) {
      return `${current}/${total}`;
    }
    return `${Math.round(progress * 100)}%`;
  }, [progress, total, current]);

  const containerStyle: CSSProperties = {
    width: '100%',
    ...style,
  };

  const trackStyle: CSSProperties = {
    width: '100%',
    height: `${height}px`,
    backgroundColor,
    borderRadius: `${BORDER_RADIUS.round}px`,
    overflow: 'hidden',
    position: 'relative',
  };

  const fillStyle: CSSProperties = {
    height: '100%',
    backgroundColor: color,
    borderRadius: `${BORDER_RADIUS.round}px`,
    width: `${animatedProgress * 100}%`,
    transition: animated ? 'width 0.5s ease-out' : 'none',
  };

  const textStyle: CSSProperties = {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: `${SPACING.xs}px`,
  };

  return (
    <div style={containerStyle}>
      {showText && (
        <div style={textStyle}>{progressText}</div>
      )}
      <div style={trackStyle}>
        <div style={fillStyle} />
      </div>
    </div>
  );
};