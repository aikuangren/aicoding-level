import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from '@/utils/constants';

interface ProgressBarProps {
  progress: number; // 0-1 之间的值
  total?: number; // 总数，用于显示文字
  current?: number; // 当前数，用于显示文字
  height?: number;
  showText?: boolean;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  style?: any;
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
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated, animatedWidth]);

  const progressText = React.useMemo(() => {
    if (total && current !== undefined) {
      return `${current}/${total}`;
    }
    return `${Math.round(progress * 100)}%`;
  }, [progress, total, current]);

  return (
    <View style={[styles.container, style]}>
      {showText && (
        <Text style={styles.text}>{progressText}</Text>
      )}
      <View style={[styles.track, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BORDER_RADIUS.round,
  },
  text: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
});