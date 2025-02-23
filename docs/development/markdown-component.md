# Markdown 组件使用规范

## 组件介绍

Markdown 组件是一个用于展示代码示例的组件，基于 `react-syntax-highlighter` 实现，支持语法高亮和自定义样式。

## 代码示例规范

### 1. 命名规范

- 代码示例字符串变量应使用 `xxxCodeString` 的命名方式，其中 `xxx` 表示示例的用途
- 示例：`delayCodeString`、`basicCodeString`、`advancedCodeString`

### 2. 格式要求

```typescript
// 1. 使用模板字符串定义
const exampleCodeString: string = `
// 在这里写代码示例
`;

// 2. 代码缩进要求
const goodExample = `
// 顶级代码从行首开始
function example() {
  // 内部代码使用两个空格缩进
  const value = 1;
  return value;
}
`;

// 3. 注释规范
const commentExample = `
// 1️⃣ 步骤说明使用 emoji + 文字
const step1 = true;

// 2️⃣ 重要概念使用醒目的注释
const important = true;

// 3️⃣ 关键步骤要有详细解释
const key = true;
`;
```

### 3. 内容组织

- 代码示例应该简洁明了，突出重点
- 移除不必要的样式和辅助代码
- 保留必要的类型声明
- 添加清晰的注释说明

### 4. 最佳实践

1. **代码分组**
   ```typescript
   const codeString = `
   // 1️⃣ 状态定义
   const [state, setState] = useState();
   
   // 2️⃣ 副作用处理
   useEffect(() => {
     // 处理逻辑
   }, []);
   
   // 3️⃣ 渲染函数
   return (
     <div>组件内容</div>
   );
   `;
   ```

2. **错误示范对比**
   ```typescript
   // ❌ 不好的写法
   const badExample = `
   function doSomething(){setState(true)}
   `;
   
   // ✅ 好的写法
   const goodExample = `
   function doSomething() {
     setState(true);
   }
   `;
   ```

3. **复杂示例处理**
   - 将复杂示例拆分为多个小的代码片段
   - 每个片段聚焦于特定功能或概念
   - 使用注释说明各个部分的作用

## 组件使用

```typescript
import { Markdown } from '@/components/markdown';

// 基本使用
<Markdown>
  {codeString}
</Markdown>

// 自定义样式
<Markdown className="custom-style">
  {codeString}
</Markdown>
```

## 注意事项

1. 代码字符串中的换行和缩进会被保留
2. 确保代码示例的可读性和可维护性
3. 使用模板字符串可以保持代码格式
4. 避免在代码示例中包含过多的业务逻辑