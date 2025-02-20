'use client';

import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Markdown } from '@/components/markdown';

// 简单计数器示例
const SimpleCounterExample = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 不使用 useCallback 的函数
  const incrementWithoutCallback = () => {
    setCount1(c => c + 1);
  };

  // 使用 useCallback 的函数
  const incrementWithCallback = useCallback(() => {
    setCount2(c => c + 1);
  }, []); // 依赖数组为空，因为我们不需要任何外部变量

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">不使用 useCallback</h2>
        <p className="text-muted-foreground">
          每次父组件重新渲染时，都会创建新的函数实例，导致子组件重新渲染
        </p>
        <CounterButton
          onIncrement={incrementWithoutCallback}
          count={count1}
          label="未优化"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">使用 useCallback</h2>
        <p className="text-muted-foreground">
          函数被缓存，只有依赖项变化时才会创建新的函数实例
        </p>
        <CounterButton
          onIncrement={incrementWithCallback}
          count={count2}
          label="已优化"
        />
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>示例代码</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose-sm">
              <Markdown>{`
// 不使用 useCallback 的函数
const incrementWithoutCallback = () => {
  setCount1(c => c + 1);
};

// 使用 useCallback 的函数
const incrementWithCallback = useCallback(() => {
  setCount2(c => c + 1);
}, []); // 空依赖数组

// 使用 memo 优化的子组件
const CounterButton = memo(({ onIncrement, count, label }) => {
  console.log(\`\${label} 组件重新渲染\`);
  return (
    <div>
      <span>{count}</span>
      <button onClick={onIncrement}>增加</button>
    </div>
  );
});
`}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 搜索示例
const SearchExample = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟搜索API调用
  const searchAPI = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      // 模拟搜索结果
      const mockResults = [
        `结果 1 (${searchQuery})`,
        `结果 2 (${searchQuery})`,
        `结果 3 (${searchQuery})`,
      ];
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  }, []); // 空依赖数组，因为这是一个稳定的函数

  // 使用 useCallback 优化防抖函数
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      searchAPI(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchAPI]);

  // 在输入变化时触发搜索
  useEffect(() => {
    const cleanup = debouncedSearch(query);
    return cleanup;
  }, [query, debouncedSearch]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">搜索优化示例</h2>
        <p className="text-muted-foreground mb-4">
          使用 useCallback 优化搜索函数和防抖函数，避免不必要的重新创建
        </p>
        <Input
          type="text"
          placeholder="输入搜索内容..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div>
        {loading ? (
          <p>搜索中...</p>
        ) : (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="p-2 bg-muted rounded">
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>示例代码</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose-sm">
              <Markdown>{`
const SearchExample = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // 使用 useCallback 优化搜索API调用
  const searchAPI = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockResults = [
        \`结果 1 (\${searchQuery})\`,
        \`结果 2 (\${searchQuery})\`,
        \`结果 3 (\${searchQuery})\`,
      ];
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  }, []); 

  // 使用 useCallback 优化防抖函数
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      searchAPI(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchAPI]);

  useEffect(() => {
    const cleanup = debouncedSearch(query);
    return cleanup;
  }, [query, debouncedSearch]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
`}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 列表渲染示例
const ListExample = () => {
  const [items, setItems] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // 使用 useCallback 优化列表项处理函数
  const handleItemClick = useCallback((id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // 添加新项
  const addItem = useCallback(() => {
    setItems(prev => [...prev, Date.now()]);
  }, []);

  // 清除选择
  const clearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">列表优化示例</h2>
        <p className="text-muted-foreground mb-4">
          使用 useCallback 优化列表项的点击处理函数，避免每个列表项重新渲染
        </p>
        <div className="space-x-2">
          <Button onClick={addItem}>添加项目</Button>
          <Button variant="outline" onClick={clearSelection}>清除选择</Button>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(id => (
          <ListItem
            key={id}
            id={id}
            selected={selectedItems.has(id)}
            onClick={handleItemClick}
          />
        ))}
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>示例代码</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose-sm">
              <Markdown>{`
const ListExample = () => {
  const [items, setItems] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // 使用 useCallback 优化列表项点击处理
  const handleItemClick = useCallback((id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <div>
      {items.map(id => (
        <ListItem
          key={id}
          id={id}
          selected={selectedItems.has(id)}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
};

// 使用 memo 优化子组件
const ListItem = memo(({ id, selected, onClick }) => {
  console.log(\`列表项 \${id} 重新渲染\`);
  return (
    <div onClick={() => onClick(id)}>
      项目 {id}
    </div>
  );
});
`}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 性能统计示例
const PerformanceExample = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [renderCounts, setRenderCounts] = useState({ normal: 0, optimized: 0 });
  const [otherState, setOtherState] = useState(0);

  // 不使用 useCallback 的函数 - 每次渲染都会创建新函数
  const normalHandler = () => {
    setCount1(c => c + 1);
  };

  // 使用 useCallback 的函数 - 函数被缓存
  const optimizedHandler = useCallback(() => {
    setCount2(c => c + 1);
  }, []);

  // 重置统计
  const resetStats = useCallback(() => {
    setRenderCounts({ normal: 0, optimized: 0 });
    setCount1(0);
    setCount2(0);
    setOtherState(0);
  }, []);

  // 使用 useCallback 包装 onRender 函数
  const onNormalRender = useCallback(() => {
    setRenderCounts(prev => ({ ...prev, normal: prev.normal + 1 }));
  }, []);

  const onOptimizedRender = useCallback(() => {
    setRenderCounts(prev => ({ ...prev, optimized: prev.optimized + 1 }));
  }, []);

  // 触发父组件重渲染的函数
  const triggerParentRerender = () => {
    // 连续触发多次重渲染，让效果更明显
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        setOtherState(s => s + 1);
      }, i * 100);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">性能统计示例</h2>
        <div className="text-muted-foreground space-y-2 bg-muted p-4 rounded-lg">
          <p className="font-medium text-primary">实验步骤：</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>先点击"重置统计"按钮，清空所有计数</li>
            <li>点击"触发重渲染"按钮<strong>多次</strong>，观察两边的重渲染次数</li>
            <li>你会发现：
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>左边（不使用 useCallback）的重渲染次数会快速增加</li>
                <li>右边（使用 useCallback）的重渲染次数不会增加</li>
              </ul>
            </li>
          </ol>
          <p className="mt-2 text-sm">
            这就说明：使用 useCallback 可以避免不必要的重渲染，提高性能！
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-destructive">
          <CardHeader>
            <CardTitle>不使用 useCallback</CardTitle>
            <CardDescription>每次父组件更新都会重新渲染</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleStatButton
              onIncrement={normalHandler}
              count={count1}
              onRender={onNormalRender}
              label="普通按钮"
            />
            <p className="mt-2 text-sm font-medium text-destructive">
              重渲染次数: {renderCounts.normal}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>使用 useCallback</CardTitle>
            <CardDescription>只在必要时重新渲染</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleStatButton
              onIncrement={optimizedHandler}
              count={count2}
              onRender={onOptimizedRender}
              label="优化按钮"
            />
            <p className="mt-2 text-sm font-medium text-primary">
              重渲染次数: {renderCounts.optimized}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button variant="outline" onClick={resetStats}>
          重置统计
        </Button>
        <Button variant="secondary" onClick={triggerParentRerender}>
          触发重渲染 (当前: {otherState})
        </Button>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>为什么会这样？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose-sm space-y-4">
              <div className="space-y-2">
                <p className="font-medium">不使用 useCallback 的情况（左边）：</p>
                <div className="ml-4 space-y-1">
                  <p>1. 每次父组件重渲染，都会创建一个新的函数</p>
                  <p>2. 新函数 !== 旧函数，即使它们功能完全一样</p>
                  <p>3. React 认为函数变了，所以子组件需要重渲染</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">使用 useCallback 的情况（右边）：</p>
                <div className="ml-4 space-y-1">
                  <p>1. 函数被 useCallback 缓存起来</p>
                  <p>2. 每次重渲染用的都是同一个函数</p>
                  <p>3. React 发现函数没变，就不会重渲染子组件</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 简化的统计按钮组件
const SimpleStatButton = memo(({ 
  onIncrement, 
  count, 
  onRender, 
  label
}: {
  onIncrement: () => void;
  count: number;
  onRender: () => void;
  label: string;
}) => {
  // 记录渲染次数
  useEffect(() => {
    onRender();
  }, [count, onRender]);

  return (
    <Button onClick={onIncrement} className="w-full">
      {label}: {count}
    </Button>
  );
});

SimpleStatButton.displayName = 'SimpleStatButton';

// 子组件：计数器按钮
const CounterButton = memo(({ onIncrement, count, label }: {
  onIncrement: () => void;
  count: number;
  label: string;
}) => {
  console.log(`${label} 组件重新渲染`);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">{count}</span>
          <Button onClick={onIncrement}>增加</Button>
        </div>
      </CardContent>
    </Card>
  );
});

CounterButton.displayName = 'CounterButton';

// 子组件：列表项
const ListItem = memo(({ id, selected, onClick }: {
  id: number;
  selected: boolean;
  onClick: (id: number) => void;
}) => {
  console.log(`列表项 ${id} 重新渲染`);
  return (
    <div
      className={`p-4 border rounded cursor-pointer transition-colors ${
        selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      }`}
      onClick={() => onClick(id)}
    >
      项目 {id}
    </div>
  );
});

ListItem.displayName = 'ListItem';

// 文档说明
const explanation = `
## useCallback 使用说明

useCallback 是 React 的性能优化 Hook，用于缓存函数引用，避免不必要的重新渲染。

### 使用建议

1. **何时使用 useCallback**
   - 当函数作为 props 传递给使用 memo 优化的子组件时
   - 当函数在其他 Hook 的依赖数组中使用时
   - 当函数创建开销较大时

2. **依赖数组的使用**
   - 空数组 \`[]\`: 函数永远不会改变
   - 包含依赖 \`[dep1, dep2]\`: 当依赖改变时函数会更新
   - 没有数组: 每次渲染都会创建新函数（不推荐）

3. **性能优化最佳实践**
   - 总是配合 \`React.memo\` 使用
   - 注意依赖项的正确性
   - 不要过度优化，只在需要时使用

### 注意事项

1. **避免过度使用**
   - 简单组件不需要使用 useCallback
   - 内联函数性能开销通常很小
   - 过度优化可能导致代码复杂性增加

2. **常见陷阱**
   - 忘记使用 memo 优化子组件
   - 依赖数组不完整
   - 在不必要的地方使用 useCallback

3. **调试技巧**
   - 使用 React DevTools 观察重新渲染
   - 添加 console.log 跟踪函数重新创建
   - 使用 Chrome Performance 面板分析性能
`;

// 主组件
export default function UseCallbackDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useCallback Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例学习 useCallback 的使用和优化技巧
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="counter" className="space-y-4">
            <TabsList>
              <TabsTrigger value="counter">简单计数器</TabsTrigger>
              <TabsTrigger value="search">搜索优化</TabsTrigger>
              <TabsTrigger value="list">列表优化</TabsTrigger>
              <TabsTrigger value="performance">性能统计</TabsTrigger>
              <TabsTrigger value="docs">使用说明</TabsTrigger>
            </TabsList>

            <TabsContent value="counter">
              <SimpleCounterExample />
            </TabsContent>

            <TabsContent value="search">
              <SearchExample />
            </TabsContent>

            <TabsContent value="list">
              <ListExample />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceExample />
            </TabsContent>

            <TabsContent value="docs">
              <div className="prose-sm">
                <Markdown>{explanation}</Markdown>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
