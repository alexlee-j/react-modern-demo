"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Markdown } from "@/components/markdown";
import { Switch } from "@/components/ui/switch";

// 自定义 useMediaQuery Hook
const useMediaQuery = (
  query: string,
  options: { debounce?: boolean; debounceDelay?: number } = {}
): boolean => {
  const [matches, setMatches] = useState(false);
  const { debounce = false, debounceDelay = 300 } = options;

  useEffect(() => {
    // 在服务端渲染时，默认返回 false
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      if (debounce) {
        const timer = setTimeout(() => {
          setMatches(event.matches);
        }, debounceDelay);
        return () => clearTimeout(timer);
      } else {
        setMatches(event.matches);
      }
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [query, debounce, debounceDelay]);

  return matches;
};

// 基础示例组件
const BasicExample = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <Card>
      <CardHeader>
        <CardTitle>基础响应式布局</CardTitle>
        <CardDescription>根据不同设备尺寸显示不同内容</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className={`p-4 rounded-lg ${isMobile ? 'bg-blue-100' : 'bg-gray-100'}`}>
            移动端布局 {isMobile ? '(当前激活)' : ''}
          </div>
          <div className={`p-4 rounded-lg ${isTablet ? 'bg-blue-100' : 'bg-gray-100'}`}>
            平板布局 {isTablet ? '(当前激活)' : ''}
          </div>
          <div className={`p-4 rounded-lg ${isDesktop ? 'bg-blue-100' : 'bg-gray-100'}`}>
            桌面布局 {isDesktop ? '(当前激活)' : ''}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 高级示例组件
const AdvancedExample = () => {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isHighContrast = useMediaQuery('(prefers-contrast: high)');
  const isHoverDevice = useMediaQuery('(hover: hover)');

  return (
    <Card>
      <CardHeader>
        <CardTitle>高级媒体查询</CardTitle>
        <CardDescription>系统偏好和设备特性检测</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <span>暗色模式</span>
            <Switch checked={isDark} disabled />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <span>减弱动画</span>
            <Switch checked={isReducedMotion} disabled />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <span>高对比度</span>
            <Switch checked={isHighContrast} disabled />
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <span>支持悬停</span>
            <Switch checked={isHoverDevice} disabled />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 性能优化示例组件
const PerformanceExample = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isLandscape = useMediaQuery('(orientation: landscape)', {
    debounce: isEnabled,
    debounceDelay: 500
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>性能优化</CardTitle>
        <CardDescription>使用防抖优化频繁的媒体查询更新</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
          <span>启用防抖 (500ms)</span>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p>当前设备方向：{isLandscape ? '横向' : '纵向'}</p>
          <p className="text-sm text-muted-foreground mt-2">
            提示：旋转设备来测试效果{isEnabled ? '，已启用防抖' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// 示例代码字符串
// 使用示例代码
const usageCodeString = `
// 1. 基础用法
const isMobile = useMediaQuery('(max-width: 768px)');

// 2. 带防抖的用法
const isLandscape = useMediaQuery('(orientation: landscape)', {
  debounce: true,
  debounceDelay: 500
});

// 3. 系统主题检测
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

// 4. 无障碍特性检测
const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

// 5. 设备特性检测
const isHoverDevice = useMediaQuery('(hover: hover)');
`;

// 实现原理代码
const implementationCodeString = `
/**
 * useMediaQuery Hook
 * 用于监听媒体查询状态变化的自定义 Hook
 */
const useMediaQuery = (
  query: string,
  options: { debounce?: boolean; debounceDelay?: number } = {}
): boolean => {
  const [matches, setMatches] = useState(false);
  const { debounce = false, debounceDelay = 300 } = options;

  useEffect(() => {
    // 在服务端渲染时，默认返回 false
    if (typeof window === "undefined") return;

    // 创建媒体查询
    const mediaQuery = window.matchMedia(query);
    
    // 初始化匹配状态
    setMatches(mediaQuery.matches);

    // 处理媒体查询变化
    const listener = (event: MediaQueryListEvent) => {
      if (debounce) {
        // 使用防抖优化频繁更新
        const timer = setTimeout(() => {
          setMatches(event.matches);
        }, debounceDelay);
        return () => clearTimeout(timer);
      } else {
        setMatches(event.matches);
      }
    };

    // 添加事件监听
    mediaQuery.addEventListener("change", listener);

    // 清理函数
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, [query, debounce, debounceDelay]);

  return matches;
};
`;

const UseMediaQueryDemo = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useMediaQuery Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例，学习如何使用 useMediaQuery 实现响应式设计
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic" className="flex-1">基础示例</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1">高级示例</TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">性能优化</TabsTrigger>
              <TabsTrigger value="usage" className="flex-1">使用示例</TabsTrigger>
              <TabsTrigger value="implementation" className="flex-1">实现原理</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicExample />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedExample />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceExample />
            </TabsContent>

            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle>使用示例</CardTitle>
                  <CardDescription>
                    下面是 useMediaQuery Hook 的常见使用场景和示例代码
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{usageCodeString}</Markdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation">
              <Card>
                <CardHeader>
                  <CardTitle>实现原理</CardTitle>
                  <CardDescription>
                    useMediaQuery Hook 的核心实现代码，包含详细的注释说明
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{implementationCodeString}</Markdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UseMediaQueryDemo;