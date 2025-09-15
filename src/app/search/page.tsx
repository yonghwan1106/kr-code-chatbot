'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBox from '@/components/search/SearchBox';
import SearchResults from '@/components/search/SearchResults';
import Navbar from '@/components/layout/Navbar';

interface RegulationResult {
  code: string;
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  legal_basis?: string;
  relevanceScore: number;
  sections?: Array<{
    number: string;
    title: string;
    content: string;
  }>;
}

export default function SearchPage() {
  const [results, setResults] = useState<RegulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    '곡선반지름',
    '터널단면',
    '전차선 절연거리',
    '신호기 설치',
    '차량한계'
  ]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('검색 요청 실패');
      }

      const data = await response.json();
      setResults(data.regulations || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold">규정 검색</h1>
                <p className="text-blue-100">
                  500여개 철도건설규정을 빠르게 검색하세요
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchBox
              onSearch={handleSearch}
              isLoading={isLoading}
            />

            {/* 추천 검색어 */}
            {!query && (
              <div className="mt-6">
                <div className="text-blue-100 text-sm mb-3 text-center">🏷️ 인기 검색어</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 border border-white/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 검색 통계 */}
            {!query && (
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-100 text-sm">철도건설규정</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">&lt;1초</div>
                  <div className="text-blue-100 text-sm">평균 검색시간</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-blue-100 text-sm">검색 정확도</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <SearchResults
          results={results}
          query={query}
          isLoading={isLoading}
        />
      </div>

      {/* Footer */}
      {!isLoading && results.length === 0 && !query && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🚄</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              철도건설규정 통합검색
            </h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              500여개 철도건설규정을 빠르고 정확하게 검색할 수 있습니다.<br />
              키워드를 입력하여 관련 규정을 찾아보세요.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">빠른 검색</h3>
                <p className="text-sm text-gray-600">
                  키워드 기반 고속 검색으로<br />
                  원하는 규정을 즉시 찾기
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-green-600 text-2xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">정확한 매칭</h3>
                <p className="text-sm text-gray-600">
                  관련도 순으로 정렬된<br />
                  정확한 검색 결과 제공
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-purple-600 text-2xl mb-3">📋</div>
                <h3 className="font-semibold mb-2">상세 정보</h3>
                <p className="text-sm text-gray-600">
                  규정 조항, 법적 근거<br />
                  등 상세 정보까지 제공
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}