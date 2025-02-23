import { ExampleCard } from "../types/exampleCard";

export const examples: ExampleCard[] = [
  {
    id: "use-form",
    title: "使用 React Hook Form 实现表单验证",
    description:
      "学习如何使用 React Hook Form 实现表单验证，包括自定义验证规则。",
    difficulty: 3,
    category: "hooks",
    tags: ["表单", "验证", "hooks"],
    lastUpdated: "2024-02-15",
  },
  {
    id: "suspense-data",
    title: "使用 Suspense 实现数据加载",
    description: "探索 Suspense 新模式，用于处理异步数据加载。",
    difficulty: 4,
    category: "patterns",
    tags: ["suspense", "异步", "加载"],
    lastUpdated: "2024-02-14",
  },
  {
    id: "use-server",
    title: "使用 use server 实现服务器端操作",
    description: "学习如何使用 use server 指令实现服务器端操作。",
    difficulty: 5,
    category: "apis",
    tags: ["服务器", "操作", "表单"],
    lastUpdated: "2024-02-13",
  },
  {
    id: "use-state",
    title: "理解 useState 钩子",
    description: "学习如何使用 useState 钩子来管理函数组件中的状态。",
    difficulty: 1,
    category: "hooks",
    tags: ["状态", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-effect",
    title: "理解 useEffect 钩子",
    description:
      "学习如何使用 useEffect 钩子来处理副作用，包括数据获取、订阅和DOM操作等。",
    difficulty: 2,
    category: "hooks",
    tags: ["副作用", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-context",
    title: "理解 useContext 钩子",
    description:
      "学习如何使用 useContext 钩子来实现跨组件状态共享，包括主题切换、多语言等场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["状态管理", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-reducer",
    title: "理解 useReducer 钩子",
    description:
      "学习如何使用 useReducer 钩子来管理复杂的组件状态，包括待办事项、购物车等场景。",
    difficulty: 3,
    category: "hooks",
    tags: ["状态管理", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-callback",
    title: "理解 useCallback 钩子",
    description:
      "学习如何使用 useCallback 钩子来优化函数组件性能，避免不必要的重渲染。",
    difficulty: 3,
    category: "hooks",
    tags: ["性能优化", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-memo",
    title: "理解 useMemo 钩子",
    description:
      "学习如何使用 useMemo 钩子来优化计算性能，包括缓存计算结果和数组操作。",
    difficulty: 3,
    category: "hooks",
    tags: ["性能优化", "hooks", "react", "缓存"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-ref",
    title: "理解 useRef 钩子",
    description:
      "学习如何使用 useRef 钩子来操作 DOM 元素、存储变量和处理计时器等场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["DOM", "hooks", "react", "引用"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-imperative-handle",
    title: "理解 useImperativeHandle 钩子",
    description:
      "学习如何使用 useImperativeHandle 钩子来自定义暴露给父组件的实例方法，包括表单控制、媒体播放等场景。",
    difficulty: 3,
    category: "hooks",
    tags: ["组件通信", "hooks", "react", "ref"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-layout-effect",
    title: "理解 useLayoutEffect 钩子",
    description:
      "学习如何使用 useLayoutEffect 钩子来处理需要在浏览器重新绘制前执行的 DOM 操作，包括动画、布局测量等场景。",
    difficulty: 4,
    category: "hooks",
    tags: ["DOM", "hooks", "react", "布局", "动画"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-debug-value",
    title: "理解 useDebugValue 钩子",
    description:
      "学习如何使用 useDebugValue 钩子来调试自定义 Hook，包括在线状态、数据获取和复杂计算等场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["调试", "hooks", "react", "开发工具"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-deferred-value",
    title: "理解 useDeferredValue 钩子",
    description:
      "学习如何使用 useDeferredValue 钩子来处理非紧急的 UI 更新，优化大型列表渲染和搜索建议等场景。",
    difficulty: 4,
    category: "hooks",
    tags: ["性能优化", "hooks", "react", "并发"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-id",
    title: "理解 useId 钩子",
    description:
      "学习如何使用 useId 钩子生成稳定的唯一标识符，用于服务端渲染和无障碍访问场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["无障碍", "SSR", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-transition",
    title: "理解 useTransition 钩子",
    description:
      "学习如何使用 useTransition 钩子来实现平滑的过渡效果，包括路由切换、列表动画等场景。",
    difficulty: 4,
    category: "hooks",
    tags: ["动画", "hooks", "react", "过渡"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-local-storage",
    title: "使用 useLocalStorage 管理本地存储",
    description:
      "学习如何使用自定义 Hook 优雅地管理本地存储数据，包含数据同步、过期处理等功能。",
    difficulty: 2,
    category: "hooks",
    tags: ["localStorage", "自定义Hook", "状态管理"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-theme",
    title: "使用 useTheme 实现主题管理",
    description:
      "学习如何使用自定义 Hook 实现主题管理功能，包括主题切换、系统主题同步等特性。",
    difficulty: 2,
    category: "hooks",
    tags: ["主题", "hooks", "自定义Hook", "系统同步"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-media-query",
    title: "使用 useMediaQuery 实现响应式设计",
    description:
      "学习如何使用自定义 Hook 实现响应式设计，包括媒体查询监听、设备特性检测等功能。",
    difficulty: 2,
    category: "hooks",
    tags: ["响应式", "媒体查询", "自定义Hook", "设备特性"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-window-size",
    title: "使用 useWindowSize 监听窗口大小",
    description:
      "学习如何创建自定义 Hook 来监听和响应浏览器窗口大小的变化，包括性能优化和服务端渲染兼容。",
    difficulty: 2,
    category: "hooks",
    tags: ["hooks", "窗口", "响应式"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use",
    title: "理解 use Hook",
    description:
      "学习如何使用 React 19 的 use Hook 来处理 Promise、数据获取和资源加载，包括缓存策略和错误处理。",
    difficulty: 4,
    category: "hooks",
    tags: ["Promise", "数据获取", "资源加载", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
];
