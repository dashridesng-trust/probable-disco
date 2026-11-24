import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { routicLightTheme, routicDarkTheme } from './antdTheme';
import { ROUTIC_COLORS } from './colors';

export type ThemeMode = 'light' | 'dark';
export type TableDensity = 'small' | 'middle' | 'large';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  tableDensity: TableDensity;
  setTableDensity: (density: TableDensity) => void;
  colors: typeof ROUTIC_COLORS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const RouticThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('routic_admin_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [tableDensity, setTableDensity] = useState<TableDensity>('middle');

  useEffect(() => {
    localStorage.setItem('routic_admin_theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
    document.body.style.backgroundColor =
      mode === 'light'
        ? ROUTIC_COLORS.FRAME_BACKGROUND_GRAY
        : ROUTIC_COLORS.DARK_NAVY;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = mode === 'light' ? routicLightTheme : routicDarkTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        tableDensity,
        setTableDensity,
        colors: ROUTIC_COLORS,
      }}
    >
      <ConfigProvider theme={currentTheme}>
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useRouticTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useRouticTheme must be used within a RouticThemeProvider');
  }
  return context;
};
