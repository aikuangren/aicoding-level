import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomeScreen } from '@/screens/HomeScreen';
import { COLORS, TYPOGRAPHY } from '@/utils/constants';

// 临时页面组件
const MapScreen: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
    padding: '32px', 
    textAlign: 'center',
    backgroundColor: COLORS.background.secondary,
  }}>
    <div style={{ fontSize: '80px', marginBottom: '16px' }}>🗺️</div>
    <h2 style={{ ...TYPOGRAPHY.title2, color: COLORS.text.primary, marginBottom: '8px' }}>关卡地图</h2>
    <p style={{ ...TYPOGRAPHY.body, color: COLORS.text.secondary }}>关卡地图功能开发中...</p>
  </div>
);

const SocialScreen: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
    padding: '32px', 
    textAlign: 'center',
    backgroundColor: COLORS.background.secondary,
  }}>
    <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏆</div>
    <h2 style={{ ...TYPOGRAPHY.title2, color: COLORS.text.primary, marginBottom: '8px' }}>社交排行</h2>
    <p style={{ ...TYPOGRAPHY.body, color: COLORS.text.secondary }}>排行榜和好友功能开发中...</p>
  </div>
);

const ProfileScreen: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh', 
    padding: '32px', 
    textAlign: 'center',
    backgroundColor: COLORS.background.secondary,
  }}>
    <div style={{ fontSize: '80px', marginBottom: '16px' }}>👤</div>
    <h2 style={{ ...TYPOGRAPHY.title2, color: COLORS.text.primary, marginBottom: '8px' }}>个人中心</h2>
    <p style={{ ...TYPOGRAPHY.body, color: COLORS.text.secondary }}>个人资料和设置功能开发中...</p>
  </div>
);

// 底部导航组件
const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: '🏠', label: '首页' },
    { path: '/map', icon: '🗺️', label: '关卡' },
    { path: '/social', icon: '🏆', label: '排行' },
    { path: '/profile', icon: '👤', label: '我的' },
  ];

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '83px',
    backgroundColor: COLORS.background.primary,
    borderTop: `1px solid ${COLORS.background.secondary}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: '8px',
    paddingTop: '8px',
    zIndex: 1000,
  };

  const navItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    padding: '8px',
    minWidth: '60px',
  };

  const getNavItemStyle = (isActive: boolean): React.CSSProperties => ({
    ...navItemStyle,
    transform: isActive ? 'scale(1.1)' : 'scale(1)',
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '4px',
  };

  const getLabelStyle = (isActive: boolean): React.CSSProperties => ({
    ...TYPOGRAPHY.small,
    color: isActive ? COLORS.primary : COLORS.text.secondary,
    fontWeight: '600',
  });

  return (
    <nav style={navStyle}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={getNavItemStyle(isActive)}
          >
            <div style={{
              ...iconStyle,
              opacity: isActive ? 1 : 0.6,
            }}>
              {item.icon}
            </div>
            <span style={getLabelStyle(isActive)}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

// 主应用组件
const AppContent: React.FC = () => {
  return (
    <div style={{ paddingBottom: '83px' }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/map" element={<MapScreen />} />
        <Route path="/social" element={<SocialScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

// App入口组件
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟应用初始化
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.lightBlue})`,
        color: 'white',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px', animation: 'bounce 2s infinite' }}>🎮</div>
        <h1 style={{ ...TYPOGRAPHY.title1, color: 'white', marginBottom: '30px' }}>英语闯关大冒险</h1>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    );
  }

  return (
    <Router basename="/english-adventure-web">
      <AppContent />
    </Router>
  );
};

export default App;