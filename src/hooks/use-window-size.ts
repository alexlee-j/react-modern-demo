import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  // 初始化状态为 undefined，用于服务端渲染兼容
  const [windowSize, setWindowSize] = useState<WindowSize | undefined>();

  useEffect(() => {
    // 处理窗口大小变化的函数
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 初始化窗口大小
    handleResize();

    // 清理函数
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 空依赖数组，只在组件挂载时运行

  return windowSize;
};

export default useWindowSize;