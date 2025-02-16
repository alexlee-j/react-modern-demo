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
每个 MDX 文档必须包含以下结构：

1. 文档元数据（frontmatter）
---
exampleId: example-id           # 示例的唯一标识符
title: "示例标题"               # 示例的中文标题
description: "示例描述"         # 简短的示例描述
difficulty: 1                   # 难度等级：1(入门) - 5(高级)
category: "分类"               # 主要分类，如：hooks, components, patterns
tags: ["标签1", "标签2"]       # 相关标签
relatedComponents:             # 相关组件路径
  - /app/lab/[exampleId]/demo/example
dependencies:                  # 依赖项及版本
  - react@19.0.0
---

2. 文档结构
# 主标题

## 为什么需要？
解释这个功能的使用场景和解决的问题

## 核心概念
详细解释关键概念和工作原理

## 实现步骤
```jsx live=true
// 可交互的代码示例
function Demo() {
  return <ExampleComponent />
}
```

## 使用说明
基本用法说明

## 进阶用法（可选）
展示高级特性和用法

## 注意事项
常见陷阱和解决方案

## 常见问题
<FAQ 
  questions={[
    {
      q: "问题描述",
      a: "详细解答"
    }
  ]}
/>

## 最佳实践
展示推荐的使用方式，以及不推荐的用法对比

## 相关资源
- 相关文档链接
- 进一步学习资源

## 下一步学习
推荐的后续学习主题

3. 文档编写规范
- 使用中文编写，确保语言通俗易懂
- 代码示例要简洁且实用
- 使用 ✅/❌ 标识推荐和不推荐的做法
- 关键概念要加粗或使用代码块标注
- 示例代码需要添加注释
- 涉及的 API 要链接到官方文档

4. 交互式组件
- FAQ：问答组件
- CodePlayground：代码演示组件
- Alert：警告提示组件
- Tip：提示组件

5. 文档质量检查清单
- [ ] 元数据完整性
- [ ] 结构完整性
- [ ] 示例可运行性
- [ ] 代码注释完整性
- [ ] 中文语言准确性
- [ ] 相关资源有效性
```

#### 3.4 示例代码规范

```markdown
每个示例代码文件必须遵循以下规范：

1. 文件结构
- 使用 TypeScript 编写
- 遵循 'use client' 指令
- 按功能分割成多个子组件
- 导出一个主组件作为入口

2. 示例组织
- 每个示例都应该是独立的、可交互的组件
- 包含完整的说明文字
- 展示关键代码片段
- 提供实际可操作的 UI

3. 代码展示
- 使用卡片布局包装每个示例
- 清晰的标题和描述
- 关键代码片段使用代码块展示
- 代码片段要简洁且有注释

4. 说明文档结构
- 标题：说明示例用途
- 描述：解释示例要点
- 要点列表：使用无序列表
- 代码片段：使用代码块

5. 交互设计
- 提供清晰的操作按钮
- 显示即时反馈
- 处理错误情况
- 添加加载状态

6. 样式规范
- 使用 Tailwind CSS 类名
- 保持一致的间距和边距
- 使用合适的颜色对比度
- 响应式设计

7. 代码质量
- 使用 TypeScript 类型
- 添加适当的注释
- 处理边缘情况
- 实现错误处理

8. 辅助功能
- 语义化 HTML 结构
- 适当的 ARIA 属性
- 键盘可访问性
- 屏幕阅读器支持

示例代码模板：

```tsx
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const ExampleComponent = () => {
  // 状态定义
  const [state, setState] = useState(initialValue);

  // 事件处理
  const handleEvent = () => {
    // 处理逻辑
  };

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-bold">示例标题</h3>
      
      {/* 说明部分 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          示例说明文字
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
          <li>要点 1</li>
          <li>要点 2</li>
          <li>要点 3</li>
        </ul>
        
        {/* 代码展示 */}
        <div className="bg-gray-50 p-3 rounded text-sm">
          <code>{代码片段}</code>
        </div>
      </div>

      {/* 交互部分 */}
      <div className="bg-white p-4 rounded-lg border">
        {/* 交互内容 */}
      </div>
    </Card>
  );
};

export default ExampleComponent;
```
```

#### 3.5 代码展示规范

```markdown
1. 代码高亮组件
- 使用 react-syntax-highlighter 进行代码高亮
- 采用 VSCode Dark Plus 主题
- 支持 TypeScript 语法高亮

2. 代码片段要求
- 展示完整的功能代码
- 包含必要的类型定义
- 添加清晰的注释说明
- 展示最佳实践和注意事项

3. 组件封装
- 使用统一的 Markdown 组件
- 保持一致的样式风格
- 支持自定义类名扩展
- 确保响应式适配

4. 视觉呈现
- 使用合适的字体大小
- 保持适当的内边距
- 添加圆角边框
- 使用衬托的背景色

5. 代码结构
- 按功能组织代码片段
- 突出关键实现部分
- 省略非必要的样板代码
- 保持代码简洁清晰

示例代码：

```tsx
// Markdown 组件实现
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownProps {
  children: string;
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

// 使用示例
const ExampleComponent = () => {
  const codeString = `const [state, setState] = useState(initialValue);
// 更新状态
setState(newValue);`;

  return (
    <div className="space-y-4">
      <h3>示例标题</h3>
      <Markdown className="bg-gray-50 rounded">
        {codeString}
      </Markdown>
    </div>
  );
};
```
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