import { ExampleCard } from '@/types/exampleCard';
import { examples } from '@/data/examples';
import { Category, Difficulty } from '@/constants/enums';
import { cache } from '@/lib/cache';

export interface ExamplesQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  difficulty?: Difficulty;
  category?: Category;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟服务端过滤和分页逻辑
export const fetchExamples = async (params: ExamplesQueryParams): Promise<PaginatedResponse<ExampleCard>> => {
  try {
    // 尝试从缓存获取数据
    const cachedData = cache.get<PaginatedResponse<ExampleCard>>('examples', params);
    if (cachedData) {
      return cachedData;
    }

    // 模拟网络延迟
    await delay(300);

    // 过滤逻辑
    let filteredExamples = examples.filter(example => {
      const matchesSearch = !params.search || 
        example.title.toLowerCase().includes(params.search.toLowerCase()) ||
        example.description.toLowerCase().includes(params.search.toLowerCase()) ||
        example.tags.some(tag => tag.toLowerCase().includes(params.search.toLowerCase()));
      
      const matchesDifficulty = !params.difficulty || 
        params.difficulty === Difficulty.All || 
        example.difficulty === Number(params.difficulty);

      const matchesCategory = !params.category || 
        params.category === Category.All || 
        example.category === params.category;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // 计算分页
    const total = filteredExamples.length;
    const totalPages = Math.ceil(total / params.pageSize);
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    
    // 切片获取当前页数据
    const data = filteredExamples.slice(start, end);

    const response = {
      data,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages
    };

    // 缓存数据
    cache.set('examples', response, params, 5 * 60 * 1000); // 缓存 5 分钟

    return response;
  } catch (error) {
    console.error('Failed to fetch examples:', error);
    throw new Error('获取示例数据失败，请稍后重试');
  }
};
