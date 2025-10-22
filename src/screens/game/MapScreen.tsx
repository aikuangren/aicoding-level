import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { BaseButton, BaseCard, LevelCard, ProgressBar } from '@/components';
import { COLORS, TYPOGRAPHY, SPACING } from '@/utils/constants';
import { Level } from '@/types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 模拟关卡数据
const mockLevels: Level[] = [
  {
    id: '1',
    name: '字母农场',
    description: '学习26个英文字母',
    grade: 1,
    order: 1,
    type: 'normal',
    isUnlocked: true,
    isCompleted: true,
    stars: 3,
    knowledgePoints: Array.from({ length: 15 }, (_, i) => ({
      id: `1-${i}`,
      word: `word${i}`,
      meaning: `含义${i}`,
      category: 'vocabulary' as const,
      difficulty: 1,
      status: 'eliminated' as const,
      correctCount: 3,
      totalAttempts: 3,
    })),
  },
  {
    id: '2',
    name: '单词王国',
    description: '基础单词学习',
    grade: 1,
    order: 2,
    type: 'normal',
    isUnlocked: true,
    isCompleted: false,
    stars: 0,
    knowledgePoints: Array.from({ length: 20 }, (_, i) => ({
      id: `2-${i}`,
      word: `word${i}`,
      meaning: `含义${i}`,
      category: 'vocabulary' as const,
      difficulty: 1,
      status: i < 8 ? 'eliminated' as const : 'encountered' as const,
      correctCount: i < 8 ? 3 : i < 15 ? 1 : 0,
      totalAttempts: i < 15 ? 2 : 0,
    })),
  },
  {
    id: '3',
    name: '句子花园',
    description: '简单句子练习',
    grade: 1,
    order: 3,
    type: 'normal',
    isUnlocked: true,
    isCompleted: false,
    stars: 0,
    knowledgePoints: Array.from({ length: 18 }, (_, i) => ({
      id: `3-${i}`,
      word: `sentence${i}`,
      meaning: `句子${i}`,
      category: 'grammar' as const,
      difficulty: 2,
      status: 'not_encountered' as const,
      correctCount: 0,
      totalAttempts: 0,
    })),
  },
  {
    id: 'boss-1',
    name: '字母巨龙',
    description: '第一关BOSS挑战',
    grade: 1,
    order: 4,
    type: 'boss',
    isUnlocked: false,
    isCompleted: false,
    stars: 0,
    knowledgePoints: Array.from({ length: 10 }, (_, i) => ({
      id: `boss1-${i}`,
      word: `challenge${i}`,
      meaning: `挑战${i}`,
      category: 'speaking' as const,
      difficulty: 3,
      status: 'not_encountered' as const,
      correctCount: 0,
      totalAttempts: 0,
    })),
  },
];

