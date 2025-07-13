'use server';

export async function handleFormSubmit(formData: FormData) {
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true, message: '表单提交成功' };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : '未知错误' };
  }
}