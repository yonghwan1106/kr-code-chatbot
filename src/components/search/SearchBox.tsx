'use client';

import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchBox({ onSearch, isLoading, placeholder }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "철도건설규정 검색 (예: 곡선반지름, 터널단면, 전차선...)"}
          className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-400"
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="mr-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>검색 중</span>
              </div>
            ) : (
              <span className="flex items-center space-x-2">
                <span>검색</span>
                <span>🔍</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 입력 도움말 */}
      {query.length === 0 && (
        <div className="mt-3 text-sm text-gray-500 flex items-center justify-center space-x-4">
          <span className="flex items-center space-x-1">
            <span>💡</span>
            <span>팁: 키워드를 조합해서 검색해보세요</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <span>⚡</span>
            <span>빠른 검색 지원</span>
          </span>
        </div>
      )}
    </form>
  );
}