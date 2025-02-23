"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Markdown } from "@/components/markdown";

// 基础示例：主题切换
const BasicThemeExample = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>基础主题切换</CardTitle>
        <CardDescription>
          展示如何使用 useTheme 实现基本的主题切换功能
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
          <span>当前主题：{theme}</span>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">主题预览</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                这是一段示例文本，用于展示当前主题下的文字样式和颜色。
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="default">主按钮</Button>
                <Button variant="secondary">次按钮</Button>
                <Button variant="outline">边框按钮</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

// 系统主题同步示例
const SystemThemeExample = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>系统主题同步</CardTitle>
        <CardDescription>展示如何与系统主题设置同步</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={theme}
          onValueChange={(value) =>
            setTheme(value as "light" | "dark" | "system")
          }
        >
          <TabsList>
            <TabsTrigger value="light">浅色</TabsTrigger>
            <TabsTrigger value="dark">深色</TabsTrigger>
            <TabsTrigger value="system">跟随系统</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="p-4 bg-secondary/50 rounded">
          <p className="text-sm font-medium mb-2">当前主题设置：</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 选择的主题：{theme}</li>
            <li>
              • 系统主题：
              {window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "深色"
                : "浅色"}
            </li>
            <li>• 存储位置：localStorage (theme)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// 最佳实践示例
const BestPracticesExample = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最佳实践</CardTitle>
        <CardDescription>使用 useTheme 的关键点和注意事项</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose-sm space-y-4">
          <div>
            <h3 className="text-lg font-medium">🎯 适用场景</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>需要全局主题管理的应用</li>
              <li>支持多主题切换的系统</li>
              <li>需要响应系统主题的场景</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">💡 使用建议</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>使用 CSS 变量管理主题颜色</li>
              <li>考虑系统主题同步</li>
              <li>使用 localStorage 持久化主题设置</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">⚠️ 注意事项</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>确保 Provider 包裹整个应用</li>
              <li>避免频繁切换主题</li>
              <li>注意主题切换时的过渡效果</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 示例代码
const basicCode = `
// 基础主题切换示例
const BasicThemeExample = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
      <span>当前主题：{theme}</span>
    </div>
  );
};
`;

const systemCode = `
// 系统主题同步示例
const SystemThemeExample = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs value={theme} onValueChange={(value) => setTheme(value)}>
      <TabsList>
        <TabsTrigger value="light">浅色</TabsTrigger>
        <TabsTrigger value="dark">深色</TabsTrigger>
        <TabsTrigger value="system">跟随系统</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
`;

// 主组件
const UseThemeExample = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>useTheme Hook 示例</CardTitle>
          <CardDescription>
            通过实际示例学习如何使用 useTheme Hook 实现主题切换功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">基础示例</TabsTrigger>
              <TabsTrigger value="system">系统同步</TabsTrigger>
              <TabsTrigger value="practices">最佳实践</TabsTrigger>
              <TabsTrigger value="code">实现代码</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicThemeExample />
            </TabsContent>

            <TabsContent value="system">
              <SystemThemeExample />
            </TabsContent>

            <TabsContent value="practices">
              <BestPracticesExample />
            </TabsContent>

            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>示例代码</CardTitle>
                  <CardDescription>
                    下面是示例的核心代码实现，去掉了样式等次要代码，突出重点
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">基础示例</h3>
                      <Markdown>{basicCode}</Markdown>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">系统同步示例</h3>
                      <Markdown>{systemCode}</Markdown>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UseThemeExample;
