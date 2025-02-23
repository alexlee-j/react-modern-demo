'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Markdown } from '@/components/markdown';

// 性能监控 Hook
const useRenderTiming = (name: string) => {
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      console.log(`${name} 渲染耗时: ${endTime - startTime}ms`);
    };
  });
};

// 多元素动画盒子组件
const AnimationBox = ({ useLayoutEffectDemo = false }) => {
  useRenderTiming(`AnimationBox (${useLayoutEffectDemo ? 'useLayoutEffect' : 'useEffect'})`);
  const [size, setSize] = useState(100);
  const boxRef = useRef<HTMLDivElement>(null);

  // 使用 useEffect 或 useLayoutEffect
  const effectHook = useLayoutEffectDemo ? useLayoutEffect : useEffect;

  effectHook(() => {
    if (boxRef.current) {
      // 模拟复杂计算
      const start = performance.now();
      while (performance.now() - start < 100) {
        // 阻塞主线程 100ms
      }

      // 设置新的尺寸和位置
      boxRef.current.style.transform = `translate(${size}px, 0px)`;
      boxRef.current.style.backgroundColor = size <= 100 ? '#2563eb' : '#dc2626';
    }
  }, [size]);

  // 创建多个动画元素
  const boxes = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      ref={i === 0 ? boxRef : null}
      className="absolute top-4 w-16 h-16 transition-transform duration-300"
      style={{
        backgroundColor: '#2563eb',
        left: `${4 + i * 20}%`
      }}
    />
  ));

  return (
    <div className="relative h-[200px] border rounded-lg p-4">
      {boxes}
      <Button
        className="absolute bottom-4 right-4"
        onClick={() => setSize(size <= 100 ? 300 : 100)}
      >
        {size <= 100 ? '向右移动' : '向左移动'}
      </Button>
    </div>
  );
};

// 嵌套布局测量组件
const MeasureElement = ({ useLayoutEffectDemo = false }) => {
  useRenderTiming(`MeasureElement (${useLayoutEffectDemo ? 'useLayoutEffect' : 'useEffect'})`);
  const [width, setWidth] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 使用 useEffect 或 useLayoutEffect
  const effectHook = useLayoutEffectDemo ? useLayoutEffect : useEffect;

  effectHook(() => {
    if (elementRef.current && tooltipRef.current) {
      const elementRect = elementRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // 计算并设置提示框的位置
      tooltipRef.current.style.left = `${elementRect.left + (elementRect.width - tooltipRect.width) / 2}px`;
      tooltipRef.current.style.top = `${elementRect.top - tooltipRect.height - 8}px`;
    }
  }, [width]);

  return (
    <div className="relative h-[200px] border rounded-lg p-4">
      <div className="flex justify-center items-center h-full">
        <div className="relative w-3/4">
          <div
            ref={elementRef}
            className="p-4 bg-blue-100 rounded"
            style={{ width: `${width}%` }}
          >
            <div className="text-center">调整我的宽度！</div>
            <div className="mt-2 p-2 bg-blue-200 rounded">
              嵌套的内容
            </div>
          </div>
          <div
            ref={tooltipRef}
            className="fixed bg-black text-white px-2 py-1 rounded text-sm"
          >
            宽度: {width}%
          </div>
        </div>
      </div>
      <input
        type="range"
        min="20"
        max="80"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        className="absolute bottom-4 left-4 right-4"
      />
    </div>
  );
};

// 主要示例组件
// 聊天列表示例组件
const ConcurrentModeExample = () => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'system' }>>([
    { id: 1, text: '你好！', sender: 'user' },
    { id: 2, text: '很高兴见到你！', sender: 'system' }
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用 useLayoutEffect 处理聊天消息布局
  useLayoutEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const children = containerRef.current.children;
      let totalHeight = 0;
      
      Array.from(children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.transform = `translateY(${totalHeight}px)`;
        totalHeight += element.offsetHeight + 8; // 8px 为消息间距
      });
      
      // 自动滚动到底部
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = () => {
    startTransition(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: `这是第 ${prev.length + 1} 条消息`,
          sender: prev.length % 2 === 0 ? 'user' : 'system'
        }
      ]);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">聊天列表示例</CardTitle>
        <CardDescription>
          展示在 React 并发模式下，useLayoutEffect 如何处理动态消息列表的布局
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={addMessage} disabled={isPending}>
            {isPending ? '发送中...' : '发送消息'}
          </Button>
          <div className="border rounded-lg overflow-hidden">
            <div 
              ref={containerRef} 
              className="relative h-[300px] p-4 overflow-y-auto"
            >
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`absolute left-0 right-0 px-4 transition-transform duration-300 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UseLayoutEffectDemo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg mb-8 prose">
        <h1>useLayoutEffect Hook</h1>
        <p>
          useLayoutEffect 是 React 中用于处理 DOM 操作的同步 Hook。它的执行时机在 DOM 更新之后，
          浏览器重绘之前，特别适合需要同步测量和更新 DOM 的场景。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>useLayoutEffect Hook 示例</CardTitle>
          <CardDescription>
            通过实际例子理解 useLayoutEffect 和 useEffect 的区别，以及在什么情况下应该使用 useLayoutEffect。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="animation" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="animation" className="flex-1">动画示例</TabsTrigger>
              <TabsTrigger value="measure" className="flex-1">测量示例</TabsTrigger>
              <TabsTrigger value="concurrent" className="flex-1">并发模式</TabsTrigger>
            </TabsList>
            <TabsContent value="animation" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用 useEffect</CardTitle>
                  <CardDescription>
                    你可能会看到闪烁，因为 DOM 更新在效果执行之前就可见了。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimationBox useLayoutEffectDemo={false} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用 useLayoutEffect</CardTitle>
                  <CardDescription>
                    没有闪烁，因为效果在浏览器重绘之前同步执行。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimationBox useLayoutEffectDemo={true} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{`
