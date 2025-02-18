"use client";

import React, { createContext, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// 1. 创建主题上下文
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. 创建语言上下文
interface LanguageContextType {
  language: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 3. 主题提供者组件
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`p-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 4. 语言提供者组件
const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 5. 自定义 Hook：使用主题
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用');
  }
  return context;
};

// 6. 自定义 Hook：使用语言
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage 必须在 LanguageProvider 内部使用');
  }
  return context;
};

// 7. 主题切换按钮组件
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="flex items-center gap-2 mb-4">
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <span>{isDark ? '深色模式' : '浅色模式'}</span>
    </div>
  );
};

// 8. 语言切换按钮组件
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={language === 'zh' ? 'default' : 'outline'}
        onClick={() => setLanguage('zh')}
      >
        中文
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => setLanguage('en')}
      >
        English
      </Button>
    </div>
  );
};

// 9. 内容展示组件
const Content = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const text = {
    zh: {
      title: '使用 Context 的多语言和主题切换示例',
      description: '这个示例展示了如何使用 useContext 来管理应用的主题和语言设置。',
      features: [
        '使用 Context 管理全局状态',
        '支持主题切换',
        '支持语言切换',
        '自定义 Hook 封装',
      ],
    },
    en: {
      title: 'Multi-language and Theme Switching Example with Context',
      description: 'This example demonstrates how to use useContext to manage app theme and language settings.',
      features: [
        'Using Context for global state',
        'Theme switching support',
        'Language switching support',
        'Custom Hook encapsulation',
      ],
    },
  };

  const content = text[language];

  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <h2 className="text-xl font-bold mb-2">{content.title}</h2>
      <p className="mb-4">{content.description}</p>
      <ul className="list-disc list-inside">
        {content.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </Card>
  );
};

// 10. 主组件
const UseContextExample = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="space-y-4">
          <div className="flex justify-between">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Content />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default UseContextExample;