export const MapScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [showLevelDetail, setShowLevelDetail] = useState(false);

  const handleLevelPress = (level: Level) => {
    if (level.isUnlocked) {
      setSelectedLevel(level);
      setShowLevelDetail(true);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevel) {
      console.log('Start level:', selectedLevel.id);
      // 导航到答题界面
      setShowLevelDetail(false);
    }
  };

  const handleCloseLevelDetail = () => {
    setShowLevelDetail(false);
    setSelectedLevel(null);
  };

  const getOverallProgress = () => {
    const completedLevels = mockLevels.filter(level => level.isCompleted).length;
    return completedLevels / mockLevels.length;
  };

  const getCurrentGrade = () => {
    const currentLevel = mockLevels.find(level => !level.isCompleted && level.isUnlocked);
    return currentLevel?.grade || 1;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* 顶部进度区域 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>第{getCurrentGrade()}年级 - 英语冒险</Text>
        <ProgressBar
          progress={getOverallProgress()}
          current={mockLevels.filter(l => l.isCompleted).length}
          total={mockLevels.length}
          showText={true}
          color={COLORS.success}
          style={styles.overallProgress}
        />
      </View>

      {/* 关卡地图 */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.mapContainer}
        contentContainerStyle={styles.mapContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pathContainer}>
          {mockLevels.map((level, index) => (
            <View key={level.id} style={styles.levelContainer}>
              {/* 路径连接线 */}
              {index > 0 && (
                <View
                  style={[
                    styles.pathLine,
                    {
                      backgroundColor: level.isUnlocked 
                        ? COLORS.success 
                        : COLORS.text.tertiary,
                    },
                  ]}
                />
              )}
              
              {/* 关卡卡片 */}
              <View style={[
                styles.levelWrapper,
                index % 2 === 0 ? styles.levelLeft : styles.levelRight,
              ]}>
                <LevelCard
                  level={level}
                  onPress={handleLevelPress}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 关卡详情弹窗 */}
      <Modal
        visible={showLevelDetail}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseLevelDetail}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLevel && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedLevel.name}</Text>
                  <BaseButton
                    title="✕"
                    size="small"
                    type="secondary"
                    onPress={handleCloseLevelDetail}
                    style={styles.closeButton}
                  />
                </View>
                
                <Text style={styles.modalDescription}>
                  {selectedLevel.description}
                </Text>
                
                <View style={styles.modalStats}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>
                      {selectedLevel.knowledgePoints.length}
                    </Text>
                    <Text style={styles.statLabel}>知识点</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>
                      {selectedLevel.knowledgePoints.filter(kp => kp.status === 'eliminated').length}
                    </Text>
                    <Text style={styles.statLabel}>已消灭</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{selectedLevel.stars}</Text>
                    <Text style={styles.statLabel}>星级</Text>
                  </View>
                </View>
                
                <ProgressBar
                  progress={
                    selectedLevel.knowledgePoints.filter(kp => kp.status === 'eliminated').length /
                    selectedLevel.knowledgePoints.length
                  }
                  current={selectedLevel.knowledgePoints.filter(kp => kp.status === 'eliminated').length}
                  total={selectedLevel.knowledgePoints.length}
                  showText={true}
                  style={styles.modalProgress}
                />
                
                <View style={styles.modalActions}>
                  {selectedLevel.type === 'boss' && (
                    <Text style={styles.bossWarning}>
                      ⚠️ BOSS挑战需要完成前面所有关卡
                    </Text>
                  )}
                  
                  <BaseButton
                    title={selectedLevel.isCompleted ? "重新挑战" : "开始挑战"}
                    type={selectedLevel.type === 'boss' ? 'danger' : 'primary'}
                    fullWidth={true}
                    onPress={handleStartLevel}
                    style={styles.startButton}
                  />
                  
                  {selectedLevel.isCompleted && (
                    <BaseButton
                      title="查看攻略"
                      type="secondary"
                      fullWidth={true}
                      onPress={() => console.log('View guide')}
                      style={styles.guideButton}
                    />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  
  headerTitle: {
    ...TYPOGRAPHY.title3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  overallProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  mapContainer: {
    flex: 1,
  },
  
  mapContent: {
    paddingVertical: SPACING.xl,
    minHeight: screenHeight * 1.5,
  },
  
  pathContainer: {
    alignItems: 'center',
  },
  
  levelContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  
  pathLine: {
    width: 4,
    height: 50,
    marginBottom: SPACING.md,
  },
  
  levelWrapper: {
    position: 'relative',
  },
  
  levelLeft: {
    alignSelf: 'flex-start',
    marginLeft: screenWidth * 0.1,
  },
  
  levelRight: {
    alignSelf: 'flex-end',
    marginRight: screenWidth * 0.1,
  },
  
  // Modal样式
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  
  modalContent: {
    backgroundColor: COLORS.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SPACING.lg,
    maxHeight: '60%',
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  modalTitle: {
    ...TYPOGRAPHY.title2,
    color: COLORS.text.primary,
  },
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  
  modalDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  
  statBox: {
    alignItems: 'center',
  },
  
  statNumber: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    fontWeight: '700',
  },
  
  statLabel: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
  },
  
  modalProgress: {
    marginBottom: SPACING.lg,
  },
  
  modalActions: {
    gap: SPACING.md,
  },
  
  bossWarning: {
    ...TYPOGRAPHY.small,
    color: COLORS.warning,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  startButton: {
    marginBottom: SPACING.sm,
  },
  
  guideButton: {
    // 额外样式
  },
});