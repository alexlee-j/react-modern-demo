"use client"

import React, { use } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/lib/mdx/MDXComponents';
import 'tailwindcss/tailwind.css';

interface ExamplePageProps {
  params: Promise<{
    exampleId: string;
  }>;
}

const ExamplePage: React.FC<ExamplePageProps> = ({ params }) => {
  const { exampleId } = use(params);

  // 动态导入示例组件和文档
  const DemoComponent = dynamic(() => import(`./demo/${exampleId}`), {
    loading: () => <div>加载示例组件中...</div>,
    onError: () => {
      notFound();
      return null;
    },
  });

  const DocsComponent = dynamic(() => import(`./docs/${exampleId}.mdx`), {
    loading: () => <div>加载文档中...</div>,
    onError: () => {
      notFound();
      return null;
    },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 实时演示区域 */}
      <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r overflow-y-auto">
        <DemoComponent />
      </div>

      {/* 文档区域 */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <MDXProvider components={MDXComponents}>
          <article className="prose prose-base prose-neutral dark:prose-invert max-w-none">
            <DocsComponent />
          </article>
        </MDXProvider>
      </div>
    </div>
  );
};

export default ExamplePage;
