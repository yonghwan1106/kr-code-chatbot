import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg">
            <span className="text-4xl text-white">🚄</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            철도건설규정 통합검색 챗봇
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI 기술로 혁신하는 철도건설규정 검색의 새로운 패러다임<br />
            <span className="text-blue-600 font-semibold">국민참여 철도규제 개선제안 공모전 출품작</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="mr-3">💬</span>
              지금 시작하기
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border"
            >
              <span className="mr-3">📋</span>
              자세히 보기
            </Link>
          </div>
        </div>

        {/* 주요 기능 섹션 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI 자연어 검색</h3>
            <p className="text-gray-600">
              &quot;250km/h 고속철도 최소곡선반지름은?&quot; 등 자연스러운 질문으로 즉시 정확한 답변을 받아보세요.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">즉시 응답</h3>
            <p className="text-gray-600">
              기존 30분이 걸리던 규정 검색을 30초로 단축. 95% 시간 절약으로 업무 효율성을 극대화하세요.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-3xl">⚖️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">상충 규정 검토</h3>
            <p className="text-gray-600">
              규정 간 상충사항을 자동으로 감지하고 우선순위를 제시하여 설계 오류를 사전에 방지합니다.
            </p>
          </div>
        </div>

        {/* 성과 지표 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">혁신적인 성과</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">검색 시간 단축</div>
              <div className="text-sm text-gray-500">30분 → 30초</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">90%</div>
              <div className="text-gray-600">설계변경 감소</div>
              <div className="text-sm text-gray-500">연간 15건 → 2건</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50억원</div>
              <div className="text-gray-600">연간 비용 절감</div>
              <div className="text-sm text-gray-500">업무시간 효율화</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">1,600%</div>
              <div className="text-gray-600">투자 수익률</div>
              <div className="text-sm text-gray-500">3억원 투자 대비</div>
            </div>
          </div>
        </div>

        {/* 혁신 포인트 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">세계 최초 철도규정 특화 AI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">🔬 기술 혁신</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Claude-3.5-Sonnet 기반 한국어 특화 모델</li>
                <li>• RAG 기술을 통한 정확한 정보 검색</li>
                <li>• 철도 전문용어 및 규정 맥락 이해</li>
                <li>• 24시간 365일 안정적 서비스</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">🌟 사회적 가치</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• 중소기업 경쟁력 강화 및 진입장벽 완화</li>
                <li>• 철도건설 생태계 전반의 효율성 혁신</li>
                <li>• K-철도 브랜드 글로벌 경쟁력 제고</li>
                <li>• 규제혁신 3.0의 성공 모델 제시</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 질문 예시 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">이런 질문을 해보세요</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <span className="text-blue-600 mr-2">💬</span>
              &quot;250km/h 고속철도 최소곡선반지름은?&quot;
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <span className="text-green-600 mr-2">💬</span>
              &quot;복선터널 최소단면 기준이 궁금해요&quot;
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <span className="text-purple-600 mr-2">💬</span>
              &quot;전차선과 구조물 절연거리는?&quot;
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
              <span className="text-indigo-600 mr-2">💬</span>
              &quot;차량한계와 건축한계 차이점&quot;
            </div>
          </div>
        </div>

        {/* CTA 섹션 */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              철도건설규정 검색의 새로운 경험
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              복잡한 규정 검색을 간단하게, 모든 사람이 공평하게 접근할 수 있는 혁신적인 AI 서비스
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="mr-3">💬</span>
                챗봇 체험하기
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                <span className="mr-3">📖</span>
                프로젝트 상세보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
