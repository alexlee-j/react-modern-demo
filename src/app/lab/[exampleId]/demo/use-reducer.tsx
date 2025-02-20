'use client';

import React, { useReducer, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Markdown } from '@/components/markdown';

// Counter 组件的类型定义
interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set_step'; payload: number };

// Counter 组件
const CounterDemo = () => {
  const initialState: CounterState = {
    count: 0,
    step: 1,
  };

  function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          count: state.count + state.step,
        };
      case 'decrement':
        return {
          ...state,
          count: state.count - state.step,
        };
      case 'reset':
        return initialState;
      case 'set_step':
        return {
          ...state,
          step: action.payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl">当前计数: {state.count}</p>
          <p className="text-sm text-gray-500">步长: {state.step}</p>
        </div>
        <div className="space-x-2">
          <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
          <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          className="px-3 py-2 bg-background border rounded-md"
          value={state.step}
          onChange={(e) => dispatch({ 
            type: 'set_step', 
            payload: Number(e.target.value) 
          })}
        >
          <option value="1">步长: 1</option>
          <option value="2">步长: 2</option>
          <option value="5">步长: 5</option>
          <option value="10">步长: 10</option>
        </select>
        <Button variant="outline" onClick={() => dispatch({ type: 'reset' })}>
          重置
        </Button>
      </div>
    </div>
  );
};

// Todo 组件的类型定义
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  error: string | null;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Todo 组件
const TodoDemo = () => {
  const initialState: TodoState = {
    todos: [],
    filter: 'all',
    error: null,
  };

  function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
      case 'ADD_TODO':
        if (!action.payload.trim()) {
          return {
            ...state,
            error: '待办事项不能为空',
          };
        }
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text: action.payload,
              completed: false,
            },
          ],
          error: null,
        };

      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };

      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };

      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload,
        };

      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
        };

      case 'CLEAR_ERROR':
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setNewTodo('');
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription className="flex justify-between items-center">
            <span>{state.error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
            >
              关闭
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="输入新的待办事项..."
          className="flex-1"
        />
        <Button type="submit">添加</Button>
      </form>

      <div className="flex gap-2">
        <Button
          variant={state.filter === 'all' ? 'default' : 'outline'}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          全部
        </Button>
        <Button
          variant={state.filter === 'active' ? 'default' : 'outline'}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          未完成
        </Button>
        <Button
          variant={state.filter === 'completed' ? 'default' : 'outline'}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          已完成
        </Button>
      </div>

      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">暂无待办事项</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() =>
                    dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                  }
                />
                <span
                  className={todo.completed ? 'line-through text-gray-500' : ''}
                >
                  {todo.text}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  dispatch({ type: 'DELETE_TODO', payload: todo.id })
                }
              >
                删除
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>总计: {state.todos.length} 项</span>
        <div className="flex gap-2">
          <Badge variant="outline">
            未完成: {state.todos.filter((todo) => !todo.completed).length}
          </Badge>
          <Badge variant="outline">
            已完成: {state.todos.filter((todo) => todo.completed).length}
          </Badge>
        </div>
      </div>
    </div>
  );
};

// 计数器示例
const CounterExample = () => {
  const codeString = `// 1. 定义状态和动作类型
interface CounterState {
  count: number;
  step: number;
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set_step'; payload: number };

// 2. 创建 reducer 函数
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { count: 0, step: 1 };
    case 'set_step':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

// 3. 使用 useReducer
const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

// 4. 触发动作
dispatch({ type: 'increment' });
dispatch({ type: 'set_step', payload: 2 });`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">计数器示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个基础的 useReducer 示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何定义状态和动作类型</li>
          <li>如何创建和使用 reducer 函数</li>
          <li>如何使用 dispatch 触发状态更新</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <CounterDemo />
      </div>
    </Card>
  );
};

// Todo 列表示例
const TodoExample = () => {
  const codeString = `// 1. 定义类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  error: string | null;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

// 2. 创建 reducer
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// 3. 使用 useReducer
const [state, dispatch] = useReducer(todoReducer, {
  todos: [],
  filter: 'all',
  error: null
});

// 4. 触发动作
dispatch({ type: 'ADD_TODO', payload: '学习 React' });
dispatch({ type: 'TOGGLE_TODO', payload: 1 });
dispatch({ type: 'SET_FILTER', payload: 'active' });`;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">Todo 列表示例</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这是一个更复杂的 useReducer 示例，展示了：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>如何管理复杂的状态对象</li>
          <li>如何处理多种状态更新场景</li>
          <li>如何组织和维护 reducer 逻辑</li>
        </ul>
        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <TodoDemo />
      </div>
    </Card>
  );
};

// 主组件
export default function UseReducerDemo() {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg mb-8 prose">
        <h1>useReducer Hook</h1>
        <p>
          useReducer 是 React 中用于处理复杂状态逻辑的 Hook。它是 useState 的替代方案，
          特别适合那些包含多个子值或者下一个状态依赖于之前的状态的场景。
        </p>
      </div>

      <Tabs defaultValue="counter" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="counter">计数器示例</TabsTrigger>
          <TabsTrigger value="todo">Todo 列表示例</TabsTrigger>
        </TabsList>
        <TabsContent value="counter">
          <CounterExample />
        </TabsContent>
        <TabsContent value="todo">
          <TodoExample />
        </TabsContent>
      </Tabs>

      <div className="prose max-w-none">
        <h2>最佳实践</h2>
        <ul>
          <li>
            <strong>合适的使用场景：</strong>
            <ul>
              <li>当状态逻辑复杂，包含多个子值时</li>
              <li>当状态更新依赖于其他状态时</li>
              <li>当需要集中管理状态逻辑时</li>
            </ul>
          </li>
          <li>
            <strong>避免过度使用：</strong>
            <ul>
              <li>简单的状态管理仍然推荐使用 useState</li>
              <li>不要为了使用而使用，应该根据实际需求选择</li>
            </ul>
          </li>
          <li>
            <strong>保持代码整洁：</strong>
            <ul>
              <li>使用 TypeScript 定义清晰的类型</li>
              <li>为 action 使用描述性的名称</li>
              <li>将复杂的 reducer 逻辑拆分成小函数</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}