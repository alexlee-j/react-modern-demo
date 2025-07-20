'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Markdown } from '@/components/markdown';

// 表单数据类型定义
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormExample = () => {
  // 使用 useForm 钩子
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // 监听密码变化
  const password = watch('password');

  // 提交处理函数
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('表单提交数据:', data);
    alert('表单提交成功! 查看控制台获取详细数据');
    reset();
  };

  const codeString = `// 使用 useForm 钩子
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  watch
} = useForm<FormData>({
  defaultValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
});

// 提交处理函数
const onSubmit: SubmitHandler<FormData> = (data) => {
  console.log('表单提交数据:', data);
  alert('表单提交成功!');
  reset();
};`;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">React Hook Form 示例</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          这个示例展示了如何使用 React Hook Form 实现表单验证：
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>基本表单字段验证</li>
          <li>密码匹配验证</li>
          <li>错误信息展示</li>
          <li>表单提交处理</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            {...register('username', {
              required: '用户名不能为空',
              minLength: {
                value: 3,
                message: '用户名至少需要3个字符'
              }
            })}
            className={errors.username ? 'border-red-500' : ''}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: '邮箱不能为空',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '请输入有效的邮箱地址'
              }
            })}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: '密码不能为空',
              minLength: {
                value: 6,
                message: '密码至少需要6个字符'
              }
            })}
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">确认密码</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: '请确认密码',
              validate: value =>
                value === password || '两次输入的密码不一致'
            })}
            className={errors.confirmPassword ? 'border-red-500' : ''}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit">提交</Button>
      </form>

      <Markdown className="text-sm bg-gray-50 p-3 rounded">{codeString}</Markdown>
    </Card>
  );
};

export default FormExample;