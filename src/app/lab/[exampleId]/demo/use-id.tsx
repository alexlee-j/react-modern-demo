"use client";

import React, { useId, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Markdown } from "@/components/markdown";

// 基础表单字段组件
const FormField = ({
  idPrefix,
  label,
  type = "text",
  value,
  onChange,
}: {
  idPrefix: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const fieldId = `${idPrefix}-${label.toLowerCase()}`;
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        type={type}
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`请输入${label}`}
        aria-required={true}
        aria-invalid={!value}
      />
    </div>
  );
};

// 基础示例组件
const BasicExample = () => {
  const formId = useId();
  const badExampleId = useId();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // 模拟表单提交
    console.log("表单数据：", formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>基础表单示例</CardTitle>
        <CardDescription>
          展示如何使用 useId 关联表单标签和输入框，并处理表单提交
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            <p>✨ 推荐方式：使用单个 useId 作为前缀</p>
            <p className="text-xs mt-1">
              生成的 ID: <code>{formId}</code>
            </p>
          </div>
          <FormField
            idPrefix={formId}
            label="用户名"
            value={formData.username}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, username: value }))
            }
          />
          <FormField
            idPrefix={formId}
            label="邮箱"
            type="email"
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
          />
          <Button type="submit" className="mt-4">
            提交表单
          </Button>
          {submitted && (
            <div className="text-sm text-green-600 mt-2">
              表单已提交！请查看控制台输出。
            </div>
          )}
        </form>

        <div className="mt-6 space-y-4">
          <div className="text-sm text-muted-foreground mb-2">
            <p>⚠️ 不推荐方式：为每个字段使用独立的 useId</p>
            <p className="text-xs mt-1">
              生成的 ID: <code>{badExampleId}</code>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${badExampleId}-name`}>用户名</Label>
            <Input
              type="text"
              id={`${badExampleId}-name`}
              placeholder="请输入用户名"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 无障碍访问示例组件
const AccessibilityExample = () => {
  const dialogId = useId();
  const descriptionId = useId();
  const navigationId = useId();
  const searchId = useId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>无障碍访问示例</CardTitle>
        <CardDescription>
          展示如何使用 useId 实现 WAI-ARIA 属性关联
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 导航区域 */}
        <nav
          aria-labelledby={navigationId}
          role="navigation"
          className="border-b pb-4"
        >
          <h3 id={navigationId} className="sr-only">
            主导航
          </h3>
          <ul className="flex gap-4">
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline"
                role="menuitem"
              >
                首页
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline"
                role="menuitem"
              >
                关于
              </a>
            </li>
          </ul>
        </nav>

        {/* 搜索区域 */}
        <div role="search" aria-labelledby={searchId} className="mb-6">
          <Label id={searchId} htmlFor={`${searchId}-input`}>
            搜索
          </Label>
          <Input
            id={`${searchId}-input`}
            type="search"
            placeholder="输入搜索关键词"
            aria-describedby={`${searchId}-desc`}
          />
          <p
            id={`${searchId}-desc`}
            className="text-xs text-muted-foreground mt-1"
          >
            输入关键词以搜索内容
          </p>
        </div>

        {/* 特性列表 */}
        <div>
          <p id={descriptionId} className="text-sm text-muted-foreground">
            useId 的主要特点：
          </p>
          <ul
            aria-describedby={descriptionId}
            className="list-disc pl-5 space-y-1 text-sm mt-2"
            role="list"
          >
            <li role="listitem">自动生成唯一标识符</li>
            <li role="listitem">支持服务端渲染</li>
            <li role="listitem">确保客户端水合一致性</li>
          </ul>
        </div>

        {/* 对话框 */}
        <div
          role="dialog"
          aria-labelledby={dialogId}
          aria-modal="true"
          aria-expanded={isDialogOpen}
          className="p-4 border rounded-lg bg-secondary"
        >
          <h4 id={dialogId} className="text-lg font-medium">
            对话框标题
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            使用 useId 生成唯一标识符，确保无障碍访问属性的正确关联。
          </p>
          <Button
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            aria-expanded={isDialogOpen}
            className="mt-4"
          >
            {isDialogOpen ? "关闭对话框" : "打开对话框"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// SSR 最佳实践示例组件
const SSRExample = () => {
  const [hydrationError, setHydrationError] = useState(false);

  // 模拟水合错误处理
  useEffect(() => {
    const timeout = setTimeout(() => setHydrationError(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SSR 最佳实践</CardTitle>
        <CardDescription>
          展示 useId 在服务端渲染场景下的最佳实践和水合错误处理
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <p className="text-sm font-medium">🔍 与其他方案对比：</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">方案</th>
                <th className="pb-2">SSR 支持</th>
                <th className="pb-2">稳定性</th>
                <th className="pb-2">推荐场景</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2">useId</td>
                <td className="py-2 text-green-600">✓ 完全支持</td>
                <td className="py-2 text-green-600">高</td>
                <td className="py-2">所有场景</td>
              </tr>
              <tr>
                <td className="py-2">Math.random()</td>
                <td className="py-2 text-red-600">✗ 不支持</td>
                <td className="py-2 text-red-600">低</td>
                <td className="py-2">仅客户端渲染</td>
              </tr>
              <tr>
                <td className="py-2">递增计数器</td>
                <td className="py-2 text-yellow-600">△ 部分支持</td>
                <td className="py-2 text-yellow-600">中</td>
                <td className="py-2">简单场景</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 错误处理演示 */}
        <div className="space-y-4">
          <p className="text-sm font-medium">🚨 水合错误处理示例：</p>
          <div className="p-4 rounded-lg border space-y-2">
            {hydrationError ? (
              <div className="text-red-500 text-sm">
                <p>检测到水合不匹配错误！</p>
                <p className="mt-1 text-xs">
                  这通常是由于服务端和客户端生成的ID不一致导致的。
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                正在检查水合状态...
              </p>
            )}
          </div>
          <div className="text-sm space-y-2">
            <p className="font-medium">💡 最佳实践建议：</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>始终使用 useId 生成唯一标识符</li>
              <li>避免使用随机数或全局计数器</li>
              <li>确保服务端和客户端的渲染结果一致</li>
              <li>在需要多个ID时复用同一个useId的结果</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UseIdDemo = () => {
  const basicCode = `// 基础表单字段组件
