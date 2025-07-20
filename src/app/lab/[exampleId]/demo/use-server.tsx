'use client';

import { useState, useEffect } from 'react';

// 客户端组件不再直接导入服务器组件

export default function UseServerDemo() {
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ id: number; name: string }[]>([]);

  // 使用客户端数据获取替代服务器组件
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/server-data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // 设置默认数据
        setData([
          { id: 1, name: '默认用户 1' },
          { id: 2, name: '默认用户 2' },
          { id: 3, name: '默认用户 3' }
        ]);
        setIsLoading(false);
      });
  }, [refresh]);

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">服务器组件与服务器操作示例</h2>

      <section className="p-4 border rounded-lg bg-blue-50">
        <h3 className="text-xl font-semibold mb-2">服务器数据获取</h3>
        <p className="text-gray-600 mb-3">数据通过API路由在服务器端获取</p>
        
        {isLoading ? (
          <div className="p-3 bg-white rounded-md border flex items-center justify-center">
            <p>加载中...</p>
          </div>
        ) : (
          <div className="p-3 bg-white rounded-md border">
            <h4 className="font-medium mb-2">服务器获取的数据：</h4>
            <ul className="space-y-2">
              {data.map((item) => (
                <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setRefresh(prev => prev + 1)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          刷新数据
        </button>
      </section>

      <section className="p-4 border rounded-lg bg-green-50">
        <h3 className="text-xl font-semibold mb-2">服务器操作</h3>
        <p className="text-gray-600 mb-3">表单提交直接在服务器处理，不经过客户端 API 调用</p>
        <form action="/api/submit-form" method="post" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">用户名</label>
            <input
              type="text"
              name="username"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">邮箱</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
          >
            提交（服务器操作）
          </button>
        </form>
      </section>
    </div>
  );
}