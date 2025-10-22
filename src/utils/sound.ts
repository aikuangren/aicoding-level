// 音效管理工具类
// 注意：实际项目中需要安装 react-native-sound

interface SoundOptions {
  volume?: number;
  loop?: boolean;
  speed?: number;
}

class SoundInstance {
  private sound: any = null;
  private isLoaded = false;
  
  constructor(private filename: string, private basePath?: string) {}
  
  async load(): Promise<void> {
    try {
      // 实际项目中使用：
      // const Sound = require('react-native-sound');
      // this.sound = new Sound(this.filename, this.basePath, (error) => {
      //   if (error) {
      //     console.log('Failed to load sound', error);
      //     return;
      //   }
      //   this.isLoaded = true;
      // });
      
      // 模拟加载
      this.isLoaded = true;
      console.log(`Sound loaded: ${this.filename}`);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  }
  
  play(options: SoundOptions = {}): void {
    if (!this.isLoaded) {
      console.warn(`Sound not loaded: ${this.filename}`);
      return;
    }
    
    try {
      // 实际项目中使用：
      // if (this.sound) {
      //   this.sound.setVolume(options.volume || 1.0);
      //   this.sound.setSpeed(options.speed || 1.0);
      //   this.sound.setNumberOfLoops(options.loop ? -1 : 0);
      //   this.sound.play();
      // }
      
      console.log(`Playing sound: ${this.filename}`, options);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  
  stop(): void {
    try {
      // if (this.sound) {
      //   this.sound.stop();
      // }
      console.log(`Stopping sound: ${this.filename}`);
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  }
  
  pause(): void {
    try {
      // if (this.sound) {
      //   this.sound.pause();
      // }
      console.log(`Pausing sound: ${this.filename}`);
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  }
  
  setVolume(volume: number): void {
    try {
      // if (this.sound) {
      //   this.sound.setVolume(volume);
      // }
      console.log(`Setting volume for ${this.filename}: ${volume}`);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }
  
  release(): void {
    try {
      // if (this.sound) {
      //   this.sound.release();
      // }
      this.isLoaded = false;
      console.log(`Released sound: ${this.filename}`);
    } catch (error) {
      console.error('Error releasing sound:', error);
    }
  }
}

export class SoundManager {
  private static sounds: Map<string, SoundInstance> = new Map();
  private static musicVolume = 0.3;
  private static soundVolume = 0.7;
  private static isMusicEnabled = true;
  private static isSoundEnabled = true;
  private static currentMusic: SoundInstance | null = null;
  
  // 预加载音效文件
  static async preloadSounds(): Promise<void> {
    const soundFiles = [
      // UI音效
      'button_click.aac',
      'page_swipe.aac',
      'modal_open.aac',
      'modal_close.aac',
      
      // 游戏音效
      'correct_answer.aac',
      'wrong_answer.aac',
      'level_complete.aac',
      'level_up.aac',
      'point_eliminated.aac',
      'boss_appear.aac',
      'boss_attack.aac',
      'boss_defeated.aac',
      'achievement_unlock.aac',
      'streak_bonus.aac',
      'time_warning.aac',
      'time_up.aac',
      
      // 背景音乐
      'home_bg.mp3',
      'game_bg.mp3',
      'boss_bg.mp3',
      'victory_bg.mp3',
    ];
    
    for (const filename of soundFiles) {
      const soundInstance = new SoundInstance(filename, 'sounds');
      await soundInstance.load();
      this.sounds.set(filename, soundInstance);
    }
    
    console.log('All sounds preloaded');
  }
  
  // 播放音效
  static playSound(soundName: string, options: SoundOptions = {}): void {
    if (!this.isSoundEnabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play({
        volume: (options.volume || 1.0) * this.soundVolume,
        ...options,
      });
    } else {
      console.warn(`Sound not found: ${soundName}`);
    }
  }
  
  // 播放背景音乐
  static playMusic(musicName: string, options: SoundOptions = {}): void {
    if (!this.isMusicEnabled) return;
    
    // 停止当前音乐
    if (this.currentMusic) {
      this.currentMusic.stop();
    }
    
    const music = this.sounds.get(musicName);
    if (music) {
      this.currentMusic = music;
      music.play({
        volume: (options.volume || 1.0) * this.musicVolume,
        loop: true,
        ...options,
      });
    } else {
      console.warn(`Music not found: ${musicName}`);
    }
  }
  
  // 停止背景音乐
  static stopMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.stop();
      this.currentMusic = null;
    }
  }
  
  // 暂停背景音乐
  static pauseMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }
  
  // 设置音乐音量
  static setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.setVolume(this.musicVolume);
    }
  }
  
  // 设置音效音量
  static setSoundVolume(volume: number): void {
    this.soundVolume = Math.max(0, Math.min(1, volume));
  }
  
  // 获取音量设置
  static getMusicVolume(): number {
    return this.musicVolume;
  }
  
  static getSoundVolume(): number {
    return this.soundVolume;
  }
  
  // 开关控制
  static setMusicEnabled(enabled: boolean): void {
    this.isMusicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }
  
  static setSoundEnabled(enabled: boolean): void {
    this.isSoundEnabled = enabled;
  }
  
  static isMusicEnabledState(): boolean {
    return this.isMusicEnabled;
  }
  
  static isSoundEnabledState(): boolean {
    return this.isSoundEnabled;
  }
  
  // 释放所有音效资源
  static releaseAll(): void {
    this.sounds.forEach(sound => sound.release());
    this.sounds.clear();
    this.currentMusic = null;
  }
}

// 游戏音效快捷方法
export class GameSounds {
  // UI音效
  static buttonClick(): void {
    SoundManager.playSound('button_click.aac');
  }
  
