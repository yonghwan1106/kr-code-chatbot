import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <span className="text-3xl text-white">🚄</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 기반 철도건설규정 통합검색 챗봇
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            국민참여 철도규제 개선제안 공모전 출품작 - 혁신적인 AI 기술로 철도건설규정 검색의 새로운 패러다임을 제시합니다
          </p>
        </div>

        {/* 개요 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">💡</span>
            프로젝트 개요
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">현재 문제점</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  KR CODE 등 수백 개의 철도건설 설계지침에서 필요한 규정을 찾기 극도로 어려움
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  복잡하고 방대한 규정 문서로 인한 설계 업무 지연 및 오해석 위험 증가
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  규정 간 상충사항 발견의 어려움으로 인한 설계 오류 가능성
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">개선 방안</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  AI 챗봇 기능 연동하여 자연어 질의응답 시스템 구축
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  실무 질문에 즉시 관련 규정 및 근거 제시
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  상충 규정 자동 검토 기능으로 설계 단계에서 사전 오류 방지
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 핵심 기능 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">⚡</span>
            핵심 기능
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">자연어 질의응답</h3>
              <p className="text-gray-600 text-sm">
                &quot;250km/h 고속철도 최소곡선반지름은?&quot; 등 자연스러운 질문으로 즉시 답변 제공
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">상충 규정 검토</h3>
              <p className="text-gray-600 text-sm">
                규정 간 상충사항을 자동으로 감지하고 우선순위를 제시하여 설계 오류 방지
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">실시간 업데이트</h3>
              <p className="text-gray-600 text-sm">
                최신 개정사항 자동 업데이트 및 알림 기능으로 항상 최신 정보 제공
              </p>
            </div>
          </div>
        </div>

        {/* 기대효과 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📈</span>
            기대효과
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-gray-600">설계 업무시간 단축</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
              <div className="text-gray-600">설계변경 및 사고 감소</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50억원</div>
              <div className="text-gray-600">연간 간접 업무비용 절감</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1,600%</div>
              <div className="text-gray-600">투자대비 수익률(ROI)</div>
            </div>
          </div>
        </div>

        {/* 기술 혁신 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🔬</span>
            기술 혁신
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI 기술 스택</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Claude-3.5-Sonnet 기반 한국어 특화 모델</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">RAG 기술을 통한 정확한 정보 검색</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">철도 전문용어 및 규정 맥락 이해</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">시스템 특징</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">기존 인프라 활용한 효율적 구현</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">모바일 최적화 반응형 웹 디자인</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">24시간 365일 안정적 서비스</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 구현 계획 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">📅</span>
            구현 계획
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phase 1: 시범 구축 (1-3개월)</h3>
              <p className="text-gray-600 mb-2">MVP 완성 및 핵심 100개 규정 지식베이스 구축</p>
              <div className="text-sm text-gray-500">
                • AI 챗봇 베타 버전 개발 • 수도권본부 시범 서비스 • 사용자 피드백 수집
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phase 2: 고도화 (4-6개월)</h3>
              <p className="text-gray-600 mb-2">전체 500개 규정 통합 및 고급 기능 완성</p>
              <div className="text-sm text-gray-500">
                • 상충 분석 기능 완성 • 자동 업데이트 시스템 • 전국 지역본부 확대
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phase 3: 확산 (7-12개월)</h3>
              <p className="text-gray-600 mb-2">생태계 확산 및 해외 진출 기반 마련</p>
              <div className="text-sm text-gray-500">
                • 협력업체 서비스 개방 • 다국어 지원 • API 개방을 통한 확장
              </div>
            </div>
          </div>
        </div>

        {/* 사회적 가치 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-3">🌟</span>
            사회적 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">공정한 경쟁환경</h3>
              <p className="text-blue-100 text-sm">
                중소기업의 진입장벽 완화 및 경쟁력 강화를 통한 생태계 혁신
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">산업 디지털 전환</h3>
              <p className="text-blue-100 text-sm">
                철도건설 산업의 디지털 혁신을 선도하는 게임 체인저 역할
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">글로벌 경쟁력</h3>
              <p className="text-blue-100 text-sm">
                K-철도 브랜드의 글로벌 경쟁력 제고 및 수출 전략 자산 구축
              </p>
            </div>
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              지금 바로 체험해보세요
            </h2>
            <p className="text-gray-600 mb-6">
              AI 기반 철도건설규정 통합검색 챗봇으로 효율적인 규정 검색을 경험하세요
            </p>
            <a
              href="/chat"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">💬</span>
              챗봇 사용하기
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}