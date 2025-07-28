import React, { useEffect, useState, Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { ConfigProvider, Grid, theme as antdTheme, Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import { customTheme, themeRootCss, darkTheme } from '../shared/theme/themeConfig';
import AppRouter from './router';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

// Create a browser history object
const history = createBrowserHistory();

// Loading component for lazy-loaded routes
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    backgroundColor: '#EEF5FF'
  }}>
    <Spin size="large" />
  </div>
);

const App: React.FC = () => {
  // Inject CSS variables on mount
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = themeRootCss;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [isDark, setIsDark] = useState(false);
  const { useBreakpoint } = Grid;
  
  // Theme provider configuration helper
  const getThemeConfig = (isDark = false) => {
    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: isDark ? darkTheme : customTheme,
    };
  };

  const screens = useBreakpoint();
  // Determine if we're on mobile/tablet
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;
  const isLargeScreen = screens.xl;

  return (
    <ConfigProvider theme={getThemeConfig(isDark)}>
      <Suspense fallback={<LoadingFallback />}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            width: isMobile ? '100vw' : isTablet ? '60vw' : isLargeScreen ? '400px' : '500px',
            fontSize: isMobile ? '12px' : '16px',
            maxWidth: '100%',
          }}
        />
        <AppRouter history={history} />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;