  static pageSwipe(): void {
    SoundManager.playSound('page_swipe.aac');
  }
  
  static modalOpen(): void {
    SoundManager.playSound('modal_open.aac');
  }
  
  static modalClose(): void {
    SoundManager.playSound('modal_close.aac');
  }
  
  // 答题音效
  static correctAnswer(): void {
    SoundManager.playSound('correct_answer.aac');
  }
  
  static wrongAnswer(): void {
    SoundManager.playSound('wrong_answer.aac');
  }
  
  // 进度音效
  static pointEliminated(): void {
    SoundManager.playSound('point_eliminated.aac');
  }
  
  static levelComplete(): void {
    SoundManager.playSound('level_complete.aac');
  }
  
  static levelUp(): void {
    SoundManager.playSound('level_up.aac');
  }
  
  // Boss战音效
  static bossAppear(): void {
    SoundManager.playSound('boss_appear.aac');
  }
  
  static bossAttack(): void {
    SoundManager.playSound('boss_attack.aac');
  }
  
  static bossDefeated(): void {
    SoundManager.playSound('boss_defeated.aac');
  }
  
  // 成就音效
  static achievementUnlock(): void {
    SoundManager.playSound('achievement_unlock.aac');
  }
  
  static streakBonus(): void {
    SoundManager.playSound('streak_bonus.aac');
  }
  
  // 时间音效
  static timeWarning(): void {
    SoundManager.playSound('time_warning.aac');
  }
  
  static timeUp(): void {
    SoundManager.playSound('time_up.aac');
  }
  
  // 背景音乐
  static playHomeMusic(): void {
    SoundManager.playMusic('home_bg.mp3');
  }
  
  static playGameMusic(): void {
    SoundManager.playMusic('game_bg.mp3');
  }
  
  static playBossMusic(): void {
    SoundManager.playMusic('boss_bg.mp3');
  }
  
  static playVictoryMusic(): void {
    SoundManager.playMusic('victory_bg.mp3');
  }
}

// 音效配置
export const SOUND_CONFIG = {
  // 音效文件映射
  files: {
    UI: {
      button_click: 'button_click.aac',
      page_swipe: 'page_swipe.aac',
      modal_open: 'modal_open.aac',
      modal_close: 'modal_close.aac',
    },
    GAME: {
      correct_answer: 'correct_answer.aac',
      wrong_answer: 'wrong_answer.aac',
      level_complete: 'level_complete.aac',
      level_up: 'level_up.aac',
      point_eliminated: 'point_eliminated.aac',
      boss_appear: 'boss_appear.aac',
      boss_attack: 'boss_attack.aac',
      boss_defeated: 'boss_defeated.aac',
      achievement_unlock: 'achievement_unlock.aac',
      streak_bonus: 'streak_bonus.aac',
      time_warning: 'time_warning.aac',
      time_up: 'time_up.aac',
    },
    MUSIC: {
      home_bg: 'home_bg.mp3',
      game_bg: 'game_bg.mp3',
      boss_bg: 'boss_bg.mp3',
      victory_bg: 'victory_bg.mp3',
    },
  },
  
  // 默认音量
  defaultVolumes: {
    music: 0.3,
    sound: 0.7,
  },
  
  // 音效时长 (毫秒)
  durations: {
    button_click: 100,
    correct_answer: 800,
    wrong_answer: 500,
    level_complete: 2000,
    level_up: 3000,
    achievement_unlock: 1500,
  },
};