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
];
