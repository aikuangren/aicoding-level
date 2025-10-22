import { Animated, Easing } from 'react-native';
import { ANIMATION_DURATION } from './constants';

// 动画工具类
export class AnimationUtils {
  // 淡入动画
  static fadeIn(animatedValue: Animated.Value, duration = ANIMATION_DURATION.normal) {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
  }

  // 淡出动画
  static fadeOut(animatedValue: Animated.Value, duration = ANIMATION_DURATION.normal) {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });
  }

  // 缩放动画
  static scale(
    animatedValue: Animated.Value,
    toValue: number,
    duration = ANIMATION_DURATION.fast
  ) {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    });
  }

  // 弹性缩放动画
  static springScale(animatedValue: Animated.Value, toValue: number) {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  }

  // 滑入动画
  static slideIn(
    animatedValue: Animated.Value,
    fromValue: number,
    duration = ANIMATION_DURATION.normal
  ) {
    animatedValue.setValue(fromValue);
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
  }

  // 滑出动画
  static slideOut(
    animatedValue: Animated.Value,
    toValue: number,
    duration = ANIMATION_DURATION.normal
  ) {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });
  }

  // 旋转动画
  static rotate(animatedValue: Animated.Value, duration = 1000) {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  }

  // 脉冲动画
  static pulse(animatedValue: Animated.Value, minScale = 0.95, maxScale = 1.05) {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: minScale,
          duration: ANIMATION_DURATION.slow,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: maxScale,
          duration: ANIMATION_DURATION.slow,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
  }

  // 摇摆动画
  static shake(animatedValue: Animated.Value, intensity = 10) {
    const shakeAnimation = Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: intensity,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -intensity,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: intensity,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]);

    return shakeAnimation;
  }

  // 组合动画：成功反馈
  static successFeedback(scaleValue: Animated.Value, opacityValue: Animated.Value) {
    return Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: ANIMATION_DURATION.fast,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
    ]);
  }

  // 组合动画：错误反馈
  static errorFeedback(translateValue: Animated.Value, scaleValue: Animated.Value) {
    return Animated.parallel([
      this.shake(translateValue, 10),
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: ANIMATION_DURATION.fast,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: ANIMATION_DURATION.fast,
          useNativeDriver: true,
        }),
      ]),
    ]);
  }

  // 粒子爆炸动画配置
  static particleExplosion() {
    const particles = Array.from({ length: 12 }, () => ({
      scale: new Animated.Value(0),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }));

    const animations = particles.map((particle, index) => {
      const angle = (index * 360) / particles.length;
      const distance = 50 + Math.random() * 30;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;

      return Animated.parallel([
        Animated.timing(particle.scale, {
          toValue: 1,
          duration: ANIMATION_DURATION.fast,
          useNativeDriver: true,
        }),
        Animated.timing(particle.translateX, {
          toValue: x,
          duration: ANIMATION_DURATION.slow,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(particle.translateY, {
          toValue: y,
          duration: ANIMATION_DURATION.slow,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION.slow,
          delay: ANIMATION_DURATION.normal,
          useNativeDriver: true,
        }),
      ]);
    });

    return { particles, animation: Animated.parallel(animations) };
  }

  // 经验值增长动画
  static experienceGain(
    barValue: Animated.Value,
    textValue: Animated.Value,
    targetProgress: number
  ) {
    return Animated.sequence([
      // 先显示文字
      Animated.timing(textValue, {
        toValue: 1,
        duration: ANIMATION_DURATION.fast,
        useNativeDriver: true,
      }),
      // 然后增长进度条
      Animated.timing(barValue, {
        toValue: targetProgress,
        duration: ANIMATION_DURATION.slower,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // 进度条需要改变宽度，不能使用native driver
      }),
      // 最后隐藏文字
      Animated.timing(textValue, {
        toValue: 0,
        duration: ANIMATION_DURATION.normal,
        delay: ANIMATION_DURATION.normal,
        useNativeDriver: true,
      }),
    ]);
  }

  // 页面转场动画
  static pageTransition(
    currentPageValue: Animated.Value,
    nextPageValue: Animated.Value,
    direction: 'left' | 'right' = 'right'
  ) {
    const screenWidth = 400; // 假设屏幕宽度
    const offset = direction === 'right' ? screenWidth : -screenWidth;

    return Animated.parallel([
      // 当前页面滑出
      Animated.timing(currentPageValue, {
        toValue: -offset,
        duration: ANIMATION_DURATION.normal,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      // 新页面滑入
      Animated.timing(nextPageValue, {
        toValue: 0,
        duration: ANIMATION_DURATION.normal,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
  }

  // 升级庆祝动画
  static levelUpCelebration() {
    const scaleValue = new Animated.Value(0);
    const rotateValue = new Animated.Value(0);
    const glowValue = new Animated.Value(0);

    const animation = Animated.sequence([
      // 突然出现
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: ANIMATION_DURATION.fast,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      // 并行执行旋转和发光
      Animated.parallel([
        // 回弹到正常大小
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
        // 旋转效果
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: ANIMATION_DURATION.celebration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // 发光效果
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowValue, {
              toValue: 1,
              duration: ANIMATION_DURATION.slow,
              useNativeDriver: true,
            }),
            Animated.timing(glowValue, {
              toValue: 0,
              duration: ANIMATION_DURATION.slow,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 3 }
        ),
      ]),
    ]);

    return {
      scaleValue,
      rotateValue,
      glowValue,
      animation,
    };
  }
}

// 预设动画配置
export const PRESET_ANIMATIONS = {
  // 按钮点击
  buttonPress: {
    scale: 0.95,
    duration: ANIMATION_DURATION.fast,
  },
  
  // 卡片悬浮
  cardHover: {
    scale: 1.02,
    shadowOpacity: 0.2,
    duration: ANIMATION_DURATION.normal,
  },
  
  // 加载旋转
  loading: {
    rotate: '360deg',
    duration: 1000,
    iterations: -1, // 无限循环
  },
  
  // 通知弹出
  notification: {
    translateY: -100,
    opacity: 1,
    duration: ANIMATION_DURATION.normal,
  },
  
  // 模态窗口
  modal: {
    scale: 1,
    opacity: 1,
    duration: ANIMATION_DURATION.normal,
  },
};