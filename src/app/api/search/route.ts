import { NextRequest, NextResponse } from 'next/server';
import { searchEngine } from '@/lib/search';
import { generateSearchSuggestions } from '@/lib/claude';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const suggest = searchParams.get('suggest');

    if (suggest === 'true' && query) {
      // 검색어 추천 기능
      const suggestions = await generateSearchSuggestions(query);
      return NextResponse.json({ suggestions });
    }

    if (!query) {
      // 전체 규정 목록 반환
      const allRegulations = searchEngine.getAllRegulations();
      return NextResponse.json({
        regulations: allRegulations.map(item => ({
          code: item.regulation.code,
          title: item.content.title,
          category: item.content.category,
          subcategory: item.content.subcategory
        })),
        total: allRegulations.length
      });
    }

    // 검색 실행
    const searchResults = searchEngine.searchRegulations(query);

    return NextResponse.json({
      regulations: searchResults.map(result => ({
        code: result.regulation.code,
        title: result.content.title,
        category: result.content.category,
        subcategory: result.content.subcategory,
        content: result.content.content,
        legal_basis: result.content.legal_basis,
        relevanceScore: result.relevanceScore,
        sections: result.content.sections
      })),
      total: searchResults.length,
      query
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: '검색 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { codes } = body;

    if (!codes || !Array.isArray(codes)) {
      return NextResponse.json(
        { error: '규정 코드 배열을 제공해주세요.' },
        { status: 400 }
      );
    }

    const regulations = codes.map(code => searchEngine.getRegulationByCode(code))
      .filter(item => item !== null);

    return NextResponse.json({
      regulations: regulations.map(item => ({
        code: item!.regulation.code,
        title: item!.content.title,
        category: item!.content.category,
        subcategory: item!.content.subcategory,
        content: item!.content.content,
        legal_basis: item!.content.legal_basis,
        sections: item!.content.sections,
        related_codes: item!.content.related_codes
      }))
    });

  } catch (error) {
    console.error('Batch Search API Error:', error);
    return NextResponse.json(
      { error: '일괄 검색 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}