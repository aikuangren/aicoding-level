import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BaseCard } from '@/components/base/BaseCard';
import { ProgressBar } from '@/components/game/ProgressBar';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '@/utils/constants';
import { Level } from '@/types';

interface LevelCardProps {
  level: Level;
  onPress: (level: Level) => void;
}

export const LevelCard: React.FC<LevelCardProps> = ({ level, onPress }) => {
  const handlePress = () => {
    if (level.isUnlocked) {
      onPress(level);
    }
  };

  const getCardStyle = () => {
    if (!level.isUnlocked) {
      return styles.locked;
    }
    if (level.isCompleted) {
      return styles.completed;
    }
    return styles.unlocked;
  };

  const getStarColor = (index: number) => {
    return index < level.stars ? COLORS.warning : COLORS.background.secondary;
  };

  const completedKnowledgePoints = level.knowledgePoints.filter(
    kp => kp.status === 'eliminated'
  ).length;

  const progress = level.knowledgePoints.length > 0 
    ? completedKnowledgePoints / level.knowledgePoints.length 
    : 0;

  return (
    <Pressable onPress={handlePress} disabled={!level.isUnlocked}>
      <BaseCard style={[styles.card, getCardStyle()]}>
        <View style={styles.header}>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName} numberOfLines={1}>
              {level.name}
            </Text>
            <Text style={styles.levelDescription} numberOfLines={2}>
              {level.description}
            </Text>
          </View>
          
          {level.type === 'boss' && (
            <View style={styles.bossIndicator}>
              <Text style={styles.bossText}>BOSS</Text>
            </View>
          )}
        </View>

        {level.isUnlocked && (
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              current={completedKnowledgePoints}
              total={level.knowledgePoints.length}
              showText={true}
              height={6}
            />
          </View>
        )}

        {level.isCompleted && (
          <View style={styles.starsContainer}>
            {[1, 2, 3].map((star) => (
              <View
                key={star}
                style={[
                  styles.star,
                  { backgroundColor: getStarColor(star) }
                ]}
              >
                <Text style={styles.starText}>★</Text>
              </View>
            ))}
          </View>
        )}

        {!level.isUnlocked && (
          <View style={styles.lockContainer}>
            <Text style={styles.lockText}>🔒</Text>
          </View>
        )}
      </BaseCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 152,
    height: 152,
    margin: SPACING.xs,
  },
  
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  levelInfo: {
    flex: 1,
  },
  
  levelName: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  
  levelDescription: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
  
  bossIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  bossText: {
    ...TYPOGRAPHY.small,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  
  progressContainer: {
    marginTop: SPACING.sm,
  },
  
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  
  star: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  starText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  
  lockContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
  },
  
  lockText: {
    fontSize: 24,
  },
  
  // 状态样式
  locked: {
    opacity: 0.5,
  },
  
  unlocked: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.md,
  },
  
  completed: {
    borderWidth: 2,
    borderColor: COLORS.success,
    backgroundColor: '#F0F9F0',
    ...SHADOWS.md,
  },
});