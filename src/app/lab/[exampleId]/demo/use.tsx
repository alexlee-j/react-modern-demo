'use client';

import React, { use, Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Markdown } from '@/components/markdown';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const fetchUserData = () => {
  return new Promise<{ name: string; age: number }>((resolve) => {
    setTimeout(() => {
      resolve({ name: "张三", age: 25 });
    }, 1000);
  });
};
// 代码示例常量
const basicCode = `
// 模拟异步数据获取
const fetchUserData = () => {
  return new Promise<{ name: string; age: number }>((resolve) => {
    setTimeout(() => {
      resolve({ name: '张三', age: 25 });
    }, 1000);
  });
};

// 基础示例组件
const BasicExample = () => {
  const userDataPromise = fetchUserData();
  const imagePromise = loadImage();

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <UserData promise={userDataPromise} />
      <ImageLoader promise={imagePromise} />
    </Suspense>
  );
};
`;

const advancedCode = `
// 带重试机制的请求
const fetchWithRetry = async () => {
  try {
    const result = await fetchWithError();
    return result;
  } catch (error) {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      return fetchWithRetry();
    }
    throw error;
  }
};
`;
// 性能优化示例组件
const PerformanceExample = () => {
  const [count, setCount] = useState(0);

  // 模拟耗时计算
  const heavyComputation = () => {
    return new Promise<number>((resolve) => {
      // 模拟耗时操作
      setTimeout(() => {
        resolve(count * 2);
      }, 1000);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>性能优化示例</CardTitle>
        <CardDescription>
          展示如何使用 use Hook 处理耗时计算
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => setCount(count + 1)}>
            增加计数: {count}
          </Button>
          <Suspense fallback={<div>计算中...</div>}>
            <ComputationResult promise={heavyComputation()} />
          </Suspense>
          <div className="mt-6">
            <Markdown>{performanceCode}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const performanceCode = `
// 性能优化示例
// 性能优化示例组件
const PerformanceExample = () => {
  const [count, setCount] = useState(0);

  // 模拟耗时计算
  const heavyComputation = () => {
    return new Promise<number>((resolve) => {
      // 模拟耗时操作
      setTimeout(() => {
        resolve(count * 2);
      }, 1000);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>性能优化示例</CardTitle>
        <CardDescription>
          展示如何使用 use Hook 处理耗时计算
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => setCount(count + 1)}>
            增加计数: {count}
          </Button>
          <Suspense fallback={<div>计算中...</div>}>
            <ComputationResult promise={heavyComputation()} />
          </Suspense>
          <div className="mt-6">
            <Markdown>{performanceCode}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
`;

const concurrentCode = `
// 并发数据获取
const fetchConcurrentData = () => {
  const promises = [
    fetchUserData(),
    loadImage(),
    new Promise<string>((resolve) => {
      setTimeout(() => resolve('额外的数据'), 800);
    })
  ];
  return Promise.all(promises);
};
`;

const preloadCode = `
// 资源预加载示例
const ResourcePreloadExample = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const imagePromise = loadImage();

  useEffect(() => {
    // 预加载图片
    const img = new Image();
    img.src = 'https://picsum.photos/200/200';
  }, []);

  return (
    <div>
      <Button onClick={() => setShouldLoad(true)}>
        加载图片
      </Button>
      {shouldLoad && (
        <Suspense fallback={<div>加载中...</div>}>
          <ImageLoader promise={imagePromise} />
        </Suspense>
      )}
    </div>
  );
};
`;

// 模拟资源加载
const loadImage = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("https://picsum.photos/200/200");
    }, 1500);
  });
};

// 基础示例组件
const BasicExample = () => {
  const userDataPromise = fetchUserData();
  const imagePromise = loadImage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>基础用法示例</CardTitle>
        <CardDescription>
          展示如何使用 use Hook 处理 Promise 和异步数据
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            <p>✨ Promise 处理</p>
          </div>
          <Suspense fallback={<div>加载中...</div>}>
            <UserData promise={userDataPromise} />
            <ImageLoader promise={imagePromise} />
          </Suspense>
        </div>

        <div className="mt-6">
          <Markdown>{basicCode}</Markdown>
        </div>
      </CardContent>
    </Card>
  );
};

