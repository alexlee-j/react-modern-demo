以下是为你的学习平台项目整理的完整需求文档，采用「产品需求文档(PRD)」格式编写，便于准确传达给开发实现：

---

# React 19 学习平台需求文档

## 一、项目概述
**目标**：搭建一个通过可交互示例学习React 19的工程化教学平台，具备知识管理系统(KMS)功能

**核心特性**：
1. 中央导航门户：动态展示所有学习案例的入口
2. 双屏学习界面：左侧实时演示，右侧同步文档
3. 自动文档归档：示例与文档双向关联
4. 渐进式学习路径：支持难度分级和标签系统

## 二、详细需求说明

### 1. 工程架构需求
```markdown
- 技术栈：
  • Next.js 15 (App Router)
  • React 19 (带实验性功能)
  • Tailwind CSS + shadcn/ui
  • MDX 2.0

- 关键配置要求：
  ▶ 启用Rust编译器（next.config.js中配置mdxRs）
  ▶ 混合渲染模式（SSG + ISR）
  ▶ 边缘函数支持文档服务
```

### 2. 目录结构规范
```bash
/src
├─ app/
│  ├─ (portal)/          # 门户布局层
│  │  ├─ layout.tsx
│  ├─ lab/               # 学习区
│  │  ├─ [exampleId]/    
│  │  │  ├─ demo/        # 示例组件（客户端组件）
│  │  │  ├─ docs/        # 自动加载对应MDX文档
│  │  │  ├─ page.tsx     # 双栏布局控制器
│  ├─ assets/            # 静态资源
│  │  ├─ examples.json   # 示例元数据
├─ content/
│  ├─ examples/          # MDX文档库
│  │  ├─ {exampleId}.mdx # 文档文件（带YAML头信息）
├─ lib/
│  ├─ mdx/               # 自定义MDX组件
│  │  ├─ CodePlayground.tsx # 交互式代码沙盒
```

### 3. 核心功能模块

#### 3.1 导航门户页
```typescript
interface ExampleCard {
  id: string
  title: string
  description: string
  // 核心元数据
  difficulty: 1-5         // 难度星级
  dependencies: string[]  // 依赖库列表
  lastUpdated: ISOString  // 最后更新时间
  // 智能标签系统
  tags: {
    category: 'hooks' | 'apis' | 'patterns'
    topics: string[]      // 例如['state', 'effect']
  }
}

// 交互需求：
- 三维过滤系统（难度/分类/标签）
- 动态搜索（支持语义化搜索）
- 学习进度可视化（示例完成状态）
```

#### 3.2 示例学习页面
```tsx
// 布局要求：
+-----------------------+
| 示例标题 [难度标签]     |
+---------+-------------+
| 演示区  | 文档区       |
| (交互式)| (自动同步)   |
+---------+-------------+
| 控制面板 [← 返回导航]  |
+-----------------------+

// 功能需求：
- 实时代码编辑（通过Monaco Editor集成）
- 文档区「复制代码」按钮（自动读取示例代码）
- 状态保存功能（即使刷新页面也能保持最后操作状态）
```

#### 3.3 文档系统
```markdown
要求每个MDX文档包含：
---
exampleId: demo1
relatedComponents: 
  - /components/FormValidator
dependencies:
  - react-hook-form@7.4.0
---

## 核心概念
{内容...}

## 实现步骤
```jsx live=true
// 自动关联示例代码
function Demo() {
  return <ExampleComponent />
}
```

## 常见问题
<FAQ 
  questions={[...]}
/>
```

### 4. 开发流程规范

#### 4.1 新建示例流程
```bash
npm run create:example
# 交互式CLI将引导：
1. 输入示例ID（自动生成slug）
2. 选择难度等级
3. 添加分类标签
4. 选择依赖项

# 自动生成：
- 示例组件模板
- 配套MDX文档框架
- 更新examples.json元数据
```

#### 4.2 文档同步机制
```javascript
// 监听文件变化的脚本逻辑
chokidar.watch('content/examples/*.mdx')
  .on('change', (path) => {
    // 自动解析YAML头信息
    // 校验与示例代码的一致性
    // 更新搜索索引
  })
```

### 5. 高级功能需求

#### 5.1 知识图谱系统
```json
{
  "nodes": [
    { "id": "demo1", "type": "example" },
    { "id": "useForm", "type": "hook" }
  ],
  "links": [
    { "source": "demo1", "target": "useForm" }
  ]
}
```
- 可视化展示示例间的关联关系
- 点击节点跳转到相关文档

#### 5.2 实验性功能开关
```tsx
// 在URL中添加特性标志
/lab/demo1?enable=experimental-hook,ssr-mode

// 示例代码中可通过特性开关
if (flags.has('experimental-hook')) {
  useExperimentalHook()
}
```

---

## 三、需要GPT协助的具体事项

1. **Next.js 15配置指导**：
   - 如何为MDX启用Rust编译器
   - 配置增量静态再生(ISR)策略

2. **状态共享方案**：
   ```ts
   // 需要跨示例的共享状态解决方案
   interface LabState {
     currentDependencies: string[]
     activeExperiments: string[]
   }
   ```

3. **动态路由优化**：
   ```tsx
   // 如何实现基于文件系统的动态路由
   export async function generateStaticParams() {
     return getExampleIds().map(id => ({ id }))
   }
   ```

4. **文档系统实现**：
   - MDX自定义组件注册方案
   - 代码块实时预览的Web Worker集成

请根据上述需求文档，优先协助解决**Next.js 15的MDX配置问题**和**示例页面双栏布局的实现**，我们可以从这两个技术点开始逐步推进项目。