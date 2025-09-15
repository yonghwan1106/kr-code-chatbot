import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface RegulationData {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  legalBasis?: string;
}

export async function queryRegulations(
  userQuery: string,
  regulations: RegulationData[]
): Promise<string> {
  // API 키가 없으면 임시 응답 반환 (개발 환경용)
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_claude_api_key_here') {
    return `[데모 모드] "${userQuery}"에 대한 답변:

찾은 관련 규정: ${regulations.length}개

${regulations.map((reg, index) => `
${index + 1}. ${reg.title}
${reg.content}
법적 근거: ${reg.legalBasis || '명시되지 않음'}
`).join('\n')}

※ 실제 AI 기능을 사용하려면 .env.local 파일에 올바른 ANTHROPIC_API_KEY를 설정해주세요.`;
  }
  const regulationsContext = regulations.map(reg =>
    `규정명: ${reg.title}\n카테고리: ${reg.category}\n내용: ${reg.content}\n법적근거: ${reg.legalBasis || '없음'}`
  ).join('\n\n---\n\n');

  const prompt = `당신은 철도건설규정 전문가입니다. 다음 사용자 질문에 대해 제공된 규정 정보를 바탕으로 정확하고 구체적인 답변을 제공해주세요.

사용자 질문: ${userQuery}

관련 철도건설규정 정보:
${regulationsContext}

답변 형식:
1. 직접적인 답변
2. 해당 규정의 정확한 조문 내용
3. 법적 근거
4. 주의사항이나 추가 고려사항 (있는 경우)

규정에 명시되지 않은 내용은 "해당 규정에서 명시되지 않음"이라고 답변하세요.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].type === 'text' ? response.content[0].text : '응답을 처리할 수 없습니다.';
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('AI 응답 생성 중 오류가 발생했습니다.');
  }
}

export async function generateSearchSuggestions(query: string): Promise<string[]> {
  const prompt = `다음 철도건설규정 검색어와 관련된 5개의 추천 검색어를 생성해주세요: "${query}"

응답은 다음 형식으로만 제공해주세요 (다른 설명 없이):
- 추천검색어1
- 추천검색어2
- 추천검색어3
- 추천검색어4
- 추천검색어5`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return text.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .slice(0, 5);
  } catch (error) {
    console.error('Claude API Error:', error);
    return [];
  }
}