// 多元素动画盒子组件
const AnimationBox = ({ useLayoutEffectDemo = false }) => {
  const [size, setSize] = useState(100);
  const boxRef = useRef<HTMLDivElement>(null);

  // 使用 useEffect 或 useLayoutEffect
  const effectHook = useLayoutEffectDemo ? useLayoutEffect : useEffect;

  effectHook(() => {
    if (boxRef.current) {
      // 模拟复杂计算
      const start = performance.now();
      while (performance.now() - start < 100) {
        // 阻塞主线程 100ms
      }

      // 设置新的尺寸和位置
      boxRef.current.style.transform = \`translate(\${size}px, 0px)\`;
      boxRef.current.style.backgroundColor = size <= 100 ? '#2563eb' : '#dc2626';
    }
  }, [size]);

  // 创建多个动画元素
  const boxes = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      ref={i === 0 ? boxRef : null}
      className="absolute top-4 w-16 h-16 transition-transform duration-300"
      style={{
        backgroundColor: '#2563eb',
        left: \`\${4 + i * 20}%\`
      }}
    />
  ));

  return (
    <div className="relative h-[200px] border rounded-lg p-4">
      {boxes}
      <Button
        className="absolute bottom-4 right-4"
        onClick={() => setSize(size <= 100 ? 300 : 100)}
      >
        {size <= 100 ? '向右移动' : '向左移动'}
      </Button>
    </div>
  );
};
`}</Markdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="measure" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用 useEffect</CardTitle>
                  <CardDescription>
                    你可能会看到提示框位置的跳动，因为测量和定位在视觉更新之后执行。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MeasureElement useLayoutEffectDemo={false} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">使用 useLayoutEffect</CardTitle>
                  <CardDescription>
                    提示框位置平滑，因为测量和定位在视觉更新之前完成。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MeasureElement useLayoutEffectDemo={true} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{`
// 嵌套布局测量组件
const MeasureElement = ({ useLayoutEffectDemo = false }) => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 使用 useEffect 或 useLayoutEffect
  const effectHook = useLayoutEffectDemo ? useLayoutEffect : useEffect;

  effectHook(() => {
    if (elementRef.current && tooltipRef.current) {
      const elementRect = elementRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // 计算并设置提示框的位置
      tooltipRef.current.style.left = \`\${elementRect.left + (elementRect.width - tooltipRect.width) / 2}px\`;
      tooltipRef.current.style.top = \`\${elementRect.top - tooltipRect.height - 8}px\`;
    }
  }, [width]);

  return (
    <div className="relative h-[200px] border rounded-lg p-4">
      <div className="flex justify-center items-center h-full">
        <div className="relative w-3/4">
          <div
            ref={elementRef}
            className="p-4 bg-blue-100 rounded"
            style={{ width: \`\${width}%\` }}
          >
            <div className="text-center">调整我的宽度！</div>
            <div className="mt-2 p-2 bg-blue-200 rounded">
              嵌套的内容
            </div>
          </div>
          <div
            ref={tooltipRef}
            className="fixed bg-black text-white px-2 py-1 rounded text-sm"
          >
            宽度: {width}%
          </div>
        </div>
      </div>
      <input
        type="range"
        min="20"
        max="80"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        className="absolute bottom-4 left-4 right-4"
      />
    </div>
  );
};
`}</Markdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="concurrent" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">并发模式示例</CardTitle>
                  <CardDescription>
                    展示在 React 并发模式下，useLayoutEffect 如何处理动态消息列表的布局。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConcurrentModeExample />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{`
// 聊天列表示例组件
const ConcurrentModeExample = () => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'system' }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用 useLayoutEffect 处理聊天消息布局
  useLayoutEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const children = containerRef.current.children;
      let totalHeight = 0;
      
      Array.from(children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.transform = \`translateY(\${totalHeight}px)\`;
        totalHeight += element.offsetHeight + 8; // 8px 为消息间距
      });
      
      // 自动滚动到底部
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = () => {
    startTransition(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: \`这是第 \${prev.length + 1} 条消息\`,
          sender: prev.length % 2 === 0 ? 'user' : 'system'
        }
      ]);
    });
  };

  return (
    <div className="space-y-4">
      <Button onClick={addMessage} disabled={isPending}>
        {isPending ? '发送中...' : '发送消息'}
      </Button>
      <div className="border rounded-lg overflow-hidden">
        <div 
          ref={containerRef} 
          className="relative h-[300px] p-4 overflow-y-auto"
        >
          {messages.map(message => (
            <div
              key={message.id}
              className={\`absolute left-0 right-0 px-4 transition-transform duration-300 \${message.sender === 'user' ? 'text-right' : 'text-left'}\`}
            >
              <div
                className={\`inline-block max-w-[80%] p-3 rounded-lg \${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}\`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
`}</Markdown>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>

      <div className="prose max-w-none">
        <h2>最佳实践</h2>
        <ul>
          <li>在需要同步测量和更新 DOM 的场景中使用 useLayoutEffect</li>
          <li>避免在 useLayoutEffect 中执行耗时操作，可能会阻塞视觉更新</li>
          <li>优先使用 useEffect，只在出现视觉闪烁等问题时才考虑使用 useLayoutEffect</li>
          <li>在服务器端渲染时要小心使用，因为 useLayoutEffect 在服务器端不会执行</li>
          <li>使用条件渲染时要注意清理函数的执行时机</li>
        </ul>
      </div>
    </div>
  );
};

export default UseLayoutEffectDemo;
