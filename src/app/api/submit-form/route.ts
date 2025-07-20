// 新的API路由用于表单提交
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    // 获取表单数据
    const formData = await request.formData();

    // 验证表单数据
    const schema = z.object({
      username: z.string().min(3, '用户名至少3个字符'),
      email: z.string().email('请输入有效的邮箱地址'),
    });

    // 解析和验证
    const validationResult = schema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
    });

    // 如果验证失败，返回错误
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        message: '提交失败',
        errors: validationResult.error.flatten().fieldErrors,
      }, {
        status: 400
      });
    }

    // 模拟服务器处理（数据库操作等）
    const { username, email } = validationResult.data;
    console.log('服务器操作处理数据:', { username, email });

    // 返回成功状态
    return NextResponse.json({
      success: true,
      message: '提交成功！这是在服务器上处理的结果。',
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({
      success: false,
      message: '提交过程中发生错误',
    }, {
      status: 500
    });
  }
}