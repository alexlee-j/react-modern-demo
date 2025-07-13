import React, { useRef, useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Markdown } from '@/components/markdown';

// 基础概念示例
const BasicExample = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [lastRenderTime, setLastRenderTime] = useState<string>('');

  const updateState = () => {
    setCount(c => c + 1);  // 触发重渲染
    setLastRenderTime(new Date().toLocaleTimeString());
  };

  const updateRef = () => {
    countRef.current += 1;  // 不触发重渲染
    console.log('ref 值已更新为:', countRef.current);
  };

  const codeString = `// 基础概念示例\nconst BasicExample = () => {\n  const [count, setCount] = useState(0);\n  const countRef = useRef(0);\n  const [lastRenderTime, setLastRenderTime] = useState<string>('');\n\n  const updateState = () => {\n    setCount(c => c + 1);  // 触发重渲染\n    setLastRenderTime(new Date().toLocaleTimeString());\n  };\n\n  const updateRef = () => {\n    countRef.current += 1;  // 不触发重渲染\n    console.log('ref 值已更新为:', countRef.current);\n  };\n\n  return (\n    <Card className="p-6">\n      <h3 className="text-lg font-semibold mb-4">基础概念示例</h3>\n      <div className="space-y-4">\n        <div className="grid grid-cols-2 gap-4">\n          <div className="space-y-2">\n            <p className="text-sm font-medium">useState</p>\n            <div className="text-2xl font-mono">{count}</div>\n            <Button onClick={updateState}>更新 State</Button>\n          </div>\n          <div className="space-y-2">\n            <p className="text-sm font-medium">useRef</p>\n            <div className="text-2xl font-mono">{countRef.current}</div>\n            <Button onClick={updateRef} variant="outline">更新 Ref</Button>\n          </div>\n        </div>\n        <Alert>\n          <AlertDescription>\n            <div>最后渲染时间: {lastRenderTime || '未渲染'}</div>\n            <div className="text-sm text-gray-500 mt-1">\n              提示：更新 ref 不会触发重渲染，所以界面上的 ref 值不会立即更新。\n              打开控制台可以看到实际的 ref 值。\n            </div>\n          </AlertDescription>\n        </Alert>\n      </div>\n    </Card>\n  );\n};`;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">基础概念示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个基础的 useRef 示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何使用 useRef 持久化引用</li>
          <li>如何使用 useRef 与 useState 对比</li>
          <li>如何在控制台查看 ref 的变化</li>
        </ul>

      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">useState</p>
            <div className="text-2xl font-mono">{count}</div>
            <Button onClick={updateState}>更新 State</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">useRef</p>
            <div className="text-2xl font-mono">{countRef.current}</div>
            <Button onClick={updateRef} variant="outline">更新 Ref</Button>
          </div>
        </div>
        <Alert className='mt-4'>
          <AlertDescription>
            <div>最后渲染时间: {lastRenderTime || '未渲染'}</div>
            <div className="text-sm text-gray-500 mt-1">
              提示：更新 ref 不会触发重渲染，所以界面上的 ref 值不会立即更新。
              打开控制台可以看到实际的 ref 值。
            </div>
          </AlertDescription>
        </Alert>
      </div>
      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

// 计时器示例
const TimerExample = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // 组件卸载时清理定时器
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const codeString = `// 计时器示例\nconst TimerExample = () => {\n  const [time, setTime] = useState(0);\n  const [isRunning, setIsRunning] = useState(false);\n  const timerRef = useRef<NodeJS.Timeout | null>(null);\n\n  useEffect(() => {\n    return () => {\n      // 组件卸载时清理定时器\n      if (timerRef.current) {\n        clearInterval(timerRef.current);\n      }\n    };\n  }, []);\n\n  const startTimer = () => {\n    if (!isRunning) {\n      timerRef.current = setInterval(() => {\n        setTime(prev => prev + 1);\n      }, 1000);\n      setIsRunning(true);\n    }\n  };\n\n  const stopTimer = () => {\n    if (timerRef.current) {\n      clearInterval(timerRef.current);\n      setIsRunning(false);\n    }\n  };\n\n  const resetTimer = () => {\n    stopTimer();\n    setTime(0);\n  };\n\n  return (\n    <Card className="p-6">\n      <h3 className="text-lg font-semibold mb-4">计时器示例</h3>\n      <div className="space-y-4">\n        <div className="text-3xl font-mono">\n          {Math.floor(time / 60).toString().padStart(2, '0')}:\n          {(time % 60).toString().padStart(2, '0')}\n        </div>\n        <div className="space-x-2">\n          <Button onClick={startTimer} disabled={isRunning}>\n            开始\n          </Button>\n          <Button onClick={stopTimer} disabled={!isRunning}>\n            停止\n          </Button>\n          <Button onClick={resetTimer} variant="outline">\n            重置\n          </Button>\n        </div>\n      </div>\n    </Card>\n  );\n};`;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">计时器示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个计时器示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何使用 useRef 存储定时器 ID</li>
          <li>如何在组件卸载时清理定时器</li>
          <li>如何使用 useState 存储计时器状态</li>
        </ul>

      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="text-3xl font-mono">
          {Math.floor(time / 60).toString().padStart(2, '0')}:
          {(time % 60).toString().padStart(2, '0')}
        </div>
        <div className="space-x-2">
          <Button onClick={startTimer} disabled={isRunning}>
            开始
          </Button>
          <Button onClick={stopTimer} disabled={!isRunning}>
            停止
          </Button>
          <Button onClick={resetTimer} variant="outline">
            重置
          </Button>
        </div>
      </div>
      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

