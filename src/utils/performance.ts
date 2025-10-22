// 性能监控和优化工具类

import { InteractionManager, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export class PerformanceManager {
  private static memoryWarningThreshold = 150; // MB
  private static fpsTarget = 60;
  private static startupTime = Date.now();
  
  // 启动时间监控
  static getStartupTime(): number {
    return Date.now() - this.startupTime;
  }
  
  // 标记启动完成
  static markStartupComplete(): void {
    const startupTime = this.getStartupTime();
    console.log(`App startup completed in ${startupTime}ms`);
    
    if (startupTime > 3000) {
      console.warn('Startup time exceeds 3 seconds, consider optimization');
    }
  }
  
  // 内存使用监控
  static async checkMemoryUsage(): Promise<number> {
    try {
      // 在实际项目中，可以使用第三方库获取内存使用情况
      // 这里使用模拟数据
      const memoryUsage = Math.random() * 200; // 模拟内存使用
      
      if (memoryUsage > this.memoryWarningThreshold) {
        console.warn(`High memory usage detected: ${memoryUsage.toFixed(2)}MB`);
        this.triggerMemoryCleanup();
      }
      
      return memoryUsage;
    } catch (error) {
      console.error('Error checking memory usage:', error);
      return 0;
    }
  }
  
  // 触发内存清理
  static triggerMemoryCleanup(): void {
    console.log('Triggering memory cleanup...');
    
    // 清理图片缓存
    this.clearImageCache();
    
    // 清理音效缓存
    this.clearSoundCache();
    
    // 强制垃圾回收 (实际环境中可能不可用)
    if (global.gc) {
      global.gc();
    }
  }
  
  // 图片缓存清理
  static clearImageCache(): void {
    // 实际项目中可以清理 Image 组件的缓存
    console.log('Clearing image cache...');
  }
  
  // 音效缓存清理
  static clearSoundCache(): void {
    // 清理不常用的音效文件
    console.log('Clearing sound cache...');
  }
  
  // FPS监控
  static startFPSMonitoring(): void {
    let frameCount = 0;
    let lastTime = Date.now();
    
    const trackFPS = () => {
      frameCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        if (fps < this.fpsTarget * 0.8) {
          console.warn(`Low FPS detected: ${fps}fps`);
        }
        
        // 在开发模式下记录FPS
        if (__DEV__) {
          console.log(`Current FPS: ${fps}`);
        }
      }
      
      requestAnimationFrame(trackFPS);
    };
    
    requestAnimationFrame(trackFPS);
  }
  
  // 延迟执行非关键操作
  static executeAfterInteractions(callback: () => void): void {
    InteractionManager.runAfterInteractions(callback);
  }
  
  // 分批处理大量数据
  static async processBatch<T>(
    items: T[],
    processor: (item: T) => void,
    batchSize = 10,
    delayMs = 16
  ): Promise<void> {
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      batch.forEach(processor);
      
      // 让出主线程，防止阻塞UI
      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  
  // 节流函数
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return ((...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }) as T;
  }
  
  // 防抖函数
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return ((...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }) as T;
  }
}

// 图片优化工具
export class ImageOptimizer {
  // 根据屏幕密度选择合适的图片
  static getOptimalImageSize(baseSize: number): number {
    const pixelRatio = 2; // 简化处理，实际应使用 PixelRatio.get()
    return baseSize * pixelRatio;
  }
  
  // 计算图片压缩质量
  static getCompressionQuality(imageSize: number): number {
    if (imageSize < 100 * 1024) { // 小于100KB
      return 0.9;
    } else if (imageSize < 500 * 1024) { // 小于500KB
      return 0.8;
    } else {
      return 0.7;
    }
  }
  
  // 预加载关键图片
  static preloadImages(imageUris: string[]): Promise<void[]> {
    const promises = imageUris.map(uri => {
      return new Promise<void>((resolve, reject) => {
        // 实际项目中使用 Image.prefetch(uri)
        console.log(`Preloading image: ${uri}`);
        setTimeout(() => resolve(), 100); // 模拟加载时间
      });
    });
    
    return Promise.all(promises);
  }
}

// 动画性能优化
export class AnimationOptimizer {
  // 检查是否应该启用动画
  static shouldEnableAnimations(): boolean {
    // 检查设备性能和用户设置
    const isLowEndDevice = this.isLowEndDevice();
    const userPreference = true; // 从设置中获取
    
    return !isLowEndDevice && userPreference;
  }
  
  // 检查是否为低端设备
  static isLowEndDevice(): boolean {
    // 简化判断逻辑，实际应该检查更多硬件信息
    const totalPixels = screenWidth * screenHeight;
    const isSmallScreen = totalPixels < 1920 * 1080;
    
    return isSmallScreen;
  }
  
  // 获取优化的动画配置
  static getOptimizedAnimationConfig() {
    const isLowEnd = this.isLowEndDevice();
    
    return {
      useNativeDriver: true,
      duration: isLowEnd ? 200 : 300,
      enableGPUAcceleration: !isLowEnd,
      maxConcurrentAnimations: isLowEnd ? 2 : 4,
    };
  }
  
  // 动画队列管理
  private static animationQueue: (() => void)[] = [];
  private static runningAnimations = 0;
  private static maxConcurrentAnimations = 3;
  
  static queueAnimation(animationFn: () => void): void {
    if (this.runningAnimations < this.maxConcurrentAnimations) {
      this.runningAnimations++;
      animationFn();
      
      // 动画完成后的清理
      setTimeout(() => {
        this.runningAnimations--;
        this.processQueue();
      }, 500); // 假设动画时长
    } else {
      this.animationQueue.push(animationFn);
    }
  }
  
  private static processQueue(): void {
    if (this.animationQueue.length > 0 && this.runningAnimations < this.maxConcurrentAnimations) {
      const nextAnimation = this.animationQueue.shift();
      if (nextAnimation) {
        this.queueAnimation(nextAnimation);
      }
    }
  }
}

// 数据优化工具
export class DataOptimizer {
  // 虚拟列表配置
  static getVirtualListConfig(itemCount: number) {
    const windowSize = Math.min(itemCount, 10);
    const initialNumToRender = Math.min(itemCount, 5);
    
    return {
      windowSize,
      initialNumToRender,
      maxToRenderPerBatch: 5,
      updateCellsBatchingPeriod: 50,
      removeClippedSubviews: true,
      getItemLayout: (data: any, index: number) => ({
        length: 80, // 假设每项高度
        offset: 80 * index,
        index,
      }),
    };
  }
  
  // 数据缓存策略
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  static setCache(key: string, data: any, ttlMs = 300000): void { // 5分钟默认TTL
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
    
    // 限制缓存大小
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
  
  static getCache(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  static clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// 性能监控配置
export const PERFORMANCE_CONFIG = {
  // 监控阈值
  thresholds: {
    startupTime: 3000, // 3秒
    memoryUsage: 150, // 150MB
    minFPS: 45, // 最低FPS
    imageLoadTime: 2000, // 图片加载时间
  },
  
  // 优化策略
  optimization: {
    enableVirtualList: true,
    enableImageCompression: true,
    enableAnimationQueue: true,
    enableMemoryCleanup: true,
    cacheSize: 100,
    batchSize: 10,
  },
  
  // 调试选项
  debug: {
    logFPS: __DEV__,
    logMemoryUsage: __DEV__,
    logAnimationPerformance: __DEV__,
    showPerformanceOverlay: __DEV__,
  },
};