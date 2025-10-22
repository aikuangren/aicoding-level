import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS } from '@/utils/constants';

interface AvatarProps {
  source?: { uri: string } | number;
  size?: 'small' | 'medium' | 'large';
  level?: number;
  showLevel?: boolean;
  username?: string;
  style?: any;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
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

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: config.size,
            height: config.size,
            borderRadius: config.size / 2,
            borderColor: getLevelColor(level),
          },
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={[
              styles.image,
              {
                width: config.size - 4,
                height: config.size - 4,
                borderRadius: (config.size - 4) / 2,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              {
                width: config.size - 4,
                height: config.size - 4,
                borderRadius: (config.size - 4) / 2,
              },
            ]}
          >
            <Text
              style={[
                styles.placeholderText,
                { fontSize: config.fontSize },
              ]}
            >
              {getInitials(username)}
            </Text>
          </View>
        )}
      </View>

      {showLevel && level && (
        <View
          style={[
            styles.levelBadge,
            {
              backgroundColor: getLevelColor(level),
              width: config.levelSize,
              height: config.levelSize,
              borderRadius: config.levelSize / 2,
              right: -2,
              bottom: -2,
            },
          ]}
        >
          <Text style={[styles.levelText, { fontSize: config.levelSize * 0.5 }]}>
            {level}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  
  avatar: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
  },
  
  image: {
    backgroundColor: COLORS.background.secondary,
  },
  
  placeholder: {
    backgroundColor: COLORS.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  placeholderText: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.secondary,
  },
  
  levelBadge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background.primary,
  },
  
  levelText: {
    ...TYPOGRAPHY.small,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});