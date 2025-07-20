'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// 服务器操作 - 表单验证和处理
export async function submitForm(prevState: any, formData: FormData) {
  // 1. 验证表单数据
  const schema = z.object({
    username: z.string().min(3, '用户名至少3个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
  });

  // 2. 解析和验证
  const validationResult = schema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
  });

  // 3. 如果验证失败，返回错误
  if (!validationResult.success) {
    return {
      message: '提交失败',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 4. 模拟服务器处理（数据库操作等）
  const { username, email } = validationResult.data;
  console.log('服务器操作处理数据:', { username, email });

  // 5. 可选：重新验证路径以更新数据
  revalidatePath('/lab/use-server');

  // 6. 返回成功状态
  return {
    message: '提交成功！这是在服务器上处理的结果。',
    errors: {},
  };
}