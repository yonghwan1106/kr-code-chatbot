import { NextRequest, NextResponse } from 'next/server';
import { queryRegulations } from '@/lib/claude';
import { searchEngine } from '@/lib/search';
import { dbManager } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: '질문을 입력해주세요.' },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    // 관련 규정 검색
    const searchResults = searchEngine.searchRegulations(query);

    if (searchResults.length === 0) {
      // 규정을 찾을 수 없는 경우
      const response = '죄송합니다. 해당 질문과 관련된 철도건설규정을 찾을 수 없습니다. 다른 키워드로 검색해보시거나 더 구체적인 질문을 해주세요.';

      // 로그 저장
      dbManager.logQuery(query, response, [], Date.now() - startTime);

      return NextResponse.json({
        response,
        regulations: [],
        responseTime: Date.now() - startTime
      });
    }

    // 상위 3개 결과만 Claude에 전달 (토큰 비용 절약)
    const topResults = searchResults.slice(0, 3);
    const regulationData = topResults.map(result => ({
      id: result.regulation.code,
      title: result.content.title,
      content: result.content.content,
      category: result.content.category,
      subcategory: result.content.subcategory,
      legalBasis: result.content.legal_basis
    }));

    // Claude API 호출
    const claudeResponse = await queryRegulations(query, regulationData);

    const responseTime = Date.now() - startTime;

    // 사용된 규정 코드들
    const usedRegulationCodes = topResults.map(r => r.regulation.code);

    // 로그 저장
    dbManager.logQuery(query, claudeResponse, usedRegulationCodes, responseTime);

    return NextResponse.json({
      response: claudeResponse,
      regulations: topResults.map(result => ({
        code: result.regulation.code,
        title: result.content.title,
        category: result.content.category,
        relevanceScore: result.relevanceScore
      })),
      responseTime
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    let errorMessage = '서버 오류가 발생했습니다. 관리자에게 문의해주세요.';

    if (error instanceof Error) {
      if (error.message.includes('API') || error.message.includes('401')) {
        errorMessage = 'AI 서비스 인증에 문제가 있습니다. API 키를 확인해주세요.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}