"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { useToast } from "@/hooks/use-toast";

// 自定义 Hook: useLocalStorage
// 这个 Hook 提供了一个类似于 useState 的 API，但会自动将状态持久化到 localStorage
// 用法示例：const [value, setValue] = useLocalStorage<string>('storage-key', 'default-value')
function useLocalStorage<T>(key: string, initialValue: T) {
  // 使用初始值进行状态初始化
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 在组件挂载时从 localStorage 读取数据
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  // 更新函数：同时更新 state 和 localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 支持函数式更新
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 更新 React state
      setStoredValue(valueToStore);
      
      // 更新 localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// 基础示例组件
function BasicExample() {
  const [name, setName] = useLocalStorage<string>("user-name", "");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: `名称已保存: ${name}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>基础示例</CardTitle>
        <CardDescription>展示基本的本地存储读写操作</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="输入你的名字"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSave}>保存</Button>
        </div>
        <div>
          <p>存储的值: {name}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// 高级示例组件
function AdvancedExample() {
  const [data, setData] = useLocalStorage<{ value: string; timestamp: number }>(
    "advanced-data",
    { value: "", timestamp: 0 }
  );
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    if (data.timestamp === 0) {
      setData((prev) => ({ ...prev, timestamp: Date.now() }));
    }
  }, []);

  // 检查数据是否过期（这里设置为1小时）
  const isExpired = () => {
    const ONE_HOUR = 60 * 60 * 1000;
    return Date.now() - data.timestamp > ONE_HOUR;
  };

  // 更新数据
  const handleUpdate = (newValue: string) => {
    setData({
      value: newValue,
      timestamp: Date.now(),
    });
    toast({
      title: "数据已更新",
      description: "新的数据已保存到本地存储",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>高级示例</CardTitle>
        <CardDescription>展示数据过期处理</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="输入数据"
            value={data.value}
            onChange={(e) => handleUpdate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <p>
            数据状态:{" "}
            {mounted ? (isExpired() ? "已过期" : "有效") : "加载中..."}
          </p>
          <p>
            最后更新:{" "}
            {mounted
              ? new Date(data.timestamp).toLocaleString("zh-CN", {
                  hour12: false,
                })
              : "加载中..."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// 错误处理示例组件
function ErrorHandlingExample() {
  const [largeData, setLargeData] = useState('')
  const { toast } = useToast()

  // 模拟生成大量数据
  const generateLargeData = () => {
    return Array(1024 * 1024).fill('A').join('') // 生成约 1MB 的数据
  }

  // 尝试存储大数据
  const handleStoreLargeData = () => {
    try {
      const data = generateLargeData()
      localStorage.setItem('large-data', data)
      setLargeData(data)
      toast({
        title: '数据已保存',
        description: '大数据已成功存储',
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'QuotaExceededError') {
          toast({
            variant: 'destructive',
            title: '存储失败',
            description: '存储空间不足，请清理其他数据后重试',
          })
        } else {
          toast({
            variant: 'destructive',
            title: '存储失败',
            description: error.message,
          })
        }
      }
    }
  }

  // 清除数据
  const handleClear = () => {
    try {
      localStorage.removeItem('large-data')
      setLargeData('')
      toast({
        title: '已清除',
        description: '数据已成功清除',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '清除失败',
        description: '清除数据时发生错误',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>错误处理示例</CardTitle>
        <CardDescription>展示如何处理存储配额超限等错误情况</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={handleStoreLargeData}>存储大数据</Button>
          <Button variant="destructive" onClick={handleClear}>清除数据</Button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>当前存储状态: {largeData ? '已存储大约 1MB 数据' : '无数据'}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// 数据同步示例组件
function SyncExample() {
  const [syncData, setSyncData] = useLocalStorage<string>('sync-data', '')
  const { toast } = useToast()

  // 监听其他标签页的更改
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sync-data' && e.newValue !== null) {
        setSyncData(e.newValue)
        toast({
          title: '数据已同步',
          description: '来自其他窗口的更新',
        })
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>数据同步示例</CardTitle>
        <CardDescription>展示如何在多个标签页之间同步数据（请打开多个标签页测试）</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="在这里输入内容会同步到其他标签页"
            value={syncData}
            onChange={(e) => setSyncData(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>当前值: {syncData}</p>
        </div>
      </CardContent>
    </Card>
  )
}

// 性能优化示例组件
function PerformanceExample() {
  const [cachedData, setCachedData] = useLocalStorage<{
    data: string[]
    timestamp: number
  }>('cached-data', { data: [], timestamp: 0 })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // 模拟 API 调用
  const fetchData = async () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`))
      }, 1500)
    })
  }

  // 检查缓存是否过期（5分钟）
  const isCacheExpired = () => {
    const CACHE_DURATION = 5 * 60 * 1000 // 5分钟
    return Date.now() - cachedData.timestamp > CACHE_DURATION
  }

  // 加载数据（优先使用缓存）
  const loadData = async () => {
    if (!isCacheExpired() && cachedData.data.length > 0) {
      toast({
        title: '使用缓存数据',
        description: '数据从本地存储加载',
      })
      return
    }

    setLoading(true)
    try {
      const newData = await fetchData()
      setCachedData({
        data: newData,
        timestamp: Date.now(),
      })
      toast({
        title: '数据已更新',
        description: '从服务器获取的新数据已缓存',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '加载失败',
        description: '获取数据时发生错误',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>性能优化示例</CardTitle>
        <CardDescription>展示如何使用本地存储实现数据缓存</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={loadData} disabled={loading}>
            {loading ? '加载中...' : '加载数据'}
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            缓存状态: {isCacheExpired() ? '已过期' : '有效'}
          </p>
          <p className="text-sm text-muted-foreground">
            数据条数: {cachedData.data.length}
          </p>
          {cachedData.data.length > 0 && (
            <div className="max-h-40 overflow-y-auto">
              <div className="space-y-1">
                {cachedData.data.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-sm p-2 bg-secondary rounded">
                    {item}
                  </div>
                ))}
                {cachedData.data.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    ... 等 {cachedData.data.length - 5} 项
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 版本控制示例组件
function VersionControlExample() {
  // 定义数据版本
  const CURRENT_VERSION = 2
  const [versionedData, setVersionedData] = useLocalStorage<{
    version: number
    data: {
      name?: string // v1 字段
      firstName?: string // v2 字段
      lastName?: string // v2 字段
    }
  }>('versioned-data', { version: CURRENT_VERSION, data: {} })
  const { toast } = useToast()

  // 数据迁移函数
  const migrateData = (oldData: any) => {
    // 如果没有版本号，假设是版本1
    const version = oldData.version || 1

    let migratedData = { ...oldData }

    // 版本1到版本2的迁移
    if (version === 1) {
      const [firstName = '', lastName = ''] = (oldData.data.name || '').split(' ')
      migratedData = {
        version: 2,
        data: {
          firstName,
          lastName
        }
      }
    }

    return migratedData
  }

  // 检查并执行数据迁移
  useEffect(() => {
    if (versionedData.version < CURRENT_VERSION) {
      const migratedData = migrateData(versionedData)
      setVersionedData(migratedData)
      toast({
        title: '数据已迁移',
        description: `从版本 ${versionedData.version} 迁移到版本 ${migratedData.version}`,
      })
    }
  }, [])

  // 模拟版本1数据
  const simulateV1Data = () => {
    setVersionedData({
      version: 1,
      data: {
        name: 'John Doe'
      }
    })
    toast({
      title: '已加载 V1 数据',
      description: '数据将自动迁移到最新版本',
    });
  };

  const handleUpdate = (field: 'firstName' | 'lastName', value: string) => {
    setVersionedData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>版本控制示例</CardTitle>
        <CardDescription>展示如何处理数据结构变更和迁移</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>名</Label>
            <Input
              placeholder="输入名"
              value={versionedData.data.firstName || ''}
              onChange={(e) => handleUpdate('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>姓</Label>
            <Input
              placeholder="输入姓"
              value={versionedData.data.lastName || ''}
              onChange={(e) => handleUpdate('lastName', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Button onClick={simulateV1Data} variant="outline">
            模拟加载 V1 版本数据
          </Button>
          <div className="text-sm text-muted-foreground mt-2">
            <p>当前数据版本: {versionedData.version}</p>
            <p>完整数据: {JSON.stringify(versionedData.data)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 页面组件
export default function UseLocalStorageDemo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useLocalStorage Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例学习如何使用 useLocalStorage 在 React 组件中管理本地存储数据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full grid grid-cols-6">
              <TabsTrigger value="basic">基础示例</TabsTrigger>
              <TabsTrigger value="advanced">高级示例</TabsTrigger>
              <TabsTrigger value="error">错误处理</TabsTrigger>
              <TabsTrigger value="sync">数据同步</TabsTrigger>
              <TabsTrigger value="performance">性能优化</TabsTrigger>
              <TabsTrigger value="version">版本控制</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              <BasicExample />
              <Card>
                <CardHeader>
                  <CardTitle>基础示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 使用 useLocalStorage Hook
function BasicExample() {
  const [name, setName] = useLocalStorage<string>("user-name", "");

  // 直接读取和更新本地存储的值
  return (
    <div>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>存储的值: {name}</p>
    </div>
  );
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-4 space-y-4">
              <AdvancedExample />
              <Card>
                <CardHeader>
                  <CardTitle>高级示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 带有过期检查的数据存储
function AdvancedExample() {
  const [data, setData] = useLocalStorage<{
    value: string;
    timestamp: number;
  }>("advanced-data", { value: "", timestamp: 0 });

  const isExpired = () => {
    const ONE_HOUR = 60 * 60 * 1000;
    return Date.now() - data.timestamp > ONE_HOUR;
  };

  return (
    <div>
      <Input
        value={data.value}
        onChange={(e) => setData({
          value: e.target.value,
          timestamp: Date.now()
        })}
      />
      <p>数据状态: {isExpired() ? "已过期" : "有效"}</p>
    </div>
  );
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="error" className="mt-4 space-y-4">
              <ErrorHandlingExample />
              <Card>
                <CardHeader>
                  <CardTitle>错误处理示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 错误处理示例
function ErrorHandlingExample() {
  const handleStoreLargeData = () => {
    try {
      const data = generateLargeData();
      localStorage.setItem('large-data', data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'QuotaExceededError') {
          // 处理存储配额超限错误
        } else {
          // 处理其他错误
        }
      }
    }
  };
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sync" className="mt-4 space-y-4">
              <SyncExample />
              <Card>
                <CardHeader>
                  <CardTitle>数据同步示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 多标签页数据同步
function SyncExample() {
  const [syncData, setSyncData] = useLocalStorage<string>('sync-data', '');

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sync-data' && e.newValue !== null) {
        setSyncData(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-4 space-y-4">
              <PerformanceExample />
              <Card>
                <CardHeader>
                  <CardTitle>性能优化示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 性能优化示例
function PerformanceExample() {
  const [cachedData, setCachedData] = useLocalStorage<{
    data: string[];
    timestamp: number;
  }>('cached-data', { data: [], timestamp: 0 });

  const isCacheExpired = () => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5分钟
    return Date.now() - cachedData.timestamp > CACHE_DURATION;
  };

  const loadData = async () => {
    if (!isCacheExpired() && cachedData.data.length > 0) {
      // 使用缓存数据
      return;
    }
    // 获取新数据并更新缓存
  };
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="version" className="mt-4 space-y-4">
              <VersionControlExample />
              <Card>
                <CardHeader>
                  <CardTitle>版本控制示例代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{`
// 版本控制示例
function VersionControlExample() {
  const CURRENT_VERSION = 2;
  const [versionedData, setVersionedData] = useLocalStorage<{
    version: number;
    data: {
      name?: string;      // v1 字段
      firstName?: string; // v2 字段
      lastName?: string;  // v2 字段
    };
  }>('versioned-data', { version: CURRENT_VERSION, data: {} });

  // 数据迁移函数
  const migrateData = (oldData: any) => {
    const version = oldData.version || 1;
    if (version === 1) {
      // 执行版本1到版本2的数据迁移
      const [firstName = '', lastName = ''] = 
        (oldData.data.name || '').split(' ');
      return {
        version: 2,
        data: { firstName, lastName }
      };
    }
    return oldData;
  };
}
                  `}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}