// 用户数据组件
const UserData = ({
  promise,
}: {
  promise: Promise<{ name: string; age: number }>;
}) => {
  const data = use(promise);
  return (
    <div className="p-4 bg-secondary rounded-lg">
      <p>姓名：{data.name}</p>
      <p>年龄：{data.age}</p>
    </div>
  );
};

// 图片加载组件
const ImageLoader = ({ promise }: { promise: Promise<string> }) => {
  const imageUrl = use(promise);
  return (
    <div className="p-4 bg-secondary rounded-lg">
      <img src={imageUrl} alt="示例图片" className="rounded-lg" />
    </div>
  );
};

// 高级特性示例
const AdvancedExample = () => {
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  // 模拟可能失败的请求
  const fetchWithError = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ data: "请求成功" });
        } else {
          reject(new Error("请求失败"));
        }
      }, 1000);
    });
  };

  // 带重试机制的请求
  const fetchWithRetry = async () => {
    try {
      const result = await fetchWithError();
      toast({
        title: "成功",
        description: "数据获取成功",
      });
      return result;
    } catch (error) {
      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1);
        toast({
          title: "重试中",
          description: `第 ${retryCount + 1} 次重试`,
        });
        return fetchWithRetry();
      }
      throw error;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>高级特性示例</CardTitle>
        <CardDescription>展示 use Hook 的错误处理和重试机制</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={() => {
              setRetryCount(0);
              // 重新触发请求
            }}
          >
            发起请求
          </Button>
          <div className="text-sm text-muted-foreground">
            重试次数：{retryCount}
          </div>
          <div className="mt-6">
            <Markdown>{advancedCode}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 计算结果组件
const ComputationResult = ({ promise }: { promise: Promise<number> }) => {
  const result = use(promise);
  return (
    <div className="p-4 bg-secondary rounded-lg">
      <p>计算结果：{result}</p>
    </div>
  );
};

// 模拟并发数据获取
const fetchConcurrentData = () => {
  const promises = [
    fetchUserData(),
    loadImage(),
    new Promise<string>((resolve) => {
      setTimeout(() => resolve('额外的数据'), 800);
    })
  ];
  return Promise.all(promises);
};

// 资源预加载示例
const ResourcePreloadExample = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const imagePromise = loadImage();

  useEffect(() => {
    // 预加载图片
    const img = new Image();
    img.src = "https://picsum.photos/200/200";
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>资源预加载示例</CardTitle>
        <CardDescription>
          展示如何使用 use Hook 结合资源预加载优化用户体验
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => setShouldLoad(true)}>加载图片</Button>
          {shouldLoad && (
            <Suspense fallback={<div>加载中...</div>}>
              <ImageLoader promise={imagePromise} />
            </Suspense>
          )}
          <div className="mt-6">
            <Markdown>{preloadCode}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 并发数据获取示例
const ConcurrentExample = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const results = await fetchConcurrentData();
      setData(results);
    } catch (error) {
      console.error("并发请求失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>并发数据获取示例</CardTitle>
        <CardDescription>
          展示如何使用 use Hook 处理多个并发请求
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleFetch} disabled={loading}>
            {loading ? "加载中..." : "开始并发请求"}
          </Button>
          {data && (
            <div className="p-4 bg-secondary rounded-lg space-y-2">
              <p>用户数据: {data[0].name}</p>
              <img
                src={data[1]}
                alt="并发加载图片"
                className="w-20 h-20 rounded"
              />
              <p>额外数据: {data[2]}</p>
            </div>
          )}
          <div className="mt-6">
            <Markdown>{concurrentCode}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UseHookDemo = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>use Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例学习如何使用 React 19 的 use Hook 处理
            Promise、异步数据和资源加载
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="basic">基础用法</TabsTrigger>
              <TabsTrigger value="advanced">高级特性</TabsTrigger>
              <TabsTrigger value="performance">性能优化</TabsTrigger>
              <TabsTrigger value="concurrent">并发请求</TabsTrigger>
              <TabsTrigger value="preload">资源预加载</TabsTrigger>
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
            <TabsContent value="concurrent">
              <ConcurrentExample />
            </TabsContent>
            <TabsContent value="preload">
              <ResourcePreloadExample />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default UseHookDemo;