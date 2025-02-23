import { useEffect, useState } from "react";

/**
 * useMediaQuery Hook 配置选项
 */
interface UseMediaQueryOptions {
  /** 是否启用防抖 */
  debounce?: boolean;
  /** 防抖延迟时间（毫秒） */
  debounceDelay?: number;
}

/**
 * useMediaQuery Hook
 * 用于监听媒体查询状态变化的自定义 Hook
 *
 * @param query - CSS 媒体查询字符串
 * @param options - 配置选项
 * @returns 当前媒体查询的匹配状态
 *
 * @example
 * ```tsx
 * // 基础用法
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * // 带防抖的用法
 * const isTablet = useMediaQuery('(max-width: 1024px)', {
 *   debounce: true,
 *   debounceDelay: 500
 * });
 * ```
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  const { debounce = false, debounceDelay = 300 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 创建媒体查询
    const mediaQuery = window.matchMedia(query);

    // 初始化匹配状态
    setMatches(mediaQuery.matches);

    // 处理媒体查询变化
    const handleChange = (event: MediaQueryListEvent) => {
      if (debounce) {
        const timer = setTimeout(() => {
          setMatches(event.matches);
        }, debounceDelay);
        return () => clearTimeout(timer);
      } else {
        setMatches(event.matches);
      }
    };

    // 添加事件监听
    mediaQuery.addEventListener("change", handleChange);

    // 清理函数
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query, debounce, debounceDelay]);

  return matches;
}
