'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Markdown } from '@/components/markdown';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

// 类型定义
interface ProcessedData {
  filtered: number[];
  sorted: number[];
  average: number;
  computeTime: number;
}

// 计时器工具函数
const measureTime = (fn: () => any): [any, number] => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return [result, end - start];
};

// 斐波那契数列计算函数（模拟耗时计算）
const calculateFibonacci = (n: number): number => {
  // 添加适量额外计算
  const complexCalculation = (x: number): number => {
    let result = 0;
    for (let i = 0; i < 100; i++) {
      result += Math.sin(x * i) * Math.cos(x * i);
    }
    return result;
  };

  const fib = (x: number): number => {
    if (x <= 1) return x;
    // 在递归计算的同时执行复杂计算
    complexCalculation(x);
    return fib(x - 1) + fib(x - 2);
  };

  return fib(n);
};

// 简单示例组件
const SimpleExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // 模拟一个耗时的字符串处理操作
  const expensiveOperation = (input: string) => {
    console.log('执行耗时操作...');
    let result = input;
    for (let i = 0; i < 10000000; i++) {
      result = result + '';
    }
    return result.toUpperCase();
  };

  // 使用useMemo与否的对比
  const processedText = useMemo(() => {
    return useMemoEnabled
      ? expensiveOperation(text)
      : text.toUpperCase();
  }, [text, useMemoEnabled]);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">基础示例</h3>
          <p className="text-sm text-gray-500">
            通过这个简单的示例理解 useMemo 的基本用法。
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="use-memo-mode"
            checked={useMemoEnabled}
            onCheckedChange={setUseMemoEnabled}
          />
          <Label htmlFor="use-memo-mode">
            {useMemoEnabled ? '使用 useMemo' : '不使用 useMemo'}
          </Label>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="text-input">输入文本</Label>
            <Input
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入一些文本"
            />
          </div>

          <Button
            onClick={() => setCount(c => c + 1)}
            variant="outline"
          >
            点击计数: {count}
          </Button>

          <Alert>
            <AlertDescription>
              <div className="space-y-2">
                <p>处理结果: {processedText}</p>
                <p className="text-sm text-gray-500">
                  提示：改变文本会触发重新计算，点击计数不会触发重新计算（使用 useMemo 时）
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Card>
  );
};

