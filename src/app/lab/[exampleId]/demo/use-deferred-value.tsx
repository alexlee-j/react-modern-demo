"use client";

import React, { useState, useDeferredValue, useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Markdown } from "@/components/markdown";

// 模拟数据生成
const generateItems = (text: string, count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    text: `${text} - 项目 ${index + 1}`,
  }));
};

// 模拟 API 调用
const fetchSuggestions = async (text: string) => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));
  return generateItems(text, 10);
};

const delayCodeString: string = `
// 1️⃣ 创建状态和延迟值
const [text, setText] = useState('');
const deferredText = useDeferredValue(text);

// 2️⃣ 使用延迟值处理大量数据
const items = useMemo(() => {
  return generateItems(deferredText, 5000);
}, [deferredText]);

// 3️⃣ 使用延迟值处理异步操作
useEffect(() => {
  const getSuggestions = async () => {
    if (deferredText.trim()) {
      const result = await fetchSuggestions(deferredText);
      setSuggestions(result);
    }
  };
  getSuggestions();
}, [deferredText]);

// 4️⃣ 计算是否在加载状态
const isStale = text !== deferredText;

// 5️⃣ 在 UI 中使用
return (
  <div>
    <Input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <div className={isStale ? 'opacity-50' : ''}>
      {/* 渲染延迟更新的内容 */}
      {items.map(item => (
        <div key={item.id}>{item.text}</div>
      ))} 
    </div>
  </div>
);
`;
// 主要示例组件
const UseDeferredValueDemo = () => {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  const [suggestions, setSuggestions] = useState<
    Array<{ id: number; text: string }>
  >([]);

  // 大列表渲染
  const items = useMemo(() => {
    return generateItems(deferredText, 5000);
  }, [deferredText]);

  // 搜索建议
  useEffect(() => {
    const getSuggestions = async () => {
      if (deferredText.trim()) {
        const result = await fetchSuggestions(deferredText);
        setSuggestions(result);
      } else {
        setSuggestions([]);
      }
    };

    getSuggestions();
  }, [deferredText]);

  // 计算是否正在加载
  const isStale = text !== deferredText;

  return (
    <>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>useDeferredValue Hook 示例</CardTitle>
            <CardDescription>
              通过搜索建议和大列表渲染示例，学习如何使用 useDeferredValue
              优化性能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="demo" className="space-y-4">
              <TabsList>
                <TabsTrigger value="demo">示例演示</TabsTrigger>
                <TabsTrigger value="explanation">原理解释</TabsTrigger>
                <TabsTrigger value="code">实现代码</TabsTrigger>
              </TabsList>

              <TabsContent value="demo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>延迟更新示例</CardTitle>
                    <CardDescription className="space-y-2">
                      <p>这个示例展示了如何使用 useDeferredValue 来优化性能</p>
                      <div className="text-xs space-y-1 mt-2">
                        <p>🔍 观察要点：</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>输入文本时，搜索建议和列表会延迟更新</li>
                          <li>延迟更新时的半透明效果</li>
                          <li>
                            性能对比（可以打开 Chrome DevTools 的性能面板观察）
                          </li>
                        </ul>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>输入文本</Label>
                      <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="输入以查看延迟更新效果"
                      />
                    </div>

                    {/* 搜索建议 */}
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">搜索建议</h3>
                      <div
                        className={`transition-opacity ${
                          isStale ? "opacity-50" : "opacity-100"
                        }`}
                      >
                        {suggestions.length > 0 ? (
                          <ul className="space-y-2">
                            {suggestions.map((item) => (
                              <li
                                key={item.id}
                                className="p-2 bg-secondary rounded-md"
                              >
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground">无搜索建议</p>
                        )}
                      </div>
                    </div>

                    {/* 大列表渲染 */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">大列表渲染</h3>
                      <div
                        className={`transition-opacity ${
                          isStale ? "opacity-50" : "opacity-100"
                        }`}
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                      >
                        <div className="space-y-1">
                          {items.slice(0, 100).map((item) => (
                            <div
                              key={item.id}
                              className="p-2 bg-secondary rounded-md"
                            >
                              {item.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="explanation">
                <Card>
                  <CardHeader>
                    <CardTitle>图解 useDeferredValue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose-sm space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">🎯 目的</h3>
                        <div className="ml-4">
                          <p>让非紧急的 UI 更新延迟进行，优先处理用户交互！</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">🔄 工作流程</h3>
                        <div className="ml-4 space-y-2">
                          <p>1. 用户输入触发状态更新</p>
                          <p>2. React 优先更新输入框的值</p>
                          <p>3. 延迟更新依赖这个值的 UI 部分</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">📝 使用场景</h3>
                        <div className="ml-4 space-y-2">
                          <p>✅ 适合用在：</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>大列表渲染</li>
                            <li>搜索建议</li>
                            <li>实时过滤</li>
                            <li>图表更新</li>
                          </ul>
                          <p className="mt-2">❌ 不适合用在：</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>需要立即响应的交互</li>
                            <li>动画效果</li>
                            <li>用户输入验证</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">
                          💡 使用建议
                        </h3>
                        <div className="space-y-2">
                          <p>1. 配合 useMemo 使用，避免不必要的计算</p>
                          <p>2. 添加加载状态指示器（如半透明效果）</p>
                          <p>3. 合理设置延迟时间，平衡用户体验</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <CardTitle>核心代码</CardTitle>
                    <CardDescription>
                      下面是示例的核心代码实现，去掉了样式等次要代码，突出重点
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose-sm">
                      <Markdown>{delayCodeString}</Markdown>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UseDeferredValueDemo;
