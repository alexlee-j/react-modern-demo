'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Markdown } from '@/components/markdown';

// 基础计数器示例
const CounterExample = () => {
  const [count, setCount] = useState(0);

  const codeString = `const [count, setCount] = useState(0);

// 更新状态
setCount(count + 1);     // 直接设置新值
setCount(prev => prev + 1); // 使用函数式更新
`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">基础计数器</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是最基础的 useState 示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何声明一个数字类型的状态</li>
          <li>如何使用 setState 函数更新状态</li>
          <li>状态更新后，组件会自动重新渲染</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <p className="mb-2">当前计数: {count}</p>
        <div className="space-x-2">
          <Button onClick={() => setCount(count + 1)}>增加</Button>
          <Button onClick={() => setCount(count - 1)}>减少</Button>
          <Button variant="outline" onClick={() => setCount(0)}>重置</Button>
        </div>
      </div>
    </Card>
  );
};

// 表单状态示例
const FormExample = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  const codeString = `const [formData, setFormData] = useState({
  username: '',
  email: '',
});

// 使用展开运算符更新部分状态
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">表单状态管理</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何管理表单状态：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>使用对象管理多个表单字段</li>
          <li>使用展开运算符更新部分状态</li>
          <li>处理表单提交和验证</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">用户名</label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="请输入用户名"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">邮箱</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="请输入邮箱"
          />
        </div>
        <Button type="submit">提交</Button>
      </form>
    </Card>
  );
};

// 列表管理示例
const TodoListExample = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  const codeString = `const [todos, setTodos] = useState<string[]>([]);

// 添加项目
const addTodo = () => {
  setTodos(prev => [...prev, newItem]);
};

// 删除项目
const removeTodo = (index: number) => {
  setTodos(prev => prev.filter((_, i) => i !== index));
};`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">待办事项列表</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何管理数组类型的状态：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>使用数组存储多个项目</li>
          <li>不直接修改状态，而是创建新数组</li>
          <li>使用函数式更新保证状态更新的可靠性</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入待办事项"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo}>添加</Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span>{todo}</span>
            <Button variant="ghost" size="sm" onClick={() => removeTodo(index)}>删除</Button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// 异步状态示例
const AsyncExample = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData('获取数据成功！');
    } catch (err) {
      setError('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const codeString = `const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<string | null>(null);

// 异步操作的生命周期管理
const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const result = await api.fetchData();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">异步状态管理</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          展示了如何管理异步操作的状态：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>使用多个状态管理加载、错误和数据</li>
          <li>正确处理异步操作的生命周期</li>
          <li>优雅处理错误情况</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <Button 
          onClick={fetchData} 
          disabled={loading}
        >
          {loading ? '加载中...' : '获取数据'}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {data && <p className="text-green-500 mt-2">{data}</p>}
      </div>
    </Card>
  );
};

// 主组件
const UseStateDemo = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-2">useState Hook 示例</h2>
        <p className="text-gray-600">
          本页面展示了 useState 在不同场景下的使用方法。每个示例都包含了详细的说明和代码片段，
          帮助你理解如何在实际项目中正确使用 useState。
        </p>
      </div>
      <CounterExample />
      <FormExample />
      <TodoListExample />
      <AsyncExample />
    </div>
  );
};

export default UseStateDemo;
