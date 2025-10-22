# 英语闯关大冒险 - English Adventure App

一款专为5-12岁儿童设计的游戏化英语学习应用，通过创新的"知识点消除"机制让英语学习变得有趣且有成就感。

## 🎯 项目概述

### 产品特色
- 🎮 **游戏化学习**: 将英语学习转化为有趣的闯关游戏
- ⚡ **知识点消除**: 独创的"消灭知识点"概念，明确进度反馈
- 🏆 **激励系统**: 多层次激励机制保持学习动力
- 👶 **儿童友好**: 专为5-12岁儿童优化的界面和交互

### 核心功能
- 📚 6个年级关卡系统 (1-6年级)
- 🎧 听力、阅读、口语多种题型
- 🎖️ 经验值、等级、成就系统
- 👥 社交对战和排行榜
- 📊 学习进度追踪

## 🛠️ 技术栈

### 前端框架
- **React Native** 0.72.6 - 跨平台移动应用开发
- **TypeScript** 5.0+ - 类型安全的JavaScript
- **React Navigation** 6.x - 导航管理
- **Redux Toolkit** - 状态管理

### UI & 动画
- **React Native Reanimated** 3.x - 高性能动画
- **React Native Gesture Handler** - 手势处理
- **Lottie React Native** - 复杂动画效果
- **React Native SVG** - 矢量图标

### 音频 & 媒体
- **React Native Sound** - 音效管理
- **React Native Track Player** - 背景音乐
- **React Native Voice** - 语音识别

### 工具库
- **React Native Async Storage** - 本地数据存储
- **React Native Haptic Feedback** - 触觉反馈
- **React Native Linear Gradient** - 渐变效果

## 📁 项目结构

```
src/
├── components/          # 组件库
│   ├── base/           # 基础组件 (Button, Card, etc.)
│   ├── game/           # 游戏组件 (LevelCard, ProgressBar, etc.)
│   └── ui/             # UI组件 (Avatar, etc.)
├── screens/            # 页面组件
│   ├── home/           # 首页
│   ├── game/           # 游戏相关页面
│   ├── auth/           # 认证页面
│   └── profile/        # 个人中心
├── utils/              # 工具函数
│   ├── constants.ts    # 常量定义
│   ├── animations.ts   # 动画工具
│   ├── sound.ts        # 音效管理
│   ├── haptics.ts      # 触觉反馈
│   └── performance.ts  # 性能优化
├── hooks/              # 自定义Hooks
├── store/              # Redux状态管理
├── types/              # TypeScript类型定义
└── assets/             # 静态资源
    ├── images/         # 图片资源
    ├── icons/          # 图标资源
    ├── sounds/         # 音效文件
    └── animations/     # 动画文件
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16
- React Native CLI
- iOS: Xcode 14+
- Android: Android Studio

### 安装依赖
```bash
npm install
```

### iOS 设置
```bash
cd ios && pod install && cd ..
```

### 运行项目
```bash
# Android
npm run android

# iOS
npm run ios

# 开发服务器
npm start
```

### 构建项目
```bash
# Android Release
npm run build:android

# iOS Release
npm run build:ios
```

## 🎨 设计规范

### 色彩系统
- **主蓝色**: #4A90F4 - 主要按钮、导航
- **成功绿**: #34C759 - 正确答案、完成状态
- **挑战红**: #FF3B30 - 错误提示、BOSS战
- **活力黄**: #FFCC02 - 星星、奖励

### 字体规范
- **标题**: PingFang SC Bold 24-32pt
- **正文**: PingFang SC Regular 14-18pt
- **英文**: SF Pro Display/Text

### 动画原则
- **快速响应**: 微动画 100-200ms
- **标准交互**: 页面切换 300-500ms
- **庆祝效果**: 成就动画 1000-2000ms

## 🎮 游戏机制

### 知识点消除系统
- **遇到**: 首次答题时知识点变为"已遇到"
- **消灭**: 连续答对3次后知识点被"消灭"
- **经验值**: 每消灭1个知识点获得1经验值
- **关卡完成**: 消灭关卡内所有知识点

### 等级系统
- **经验计算**: 第N级需要 N × 10 经验值
- **等级特权**: 解锁新头像、称号、特殊效果
- **视觉反馈**: 升级时金色粒子效果

### BOSS战机制
- **触发条件**: 完成每个年级的所有普通关卡
- **特殊题型**: 主要为口语挑战
- **难度提升**: 更复杂的题目和评判标准
- **奖励倍数**: 2倍经验值奖励

## 📱 界面功能

### 首页 (HomeScreen)
- 用户信息和经验进度
- 每日任务卡片
- 快速入口 (继续学习、每日挑战、好友PK、成就)
- 学习统计数据

### 关卡地图 (MapScreen)
- 蜿蜒路径连接各关卡
- 关卡状态可视化 (锁定/可玩/已完成)
- 进度指示和星级评价
- 关卡详情弹窗

### 答题界面 (QuizScreen)
- 多种题型支持 (听力/阅读/拼写/口语)
- 实时反馈和动画效果
- 进度追踪和计时器
- 知识点消除特效

## ⚡ 性能优化

### 启动优化
- 预加载关键资源
- 分步骤初始化
- 启动画面过渡

### 内存管理
- 图片懒加载和缓存控制
- 音效池管理
- 组件级别的内存清理

### 动画性能
- 使用原生动画API
- GPU加速属性优先
- 动画队列管理

### 数据优化
- 虚拟列表处理大数据
- 智能缓存策略
- 分批处理机制

## 🧪 测试

### 运行测试
```bash
# 单元测试
npm test

# 类型检查
npm run typecheck

# 代码检查
npm run lint
```

### 测试覆盖
- 组件渲染测试
- 用户交互测试
- 业务逻辑测试
- 性能回归测试

## 📦 构建部署

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace EnglishAdventure.xcworkspace -scheme EnglishAdventure -configuration Release
```

## 🤝 开发规范

### 代码风格
- 使用 ESLint + Prettier
- TypeScript 严格模式
- 组件和函数命名规范

### Git 工作流
- feature/* 分支开发新功能
- fix/* 分支修复bug
- 提交信息遵循约定式提交规范

### 组件开发
- 函数组件 + Hooks
- Props 接口定义
- 样式与逻辑分离

## 📋 待实现功能

### MVP版本 (4周)
- [x] 基础闯关系统
- [x] 2种题型 (听力+阅读)
- [x] 简单经验等级
- [ ] 第1-2年级内容

### 完整版本 (8周)
- [ ] 完整关卡系统
- [ ] 全部题型包括口语
- [ ] 完整游戏化功能
- [ ] 全年级内容覆盖

### 高级功能
- [ ] AI语音评测
- [ ] 个性化学习推荐
- [ ] 家长监控面板
- [ ] 多语言支持

## 📞 联系我们

- **开发团队**: AI团队
- **技术支持**: 查看Issues
- **功能建议**: 提交PR

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**🎉 让英语学习变得像游戏一样有趣！** 🎮📚