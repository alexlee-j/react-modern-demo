'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { BookOpen, Search, Star } from 'lucide-react';
import { ExampleCard } from '@/types/exampleCard';
import { Difficulty, Category } from '@/constants/enums';
import { DifficultyLabels, CategoryLabels } from '@/constants/labels';
import { fetchExamples } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface ExampleCardComponentProps {
  example: ExampleCard;
}

const ExampleCardComponent: React.FC<ExampleCardComponentProps> = ({ example }) => (
  <Card key={example.id} className="flex flex-col hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <Badge variant="secondary" className="w-fit">
          {example.category}
        </Badge>
        <div className="flex text-yellow-500">
          {[...Array(example.difficulty)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>
      <CardTitle className="text-xl leading-tight">{example.title}</CardTitle>
      <CardDescription className="line-clamp-2">{example.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1">
      <div className="flex flex-wrap gap-2">
        {example.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="border-t pt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4" />
        <span>最后更新: {new Date(example.lastUpdated).toLocaleDateString("zh-CN")}</span>
      </div>
    </CardFooter>
  </Card>
);

// 加载状态卡片组件
const LoadingCard = () => (
  <Card className="flex flex-col">
    <CardHeader>
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3 mt-2" />
    </CardHeader>
    <CardContent className="flex-1">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </CardContent>
    <CardFooter className="border-t pt-4">
      <Skeleton className="h-4 w-40" />
    </CardFooter>
  </Card>
);

const ITEMS_PER_PAGE = 6;

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [difficulty, setDifficulty] = React.useState(Difficulty.All);
  const [category, setCategory] = React.useState(Category.All);
  const [loading, setLoading] = React.useState(false);
  const [examples, setExamples] = React.useState<ExampleCard[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const { toast } = useToast();

  // 防抖搜索
  const debouncedSearch = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearch(value);
        setCurrentPage(1);
      }, 300);
    };
  }, []);

  // 加载数据
  const loadExamples = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchExamples({
        page: currentPage,
        pageSize: ITEMS_PER_PAGE,
        search,
        difficulty,
        category,
      });
      setExamples(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: error instanceof Error ? error.message : "加载数据失败，请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, difficulty, category, toast]);

  // 监听筛选条件变化
  React.useEffect(() => {
    loadExamples();
  }, [loadExamples]);

  // 生成分页按钮
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // 总是显示第一页
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages <= maxVisiblePages) {
      // 如果总页数较少，显示所有页码
      for (let i = 2; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              href="#" 
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // 如果总页数较多，使用省略号
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // 显示当前页附近的页码
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              href="#" 
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // 总是显示最后一页
      if (totalPages > 1) {
        items.push(
          <PaginationItem key="last">
            <PaginationLink 
              href="#" 
              isActive={currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* 固定的头部搜索区域 */}
        <div className="sticky top-0 z-10 bg-background/95 bg-white supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container py-4 px-6">
            <div className="space-y-2 mb-6">
              <h1 className="text-3xl font-bold tracking-tight">React 19 学习平台</h1>
              <p className="text-muted-foreground">通过交互式示例学习 React 19 的新特性和最佳实践</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="搜索示例..." 
                  className="pl-10" 
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select 
                  value={difficulty} 
                  onValueChange={(value) => {
                    setDifficulty(value as Difficulty);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="难度等级" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DifficultyLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value as Category);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CategoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1 container py-6 px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              // 加载状态
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div key={index} className="animate-fadeIn">
                  <LoadingCard />
                </div>
              ))
            ) : examples.length > 0 ? (
              // 展示数据
              examples.map((example) => (
                <div
                  key={example.id}
                  className="transition-all duration-300 animate-fadeIn hover:scale-[1.02]"
                >
                  <a href={`/lab/${example.id}`} className="block">
                    <ExampleCardComponent example={example} />
                  </a>
                </div>
              ))
            ) : (
              // 空状态
              <div className="col-span-full text-center py-12 text-muted-foreground animate-fadeIn">
                没有找到匹配的示例
              </div>
            )}
          </div>
        </div>

        {/* 分页区域 */}
        {!loading && examples.length > 0 && (
          <div className="border-t">
            <div className="container py-6 px-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                    />
                  </PaginationItem>
                  {generatePaginationItems()}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Page;
