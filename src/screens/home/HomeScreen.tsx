import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BaseButton, BaseCard, ProgressBar, Avatar } from '@/components';
import { COLORS, TYPOGRAPHY, SPACING, SCREEN_CONFIG } from '@/utils/constants';

// 模拟数据 - 实际项目中会从Redux store获取
const mockUser = {
  id: '1',
  username: '小明',
  avatar: '',
  level: 5,
  experience: 120,
  experienceToNext: 200,
  streak: 7,
  gems: 150,
};

const mockDailyTasks = [
  {
    id: '1',
    title: '完成3个关卡',
    description: '今日学习目标',
    progress: 2,
    target: 3,
    isCompleted: false,
    icon: '🎯',
  },
  {
    id: '2',
    title: '消灭20个知识点',
    description: '积累学习成果',
    progress: 15,
    target: 20,
    isCompleted: false,
    icon: '⚡',
  },
];

export const HomeScreen: React.FC = () => {
  const handleContinueLearning = () => {
    // 导航到关卡地图
    console.log('Continue Learning');
  };

  const handleDailyChallenge = () => {
    // 开始每日挑战
    console.log('Daily Challenge');
  };

  const handleFriendsBattle = () => {
    // 好友对战
    console.log('Friends Battle');
  };

  const handleAchievements = () => {
    // 查看成就
    console.log('Achievements');
  };

  const handleSettings = () => {
    // 打开设置
    console.log('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* 顶部用户信息区域 */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            username={mockUser.username}
            level={mockUser.level}
            showLevel={true}
            size="medium"
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{mockUser.username}</Text>
            <Text style={styles.levelText}>
              Lv.{mockUser.level} ({mockUser.experience}/{mockUser.experienceToNext})
            </Text>
            <ProgressBar
              progress={mockUser.experience / mockUser.experienceToNext}
              height={6}
              style={styles.experienceBar}
            />
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>{mockUser.streak}</Text>
          </View>
          <View style={styles.gemsContainer}>
            <Text style={styles.gemsEmoji}>💎</Text>
            <Text style={styles.gemsText}>{mockUser.gems}</Text>
          </View>
          <BaseButton
            title="⚙️"
            size="small"
            type="secondary"
            onPress={handleSettings}
            style={styles.settingsButton}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 每日任务卡片 */}
        <BaseCard style={styles.dailyTasksCard}>
          <Text style={styles.sectionTitle}>每日任务</Text>
          {mockDailyTasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <View style={styles.taskIcon}>
                <Text style={styles.taskEmoji}>{task.icon}</Text>
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <ProgressBar
                  progress={task.progress / task.target}
                  current={task.progress}
                  total={task.target}
                  showText={true}
                  height={4}
                  style={styles.taskProgress}
                />
              </View>
              <View style={styles.taskReward}>
                <Text style={styles.rewardText}>+10💎</Text>
              </View>
            </View>
          ))}
        </BaseCard>

        {/* 快速入口区域 */}
        <View style={styles.quickActions}>
          <BaseCard style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>▶️</Text>
            </View>
            <Text style={styles.actionTitle}>继续学习</Text>
            <Text style={styles.actionSubtitle}>第3关 进行中</Text>
            <BaseButton
              title="开始"
              size="small"
              onPress={handleContinueLearning}
              style={styles.actionButton}
            />
          </BaseCard>

          <BaseCard style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>⚡</Text>
            </View>
            <Text style={styles.actionTitle}>每日挑战</Text>
            <Text style={styles.actionSubtitle}>限时答题</Text>
            <BaseButton
              title="挑战"
              size="small"
              type="warning"
              onPress={handleDailyChallenge}
              style={styles.actionButton}
            />
          </BaseCard>

          <BaseCard style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>⚔️</Text>
            </View>
            <Text style={styles.actionTitle}>好友PK</Text>
            <Text style={styles.actionSubtitle}>邀请好友</Text>
            <BaseButton
              title="对战"
              size="small"
              type="secondary"
              onPress={handleFriendsBattle}
              style={styles.actionButton}
            />
          </BaseCard>

          <BaseCard style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>🏆</Text>
            </View>
            <Text style={styles.actionTitle}>我的成就</Text>
            <Text style={styles.actionSubtitle}>查看徽章</Text>
            <BaseButton
              title="查看"
              size="small"
              type="success"
              onPress={handleAchievements}
              style={styles.actionButton}
            />
          </BaseCard>
        </View>

        {/* 学习统计 */}
        <BaseCard style={styles.statsCard}>
          <Text style={styles.sectionTitle}>今日学习</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>分钟</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>知识点</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>正确率</Text>
            </View>
          </View>
        </BaseCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  
  header: {
    height: SCREEN_CONFIG.headerHeight,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  userDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  
  username: {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
  },
  
  levelText: {
    ...TYPOGRAPHY.small,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: SPACING.xs,
  },
  
  experienceBar: {
    maxWidth: 120,
  },
  
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  
  streakEmoji: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  
  streakText: {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
  },
  
  gemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  
  gemsEmoji: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  
  gemsText: {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
  },
  
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  
  sectionTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  
  dailyTasksCard: {
    marginBottom: SPACING.lg,
  },
  
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  
  taskEmoji: {
    fontSize: 20,
  },
  
  taskInfo: {
    flex: 1,
  },
  
  taskTitle: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.primary,
  },
  
  taskDescription: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  
  taskProgress: {
    marginTop: SPACING.xs,
  },
  
  taskReward: {
    alignItems: 'center',
  },
  
  rewardText: {
    ...TYPOGRAPHY.small,
    color: COLORS.success,
    fontWeight: '600',
  },
  
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  
  actionCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  
  actionEmoji: {
    fontSize: 24,
  },
  
  actionTitle: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  
  actionSubtitle: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  actionButton: {
    width: '100%',
  },
  
  statsCard: {
    marginBottom: SPACING.lg,
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statValue: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    fontWeight: '700',
  },
  
  statLabel: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});