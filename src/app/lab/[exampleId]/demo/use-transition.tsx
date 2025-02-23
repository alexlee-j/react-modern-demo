"use client";

import React, {
  useState,
  useTransition,
  useEffect,
  useOptimistic,
  useRef,
  useLayoutEffect,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Markdown } from "@/components/markdown";
import { Progress } from "@/components/ui/progress";

// 模拟大量数据
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
    description: `这是第 ${i + 1} 个项目的详细描述`,
    tags: [`tag-${i % 5}`, `category-${i % 3}`],
    priority: i % 3,
  }));
};

// 性能监控
const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    const cleanup = () => {
      const endTime = performance.now();
      setMetrics({
        renderTime: endTime - startTime,
        memoryUsage: performance.memory?.usedJSHeapSize || 0,
      });
    };
    return cleanup;
  }, []); // 添加空依赖数组，只在组件挂载时执行一次

  return metrics;
};

// 模拟耗时计算
const slowFilter = (items: Array<{ id: number; text: string; description: string; tags: string[]; priority: number }>, query: string) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
    // 人为延迟100ms模拟复杂计算
  }
  return items.filter(
    (item) =>
      item.text.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
  );
};

// 模拟搜索建议
const generateSuggestions = (query: string) => {
  const suggestions = [
    `搜索 "${query}" 相关的项目`,
    `查找包含 "${query}" 的描述`,
    `浏览 "${query}" 标签`,
    `高优先级 "${query}" 项目`,
    `最新的 "${query}" 相关`,
  ];
  return suggestions.slice(0, 3);
};

