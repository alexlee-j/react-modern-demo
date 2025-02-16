import { Difficulty, Category } from './enums';

export const DifficultyLabels: Record<Difficulty, string> = {
  [Difficulty.All]: '全部难度',
  [Difficulty.Beginner]: '入门',
  [Difficulty.Basic]: '基础',
  [Difficulty.Intermediate]: '中级',
  [Difficulty.Advanced]: '高级',
  [Difficulty.Expert]: '专家',
};

export const CategoryLabels: Record<Category, string> = {
  [Category.All]: '全部分类',
  [Category.Hooks]: 'Hooks',
  [Category.APIs]: 'APIs',
  [Category.Patterns]: '模式',
};