// 数字列表处理示例
const NumberListDemo = () => {
  // 生成一个适中大小的数组作为初始数据
  const [numbers] = useState<number[]>(() =>
    Array.from({ length: 5000 }, (_, i) => i + 1)
  );
  const [filterThreshold, setFilterThreshold] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [computeTime, setComputeTime] = useState(0);

  // 数组处理函数
  const processArray = (nums: number[], threshold: number, order: 'asc' | 'desc'): ProcessedData => {
    // 适量的耗时操作
    const filtered = nums.filter(num => {
      // 适当的计算复杂度
      let sum = 0;
      for (let i = 0; i < 50; i++) {
        sum += Math.sin(num * i) * Math.cos(num * i);
      }
      return sum > threshold;
    });

    const sorted = [...filtered].sort((a, b) => {
      // 适当的排序复杂度
      const calculateValue = (x: number) => {
        let sum = 0;
        for (let i = 0; i < 20; i++) {
          sum += Math.sin(x * i) + Math.cos(x * i);
        }
        return sum;
      };

      const aValue = calculateValue(a);
      const bValue = calculateValue(b);
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    });

    // 适量的数组操作
    const processedValues = sorted.map(num => {
      let result = num;
      for (let i = 0; i < 10; i++) {
        result = Math.sqrt(result * result + i);
      }
      return result;
    });

    const average = processedValues.length > 0
      ? processedValues.reduce((a, b) => a + b, 0) / processedValues.length
      : 0;

    return { filtered: filtered.slice(0, 50), sorted: sorted.slice(0, 50), average, computeTime: 0 };
  };

  // 使用 useMemo 与否的对比
  const { result: processedData, time } = useMemo(() => {
    console.log(useMemoEnabled ? '使用 useMemo - 计算数组处理结果' : '不使用 useMemo - 计算数组处理结果');

    if (!useMemoEnabled) {
      // 不使用 useMemo 时，每次渲染都重新计算
      const [result, time] = measureTime(() =>
        processArray(numbers, filterThreshold, sortOrder)
      );
      return { result, time };
    }

    // 使用 useMemo 时，只在依赖变化时重新计算
    const [result, time] = measureTime(() =>
      processArray(numbers, filterThreshold, sortOrder)
    );
    return { result, time };
  }, [numbers, filterThreshold, sortOrder, useMemoEnabled]);

  // 使用 useEffect 来更新计算时间，避免在渲染期间设置状态
  useEffect(() => {
    setComputeTime(time);
  }, [time]);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">数组处理示例</h3>
          <p className="text-sm text-gray-500">
            演示如何使用 useMemo 缓存数组操作结果，提升性能。
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="array-memo-mode"
            checked={useMemoEnabled}
            onCheckedChange={setUseMemoEnabled}
          />
          <Label htmlFor="array-memo-mode">
            {useMemoEnabled ? '使用 useMemo' : '不使用 useMemo'}
          </Label>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="threshold">过滤阈值</Label>
            <div className="flex gap-2">
              <Input
                id="threshold"
                type="number"
                value={filterThreshold}
                onChange={(e) => setFilterThreshold(Number(e.target.value))}
                className="w-32"
                placeholder="过滤阈值"
                aria-label="设置过滤阈值"
                min={1}
                max={10}
              />
              <Button
                variant="outline"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                aria-pressed={sortOrder === 'desc'}
                aria-label={`切换排序顺序，当前为${sortOrder === 'asc' ? '升序' : '降序'}`}
              >
                {sortOrder === 'asc' ? '升序' : '降序'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">计算耗时</p>
              <p className="text-sm text-gray-500">{computeTime.toFixed(2)}ms</p>
            </div>
            <Progress value={Math.min(computeTime, 100)} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">处理结果：</p>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="过滤和排序后的数字列表"
            >
              {processedData.sorted.map((num: number) => (
                <Badge
                  key={num}
                  variant="secondary"
                  role="listitem"
                >
                  {num}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              平均值：{processedData.average.toFixed(2)}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Card>
  );
};

// 斐波那契数列计算示例
const FibonacciDemo = () => {
  const [number, setNumber] = useState(30); // 设置一个更大的初始值
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [computeTime, setComputeTime] = useState(0);

  // 使用 useMemo 与否的对比
  const { result: fibResult, time, error: computeError } = useMemo(() => {
    console.log(useMemoEnabled ? '使用 useMemo - 计算斐波那契数' : '不使用 useMemo - 计算斐波那契数');

    try {
      if (number < 0) throw new Error('请输入非负数');
      if (number > 45) throw new Error('数字过大，可能导致浏览器无响应');

      if (!useMemoEnabled) {
        // 不使用 useMemo 时，每次渲染都重新计算
        const [result, time] = measureTime(() => calculateFibonacci(number));
        return { result, time, error: null };
      }

      // 使用 useMemo 时，只在依赖变化时重新计算
      const [result, time] = measureTime(() => calculateFibonacci(number));
      return { result, time, error: null };
    } catch (err) {
      return {
        result: null,
        time: 0,
        error: err instanceof Error ? err.message : '计算出错'
      };
    }
  }, [number, useMemoEnabled]);

  // 使用 useEffect 来更新状态，避免在渲染期间设置状态
  useEffect(() => {
    setIsCalculating(false);
    setComputeTime(time);
    setError(computeError);
  }, [time, computeError]);

  // 计算开始时设置状态
  useEffect(() => {
    setIsCalculating(true);
  }, [number, useMemoEnabled]);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">斐波那契数列计算</h3>
          <p className="text-sm text-gray-500">
            演示如何使用 useMemo 缓存复杂计算结果，避免重复计算。
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="fib-memo-mode"
            checked={useMemoEnabled}
            onCheckedChange={setUseMemoEnabled}
          />
          <Label htmlFor="fib-memo-mode">
            {useMemoEnabled ? '使用 useMemo' : '不使用 useMemo'}
          </Label>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fibonacci-input">输入数字</Label>
            <div className="flex gap-2">
              <Input
                id="fibonacci-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="w-32"
                placeholder="输入数字"
                aria-label="输入要计算的斐波那契数列位置"
                min={0}
                max={45}
              />
              <Button
                onClick={() => setCount(c => c + 1)}
                variant="outline"
                aria-label="点击计数，用于演示不相关状态更新不会触发重计算"
              >
                点击计数: {count}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">计算耗时</p>
              <p className="text-sm text-gray-500">{computeTime.toFixed(2)}ms</p>
            </div>
            <Progress value={Math.min(computeTime, 1000) / 10} />
          </div>

          <Alert>
            <AlertDescription>
              <div
                role="status"
                aria-live="polite"
                className="space-y-2"
              >
                {isCalculating ? (
                  <p>计算中...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <p>第 {number} 个斐波那契数是: {fibResult}</p>
                )}
                <p className="text-sm text-gray-500">
                  提示：改变数字会触发重新计算，点击计数不会触发重新计算（使用 useMemo 时）
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Card>
  );
};

// 主组件
const UseMemoDemo = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="simple">
        <TabsList>
          <TabsTrigger value="simple">基础示例</TabsTrigger>
          <TabsTrigger value="array">数组处理</TabsTrigger>
          <TabsTrigger value="fibonacci">斐波那契数列</TabsTrigger>
        </TabsList>

        <TabsContent value="simple" className="space-y-8">
          <SimpleExample />
          <Card className="p-6">
            <Markdown>
              {`
### 基础示例代码

这个示例展示了最基本的 useMemo 使用场景：


const SimpleExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // 模拟一个耗时的字符串处理操作
  const expensiveOperation = (input: string) => {
    console.log('执行耗时操作...');
    let result = input;
    for (let i = 0; i < 10000000; i++) {
      result = result + '';  // 模拟耗时操作
    }
    return result.toUpperCase();
  };

  // 使用 useMemo 缓存计算结果
  const processedText = useMemo(() => {
    return useMemoEnabled 
      ? expensiveOperation(text)  // 有 useMemo 时，只在 text 变化时计算
      : text.toUpperCase();      // 无 useMemo 时，每次渲染都计算
  }, [text, useMemoEnabled]);    // 依赖数组：text 或 useMemoEnabled 变化时重新计算

  return (
    // UI 部分...
  );
};


#### 关键点解析：

1. **状态设计**
   - \`count\`: 用于演示与计算无关的状态更新
   - \`text\`: 作为计算的输入
   - \`useMemoEnabled\`: 控制是否启用缓存

2. **性能优化**
   - 使用 useMemo 时，点击计数按钮不会触发重新计算
   - 不使用 useMemo 时，每次渲染都会重新计算
   - 可以在控制台看到计算的执行时机

3. **最佳实践**
   - 明确的依赖数组 [\`text\`, \`useMemoEnabled\`]
   - 将计算逻辑封装在独立函数中
   - 通过开关按钮直观对比效果
`}
            </Markdown>
          </Card>
        </TabsContent>

        <TabsContent value="array" className="space-y-8">
          <NumberListDemo />
          <Card className="p-6">
            <Markdown>
              {`
### 数组处理示例代码

这个示例展示了在数组处理场景中使用 useMemo：


const NumberListDemo = () => {
  // 生成一个适中大小的数组作为初始数据
  const [numbers] = useState<number[]>(() => 
    Array.from({ length: 5000 }, (_, i) => i + 1)  // 使用工厂函数初始化
  );
  const [filterThreshold, setFilterThreshold] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // 数组处理函数：过滤 -> 排序 -> 计算平均值
  const processArray = (nums: number[], threshold: number, order: 'asc' | 'desc') => {
    // 1. 过滤操作
    const filtered = nums.filter(num => {
      let sum = 0;
      for(let i = 0; i < 50; i++) {
        sum += Math.sin(num * i) * Math.cos(num * i);  // 模拟复杂计算
      }
      return sum > threshold;
    });
    
    // 2. 排序操作
    const sorted = [...filtered].sort((a, b) => {
      const calculateValue = (x: number) => {
        let sum = 0;
        for(let i = 0; i < 20; i++) {
          sum += Math.sin(x * i) + Math.cos(x * i);  // 模拟复杂比较
        }
        return sum;
      };
      return order === 'asc' 
        ? calculateValue(a) - calculateValue(b)
        : calculateValue(b) - calculateValue(a);
    });

    // 3. 计算平均值
    return { filtered, sorted, average: /* ... */ };
  };

  // 使用 useMemo 缓存计算结果
  const { result: processedData, time } = useMemo(() => {
    // 根据 useMemoEnabled 决定是否启用缓存
    return measureTime(() => 
      processArray(numbers, filterThreshold, sortOrder)
    );
  }, [numbers, filterThreshold, sortOrder, useMemoEnabled]);

  return (
    // UI 部分...
  );
};


#### 关键点解析：

1. **数据处理流程**
   - 使用过滤、排序等多个数组操作
   - 每个操作都增加了计算复杂度
   - 通过计时器监控性能影响

2. **性能优化策略**
   - 使用 useMemo 缓存整个处理流程的结果
   - 只在必要的依赖变化时重新计算
   - 通过性能计时器量化优化效果

3. **实际应用场景**
   - 大数据列表的处理
   - 复杂的数据转换
   - 多步骤的数据处理
`}
            </Markdown>
          </Card>
        </TabsContent>

        <TabsContent value="fibonacci" className="space-y-8">
          <FibonacciDemo />
          <Card className="p-6">
            <Markdown>
              {`
### 斐波那契数列示例代码

这个示例展示了在递归计算场景中使用 useMemo：


// 斐波那契数列计算函数（模拟耗时计算）
const calculateFibonacci = (n: number): number => {
  // 添加额外计算增加复杂度
  const complexCalculation = (x: number): number => {
    let result = 0;
    for(let i = 0; i < 100; i++) {
      result += Math.sin(x * i) * Math.cos(x * i);  // 模拟复杂计算
    }
    return result;
  };

  // 递归计算斐波那契数列
  const fib = (x: number): number => {
    if (x <= 1) return x;
    complexCalculation(x);  // 增加计算复杂度
    return fib(x - 1) + fib(x - 2);  // 递归调用
  };

  return fib(n);
};

const FibonacciDemo = () => {
  const [number, setNumber] = useState(30);
  const [count, setCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // 使用 useMemo 缓存计算结果
  const { result: fibResult, time, error: computeError } = useMemo(() => {
    try {
      // 输入验证
      if (number < 0) throw new Error('请输入非负数');
      if (number > 45) throw new Error('数字过大，可能导致浏览器无响应');
      
      // 根据 useMemoEnabled 决定是否启用缓存
      return measureTime(() => calculateFibonacci(number));
    } catch (err) {
      return { 
        result: null, 
        time: 0, 
        error: err instanceof Error ? err.message : '计算出错'
      };
    }
  }, [number, useMemoEnabled]);

  return (
    // UI 部分...
  );
};


#### 关键点解析：

1. **递归计算优化**
   - 使用 useMemo 缓存递归计算结果
   - 避免重复的递归调用
   - 通过额外计算增加复杂度

2. **错误处理**
   - 输入验证和边界检查
   - 优雅的错误处理和提示
   - 防止过大输入导致卡顿

3. **性能对比**
   - 使用 useMemo 时，只在数字变化时重新计算
   - 不使用 useMemo 时，每次渲染都重新计算
   - 通过计数器演示缓存效果

4. **实际应用启示**
   - 递归计算的性能优化
   - 复杂算法的缓存策略
   - 用户输入的安全处理
`}
            </Markdown>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UseMemoDemo;
