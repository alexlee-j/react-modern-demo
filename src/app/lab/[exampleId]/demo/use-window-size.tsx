"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Markdown } from "@/components/markdown";
import useWindowSize from "@/hooks/use-window-size";

// 基础示例组件
const BasicExample = () => {
  const windowSize = useWindowSize();

  const codeString = `const windowSize = useWindowSize();

// 在组件中使用窗口大小
console.log(windowSize?.width, windowSize?.height);`;

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-base">基础用法</CardTitle>
        <CardDescription>
          展示了 useWindowSize 的基本使用方法，包括：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>获取窗口尺寸</li>
            <li>响应窗口大小变化</li>
            <li>服务端渲染兼容</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Markdown className="text-sm bg-gray-50 p-3 rounded">
            {codeString}
          </Markdown>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm">当前窗口尺寸：</p>
            <p className="text-lg font-mono mt-2">
              {windowSize
                ? `${windowSize.width} × ${windowSize.height}`
                : "加载中..."}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              调整浏览器窗口大小来查看变化
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 高级示例：自定义断点
const BreakpointExample = () => {
  const windowSize = useWindowSize();
  const [customBreakpoint, setCustomBreakpoint] = useState(768);

  const isMobile = windowSize ? windowSize.width < customBreakpoint : false;

  const codeString = `const windowSize = useWindowSize();
const isMobile = windowSize ? windowSize.width < 768 : false;

// 根据断点条件渲染不同内容
return isMobile ? <MobileView /> : <DesktopView />;`;

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-base">响应式断点</CardTitle>
        <CardDescription>
          展示如何使用 useWindowSize 实现响应式设计：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>自定义断点</li>
            <li>条件渲染</li>
            <li>设备适配</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Markdown className="text-sm bg-gray-50 p-3 rounded">
            {codeString}
          </Markdown>
          <div className="bg-white p-4 rounded-lg border space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">断点：</span>
              <input
                type="range"
                min="320"
                max="1920"
                value={customBreakpoint}
                onChange={(e) => setCustomBreakpoint(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-mono w-16">
                {customBreakpoint}px
              </span>
            </div>
            <div
              className={`p-4 rounded ${
                isMobile ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <p className="text-center font-medium">
                {isMobile ? "移动端视图" : "桌面端视图"}
              </p>
              <p className="text-center text-sm mt-2">
                当前窗口宽度：{windowSize?.width || 0}px
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 性能优化示例
const PerformanceExample = () => {
  const windowSize = useWindowSize();
  const [updates, setUpdates] = useState(0);

  // 模拟重渲染
  React.useEffect(() => {
    if (windowSize) {
      setUpdates((prev) => prev + 1);
    }
  }, [windowSize]);

  const codeString = `// 在 useWindowSize 中使用防抖优化
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 250);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};`;

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-base">性能优化</CardTitle>
        <CardDescription>
          展示 useWindowSize 的性能优化策略：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>防抖处理</li>
            <li>更新次数控制</li>
            <li>内存管理</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Markdown className="text-sm bg-gray-50 p-3 rounded">
            {codeString}
          </Markdown>
          <div className="bg-white p-4 rounded-lg border space-y-2">
            <p className="text-sm">
              窗口尺寸更新次数：<span className="font-mono">{updates}</span>
            </p>
            <p className="text-sm">
              当前尺寸：
              <span className="font-mono">
                {windowSize
                  ? `${windowSize.width} × ${windowSize.height}`
                  : "加载中..."}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              调整窗口大小查看更新次数变化
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 主组件
const UseWindowSizeDemo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg mb-8 prose">
        <h1>useWindowSize Hook</h1>
        <p>
          useWindowSize 是一个用于监听和响应浏览器窗口大小变化的自定义 Hook。
          它提供了简单的 API 来获取当前窗口尺寸，并在窗口大小变化时自动更新。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>useWindowSize Hook 示例</CardTitle>
          <CardDescription>
            通过实际例子了解 useWindowSize 的使用方法和最佳实践。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="basic" className="flex-1">
                基础用法
              </TabsTrigger>
              <TabsTrigger value="breakpoint" className="flex-1">
                响应式断点
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">
                性能优化
              </TabsTrigger>
              <TabsTrigger value="resize-observer" className="flex-1">
                元素监听
              </TabsTrigger>
              <TabsTrigger value="virtual-list" className="flex-1">
                虚拟列表
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-4">
              <BasicExample />
            </TabsContent>
            <TabsContent value="breakpoint" className="mt-4">
              <BreakpointExample />
            </TabsContent>
            <TabsContent value="performance" className="mt-4">
              <PerformanceExample />
            </TabsContent>
            <TabsContent value="resize-observer" className="mt-4">
              <ResizeObserverExample />
            </TabsContent>
            <TabsContent value="virtual-list" className="mt-4">
              <VirtualListExample />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="prose max-w-none">
        <h2>最佳实践</h2>
        <ul>
          <li>使用防抖来优化窗口大小变化的处理</li>
          <li>考虑服务端渲染的兼容性</li>
          <li>合理设置响应式断点</li>
          <li>注意清理事件监听器</li>
          <li>避免不必要的重渲染</li>
        </ul>
      </div>
    </div>
  );
};

// ResizeObserver 示例组件
const ResizeObserverExample = () => {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setElementSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const codeString = `const ResizeObserverExample = () => {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setElementSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef}>监听此元素的尺寸变化</div>;
};`;

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-base">元素尺寸监听</CardTitle>
        <CardDescription>
          展示如何使用 ResizeObserver 监听特定元素的尺寸变化：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>精确监听 DOM 元素尺寸</li>
            <li>响应容器大小变化</li>
            <li>自适应布局实现</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Markdown className="text-sm bg-gray-50 p-3 rounded">
            {codeString}
          </Markdown>
          <div className="bg-white p-4 rounded-lg border space-y-4">
            <div
              ref={elementRef}
              className="p-4 bg-blue-50 rounded resize overflow-auto"
              style={{ minHeight: "100px", maxHeight: "200px" }}
            >
              <p className="text-sm mb-2">此元素可以调整大小：</p>
              <p className="font-mono text-sm">
                宽度：{Math.round(elementSize.width)}px
                <br />
                高度：{Math.round(elementSize.height)}px
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 虚拟列表示例组件
const VirtualListExample = () => {
  const windowSize = useWindowSize();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemHeight = 40;
  const totalItems = 1000;
  const items = Array.from({ length: totalItems }, (_, i) => i);

  React.useEffect(() => {
    if (!containerRef.current || !windowSize) return;

    const containerHeight = containerRef.current.clientHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(containerRef.current.scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, totalItems);

    setVisibleItems(items.slice(startIndex, endIndex));
  }, [windowSize]);

  const handleScroll = React.useCallback(() => {
    if (!containerRef.current) return;

    const startIndex = Math.floor(containerRef.current.scrollTop / itemHeight);
    const visibleCount = Math.ceil(
      containerRef.current.clientHeight / itemHeight
    );
    const endIndex = Math.min(startIndex + visibleCount + 1, totalItems);

    setVisibleItems(items.slice(startIndex, endIndex));
  }, []);

  const codeString = `const VirtualListExample = () => {
  const windowSize = useWindowSize();
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const itemHeight = 40;
  const totalItems = 1000;

  useEffect(() => {
    if (!containerRef.current || !windowSize) return;
    // 计算可见区域的项目
    const containerHeight = containerRef.current.clientHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(containerRef.current.scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, totalItems);

    setVisibleItems(items.slice(startIndex, endIndex));
  }, [windowSize]);

  return (
    <div
      ref={containerRef}
      style={{ height: '400px', overflow: 'auto' }}
      onScroll={handleScroll}
    >
      {visibleItems.map(item => (
        <div key={item} style={{ height: itemHeight }}>
          Item {item}
        </div>
      ))}
    </div>
  );
};`;

  return (
    <Card className="p-4 space-y-4">
      <CardHeader>
        <CardTitle className="text-base">虚拟列表</CardTitle>
        <CardDescription>
          展示如何结合 useWindowSize 实现高性能的虚拟滚动列表：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>自适应容器高度</li>
            <li>按需渲染列表项</li>
            <li>优化长列表性能</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Markdown className="text-sm bg-gray-50 p-3 rounded">
            {codeString}
          </Markdown>
          <div className="bg-white p-4 rounded-lg border">
            <div
              ref={containerRef}
              className="h-[400px] overflow-auto border rounded"
              onScroll={handleScroll}
            >
              <div
                style={{
                  height: `${totalItems * itemHeight}px`,
                  position: "relative",
                }}
              >
                {visibleItems.map((index) => (
                  <div
                    key={index}
                    className="absolute w-full px-4 flex items-center border-b"
                    style={{
                      height: `${itemHeight}px`,
                      top: `${index * itemHeight}px`,
                    }}
                  >
                    Item {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseWindowSizeDemo;
