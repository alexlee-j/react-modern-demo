'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Markdown } from '@/components/markdown';

// 基础副作用示例
const BasicEffectExample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `点击次数: ${count}`;
  }, [count]);

  const codeString = `const [count, setCount] = useState(0);

// 基础副作用：更新文档标题
useEffect(() => {
  document.title = \`点击次数: \${count}\`;
}, [count]); // 依赖数组中包含 count`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">基础副作用</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了最基本的 useEffect 用法：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>监听状态变化</li>
          <li>执行副作用操作</li>
          <li>正确使用依赖数组</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <p className="mb-2">当前计数: {count}</p>
        <Button onClick={() => setCount(count + 1)}>增加计数</Button>
        <p className="mt-2 text-sm text-gray-500">查看浏览器标签页标题的变化</p>
      </div>
    </Card>
  );
};

// 清理副作用示例
const CleanupEffectExample = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!isSubscribed) return;

    const timer = setInterval(() => {
      console.log('数据更新中...');
    }, 1000);

    // 清理函数
    return () => {
      clearInterval(timer);
      console.log('已停止数据更新');
    };
  }, [isSubscribed]);

  const codeString = `const [isSubscribed, setIsSubscribed] = useState(false);

useEffect(() => {
  if (!isSubscribed) return;

  // 设置定时器
  const timer = setInterval(() => {
    console.log('数据更新中...');
  }, 1000);

  // 返回清理函数
  return () => {
    clearInterval(timer);
    console.log('已停止数据更新');
  };
}, [isSubscribed]); // 依赖于订阅状态`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">清理副作用</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何清理副作用：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>设置定时器或订阅</li>
          <li>清理函数的使用</li>
          <li>避免内存泄漏</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <Button 
          onClick={() => setIsSubscribed(!isSubscribed)}
          variant={isSubscribed ? "destructive" : "default"}
        >
          {isSubscribed ? '取消订阅' : '开始订阅'}
        </Button>
        <p className="mt-2 text-sm text-gray-500">
          打开控制台查看日志输出
        </p>
      </div>
    </Card>
  );
};

// 数据获取示例
const DataFetchingExample = () => {
  const [userId, setUserId] = useState('1');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) throw new Error('获取数据失败');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const codeString = `const [userId, setUserId] = useState('1');
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        \`https://api.example.com/users/\${userId}\`
      );
      if (!response.ok) throw new Error('获取数据失败');
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [userId]); // 当 userId 变化时重新获取`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">数据获取</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何使用 useEffect 获取数据：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>异步数据获取</li>
          <li>加载状态管理</li>
          <li>错误处理</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex space-x-2">
          <Input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="输入用户ID"
            min="1"
            max="10"
          />
        </div>
        {loading && <p>加载中...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <div className="space-y-2">
            <p><strong>姓名：</strong>{user.name}</p>
            <p><strong>邮箱：</strong>{user.email}</p>
            <p><strong>电话：</strong>{user.phone}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

// DOM事件监听示例
const EventListenerExample = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking]);

  const codeString = `const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [isTracking, setIsTracking] = useState(false);

useEffect(() => {
  if (!isTracking) return;

  // 创建事件处理函数
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // 添加事件监听
  window.addEventListener('mousemove', handleMouseMove);

  // 清理事件监听
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, [isTracking]); // 仅在 isTracking 变化时重新设置`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">DOM事件监听</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何处理 DOM 事件：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>添加事件监听器</li>
          <li>清理事件监听器</li>
          <li>条件性地添加事件</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <Button
          onClick={() => setIsTracking(!isTracking)}
          variant={isTracking ? "destructive" : "default"}
        >
          {isTracking ? '停止跟踪' : '开始跟踪'}
        </Button>
        {isTracking && (
          <p className="text-sm">
            鼠标位置：X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        )}
      </div>
    </Card>
  );
};

// 主组件
const UseEffectDemo = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-2">useEffect Hook 示例</h2>
        <p className="text-gray-600">
          本页面展示了 useEffect 在不同场景下的使用方法。每个示例都包含了详细的说明和代码片段，
          帮助你理解如何在实际项目中正确使用 useEffect。
        </p>
      </div>
      <BasicEffectExample />
      <CleanupEffectExample />
      <DataFetchingExample />
      <EventListenerExample />
    </div>
  );
};

export default UseEffectDemo;
