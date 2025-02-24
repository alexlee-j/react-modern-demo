'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect, useCallback, memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Markdown } from '@/components/markdown';
import { handleFormSubmit } from '../actions/form-actions';

// 性能监控 Hook
const useRenderTiming = (name: string) => {
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      console.log(`${name} 渲染耗时: ${endTime - startTime}ms`);
    };
  });
};

// 基础表单示例
const BasicFormExample = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const SubmitButton = memo(function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {pending ? '提交中...' : '提交'}
      </button>
    );
  });

  async function handleSubmit(formData: FormData) {
    const result = await handleFormSubmit(formData);
    if (result.success) {
      toast({
        title: '提交成功',
        description: result.message,
      });
      setFormData({ username: '', email: '' });
    }
  }

  const codeString = `// 基础表单示例
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}

function BasicForm() {
  return (
    <form action={handleSubmit}>
      <input name="username" />
      <SubmitButton />
    </form>
  );
}`;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">基础表单示例</h3>
          <p className="text-sm text-gray-500">
            展示了 useFormStatus 的基本用法，包括：
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
            <li>基本的表单状态管理</li>
            <li>提交按钮状态切换</li>
            <li>简单的表单处理</li>
          </ul>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm">用户名</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">邮箱</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
            />
          </div>
          <SubmitButton />
        </form>

        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
    </Card>
  );
};

// 交互优化示例
const InteractionExample = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [error, setError] = useState<string | null>(null);

  const LoadingSpinner = memo(function LoadingSpinner() {
    const { pending } = useFormStatus();
    if (!pending) return null;
    return (
      <div className="loading-spinner flex justify-center items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
      </div>
    );
  });

  const FormFeedback = memo(function FormFeedback() {
    const { pending } = useFormStatus();
    return (
      <div className="text-sm text-gray-500" role="status" aria-live="polite">
        {pending && '正在处理您的请求...'}
      </div>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  async function handleSubmit(formData: FormData) {
    try {
      const result = await handleFormSubmit(formData);
      if (result.success) {
        toast({
          title: '提交成功',
          description: result.message,
        });
        setFormData({ username: '', email: '' });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    }
  }

  const codeString = `// 交互优化示例
function LoadingSpinner() {
  const { pending } = useFormStatus();
  if (!pending) return null;
  return <div className="spinner" />;
}

function FormFeedback() {
  const { pending } = useFormStatus();
  return (
    <div role="status">
      {pending && '处理中...'}
    </div>
  );
}`;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">交互优化示例</h3>
          <p className="text-sm text-gray-500">
            展示了如何优化表单交互体验：
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
            <li>加载状态指示</li>
            <li>错误处理</li>
            <li>用户反馈</li>
          </ul>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm">用户名</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">邮箱</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
            />
          </div>

          <LoadingSpinner />
          <FormFeedback />

          <Button type="submit">提交</Button>
        </form>

        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
    </Card>
  );
};

// 最佳实践示例
const BestPracticesExample = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    role: 'user'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'username':
        if (value.length < 3) {
          error = '用户名至少需要3个字符';
        }
        break;
      case 'email':
        if (!value.includes('@')) {
          error = '请输入有效的邮箱地址';
        }
        break;
    }
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
    return error;
  }, []);

  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  }, [validateField]);

  const FormFields = memo(function FormFields() {
    useRenderTiming('FormFields');
    const { pending } = useFormStatus();
    
    return (
      <fieldset disabled={pending} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">用户名</label>
          <Input
            name="username"
            value={formState.username}
            onChange={handleFieldChange}
            placeholder="请输入用户名"
            aria-invalid={!!validationErrors.username}
          />
          {validationErrors.username && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">邮箱</label>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleFieldChange}
            placeholder="请输入邮箱"
            aria-invalid={!!validationErrors.email}
          />
          {validationErrors.email && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
          )}
        </div>
      </fieldset>
    );
  });

  const SubmitButton = memo(function SubmitButton() {
    useRenderTiming('SubmitButton');
    const { pending } = useFormStatus();
    
    return (
      <Button type="submit" disabled={pending}>
        {pending ? '提交中...' : '提交'}
      </Button>
    );
  });

  async function handleSubmit(formData: FormData) {
    // 验证所有字段
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    
    const usernameError = validateField('username', username);
    const emailError = validateField('email', email);
    
    if (usernameError || emailError) {
      return;
    }

    try {
      const result = await handleFormSubmit(formData);
      if (result.success) {
        toast({
          title: '提交成功',
          description: result.message,
        });
        setFormState({
          username: '',
          email: '',
          role: 'user'
        });
        setValidationErrors({});
      } else {
        setValidationErrors(prev => ({
          ...prev,
          submit: result.message
        }));
      }
    } catch (err) {
      setValidationErrors(prev => ({
        ...prev,
        submit: err instanceof Error ? err.message : '未知错误'
      }));
    }
  }

  const codeString = `// 最佳实践示例
const FormFields = memo(function FormFields() {
  const { pending } = useFormStatus();
  return (
    <fieldset disabled={pending}>
      {/* 表单字段 */}
    </fieldset>
  );
});

const SubmitButton = memo(function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </Button>
  );
});

function BestPracticesForm() {
  return (
    <form action={handleSubmit}>
      <FormFields />
      <SubmitButton />
    </form>
  );
}`;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">最佳实践示例</h3>
          <p className="text-sm text-gray-500">
            展示了 useFormStatus 的最佳实践：
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
            <li>组件分离与性能优化</li>
            <li>表单验证</li>
            <li>可访问性处理</li>
          </ul>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <FormFields />
          <SubmitButton />
        </form>

        <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
      </div>
    </Card>
  );
};

// 主组件
export default function UseFormStatusDemo() {
  return (
    <div className="space-y-8 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-2">useFormStatus Hook 示例</h2>
        <p className="text-gray-600">
          本页面展示了 useFormStatus 在不同场景下的使用方法。每个示例都包含了详细的说明和代码片段，
          帮助你理解如何在实际项目中正确使用 useFormStatus。
        </p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">基础示例</TabsTrigger>
          <TabsTrigger value="interaction">交互优化</TabsTrigger>
          <TabsTrigger value="best-practices">最佳实践</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicFormExample />
        </TabsContent>

        <TabsContent value="interaction">
          <InteractionExample />
        </TabsContent>

        <TabsContent value="best-practices">
          <BestPracticesExample />
        </TabsContent>
      </Tabs>
    </div>
  );
}