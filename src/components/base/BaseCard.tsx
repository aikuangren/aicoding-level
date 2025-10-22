import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '@/utils/constants';

interface BaseCardProps {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large' | 'xlarge';
  backgroundColor?: string;
  style?: ViewStyle;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  padding = 'medium',
  shadow = 'small',
  borderRadius = 'large',
  backgroundColor = COLORS.background.primary,
  style,
}) => {
  const cardStyle = [
    styles.base,
    { backgroundColor },
    styles[`padding_${padding}`],
    shadow !== 'none' && SHADOWS[shadow],
    styles[`radius_${borderRadius}`],
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.background.primary,
  },
  
  // 内边距样式
  padding_none: {
    padding: 0,
  },
  padding_small: {
    padding: SPACING.sm,
  },
  padding_medium: {
    padding: SPACING.md,
  },
  padding_large: {
    padding: SPACING.lg,
  },
  
  // 圆角样式
  radius_small: {
    borderRadius: BORDER_RADIUS.sm,
  },
  radius_medium: {
    borderRadius: BORDER_RADIUS.md,
  },
  radius_large: {
    borderRadius: BORDER_RADIUS.lg,
  },
  radius_xlarge: {
    borderRadius: BORDER_RADIUS.xl,
  },
});