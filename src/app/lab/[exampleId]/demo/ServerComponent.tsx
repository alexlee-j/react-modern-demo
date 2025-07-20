// 这是一个服务器组件
'use server';

// 定义返回类型接口
interface User {
  id: number;
  name: string;
}

// 优化数据获取函数
async function fetchServerData(): Promise<User[]> {
  // 使用公开测试API替代无效地址，并添加错误处理
  try {
    // 增加超时设置
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      next: { revalidate: 30 }, // 增加重新验证时间到30秒
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // 清除超时计时器

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const users: User[] = await res.json();
    // 提取需要的字段
    return users.map(user => ({ id: user.id, name: user.name }));
  } catch (error) {
    console.error('Data fetch error:', error);
    // 返回默认数据避免应用崩溃
    return [
      { id: 1, name: '默认用户 1' },
      { id: 2, name: '默认用户 2' },
      { id: 3, name: '默认用户 3' }
    ];
  }
}

export default async function ServerComponent() {
  const data = await fetchServerData();

  return (
    <div className="p-3 bg-white rounded-md border">
      <h4 className="font-medium mb-2">服务器获取的数据：</h4>
      <ul className="space-y-2">
        {data.map((item: { id: number; name: string }) => (
          <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.name}</li>
        ))}
      </ul>
    </div>
  );
}