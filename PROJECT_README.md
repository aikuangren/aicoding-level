# 🎮 English Adventure - 英语闯关大冒险

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

### 📱 Web版本 (手机浏览器)
```
🔗 访问链接: [部署后提供]
📱 扫描二维码: [部署后生成]
```

### 💻 本地运行
```bash
# React Native版本
npm install
npm run ios    # iOS
npm run android # Android

# Web版本
cd web
npm install  
npm start    # http://localhost:3000
```

## 📁 项目结构

```
📦 English Adventure
├── 📋 PRD.md                    # 产品需求文档
├── 🎨 DESIGN_SPEC.md           # UI/UX设计规范
├── 📐 DRD.md                   # 设计需求文档
├── 📱 React Native App/         # 主应用
│   ├── src/
│   │   ├── components/          # 组件库
│   │   ├── screens/             # 页面
│   │   ├── utils/               # 工具类
│   │   └── types/               # 类型定义
│   ├── App.tsx                  # 应用入口
│   └── package.json
├── 🌐 web/                     # Web版本
│   ├── src/                     # Web组件
│   ├── public/                  # 静态文件
│   └── webpack.config.js        # 构建配置
└── 📚 docs/                    # 文档
```

## 🎮 核心功能

### 📚 学习系统
- **6个年级关卡** (1-6年级对应的英语内容)
- **多种题型** (听力、阅读、口语、拼写)
- **知识点消除** (答对3次消灭知识点)
- **BOSS战挑战** (每个年级的特殊挑战)

### 🏆 游戏化元素
- **经验等级系统** (消灭知识点获得经验值)
- **成就徽章** (进度、技能、挑战三类成就)
- **社交对战** (好友PK、排行榜)
- **每日任务** (保持学习习惯的激励)

### 🎨 用户体验
- **流畅动画** (60fps交互体验)
- **触觉反馈** (成功/失败震动反馈)
- **音效系统** (丰富的游戏音效)
- **进度可视化** (清晰的学习进度展示)

## 🛠️ 技术栈

### 移动端 (React Native)
- **React Native** 0.72.6 - 跨平台框架
- **TypeScript** - 类型安全
- **Redux Toolkit** - 状态管理
- **React Navigation** - 导航
- **Reanimated** - 高性能动画

### Web端
- **React** 18 - 前端框架
- **Webpack** 5 - 模块打包
- **CSS-in-JS** - 样式方案
- **响应式设计** - 移动端适配

### 开发工具
- **ESLint + Prettier** - 代码规范
- **Jest** - 单元测试
- **TypeScript** - 类型检查

## 📊 设计规范

### 🎨 色彩系统
- **主蓝色** `#4A90F4` - 主要操作
- **成功绿** `#34C759` - 正确反馈
- **挑战红** `#FF3B30` - 错误提示
- **活力黄** `#FFCC02` - 奖励元素

### 📝 字体规范
- **中文**: PingFang SC
- **英文**: SF Pro Display/Text
- **标题**: 24-32pt Bold
- **正文**: 14-18pt Regular

## 🎯 目标用户

- **年龄群体**: 5-12岁小学生
- **学习目标**: 英语听力、阅读、口语能力提升
- **使用场景**: 碎片时间学习，每次10分钟
- **期望效果**: 培养英语学习兴趣，建立学习习惯

## 📈 开发里程碑

### ✅ MVP版本 (已完成)
- [x] 基础项目架构
- [x] 核心组件库
- [x] 主要页面实现
- [x] Web版本适配

### 🔄 完整版本 (进行中)
- [ ] 完整关卡内容
- [ ] 音频播放系统
- [ ] 语音识别功能
- [ ] 社交功能实现

### 🚀 高级功能 (计划中)
- [ ] AI语音评测
- [ ] 个性化推荐
- [ ] 家长监控面板
- [ ] 多语言支持

## 🤝 团队协作

本项目采用AI开发团队协作模式：

### 👥 角色分工
- **🧠 产品经理** - 需求分析，输出PRD文档
- **🎨 UI/UX设计师** - 界面设计，输出设计规范
- **💻 前端工程师** - 代码实现，性能优化

### 📋 工作流程
```
用户想法 → 需求分析 → 设计规范 → 代码实现 → 测试部署
```

## 📞 联系方式

- **开发者**: aikuangren
- **邮箱**: qiang4771@gmail.com
- **GitHub**: https://github.com/aikuangren/aicoding-level

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**🎉 让英语学习变得像游戏一样有趣！** 🎮📚

> 这不仅是一个应用，更是一个学习体验的革命。通过游戏化的方式，我们让每个孩子都能爱上英语学习。