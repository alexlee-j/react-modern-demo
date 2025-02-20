import { ExampleCard } from '../types/exampleCard';

export const examples: ExampleCard[] = [
  {
    id: "use-form",
    title: "使用 React Hook Form 实现表单验证",
    description: "学习如何使用 React Hook Form 实现表单验证，包括自定义验证规则。",
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
    description: "学习如何使用 useEffect 钩子来处理副作用，包括数据获取、订阅和DOM操作等。",
    difficulty: 2,
    category: "hooks",
    tags: ["副作用", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-context",
    title: "理解 useContext 钩子",
    description: "学习如何使用 useContext 钩子来实现跨组件状态共享，包括主题切换、多语言等场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["状态管理", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-reducer",
    title: "理解 useReducer 钩子",
    description: "学习如何使用 useReducer 钩子来管理复杂的组件状态，包括待办事项、购物车等场景。",
    difficulty: 3,
    category: "hooks",
    tags: ["状态管理", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-callback",
    title: "理解 useCallback 钩子",
    description: "学习如何使用 useCallback 钩子来优化函数组件性能，避免不必要的重渲染。",
    difficulty: 3,
    category: "hooks",
    tags: ["性能优化", "hooks", "react"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-memo",
    title: "理解 useMemo 钩子",
    description: "学习如何使用 useMemo 钩子来优化计算性能，包括缓存计算结果和数组操作。",
    difficulty: 3,
    category: "hooks",
    tags: ["性能优化", "hooks", "react", "缓存"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "use-ref",
    title: "理解 useRef 钩子",
    description: "学习如何使用 useRef 钩子来操作 DOM 元素、存储变量和处理计时器等场景。",
    difficulty: 2,
    category: "hooks",
    tags: ["DOM", "hooks", "react", "引用"],
    lastUpdated: new Date().toISOString(),
  },
];
