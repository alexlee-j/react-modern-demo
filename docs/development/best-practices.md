# React Hooks 开发最佳实践

## 开发流程优化

### 1. 示例入口管理
- 示例配置统一在 `src/data/examples.ts` 中管理
- 新示例必须先在 examples.ts 中添加配置信息
- 配置信息包含：
  ```typescript
  {
    id: string;          // 示例标识符，使用 kebab-case 格式
    title: string;       // 示例标题，简明扼要
    description: string; // 示例描述，说明用途和特点
    difficulty: number;  // 难度等级（1-5）
    category: string;    // 分类，如：'Hooks'、'Components'、'Patterns'
    tags: string[];     // 标签，如：['useState', 'Performance', 'TypeScript']
    lastUpdated: string; // 最后更新时间，格式：'YYYY-MM-DD'
  }
  ```

#### 示例入口添加流程
1. 在 `src/data/examples.ts` 中添加示例配置：
   ```typescript
   import { ExampleConfig } from '@/types/exampleCard'

   export const examples: ExampleConfig[] = [
     {
       id: 'use-state-demo',
       title: 'useState 基础用法',
       description: '展示 React useState 钩子的基本使用方法',
       difficulty: 1,
       category: 'Hooks',
       tags: ['useState', 'Basic'],
       lastUpdated: '2024-01-15'
     }
   ]
   ```

2. 创建示例目录结构：
   ```bash
   src/app/lab/[example-id]/
   ├── demo/
   │   └── page.tsx      # 示例组件
   ├── docs/
   │   └── content.mdx   # 示例文档
   └── page.tsx          # 布局组件
   ```

3. 实现示例组件和文档：
   - 组件实现在 `src/app/lab/[exampleId]/demo/xxxx.tsx`
   - 文档编写在 `src/app/lab/[exampleId]/docs/xxxx.mdx`
   - 使用 Markdown 组件展示代码

4. 验证示例：
   - 确保示例可以正常运行
   - 检查文档渲染效果
   - 验证代码展示格式

### 2. 示例结构规范
- 每个示例必须包含可运行的演示
- 必须展示完整的示例代码
- 添加详细的代码注释和要点解析

### 3. 目录结构规范
```bash
/src
├─ app/
│  ├─ page.tsx          # 主页面，负责展示示例列表
│  ├─ lab/
│  │  ├─ [exampleId]/   
│  │  │  ├─ demo/       # 示例组件（客户端组件）
│  │  │  ├─ docs/       # 自动加载对应MDX文档
│  │  │  ├─ page.tsx    # 双栏布局控制器
├─ data/
│  ├─ examples.ts       # 示例配置文件
```

## 性能优化指南

### 1. 计算复杂度控制
- 计算复杂度要适中：展示性能差异但不卡顿
- 斐波那契计算：建议范围 20-30，最大 45
- 数组操作：建议大小 5000，每项计算 50 次

### 2. 代码展示优化
- 使用统一的代码高亮方案
- 支持代码复制功能
- 优化移动端显示效果

### 3. 交互体验优化
- 添加加载状态提示
- 实现错误边界处理
- 优化响应式布局

## 文档编写规范

### 1. 文档结构
- 清晰的导航目录
- 渐进式的内容组织
- 详细的示例解析

### 2. 代码展示
- 完整的示例代码
- 详细的注释说明
- 关键点解析

#### Markdown 组件代码展示规范
- 代码块语言标记必须正确指定，如：
  ```markdown
  ```tsx
  // React 组件代码
  ```
  ```

- 代码示例命名规范：
  - 组件文件：`ComponentName.tsx`
  - 钩子文件：`useHookName.ts`
  - 工具函数：`utilName.ts`

- 代码块格式要求：
  - 使用 `@/components/markdown` 组件进行代码展示
  - 代码缩进统一使用 2 空格
  - 关键代码必须添加行内注释
  - 复杂逻辑需要代码块注释说明

- 示例：
  ```tsx
  import { Markdown } from '@/components/markdown'

  export default function ExamplePage() {
    return (
      <Markdown>
        ```tsx
        // 导入必要的依赖
        import { useState } from 'react'

        // 定义组件接口
        interface Props {
          initialCount: number
        }

        // 实现组件逻辑
        export function Counter({ initialCount }: Props) {
          const [count, setCount] = useState(initialCount)

          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
            </div>
          )
        }
        ```
      </Markdown>
    )
  }
  ```

### 3. 最佳实践
- 常见问题解答
  - 问题格式规范：
    ```markdown
    ## 常见问题
    ### Q1: [问题描述]
    **问题描述**：清晰简洁地描述问题场景
    
    **问题代码**：
    ```tsx
    // 问题代码示例
    ```
    
    **解决方案**：
    1. 详细的解决步骤
    2. 最佳实践建议
    3. 注意事项
    
    **正确示例**：
    ```tsx
    // 正确的代码实现
    ```
    ```
- 性能优化建议
- 实际应用场景

### 开发后，注意事项
请review对应示例，站在教学者的角度，教学react 19，若觉得内容完整后，则表示该示例已完成，标记为已完成。

#### 示例完成标准

##### 1. 示例结构完整性
- 是否包含完整的演示组件
- 是否提供了详细的代码注释
- 是否展示了多个使用场景
- 是否覆盖了常见的错误处理

##### 2. 文档内容质量
- API 说明是否清晰完整
- 是否包含详细的最佳实践指南
- 是否提供了常见问题解答
- 是否有性能优化建议

##### 3. 代码质量要求
- 代码是否符合最新的 React 19 规范
- 是否使用了推荐的 Hooks 模式
- 是否避免了常见的反模式
- 是否包含必要的类型定义

##### 4. 教学效果评估
- 示例是否循序渐进
- 是否突出重点难点
- 是否有清晰的知识脉络
- 是否提供了实际应用场景

##### 5. 交互体验
- 是否有良好的错误提示
- 是否支持响应式布局
- 是否优化了加载状态
- 是否考虑了边界情况

以上标准全部满足后，方可将示例标记为已完成。每个示例都应该经过完整的自查和评审流程，确保教学质量。