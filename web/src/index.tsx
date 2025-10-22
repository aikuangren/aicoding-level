import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 全局样式
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  /* 移动端滚动优化 */
  * {
    -webkit-overflow-scrolling: touch;
  }
  
  /* 隐藏滚动条但保持功能 */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  /* 移动端按钮优化 */
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
  }
  
  /* 链接优化 */
  a {
    -webkit-tap-highlight-color: transparent;
  }
  
  /* 输入框优化 */
  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
  }
  
  /* 防止双击缩放 */
  * {
    touch-action: manipulation;
  }
`;

// 注入全局样式
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

// 渲染应用
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root element not found');
}