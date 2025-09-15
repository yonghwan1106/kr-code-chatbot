import { dbManager, Regulation } from './database';
import regulationsData from '@/data/regulations.json';

export interface RegulationContent {
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  legal_basis?: string;
  sections?: Array<{
    number: string;
    title: string;
    content: string;
  }>;
  related_codes?: string[];
}

export interface SearchResult {
  regulation: Regulation;
  content: RegulationContent;
  relevanceScore: number;
}

class SearchEngine {
  private regulations: Record<string, RegulationContent>;

  constructor() {
    this.regulations = regulationsData as Record<string, RegulationContent>;
  }

  public searchRegulations(query: string): SearchResult[] {
    const dbResults = dbManager.searchRegulations(query);
    const results: SearchResult[] = [];

    // DB 검색에서 결과가 없으면 전체 규정에서 검색
    if (dbResults.length === 0) {
      const allRegulations = dbManager.getAllRegulations();
      for (const regulation of allRegulations) {
        const content = this.regulations[regulation.code];
        if (content) {
          const relevanceScore = this.calculateRelevance(query, regulation, content);
          if (relevanceScore > 0) {  // 관련도가 0보다 큰 것만 포함
            results.push({
              regulation,
              content,
              relevanceScore
            });
          }
        }
      }
    } else {
      for (const regulation of dbResults) {
        const content = this.regulations[regulation.code];
        if (content) {
          const relevanceScore = this.calculateRelevance(query, regulation, content);
          results.push({
            regulation,
            content,
            relevanceScore
          });
        }
      }
    }

    // 관련도 순으로 정렬
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  public getRegulationByCode(code: string): { regulation: Regulation; content: RegulationContent } | null {
    const regulation = dbManager.getRegulationByCode(code);
    const content = this.regulations[code];

    if (regulation && content) {
      return { regulation, content };
    }

    return null;
  }

  public getAllRegulations(): Array<{ regulation: Regulation; content: RegulationContent }> {
    const regulations = dbManager.getAllRegulations();
    return regulations
      .map(reg => {
        const content = this.regulations[reg.code];
        return content ? { regulation: reg, content } : null;
      })
      .filter((item): item is { regulation: Regulation; content: RegulationContent } => item !== null);
  }

  private calculateRelevance(query: string, regulation: Regulation, content: RegulationContent): number {
    const queryLower = query.toLowerCase().replace(/[?!.]/g, '');
    let score = 0;

    // 개별 단어로 분리하여 검색
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 1);

    // 제목에서 매치
    const titleLower = regulation.title.toLowerCase();
    for (const word of queryWords) {
      if (titleLower.includes(word)) {
        score += 10;
      }
    }

    // 키워드에서 매치
    if (regulation.keywords) {
      const keywordsLower = regulation.keywords.toLowerCase();
      for (const word of queryWords) {
        if (keywordsLower.includes(word)) {
          score += 8;
        }
      }
    }

    // 내용에서 매치
    const contentLower = content.content.toLowerCase();
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 6;
      }
    }

    // 카테고리에서 매치
    const categoryLower = regulation.category.toLowerCase();
    for (const word of queryWords) {
      if (categoryLower.includes(word)) {
        score += 4;
      }
    }

    // 섹션 내용에서 매치
    if (content.sections) {
      for (const section of content.sections) {
        const sectionContentLower = section.content.toLowerCase();
        for (const word of queryWords) {
          if (sectionContentLower.includes(word)) {
            score += 3;
          }
        }
      }
    }

    // 특별 키워드 매칭 (철도 관련 용어)
    const specialKeywords = {
      '곡선': ['곡선', '반지름', 'R'],
      '터널': ['터널', '단면'],
      '전차선': ['전차선', '전력', '절연'],
      '신호': ['신호', 'ATP', '폐색'],
      '차량': ['차량', '한계', '건축한계'],
      '속도': ['속도', 'km/h', '고속'],
      '거리': ['거리', '간격'],
      '기준': ['기준', '규정', '규칙']
    };

    for (const word of queryWords) {
      for (const [key, synonyms] of Object.entries(specialKeywords)) {
        if (word.includes(key) || synonyms.some(syn => word.includes(syn.toLowerCase()))) {
          if (titleLower.includes(key) || contentLower.includes(key)) {
            score += 15;
          }
        }
      }
    }

    return score;
  }

  public getRelatedRegulations(code: string): SearchResult[] {
    const regulationData = this.getRegulationByCode(code);
    if (!regulationData || !regulationData.content.related_codes) {
      return [];
    }

    const results: SearchResult[] = [];
    for (const relatedCode of regulationData.content.related_codes) {
      const related = this.getRegulationByCode(relatedCode);
      if (related) {
        results.push({
          regulation: related.regulation,
          content: related.content,
          relevanceScore: 1
        });
      }
    }

    return results;
  }

  public extractKeywords(text: string): string[] {
    const keywords = text
      .toLowerCase()
      .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1)
      .slice(0, 10);

    return [...new Set(keywords)];
  }
}

export const searchEngine = new SearchEngine();