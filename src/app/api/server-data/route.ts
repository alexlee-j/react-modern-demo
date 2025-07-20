// 新的API路由
import { NextResponse } from 'next/server';

// 定义返回类型接口
interface User {
  id: number;
  name: string;
}

// 这是一个服务器函数
async function fetchServerData(): Promise<User[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      next: { revalidate: 30 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const users: User[] = await res.json();
    return users.map(user => ({ id: user.id, name: user.name }));
  } catch (error) {
    console.error('Data fetch error:', error);
    return [
      { id: 1, name: '默认用户 1' },
      { id: 2, name: '默认用户 2' },
      { id: 3, name: '默认用户 3' }
    ];
  }
}

export async function GET() {
  const data = await fetchServerData();
  return NextResponse.json(data);
}