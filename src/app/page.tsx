import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            KR-CODE 지능형 가이드
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI 기반 철도건설규정 통합검색 챗봇으로<br />
            복잡한 규정을 쉽고 빠르게 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              💬 챗봇으로 질문하기
            </Link>
            <Link
              href="/search"
              className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg border-2 border-blue-600 transition-colors"
            >
              🔍 규정 검색하기
            </Link>
          </div>
        </div>

        {/* 주요 기능 소개 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">빠른 검색</h3>
            <p className="text-gray-600">
              평균 30분 걸리던 규정 검색을<br />
              30초로 단축
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-green-600 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">정확한 답변</h3>
            <p className="text-gray-600">
              AI가 관련 규정을 정확히 찾아<br />
              근거와 함께 답변 제공
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-purple-600 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">24시간 이용</h3>
            <p className="text-gray-600">
              언제든 규정을 확인하고<br />
              업무 효율성 향상
            </p>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">프로젝트 목표</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">검색 시간 단축</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">52억원</div>
              <div className="text-gray-600">연간 비용 절감</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">45%</div>
              <div className="text-gray-600">중소기업 참여율</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">90%</div>
              <div className="text-gray-600">설계변경 사고 감소</div>
            </div>
          </div>
        </div>

        {/* 질문 예시 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">이런 질문을 해보세요</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
              &quot;250km/h 고속철도 최소곡선반지름은?&quot;
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
              &quot;복선터널 최소단면 기준이 궁금해요&quot;
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
              &quot;전차선과 구조물 절연거리는?&quot;
            </div>
            <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
              &quot;차량한계와 건축한계 차이점&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
