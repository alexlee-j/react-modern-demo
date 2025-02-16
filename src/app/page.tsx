import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { BookOpen, Search, Star } from 'lucide-react';
import { ExampleCard } from '../types/exampleCard';
import { examples } from '../data/examples';
import { Difficulty, Category } from '../constants/enums';
import { DifficultyLabels, CategoryLabels } from '../constants/labels';

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

const Page: React.FC = () => {
  const totalPages = Math.ceil(examples.length / 6); // Assuming 6 examples per page
  const currentPage = 1; // This should be dynamically set based on user interaction

  return (
    <div className="min-h-screen flex flex-col">
      {/* 固定的头部搜索区域 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4 px-6">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">React 19 学习平台</h1>
            <p className="text-muted-foreground">通过交互式示例学习 React 19 的新特性和最佳实践</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="搜索示例..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select defaultValue={Difficulty.All}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="难度等级" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DifficultyLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={Category.All}>
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
          {examples.slice((currentPage - 1) * 6, currentPage * 6).map((example) => (
            <ExampleCardComponent key={example.id} example={example} />
          ))}
        </div>
      </div>

      {/* 分页区域 */}
      <div className="border-t">
        <div className="container py-6 px-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={i + 1 === currentPage}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Page;
