// 触觉反馈工具类
// 注意：实际项目中需要安装 react-native-haptic-feedback

interface HapticOptions {
  enableVibrateFallback?: boolean;
  ignoreAndroidSystemSettings?: boolean;
}

// 触觉反馈类型
export enum HapticFeedbackType {
  LIGHT = 'impactLight',
  MEDIUM = 'impactMedium', 
  HEAVY = 'impactHeavy',
  SUCCESS = 'notificationSuccess',
  WARNING = 'notificationWarning',
  ERROR = 'notificationError',
  SELECTION = 'selection',
}

export class HapticManager {
  private static isEnabled = true;
  
  // 设置触觉反馈开关
  static setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }
  
  // 检查是否启用
  static getEnabled(): boolean {
    return this.isEnabled;
  }
  
  // 轻微震动 - 用于按钮点击、选项切换
  static light(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // 实际项目中使用：
      // import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
      // ReactNativeHapticFeedback.trigger('impactLight', options);
      console.log('Haptic: Light impact');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 中等震动 - 用于错误提示、警告
  static medium(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('impactMedium', options);
      console.log('Haptic: Medium impact');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 重度震动 - 用于重要成就、关卡完成
  static heavy(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('impactHeavy', options);
      console.log('Haptic: Heavy impact');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 成功反馈 - 用于答对题目、完成任务
  static success(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('notificationSuccess', options);
      console.log('Haptic: Success notification');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 警告反馈 - 用于时间警告、注意提示
  static warning(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('notificationWarning', options);
      console.log('Haptic: Warning notification');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 错误反馈 - 用于答错题目、操作失败
  static error(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('notificationError', options);
      console.log('Haptic: Error notification');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 选择反馈 - 用于滑动选择、拖拽操作
  static selection(options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger('selection', options);
      console.log('Haptic: Selection');
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 自定义触觉模式
  static custom(type: HapticFeedbackType, options?: HapticOptions) {
    if (!this.isEnabled) return;
    
    try {
      // ReactNativeHapticFeedback.trigger(type, options);
      console.log(`Haptic: Custom ${type}`);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  // 组合触觉反馈 - 用于复杂交互
  static sequence(types: HapticFeedbackType[], delays: number[] = []) {
    if (!this.isEnabled) return;
    
    types.forEach((type, index) => {
      const delay = delays[index] || 0;
      setTimeout(() => {
        this.custom(type);
      }, delay);
    });
  }
}

// 游戏专用触觉反馈
export class GameHaptics {
  // 答题反馈
  static correctAnswer() {
    HapticManager.success();
  }
  
  static wrongAnswer() {
    HapticManager.error();
  }
  
  // 进度反馈
  static knowledgePointEliminated() {
    // 连续两次轻微震动
    HapticManager.light();
    setTimeout(() => HapticManager.medium(), 100);
  }
  
  static levelComplete() {
    // 成功 + 重度震动组合
    HapticManager.success();
    setTimeout(() => HapticManager.heavy(), 200);
  }
  
  static levelUp() {
    // 升级庆祝组合
    HapticManager.sequence(
      [
        HapticFeedbackType.SUCCESS,
        HapticFeedbackType.HEAVY,
        HapticFeedbackType.MEDIUM,
        HapticFeedbackType.LIGHT,
      ],
      [0, 200, 400, 600]
    );
  }
  
  // 交互反馈
  static buttonPress() {
    HapticManager.light();
  }
  
  static cardSelect() {
    HapticManager.selection();
  }
  
  static pageSwipe() {
    HapticManager.light();
  }
  
  // Boss战反馈
  static bossAppear() {
    HapticManager.sequence(
      [HapticFeedbackType.HEAVY, HapticFeedbackType.HEAVY],
      [0, 150]
    );
  }
  
  static bossAttack() {
    HapticManager.medium();
  }
  
  static bossDefeated() {
    // 胜利庆祝
    HapticManager.sequence(
      [
        HapticFeedbackType.SUCCESS,
        HapticFeedbackType.HEAVY,
        HapticFeedbackType.SUCCESS,
      ],
      [0, 300, 600]
    );
  }
  
  // 时间相关反馈
  static timeWarning() {
    HapticManager.warning();
  }
  
  static timeUp() {
    HapticManager.sequence(
      [HapticFeedbackType.WARNING, HapticFeedbackType.ERROR],
      [0, 100]
    );
  }
  
  // 社交反馈
  static friendRequest() {
    HapticManager.light();
  }
  
  static achievementUnlock() {
    HapticManager.sequence(
      [
        HapticFeedbackType.SUCCESS,
        HapticFeedbackType.MEDIUM,
        HapticFeedbackType.SUCCESS,
      ],
      [0, 150, 300]
    );
  }
  
  static streakBonus() {
    // 连击奖励
    HapticManager.sequence(
      [
        HapticFeedbackType.LIGHT,
        HapticFeedbackType.MEDIUM,
        HapticFeedbackType.HEAVY,
      ],
      [0, 100, 200]
    );
  }
}

// 触觉反馈配置
export const HAPTIC_CONFIG = {
  // 默认选项
  defaultOptions: {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  },
  
  // 游戏事件映射
  gameEvents: {
    BUTTON_PRESS: HapticFeedbackType.LIGHT,
    CARD_SELECT: HapticFeedbackType.SELECTION,
    CORRECT_ANSWER: HapticFeedbackType.SUCCESS,
    WRONG_ANSWER: HapticFeedbackType.ERROR,
    LEVEL_COMPLETE: HapticFeedbackType.HEAVY,
    ACHIEVEMENT_UNLOCK: HapticFeedbackType.SUCCESS,
    TIME_WARNING: HapticFeedbackType.WARNING,
    BOSS_ENCOUNTER: HapticFeedbackType.HEAVY,
  },
  
  // 延迟配置
  delays: {
    SHORT: 50,
    MEDIUM: 100,
    LONG: 200,
    VERY_LONG: 500,
  },
};