'use client';

import React from 'react';
import Link from 'next/link';

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

interface SearchResultsProps {
  results: RegulationResult[];
  query?: string;
  isLoading?: boolean;
}

export default function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow border animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="text-4xl">🔍</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          <span className="font-medium text-blue-600">&quot;{query}&quot;</span>와 관련된 규정을 찾을 수 없습니다.<br />
          다른 키워드로 검색하거나 AI 챗봇에게 질문해보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/chat"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            💬 챗봇으로 질문하기
          </Link>
          <button
            className="text-blue-600 hover:text-blue-700 px-4 py-2 font-medium transition-colors"
            onClick={() => window.location.reload()}
          >
            🔄 다시 검색하기
          </button>
        </div>

        {/* 검색 제안 */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">💡 검색 팁</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded-lg">
              <span className="font-medium text-blue-600">구체적 키워드:</span> &quot;곡선반지름&quot;, &quot;터널단면&quot;
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="font-medium text-green-600">조합 검색:</span> &quot;고속철도 곡선&quot;
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="font-medium text-purple-600">분야별:</span> &quot;노반&quot;, &quot;전기&quot;, &quot;신호&quot;
            </div>
            <div className="bg-white p-3 rounded-lg">
              <span className="font-medium text-orange-600">수치 포함:</span> &quot;250km/h&quot;, &quot;2500m&quot;
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="text-4xl">📋</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          규정을 검색해보세요
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          위의 검색창에 궁금한 철도건설규정 키워드를 입력해주세요.<br />
          500여개의 규정에서 찾아드립니다.
        </p>

        {/* 통계 정보 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">철도건설규정</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-green-600">&lt;1초</div>
            <div className="text-sm text-gray-600">평균 검색시간</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">검색 정확도</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 결과 헤더 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{results.length}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {query && (
                  <>
                    <span className="text-blue-600">&quot;{query}&quot;</span> 검색 결과
                  </>
                )}
              </h3>
              <p className="text-sm text-gray-600">{results.length}개 규정을 찾았습니다</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <span>⚡</span>
              <span>관련도 순 정렬</span>
            </span>
          </div>
        </div>
      </div>

      {results.map((regulation) => (
        <div key={regulation.code} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {regulation.title}
                </h3>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  매칭도 {Math.round(regulation.relevanceScore)}점
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                  📋 {regulation.category}
                </span>
                {regulation.subcategory && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full border">
                    {regulation.subcategory}
                  </span>
                )}
                <span className="text-gray-400">•</span>
                <span className="font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                  {regulation.code}
                </span>
              </div>
            </div>
          </div>

          <div className="text-gray-700 mb-4 leading-relaxed">
            {regulation.content}
          </div>

          {regulation.legal_basis && (
            <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-yellow-600">⚖️</span>
                <div className="text-sm font-semibold text-yellow-800">법적 근거</div>
              </div>
              <div className="text-sm text-yellow-700 font-medium">{regulation.legal_basis}</div>
            </div>
          )}

          {regulation.sections && regulation.sections.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-blue-600">📄</span>
                <h4 className="text-sm font-bold text-gray-800">상세 조항</h4>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  {regulation.sections.length}개 조항
                </span>
              </div>
              <div className="space-y-3">
                {regulation.sections.slice(0, 2).map((section) => (
                  <div key={section.number} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <div className="font-semibold text-blue-800 mb-1">
                      {section.number}. {section.title}
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">{section.content}</div>
                  </div>
                ))}
                {regulation.sections.length > 2 && (
                  <div className="text-sm text-gray-500 text-center py-2 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <span>📋 외 {regulation.sections.length - 2}개 조항이 더 있습니다</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:shadow-md border border-blue-200">
                📋 상세보기
              </button>
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:shadow-md border border-gray-200">
                💾 북마크
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:shadow-md border border-purple-200">
                📤 공유
              </button>
            </div>
            <Link
              href={`/chat?regulation=${regulation.code}`}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center space-x-2">
                <span>💬</span>
                <span>AI에게 질문하기</span>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}