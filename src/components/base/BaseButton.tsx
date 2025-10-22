import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SHADOWS, ANIMATION_DURATION } from '@/utils/constants';

interface BaseButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  textStyle,
}) => {
  const handlePress = useCallback(() => {
    if (!disabled && !loading) {
      // 触觉反馈在实际项目中通过HapticFeedback添加
      onPress();
    }
  }, [disabled, loading, onPress]);

  const buttonStyle = useMemo(() => {
    const baseStyle = [styles.base, styles[size]];
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    // 根据类型设置样式
    switch (type) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'danger':
        baseStyle.push(styles.danger);
        break;
      case 'success':
        baseStyle.push(styles.success);
        break;
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  }, [type, size, fullWidth, disabled, loading, style]);

  const textStyleComputed = useMemo(() => {
    const baseTextStyle = [styles.text, styles[`${size}Text` as keyof typeof styles]];
    
    switch (type) {
      case 'primary':
      case 'danger':
      case 'success':
        baseTextStyle.push(styles.whiteText);
        break;
      case 'secondary':
        baseTextStyle.push(styles.primaryText);
        break;
    }
    
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }
    
    return baseTextStyle;
  }, [type, size, textStyle]);

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !disabled && !loading && styles.pressed,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.2)',
        borderless: false,
      }}
    >
      {loading ? (
        <ActivityIndicator 
          color={type === 'secondary' ? COLORS.primary : '#FFFFFF'} 
          size="small"
        />
      ) : (
        <Text style={textStyleComputed}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.xxl,
    ...SHADOWS.sm,
  },
  
  // 尺寸样式
  small: {
    height: 40,
    paddingHorizontal: 16,
  },
  medium: {
    height: 56,
    paddingHorizontal: 24,
  },
  large: {
    height: 64,
    paddingHorizontal: 32,
  },
  
  // 宽度样式
  fullWidth: {
    width: '100%',
  },
  
  // 类型样式
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  
  // 状态样式
  disabled: {
    opacity: 0.5,
    ...SHADOWS.sm,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  
  // 文字样式
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  smallText: {
    ...TYPOGRAPHY.caption,
  },
  mediumText: {
    ...TYPOGRAPHY.body,
  },
  largeText: {
    ...TYPOGRAPHY.title3,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  primaryText: {
    color: COLORS.primary,
  },
});