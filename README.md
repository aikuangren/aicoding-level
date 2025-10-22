# 🎮 英语闯关大冒险 - English Adventure App

> 专为5-12岁儿童设计的游戏化英语学习应用，通过创新的"知识点消除"机制让英语学习变得有趣且有成就感。

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 项目亮点

- 🎯 **游戏化学习** - 将英语学习转化为有趣的闯关游戏
- ⚡ **知识点消除** - 独创的"消灭知识点"概念，明确进度反馈  
- 🏆 **激励系统** - 多层次激励机制保持学习动力
- 👶 **儿童友好** - 专为5-12岁儿童优化的界面和交互
- 📱 **跨平台** - React Native + Web版本，覆盖移动端和浏览器

## 🚀 在线体验

### 📱 Web版本 (手机浏览器可访问)
```
🔗 GitHub Pages: https://aikuangren.github.io/aicoding-level/web/
📱 直接扫码或分享链接给手机用户
```

### 💻 本地运行
```bash
# React Native版本
npm install
npm run ios    # iOS模拟器
npm run android # Android模拟器

# Web版本 (推荐快速体验)
cd web
npm install  
npm start    # 访问 http://localhost:3000
```

## 📁 项目结构

```
📦 English Adventure App
├── 📋 PRD.md                    # 产品需求文档 (产品经理输出)
├── 🎨 DESIGN_SPEC.md           # UI/UX设计规范 (设计师输出)
├── 📐 DRD.md                   # 设计需求文档 (设计师输出)
├── 📱 React Native App/         # 主应用 (React Native)
│   ├── src/components/          # 组件库 (Button, Card, ProgressBar等)
│   ├── src/screens/             # 页面 (Home, Map, Quiz)
│   ├── src/utils/               # 工具类 (动画、音效、性能优化)
│   └── src/types/               # TypeScript类型定义
├── 🌐 web/                     # Web版本 (可在手机浏览器访问)
│   ├── src/components/          # Web适配组件
│   ├── src/screens/             # Web页面
│   └── webpack.config.js        # 构建配置
└── 📚 docs/                    # 项目文档
```

## 🎮 核心功能

### 📚 学习系统
- **6个年级关卡** (1-6年级对应的英语内容)
- **多种题型** (听力选图、阅读理解、单词拼写、口语挑战)
- **知识点消除** (连续答对3次消灭知识点，获得明确进度反馈)
- **BOSS战挑战** (每个年级末尾的口语挑战关卡)

### 🏆 游戏化元素
- **经验等级系统** (消灭知识点获得经验值，升级解锁特权)
- **成就徽章系统** (进度徽章、技能徽章、挑战徽章)
- **社交对战功能** (好友PK、每日挑战、排行榜)
- **每日任务系统** (保持学习习惯的激励机制)

### 🎨 用户体验
- **流畅动画** (60fps交互体验，丰富的视觉反馈)
- **触觉反馈** (成功/失败震动反馈，增强沉浸感)
- **音效系统** (UI音效、游戏音效、背景音乐)
- **进度可视化** (清晰的学习进度和成就展示)

## 🛠️ 技术栈

### 移动端 (React Native)
- **React Native** 0.72.6 - 跨平台移动应用框架
- **TypeScript** 5.0+ - 类型安全的JavaScript
- **Redux Toolkit** - 状态管理解决方案
- **React Navigation** 6.x - 导航管理
- **React Native Reanimated** - 高性能动画库

### Web端 (手机浏览器适配)
- **React** 18 - 现代前端框架
- **Webpack** 5 - 模块打包和优化
- **CSS-in-JS** - 组件化样式解决方案
- **响应式设计** - 完美适配移动端屏幕

### 开发工具
- **ESLint + Prettier** - 代码规范和格式化
- **Jest** - 单元测试框架
- **TypeScript** - 静态类型检查

## 📊 设计规范

### 🎨 色彩系统
- **主蓝色** `#4A90F4` - 主要操作按钮
- **成功绿** `#34C759` - 正确答案反馈
- **挑战红** `#FF3B30` - 错误提示和BOSS战
- **活力黄** `#FFCC02` - 奖励和星星元素

### 📝 字体规范
- **中文字体**: PingFang SC (Bold/Regular/Light)
- **英文字体**: SF Pro Display/Text
- **标题大小**: 24-32pt Bold
- **正文大小**: 14-18pt Regular

### 🎯 游戏化设计原则
- **简单直观** - 界面操作一目了然
- **即时反馈** - 每个操作都有明确反馈
- **成就感** - 通过视觉效果强化学习成果
- **儿童友好** - 色彩丰富、图标可爱、操作简单

## 🎯 目标用户

- **年龄群体**: 5-12岁小学生
- **学习阶段**: 小学1-6年级英语学习者
- **学习目标**: 提升英语听力、阅读、口语能力
- **使用场景**: 碎片时间学习，每次10分钟左右
- **期望效果**: 培养英语学习兴趣，建立持续学习习惯

## 📈 开发里程碑

### ✅ MVP版本 (已完成)
- [x] 完整的React Native项目架构
- [x] 基础组件库 (Button, Card, ProgressBar, Avatar等)
- [x] 核心页面实现 (首页、关卡地图、答题界面)
- [x] Web版本适配 (可在手机浏览器中访问)
- [x] 完整的设计规范和文档

### 🔄 完整版本 (规划中)
- [ ] 完整的6年级关卡内容系统
- [ ] 音频播放和语音识别功能
- [ ] 社交功能和排行榜系统
- [ ] 家长监控和学习报告

### 🚀 高级功能 (未来扩展)
- [ ] AI语音评测和个性化推荐
- [ ] 多语言支持和国际化
- [ ] 离线学习模式
- [ ] AR/VR学习体验

## 🤝 团队协作

本项目采用AI开发团队协作模式，展示了完整的产品开发流程：

### 👥 角色分工
- **🧠 产品经理Agent** - 需求调研分析，输出PRD产品需求文档
- **🎨 UI/UX设计师Agent** - 界面设计规范，输出DESIGN_SPEC和DRD文档
- **💻 前端工程师Agent** - 代码实现和性能优化，输出完整应用

### 📋 完整工作流程
```
用户想法 → 需求分析(PRD) → 设计规范(DESIGN_SPEC) → 开发实现(代码) → Web部署(可访问链接)
```

### 🎯 项目特色
- **需求驱动** - 从真实的儿童英语学习需求出发
- **设计先行** - 完整的UI/UX设计规范指导开发
- **代码规范** - TypeScript + 模块化架构
- **即时体验** - Web版本支持手机浏览器直接访问

## 📱 快速体验

### 🌐 Web版本 (推荐)
```bash
cd web
npm install
npm start
# 或访问在线版本: https://aikuangren.github.io/aicoding-level/web/
```

### 📱 React Native版本
```bash
npm install
# iOS
npm run ios
# Android  
npm run android
```

## 📞 联系方式

- **开发者**: aikuangren
- **邮箱**: qiang4771@gmail.com
- **GitHub**: https://github.com/aikuangren/aicoding-level
- **项目地址**: https://github.com/aikuangren/aicoding-level

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**🎉 让英语学习变得像游戏一样有趣！** 🎮📚

> 这不仅是一个应用，更是一个学习体验的革命。通过游戏化的方式，让每个孩子都能爱上英语学习，在快乐中成长。