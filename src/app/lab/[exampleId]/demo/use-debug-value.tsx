"use client";

import React, { useDebugValue, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Markdown } from "@/components/markdown";

// 示例1：在线状态检测
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useDebugValue(isOnline ? "在线" : "离线");

  const toggleStatus = () => setIsOnline(!isOnline);

  return { isOnline, toggleStatus };
}

// 示例2：数据获取
interface FetchedData {
  id: number;
  timestamp: number;
  items: Array<{ id: number; value: number }>;
}

function useDataFetcher() {
  const [data, setData] = useState<FetchedData | null>(null);

  useDebugValue(data, (data) => {
    if (!data) return "加载中...";
    return `数据大小: ${JSON.stringify(data).length} 字节`;
  });

  const fetchData = () => {
    const mockData = {
      id: Math.random(),
      timestamp: Date.now(),
      items: Array(100)
        .fill(0)
        .map((_, i) => ({ id: i, value: Math.random() })),
    };
    setData(mockData);
  };

  return { data, fetchData };
}

// 示例3：复杂计算
function useExpensiveCalculation(value: number) {
  const [calculation, setCalculation] = useState({
    value: 0,
    time: 0,
  });

  useEffect(() => {
    const start = performance.now();
    // 使用简单的确定性计算
    const calculatedValue = Array(value)
      .fill(0)
      .reduce((acc, _, i) => acc + (i % 10) * 0.1, 0);
    const end = performance.now();

    setCalculation({
      value: calculatedValue,
      time: end - start,
    });
  }, [value]);

  useDebugValue(calculation, (calc) => {
    return `计算结果: ${calc.value.toFixed(2)} (耗时: ${calc.time.toFixed(
      2
    )}ms)`;
  });

  return calculation;
}
const baseString: string = `
    ### 在线状态示例代码
    
    function useOnlineStatus() {
      const [isOnline, setIsOnline] = useState(true);
      
      // 使用 useDebugValue 添加调试信息
      useDebugValue(isOnline ? "在线" : "离线");
    
      const toggleStatus = () => setIsOnline(!isOnline);
    
      return { isOnline, toggleStatus };
    }
    
    ### 关键点解析
    
    1. **基本用法**
       - 直接传入要在 DevTools 中显示的值
       - 值会随状态变化而更新
       
    2. **调试体验**
       - 在 React DevTools 中可以直观看到状态
       - 帮助开发者快速理解 Hook 的当前状态
    `;
// 在线状态示例组件
const OnlineStatusExample = () => {
  const { isOnline, toggleStatus } = useOnlineStatus();

  return (
    <>
      <div className="space-y-8">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">在线状态示例</h3>
              <p className="text-sm text-gray-500">
                展示了最基本的 useDebugValue 用法，用于调试在线状态。
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span>当前状态: {isOnline ? "🟢 在线" : "🔴 离线"}</span>
              <Button onClick={toggleStatus}>切换状态</Button>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <Markdown>{baseString}</Markdown>
        </Card>
      </div>
    </>
  );
};

const getDataString: string = `
    ### 数据获取示例代码
    

    function useDataFetcher() {
      const [data, setData] = useState<any>(null);
    
      // 使用格式化函数处理调试值
      useDebugValue(data, (data) => {
        if (!data) return "加载中...";
        return "数据大小: " + JSON.stringify(data).length + "字节";
      });
    
      const fetchData = () => {
        // ... 获取数据的逻辑
      };
    
      return { data, fetchData };
    }
    
    #### 关键点解析：
    
    1. **格式化函数**
       - 第二个参数用于延迟格式化
       - 只在 DevTools 打开时才会调用
       - 可以进行复杂的格式化操作
    
    2. **性能优化**
       - 避免不必要的格式化计算
       - 适用于格式化开销较大的场景
    `;
// 数据获取示例组件
const DataFetcherExample = () => {
  const { data, fetchData } = useDataFetcher();

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">数据获取示例</h3>
            <p className="text-sm text-gray-500">
              展示了如何使用格式化函数优化调试值的显示。
            </p>
          </div>
          <div className="space-y-4">
            <Button onClick={fetchData}>获取数据</Button>
            {data && (
              <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-40">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <Markdown>{getDataString}</Markdown>
      </Card>
    </div>
  );
};

const calcString: string = `
### 复杂计算示例代码

function useExpensiveCalculation(value: number) {
  const [calculation, setCalculation] = useState({
    value: 0,
    time: 0
  });

  useEffect(() => {
    const start = performance.now();
    // 执行计算
    const calculatedValue = Array(value)
      .fill(0)
      .reduce((acc, _, i) => acc + (i % 10) * 0.1, 0);
    const end = performance.now();

    setCalculation({
      value: calculatedValue,
      time: end - start,
    });
  }, [value]);

  // 使用格式化函数显示计算结果和性能信息
  useDebugValue(calculation, (calc) => {
    return "计算结果: " + calc.value.toFixed(2)+ " (耗时: " + calc.time.toFixed(
      2
    ) + "ms)";
  });

  return calculation;
}

#### 关键点解析：

1. **性能监控**
   - 使用 performance.now() 测量执行时间
   - 在调试值中展示性能指标

2. **复杂状态的展示**
   - 格式化多个相关的状态值
   - 提供更有意义的调试信息
`;
// 复杂计算示例组件
const ExpensiveCalculationExample = () => {
  const [input, setInput] = useState(1000);
  const calculation = useExpensiveCalculation(input);

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">复杂计算示例</h3>
            <p className="text-sm text-gray-500">
              展示了如何在复杂计算中使用 useDebugValue 进行性能监控。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(Number(e.target.value))}
              min="0"
              max="10000"
            />
            <span>计算结果: {calculation.value.toFixed(2)}</span>
            <span className="text-gray-500">
              (耗时: {calculation.time.toFixed(2)}ms)
            </span>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <Markdown>{calcString}</Markdown>
      </Card>
    </div>
  );
};

// 主组件
export default function UseDebugValueDemo() {
  return (
    <div className="space-y-8 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-2">useDebugValue Hook 示例</h2>
        <p className="text-gray-600">
          本页面展示了 useDebugValue
          在不同场景下的使用方法。每个示例都包含了详细的说明和代码片段，
          帮助你理解如何在实际项目中正确使用 useDebugValue。
        </p>
      </div>

      <Tabs defaultValue="online">
        <TabsList>
          <TabsTrigger value="online">在线状态</TabsTrigger>
          <TabsTrigger value="data">数据获取</TabsTrigger>
          <TabsTrigger value="calculation">复杂计算</TabsTrigger>
        </TabsList>

        <TabsContent value="online">
          <OnlineStatusExample />
        </TabsContent>

        <TabsContent value="data">
          <DataFetcherExample />
        </TabsContent>

        <TabsContent value="calculation">
          <ExpensiveCalculationExample />
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-yellow-50 rounded">
        <p className="text-yellow-800">
          提示：打开 React DevTools 的 Components 面板，查看各个自定义 Hook
          的调试值。
        </p>
      </div>
    </div>
  );
}
