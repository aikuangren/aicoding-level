import React, { CSSProperties } from 'react';
import { BaseButton } from '@/components/BaseButton';
import { BaseCard } from '@/components/BaseCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Avatar } from '@/components/Avatar';
import { COLORS, TYPOGRAPHY, SPACING } from '@/utils/constants';

// 模拟数据
const mockUser = {
  id: '1',
  username: '小明',
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
    icon: '🎯',
  },
  {
    id: '2',
    title: '消灭20个知识点',
    description: '积累学习成果',
    progress: 15,
    target: 20,
    icon: '⚡',
  },
];

export const HomeScreen: React.FC = () => {
  const handleAction = (action: string) => {
    alert(`${action} 功能开发中...`);
  };

  const containerStyle: CSSProperties = {
    minHeight: '100vh',
    backgroundColor: COLORS.background.secondary,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const headerStyle: CSSProperties = {
    height: '120px',
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${SPACING.md}px`,
    color: '#FFFFFF',
  };

  const userInfoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  };

  const userDetailsStyle: CSSProperties = {
    marginLeft: `${SPACING.md}px`,
    flex: 1,
  };

  const usernameStyle: CSSProperties = {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
    marginBottom: `${SPACING.xs}px`,
  };

  const levelTextStyle: CSSProperties = {
    ...TYPOGRAPHY.small,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: `${SPACING.xs}px`,
  };

  const headerActionsStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${SPACING.sm}px`,
  };

  const statBadgeStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: `${SPACING.xs}px ${SPACING.sm}px`,
    borderRadius: '16px',
    gap: `${SPACING.xs}px`,
  };

  const statTextStyle: CSSProperties = {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
  };

  const contentStyle: CSSProperties = {
    padding: `${SPACING.md}px`,
  };

  const sectionTitleStyle: CSSProperties = {
    ...TYPOGRAPHY.title3,
    color: COLORS.text.primary,
    marginBottom: `${SPACING.md}px`,
  };

  const taskItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: `${SPACING.md}px`,
  };

  const taskIconStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: COLORS.background.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: `${SPACING.md}px`,
    fontSize: '20px',
  };

  const taskInfoStyle: CSSProperties = {
    flex: 1,
  };

  const taskTitleStyle: CSSProperties = {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.primary,
    marginBottom: `${SPACING.xs}px`,
  };

  const taskDescriptionStyle: CSSProperties = {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    marginBottom: `${SPACING.xs}px`,
  };

  const quickActionsStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: `${SPACING.md}px`,
    marginBottom: `${SPACING.lg}px`,
  };

  const actionCardStyle: CSSProperties = {
    alignItems: 'center',
    padding: `${SPACING.lg}px`,
    textAlign: 'center',
  };

  const actionIconStyle: CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: COLORS.background.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto ${SPACING.md}px`,
    fontSize: '24px',
  };

  const actionTitleStyle: CSSProperties = {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text.primary,
    marginBottom: `${SPACING.xs}px`,
  };

  const actionSubtitleStyle: CSSProperties = {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
    marginBottom: `${SPACING.md}px`,
  };

  const statsRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const statItemStyle: CSSProperties = {
    textAlign: 'center',
  };

  const statValueStyle: CSSProperties = {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: `${SPACING.xs}px`,
  };

  const statLabelStyle: CSSProperties = {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
  };

  return (
    <div style={containerStyle}>
      {/* 顶部用户信息区域 */}
      <div style={headerStyle}>
        <div style={userInfoStyle}>
          <Avatar
            username={mockUser.username}
            level={mockUser.level}
            showLevel={true}
            size="medium"
          />
          <div style={userDetailsStyle}>
            <div style={usernameStyle}>{mockUser.username}</div>
            <div style={levelTextStyle}>
              Lv.{mockUser.level} ({mockUser.experience}/{mockUser.experienceToNext})
            </div>
            <ProgressBar
              progress={mockUser.experience / mockUser.experienceToNext}
              height={6}
              style={{ maxWidth: '120px' }}
            />
          </div>
        </div>
        
        <div style={headerActionsStyle}>
          <div style={statBadgeStyle}>
            <span>🔥</span>
            <span style={statTextStyle}>{mockUser.streak}</span>
          </div>
          <div style={statBadgeStyle}>
            <span>💎</span>
            <span style={statTextStyle}>{mockUser.gems}</span>
          </div>
          <BaseButton
            title="⚙️"
            size="small"
            type="secondary"
            onClick={() => handleAction('设置')}
            style={{ width: '40px', height: '40px', padding: '0' }}
          />
        </div>
      </div>

      <div style={contentStyle}>
        {/* 每日任务卡片 */}
        <BaseCard style={{ marginBottom: `${SPACING.lg}px` }}>
          <div style={sectionTitleStyle}>每日任务</div>
          {mockDailyTasks.map((task) => (
            <div key={task.id} style={taskItemStyle}>
              <div style={taskIconStyle}>
                <span>{task.icon}</span>
              </div>
              <div style={taskInfoStyle}>
                <div style={taskTitleStyle}>{task.title}</div>
                <div style={taskDescriptionStyle}>{task.description}</div>
                <ProgressBar
                  progress={task.progress / task.target}
                  current={task.progress}
                  total={task.target}
                  showText={true}
                  height={4}
                />
              </div>
              <div style={{ color: COLORS.success, fontSize: TYPOGRAPHY.small.fontSize }}>
                +10💎
              </div>
            </div>
          ))}
        </BaseCard>

        {/* 快速入口区域 */}
        <div style={quickActionsStyle}>
          <BaseCard style={actionCardStyle} onClick={() => handleAction('继续学习')}>
            <div style={actionIconStyle}>
              <span>▶️</span>
            </div>
            <div style={actionTitleStyle}>继续学习</div>
            <div style={actionSubtitleStyle}>第3关 进行中</div>
            <BaseButton
              title="开始"
              size="small"
              onClick={() => handleAction('继续学习')}
              style={{ width: '100%' }}
            />
          </BaseCard>

          <BaseCard style={actionCardStyle} onClick={() => handleAction('每日挑战')}>
            <div style={actionIconStyle}>
              <span>⚡</span>
            </div>
            <div style={actionTitleStyle}>每日挑战</div>
            <div style={actionSubtitleStyle}>限时答题</div>
            <BaseButton
              title="挑战"
              size="small"
              onClick={() => handleAction('每日挑战')}
              style={{ width: '100%', backgroundColor: COLORS.warning }}
            />
          </BaseCard>

          <BaseCard style={actionCardStyle} onClick={() => handleAction('好友PK')}>
            <div style={actionIconStyle}>
              <span>⚔️</span>
            </div>
            <div style={actionTitleStyle}>好友PK</div>
            <div style={actionSubtitleStyle}>邀请好友</div>
            <BaseButton
              title="对战"
              size="small"
              type="secondary"
              onClick={() => handleAction('好友PK')}
              style={{ width: '100%' }}
            />
          </BaseCard>

          <BaseCard style={actionCardStyle} onClick={() => handleAction('我的成就')}>
            <div style={actionIconStyle}>
              <span>🏆</span>
            </div>
            <div style={actionTitleStyle}>我的成就</div>
            <div style={actionSubtitleStyle}>查看徽章</div>
            <BaseButton
              title="查看"
              size="small"
              onClick={() => handleAction('我的成就')}
              style={{ width: '100%', backgroundColor: COLORS.success }}
            />
          </BaseCard>
        </div>

        {/* 学习统计 */}
        <BaseCard>
          <div style={sectionTitleStyle}>今日学习</div>
          <div style={statsRowStyle}>
            <div style={statItemStyle}>
              <div style={statValueStyle}>25</div>
              <div style={statLabelStyle}>分钟</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle}>15</div>
              <div style={statLabelStyle}>知识点</div>
            </div>
            <div style={statItemStyle}>
              <div style={statValueStyle}>92%</div>
              <div style={statLabelStyle}>正确率</div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};