const FormField = ({ idPrefix, label, type = "text", value, onChange }) => {
  const fieldId = \`\${idPrefix}-\${label.toLowerCase()}\`;
  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        type={type}
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={\`请输入\${label}\`}
        aria-required={true}
        aria-invalid={!value}
      />
    </div>
  );
};

// 基础示例组件
const BasicExample = () => {
  const formId = useId();
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  return (
    <form className="space-y-4">
      {/* 推荐方式：使用单个 useId 作为前缀 */}
      <FormField 
        idPrefix={formId} 
        label="用户名" 
        value={formData.username}
        onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
      />
      <FormField 
        idPrefix={formId} 
        label="邮箱" 
        type="email" 
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
      />
    </form>
  );
};`;

  const accessibilityCode = `// 无障碍访问示例组件
const AccessibilityExample = () => {
  const dialogId = useId();
  const descriptionId = useId();
  const navigationId = useId();
  const searchId = useId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* 导航区域 */}
      <nav
        aria-labelledby={navigationId}
        role="navigation"
      >
        <h3 id={navigationId} className="sr-only">主导航</h3>
        <ul className="flex gap-4">
          <li><a href="#" role="menuitem">首页</a></li>
          <li><a href="#" role="menuitem">关于</a></li>
        </ul>
      </nav>

      {/* 搜索区域 */}
      <div role="search" aria-labelledby={searchId}>
        <Label id={searchId} htmlFor={\`\${searchId}-input\`}>搜索</Label>
        <Input
          id={\`\${searchId}-input\`}
          type="search"
          placeholder="输入搜索关键词"
          aria-describedby={\`\${searchId}-desc\`}
        />
        <p id={\`\${searchId}-desc\`} className="text-xs text-muted-foreground">
          输入关键词以搜索内容
        </p>
      </div>

      {/* 对话框 */}
      <div
        role="dialog"
        aria-labelledby={dialogId}
        aria-modal="true"
        aria-expanded={isDialogOpen}
      >
        <h4 id={dialogId}>对话框标题</h4>
        <p>使用 useId 生成唯一标识符，确保无障碍访问属性的正确关联。</p>
        <Button 
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          aria-expanded={isDialogOpen}
        >
          {isDialogOpen ? '关闭对话框' : '打开对话框'}
        </Button>
      </div>
    </div>
  );
};`;

  const ssrCode = `// SSR 最佳实践

// ✅ 推荐：使用 useId
function GoodExample() {
  const id = useId();
  return <div id={id}>内容</div>;
}

// ❌ 不推荐：使用随机值
function BadExample() {
  // 在 SSR 时会导致客户端和服务端不一致
  const id = Math.random().toString();
  return <div id={id}>内容</div>;
}

// ❌ 不推荐：使用递增计数器
let counter = 0;
function BadExample2() {
  // 在并发渲染时可能会出现问题
  const id = counter++;
  return <div id={id}>内容</div>;
}

💡 最佳实践建议：
1. 始终使用 useId 生成唯一标识符
2. 避免使用随机数或全局计数器
3. 确保服务端和客户端的渲染结果一致
4. 在需要多个ID时复用同一个useId的结果`;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useId Hook 示例</CardTitle>
          <CardDescription>
            通过表单和对话框示例，学习如何使用 useId 生成唯一标识符
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">基础示例</TabsTrigger>
              <TabsTrigger value="accessibility">无障碍访问</TabsTrigger>
              <TabsTrigger value="ssr">SSR 最佳实践</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <BasicExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{basicCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4">
              <AccessibilityExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{accessibilityCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ssr" className="space-y-4">
              <SSRExample />
              <Card>
                <CardHeader>
                  <CardTitle>实现代码</CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown>{ssrCode}</Markdown>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UseIdDemo;