// DOM 引用示例
const FocusExample = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const showValue = () => {
    setMessage(inputRef.current?.value || '');
  };

  const codeString = `// DOM 引用示例\nconst FocusExample = () => {\n  const inputRef = useRef<HTMLInputElement>(null);\n  const [message, setMessage] = useState('');\n\n  const focusInput = () => {\n    if (inputRef.current) {\n      inputRef.current.focus();\n    }\n  };\n\n  const showValue = () => {\n    setMessage(inputRef.current?.value || '');\n  };\n\n  return (\n    <Card className="p-6">\n      <h3 className="text-lg font-semibold mb-4">DOM 引用示例</h3>\n      <div className="space-y-4">\n        <div className="flex gap-2">\n          <Input ref={inputRef} placeholder="请输入文本" />\n          <Button onClick={focusInput}>聚焦</Button>\n          <Button onClick={showValue} variant="outline">\n            显示值\n          </Button>\n        </div>\n        {message && (\n          <Alert>\n            <AlertDescription>\n              当前输入值：{message}\n            </AlertDescription>\n          </Alert>\n        )}\n      </div>\n    </Card>\n  );\n};`;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">DOM 引用示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个 DOM 引用示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何使用 useRef 获取 DOM 元素引用</li>
          <li>如何使用 .current 访问 DOM 元素</li>
          <li>如何直接操作 DOM 元素的属性和方法</li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex gap-2">
          <Input ref={inputRef} placeholder="请输入文本" />
          <Button onClick={focusInput}>聚焦</Button>
          <Button onClick={showValue} variant="outline">
            显示值
          </Button>
        </div>
        {message && (
          <Alert>
            <AlertDescription>
              当前输入值：{message}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

// 上一次值记录示例
const PreviousValueExample = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | undefined>(undefined);
  // 或者直接初始化为数字
  // const prevCountRef = useRef<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // 记录变化历史
    setHistory(prev => [
      ...prev,
      `${prevCountRef.current ?? '无'} -> ${count}`
    ].slice(-5));  // 只保留最近5条记录

    // 更新上一次的值
    prevCountRef.current = count;
  }, [count]);

  const codeString = `// 上一次值记录示例\nconst PreviousValueExample = () => {\n  const [count, setCount] = useState(0);\n  const prevCountRef = useRef<number>();\n  const [history, setHistory] = useState<string[]>([]);\n\n  useEffect(() => {\n    // 记录变化历史\n    setHistory(prev => [\n      ...prev,\n      \${prevCountRef.current ?? '无'} -> \${count}\n    ].slice(-5));  // 只保留最近5条记录\n    \n    // 更新上一次的值\n    prevCountRef.current = count;\n  }, [count]);\n\n  return (\n    <Card className="p-6">\n      <h3 className="text-lg font-semibold mb-4">上一次值记录示例</h3>\n      <div className="space-y-4">\n        <div className="text-2xl font-mono">\n          当前值：{count}\n        </div>\n        <div className="space-x-2">\n          <Button onClick={() => setCount(c => c + 1)}>\n            增加\n          </Button>\n          <Button onClick={() => setCount(c => c - 1)} variant="outline">\n            减少\n          </Button>\n        </div>\n        <div className="space-y-2">\n          <p className="text-sm font-medium">变化历史：</p>\n          <div className="flex flex-wrap gap-2">\n            {history.map((record, index) => (\n              <Badge key={index} variant="secondary">\n                {record}\n              </Badge>\n            ))}\n          </div>\n        </div>\n      </div>\n    </Card>\n  );\n};`;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">上一次值记录示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个上一次值记录示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何使用 useRef 存储上一次的值</li>
          <li>如何在 useEffect 中更新 ref 值</li>
          <li>如何使用 useState 存储变化历史</li>
        </ul>

      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="text-2xl font-mono">
          当前值：{count}
        </div>
        <div className="space-x-2">
          <Button onClick={() => setCount(c => c + 1)}>
            增加
          </Button>
          <Button onClick={() => setCount(c => c - 1)} variant="outline">
            减少
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">变化历史：</p>
          <div className="flex flex-wrap gap-2">
            {history.map((record, index) => (
              <Badge key={index} variant="secondary">
                {record}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

// 主组件
const UseRefDemo = () => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList>
        <TabsTrigger value="basic">基础概念</TabsTrigger>
        <TabsTrigger value="timer">计时器</TabsTrigger>
        <TabsTrigger value="dom">DOM 引用</TabsTrigger>
        <TabsTrigger value="previous">上一次值</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <BasicExample />
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">要点解析</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>useRef 返回一个可变的引用对象</li>
            <li>修改 ref.current 不会触发组件重新渲染</li>
            <li>ref 值在组件重新渲染时保持不变</li>
            <li>适用于存储不需要触发渲染的值</li>
          </ul>
        </Card>
      </TabsContent>

      <TabsContent value="timer" className="space-y-4">
        <TimerExample />
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">要点解析</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>使用 useRef 存储定时器 ID</li>
            <li>在组件卸载时清理定时器</li>
            <li>ref 值的改变不会触发重新渲染</li>
          </ul>
        </Card>
      </TabsContent>

      <TabsContent value="dom" className="space-y-4">
        <FocusExample />
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">要点解析</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>使用 useRef 获取 DOM 元素引用</li>
            <li>通过 .current 访问 DOM 元素</li>
            <li>可以直接操作 DOM 元素的属性和方法</li>
          </ul>
        </Card>
      </TabsContent>

      <TabsContent value="previous" className="space-y-4">
        <PreviousValueExample />
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">要点解析</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>使用 useRef 存储上一次的值</li>
            <li>在 useEffect 中更新 ref 值</li>
            <li>ref 可以存储任意类型的值</li>
          </ul>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UseRefDemo;
