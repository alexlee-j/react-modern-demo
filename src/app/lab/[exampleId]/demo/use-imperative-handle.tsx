'use client';

import React, { useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Markdown } from '@/components/markdown';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// 自定义表单控制器类型
interface CustomFormHandle {
  focus: () => void;
  reset: () => void;
  validate: () => boolean;
  getValue: () => string;
}

// 自定义表单组件属性
interface CustomFormProps {
  label: string;
  defaultValue?: string;
  required?: boolean;
}

// 自定义表单组件
const CustomForm = forwardRef<CustomFormHandle, CustomFormProps>((props, ref) => {
  const { label, defaultValue = '', required = false } = props;
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  // 使用 useImperativeHandle 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    // 聚焦输入框
    focus: () => {
      inputRef.current?.focus();
      toast({
        title: "操作成功",
        description: "输入框已聚焦"
      });
    },
    // 重置表单
    reset: () => {
      setValue(defaultValue);
      setIsValid(true);
      inputRef.current?.classList.remove('border-red-500');
      toast({
        title: "操作成功",
        description: "表单已重置"
      });
    },
    // 验证表单
    validate: () => {
      const valid = required ? value.trim().length > 0 : true;
      setIsValid(valid);
      if (!valid) {
        inputRef.current?.classList.add('border-red-500');
        toast({
          title: "验证失败",
          description: "必填项不能为空",
          variant: "destructive"
        });
      } else {
        inputRef.current?.classList.remove('border-red-500');
        toast({
          title: "验证成功",
          description: "表单验证通过"
        });
      }
      return valid;
    },
    // 获取当前值
    getValue: () => {
      toast({
        title: "当前值",
        description: value || '空'
      });
      return value;
    }
  }), [value, defaultValue, required, toast]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValid(true);
    e.target.classList.remove('border-red-500');
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        {required && <span className="text-red-500 text-sm">*</span>}
      </div>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={required ? '必填项' : '选填项'}
        className={!isValid ? 'border-red-500' : ''}
      />
      {!isValid && (
        <p className="text-red-500 text-sm">此项为必填项</p>
      )}
    </div>
  );
});

CustomForm.displayName = 'CustomForm';

// 主要示例组件
const UseImperativeHandleDemo = () => {
  const formRef = useRef<CustomFormHandle>(null);
  const [lastAction, setLastAction] = useState<string>('');

  // 处理聚焦
  const handleFocus = useCallback(() => {
    formRef.current?.focus();
    setLastAction('聚焦');
  }, []);

  // 处理重置
  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setLastAction('重置');
  }, []);

  // 处理验证
  const handleValidate = useCallback(() => {
    formRef.current?.validate();
    setLastAction('验证');
  }, []);

  // 处理获取值
  const handleGetValue = useCallback(() => {
    formRef.current?.getValue();
    setLastAction('获取值');
  }, []);

  return (
    <div className="space-y-8">
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>useImperativeHandle Hook 示例</CardTitle>
          <CardDescription>
            通过一个简单的表单示例，学习如何使用 useImperativeHandle 来控制子组件
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="demo" className="space-y-4">
            <TabsList>
              <TabsTrigger value="demo">示例演示</TabsTrigger>
              <TabsTrigger value="explanation">原理解释</TabsTrigger>
              <TabsTrigger value="code">实现代码</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>父组件控制子组件示例</CardTitle>
                  <CardDescription className="space-y-2">
                    <p>这个示例展示了父组件如何通过 ref 控制子组件的行为</p>
                    <div className="text-xs space-y-1 mt-2">
                      <p>🔍 观察要点：</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>点击下方按钮，观察表单的变化</li>
                        <li>注意表单验证的视觉反馈</li>
                        <li>查看每个操作的 toast 提示</li>
                      </ul>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CustomForm
                    ref={formRef}
                    label="用户名"
                    required
                    defaultValue=""
                  />
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Button onClick={handleFocus}>
                        聚焦输入框
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        重置表单
                      </Button>
                      <Button variant="secondary" onClick={handleValidate}>
                        验证表单
                      </Button>
                      <Button variant="ghost" onClick={handleGetValue}>
                        获取当前值
                      </Button>
                    </div>
                    {lastAction && (
                      <div className="text-sm text-muted-foreground">
                        最后执行的操作：{lastAction}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explanation">
              <Card>
                <CardHeader>
                  <CardTitle>图解 useImperativeHandle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">🎯 目的</h3>
                      <div className="ml-4">
                        <p>让父组件可以调用子组件的方法，就像遥控器控制电视机一样！</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">🔄 工作流程</h3>
                      <div className="ml-4 space-y-2">
                        <p>1. 子组件定义好"遥控器按钮"（方法）</p>
                        <p>2. 通过 useImperativeHandle 把"遥控器"交给父组件</p>
                        <p>3. 父组件通过 ref 使用这个"遥控器"</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">📝 代码结构</h3>
                      <div className="ml-4 space-y-2">
                        <p>1. <code>forwardRef</code>：创建可以接收 ref 的组件</p>
                        <p>2. <code>useImperativeHandle</code>：定义要暴露的方法</p>
                        <p>3. <code>useRef</code>：在父组件中创建并使用 ref</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">⚡ 使用场景</h3>
                      <div className="ml-4 space-y-2">
                        <p>✅ 适合用在：</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>表单控制（验证、重置等）</li>
                          <li>媒体控制（播放、暂停等）</li>
                          <li>弹窗控制（显示、隐藏等）</li>
                        </ul>
                        <p className="mt-2">❌ 不适合用在：</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>简单的数据传递（用 props 就好）</li>
                          <li>状态管理（用 state 更合适）</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">💡 小贴士</h3>
                      <div className="space-y-2">
                        <p>1. 尽量少用这个 Hook，大多数情况下 props 就够用了</p>
                        <p>2. 只暴露必要的方法，保持简单清晰</p>
                        <p>3. 记得使用 TypeScript 定义好类型，避免调用出错</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>核心代码</CardTitle>
                  <CardDescription>
                    下面是示例的核心代码实现，去掉了样式等次要代码，突出重点
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose-sm">
                    <Markdown>{`
// 1️⃣ 定义接口：告诉 TypeScript 我们要暴露哪些方法
interface CustomFormHandle {
  focus: () => void;    // 聚焦方法
  reset: () => void;    // 重置方法
  validate: () => boolean;  // 验证方法
  getValue: () => string;   // 获取值方法
}

// 2️⃣ 创建组件：使用 forwardRef 接收 ref
const CustomForm = forwardRef<CustomFormHandle, Props>((props, ref) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 3️⃣ 使用 useImperativeHandle 定义要暴露的方法
  useImperativeHandle(ref, () => ({
    // 聚焦输入框
    focus: () => {
      inputRef.current?.focus();
    },
    // 重置表单
    reset: () => {
      setValue('');
    },
    // 验证表单
    validate: () => {
      return value.trim().length > 0;
    },
    // 获取当前值
    getValue: () => value
  }));

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

// 4️⃣ 在父组件中使用
function Parent() {
  // 创建 ref
  const formRef = useRef<CustomFormHandle>(null);

  // 使用子组件暴露的方法
  const handleClick = () => {
    formRef.current?.focus();  // 调用聚焦方法
    const value = formRef.current?.getValue();  // 获取值
  };

  return (
    <CustomForm ref={formRef} />
  );
}
`}</Markdown>
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

export default UseImperativeHandleDemo;
