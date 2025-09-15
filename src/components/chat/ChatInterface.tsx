'use client';

import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('응답을 받을 수 없습니다.');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || '죄송합니다. 응답을 생성할 수 없습니다.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border mx-4 my-4 min-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-6 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">철도건설규정 통합검색 챗봇</h2>
            <p className="text-blue-100 text-sm">
              철도건설규정 전문가가 도와드립니다
            </p>
            <p className="text-blue-200 text-xs mt-1 opacity-80">
              국민참여 철도규제 개선제안 공모전 출품작
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full p-6 mb-6">
              <div className="text-6xl">🚄</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">안녕하세요!</h3>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              철도건설규정 전문 AI입니다.<br />
              궁금한 내용을 자연어로 질문해주세요.
            </p>

            {/* 질문 예시 카드 */}
            <div className="grid md:grid-cols-2 gap-3 w-full max-w-2xl mb-6">
              {[
                "250km/h 고속철도 최소곡선반지름은?",
                "복선터널 최소단면 기준이 궁금해요",
                "전차선과 구조물 절연거리는?",
                "차량한계와 건축한계 차이점"
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(example)}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-sm text-gray-700 hover:text-blue-600"
                >
                  <span className="text-blue-500 mr-2">💬</span>
                  {example}
                </button>
              ))}
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">💡</span>
              <span>클릭하거나 직접 입력하여 질문하세요</span>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">🤖</span>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI가 답변 중입니다...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t px-6 py-4 rounded-b-xl">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="철도건설규정에 대해 질문해보세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
              className="w-full resize-none border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 placeholder:text-gray-400"
              rows={2}
              disabled={isLoading}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
              {inputValue.length}/500
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="flex items-center space-x-2">
                <span>전송</span>
                <span>📤</span>
              </span>
            )}
          </button>
        </div>

        {/* 상태 표시 */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>AI 연결됨</span>
            </span>
            <span>{messages.length}개 대화</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>💡 Tip: 구체적으로 질문할수록 정확한 답변을 받을 수 있어요</span>
          </div>
        </div>
      </div>
    </div>
  );
}