// 基础示例：实时搜索与建议
const SearchFilterExample = () => {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [items] = useState(() => generateItems(1000));
  const [filteredItems, setFilteredItems] = useState(items);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { renderTime, memoryUsage } = usePerformanceMonitor();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(generateSuggestions(value));

    startTransition(() => {
      const filtered = slowFilter(items, value);
      setFilteredItems(filtered);
    });

    // 演示 React 19 中的改进：更细粒度的更新控制
    startTransition(() => {
      // 模拟额外的后台计算
      const startTime = performance.now();
      while (performance.now() - startTime < 50) {}
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>搜索过滤示例</CardTitle>
        <CardDescription>
          展示如何使用 useTransition 优化搜索过滤体验
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="搜索项目..."
            />
            {isPending && (
              <div className="flex items-center gap-2">
                <span className="text-blue-500">正在处理...</span>
                <Progress value={45} className="w-[100px]" />
              </div>
            )}
          </div>
        </div>

        {/* 搜索建议 */}
        {suggestions.length > 0 && query && (
          <div className="p-2 bg-secondary/50 rounded">
            <p className="text-sm font-medium mb-1">搜索建议：</p>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 性能指标 */}
        <div className="p-2 bg-secondary/50 rounded text-sm">
          <p className="font-medium mb-1">性能指标：</p>
          <div className="space-y-1 text-muted-foreground">
            <p>渲染时间: {renderTime.toFixed(2)}ms</p>
            <p>内存使用: {(memoryUsage / (1024 * 1024)).toFixed(2)}MB</p>
            <p>
              已过滤项目: {filteredItems.length} / {items.length}
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          {filteredItems.slice(0, 10).map((item) => (
            <li key={item.id} className="p-2 bg-secondary rounded space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.text}</span>
                <span className="text-xs text-muted-foreground">
                  优先级: {item.priority + 1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <div className="flex gap-2">
                {item.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
          {filteredItems.length > 10 && (
            <li className="text-muted-foreground">
              ...等 {filteredItems.length - 10} 项
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

// 进阶示例：Tab 切换
const TabSwitchExample = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("all");
  const [items] = useState(() => generateItems(1000));
  const [tabContent, setTabContent] = useState(items);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);

    startTransition(() => {
      switch (newTab) {
        case "all":
          setTabContent(items);
          break;
        case "even":
          setTabContent(items.filter((item) => item.id % 2 === 0));
          break;
        case "odd":
          setTabContent(items.filter((item) => item.id % 2 === 1));
          break;
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tab 切换示例</CardTitle>
        <CardDescription>
          展示如何使用 useTransition 优化 Tab 切换体验
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button
            variant={tab === "all" ? "default" : "outline"}
            onClick={() => handleTabChange("all")}
          >
            全部
          </Button>
          <Button
            variant={tab === "even" ? "default" : "outline"}
            onClick={() => handleTabChange("even")}
          >
            偶数项
          </Button>
          <Button
            variant={tab === "odd" ? "default" : "outline"}
            onClick={() => handleTabChange("odd")}
          >
            奇数项
          </Button>
          {isPending && <span className="text-blue-500">切换中...</span>}
        </div>
        <ul className="space-y-2">
          {tabContent.slice(0, 10).map((item) => (
            <li key={item.id} className="p-2 bg-secondary rounded space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.text}</span>
                <span className="text-xs text-muted-foreground">
                  优先级: {item.priority + 1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <div className="flex gap-2">
                {item.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
          {tabContent.length > 10 && (
            <li className="text-muted-foreground">
              ...等 {tabContent.length - 10} 项
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

// 聊天列表示例组件
const ConcurrentModeExample = () => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<
    Array<{ id: number; text: string; sender: "user" | "system" }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用 useLayoutEffect 处理聊天消息布局
  useLayoutEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const children = containerRef.current.children;
      let totalHeight = 0;

      Array.from(children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.transform = `translateY(${totalHeight}px)`;
        totalHeight += element.offsetHeight + 8;
      });

      // 自动滚动到底部
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = () => {
    startTransition(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `这是第 ${prev.length + 1} 条消息`,
          sender: prev.length % 2 === 0 ? "user" : "system",
        },
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
            {isPending ? "发送中..." : "发送消息"}
          </Button>
          <div className="border rounded-lg overflow-hidden">
            <div
              ref={containerRef}
              className="relative h-[300px] p-4 overflow-y-auto"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`absolute left-0 right-0 px-4 transition-transform duration-300 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
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

// 最佳实践示例
const BestPracticesExample = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最佳实践</CardTitle>
        <CardDescription>使用 useTransition 的关键点和注意事项</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose-sm space-y-4">
          <div>
            <h3 className="text-lg font-medium">🎯 适用场景</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>大量数据的过滤和搜索</li>
              <li>复杂的状态更新和计算</li>
              <li>需要保持 UI 响应性的场景</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">💡 使用建议</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>将耗时操作包装在 startTransition 中</li>
              <li>使用 isPending 状态提供加载反馈</li>
              <li>避免在 transition 中更新紧急的 UI</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">⚠️ 注意事项</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>不要在 transition 中处理用户输入</li>
              <li>避免在 transition 中进行 DOM 操作</li>
              <li>合理使用 transition 的优先级机制</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 图片预加载和表单提交示例
const ImageUploadExample = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [optimisticImage, setOptimisticImage] = useOptimistic<string | null>(
    selectedImage
  );
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // 模拟图片上传
  const uploadImage = async (file: File) => {
    setUploadStatus("loading");
    try {
      // 模拟上传延迟
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadStatus("success");
    } catch (error) {
      console.log(error);

      setUploadStatus("error");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 将所有状态更新包装在 startTransition 中
    startTransition(() => {
      setOptimisticImage(URL.createObjectURL(file));
      uploadImage(file);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>图片上传优化示例</CardTitle>
        <CardDescription>
          展示如何使用 useTransition 和 useOptimistic 优化图片上传体验
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isPending}
          />
          {isPending && (
            <div className="flex items-center gap-2">
              <span className="text-blue-500">上传中...</span>
              <Progress value={45} className="w-[100px]" />
            </div>
          )}
        </div>

        <div className="relative w-full h-[200px] border rounded-lg overflow-hidden">
          {optimisticImage ? (
            <img
              src={optimisticImage}
              alt="预览"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPending ? "opacity-50" : "opacity-100"
              }`}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondary/50">
              <p className="text-muted-foreground">选择图片预览</p>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {uploadStatus === "success" && (
            <p className="text-green-500">上传成功！</p>
          )}
          {uploadStatus === "error" && (
            <p className="text-red-500">上传失败，请重试</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// 主组件
export default function UseTransitionDemo() {
  const basicCode = `// 基础搜索示例
const SearchFilterExample = () => {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [items] = useState(() => generateItems(1000));
  const [filteredItems, setFilteredItems] = useState(items);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { renderTime, memoryUsage } = usePerformanceMonitor();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(generateSuggestions(value));

    startTransition(() => {
      const filtered = slowFilter(items, value);
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <Input
        value={query}
        onChange={handleSearch}
        placeholder="搜索..."
      />
      {isPending && <span>处理中...</span>}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}`;

  const tabCode = `// Tab 切换示例
const TabSwitchExample = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("all");
  const [items] = useState(() => generateItems(1000));
  const [tabContent, setTabContent] = useState(items);

  const handleTabChange = (newTab) => {
    setTab(newTab);

    startTransition(() => {
      switch (newTab) {
        case "all":
          setTabContent(items);
          break;
        case "even":
          setTabContent(items.filter(item => item.id % 2 === 0));
          break;
        case "odd":
          setTabContent(items.filter(item => item.id % 2 === 1));
          break;
      }
    });
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button onClick={() => handleTabChange("all")}>全部</Button>
        <Button onClick={() => handleTabChange("even")}>偶数项</Button>
        <Button onClick={() => handleTabChange("odd")}>奇数项</Button>
        {isPending && <span>切换中...</span>}
      </div>
      <ul>
        {tabContent.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}`;

  const chatCode = `// 聊天列表示例
const ConcurrentModeExample = () => {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const children = containerRef.current.children;
      let totalHeight = 0;
      
      Array.from(children).forEach((child) => {
        const element = child as HTMLElement;
        element.style.transform = \`translateY(\${totalHeight}px)\`;
        totalHeight += element.offsetHeight + 8;
      });
      
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
    <div>
      <Button onClick={addMessage}>
        {isPending ? '发送中...' : '发送消息'}
      </Button>
      <div ref={containerRef} className="relative h-[300px] overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="absolute w-full">
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
}`;

  const uploadCode = `// 图片上传示例
const ImageUploadExample = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState(null);
  const [optimisticImage, setOptimisticImage] = useOptimistic(selectedImage);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    startTransition(() => {
      setOptimisticImage(URL.createObjectURL(file));
      uploadImage(file);
    });
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isPending}
      />
      {optimisticImage && (
        <img
          src={optimisticImage}
          alt="预览"
          className={\`opacity-\${isPending ? '50' : '100'}\`}
        />
      )}
    </div>
  );
}`;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useTransition Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例，学习如何使用 useTransition 优化用户体验
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="search" className="space-y-4">
            <TabsList>
              <TabsTrigger value="search">搜索示例</TabsTrigger>
              <TabsTrigger value="tab">Tab切换</TabsTrigger>
              <TabsTrigger value="chat">聊天列表</TabsTrigger>
              <TabsTrigger value="upload">图片上传</TabsTrigger>
              <TabsTrigger value="best-practices">最佳实践</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-4">
              <SearchFilterExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{basicCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tab" className="space-y-4">
              <TabSwitchExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{tabCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <ConcurrentModeExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{chatCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <ImageUploadExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{uploadCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="best-practices" className="space-y-4">
              <BestPracticesExample />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
