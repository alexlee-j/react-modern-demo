'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Difficulty, Category } from '@/constants/enums';

interface ExampleState {
  currentPage: number;
  search: string;
  difficulty: Difficulty;
  category: Category;
  setCurrentPage: (page: number) => void;
  setSearch: (search: string) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setCategory: (category: Category) => void;
}

export const ExampleContext = createContext<ExampleState | undefined>(undefined);

// 从localStorage加载状态
const loadState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const savedState = localStorage.getItem('exampleState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return null;
  }
};

export function ExampleStateProvider({ children }: { children: ReactNode }) {
  // 初始化时从localStorage加载状态
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = loadState();
    return saved?.currentPage || 1;
  });
  const [search, setSearch] = useState(() => {
    const saved = loadState();
    return saved?.search || '';
  });
  const [difficulty, setDifficulty] = useState(() => {
    const saved = loadState();
    return saved?.difficulty || Difficulty.All;
  });
  const [category, setCategory] = useState(() => {
    const saved = loadState();
    return saved?.category || Category.All;
  });

  // 状态变化时保存到localStorage
  useEffect(() => {
    const stateToSave = {
      currentPage,
      search,
      difficulty,
      category
    };
    localStorage.setItem('exampleState', JSON.stringify(stateToSave));
  }, [currentPage, search, difficulty, category]);

  return (
    <ExampleContext.Provider value={{
      currentPage,
      search,
      difficulty,
      category,
      setCurrentPage,
      setSearch,
      setDifficulty,
      setCategory
    }}>
      {children}
    </ExampleContext.Provider>
  );
}