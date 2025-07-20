'use client';

import React, { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Markdown } from '@/components/markdown';

// 模拟异步数据获取函数
const fetchData = (delay: number) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([
        'React 19 新特性',
        'Suspense 数据加载',
        '并发渲染',
        '服务器组件'
      ]);
    }, delay);
  });
};

// 包装异步数据获取的组件
const DataFetcher = async() => {
  // 这里使用 throw 来触发 Suspense 的 fallback
  // 在实际应用中，你可能会使用像 React Query 或 SWR 这样的库
  const data = await fetchData(2000);
  if (!data) {
    throw data;
  }

  return (
    <ul className="space-y-2">
      {data.map((item, index) => (
        <li key={index} className="p-2 bg-gray-50 rounded-md">{item}</li>
      ))}
    </ul>
  );
};

const SuspenseDataExample = () => {
  const [showData, setShowData] = React.useState(false);

  const codeString = `// 模拟异步数据获取
const fetchData = (delay: number) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([/* 数据 */]);
    }, delay);
  });
};

// 使用 Suspense 包装组件
<Suspense fallback={<div>加载中...</div>}>
  <DataFetcher />
</Suspense>`;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Suspense 数据加载示例</h3>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这个示例展示了如何使用 React 的 Suspense 组件处理异步数据加载：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>异步数据获取</li>
          <li>加载状态展示</li>
          <li>组件懒加载</li>
        </ul>
      </div>

      <Button onClick={() => setShowData(!showData)}>
        {showData ? '隐藏数据' : '加载数据'}
      </Button>

      {showData && (
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <DataFetcher />
        </Suspense>
      )}

      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

export default SuspenseDataExample;