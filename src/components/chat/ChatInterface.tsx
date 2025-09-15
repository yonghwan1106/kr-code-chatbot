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
    <div className="flex flex-col h-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border mx-4 my-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-8 rounded-t-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">철도건설규정 통합검색 챗봇</h1>
            <p className="text-blue-100 text-base mt-1">
              철도건설규정 전문가가 도와드립니다
            </p>
            <p className="text-blue-200 text-sm mt-1 opacity-90">
              국민참여 철도규제 개선제안 공모전 출품작
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="bg-blue-50 rounded-full p-8 mb-8">
              <div className="text-6xl">🚄</div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">안녕하세요!</h2>
            <p className="text-gray-600 mb-12 text-center max-w-md text-lg">
              철도건설규정 전문 AI입니다.<br />
              궁금한 내용을 자연어로 질문해주세요.
            </p>

            {/* 질문 예시 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8">
              {[
                { icon: "💬", text: "250km/h 고속철도 최소곡선반지름은?" },
                { icon: "💬", text: "복선터널 최소단면 기준이 궁금해요" },
                { icon: "💬", text: "전차선과 구조물 절연거리는?" },
                { icon: "💬", text: "차량한계와 건축한계 차이점" }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(example.text)}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all text-left group"
                >
                  <span className="text-blue-500 mr-3 text-xl">{example.icon}</span>
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    {example.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-2 text-lg">💡</span>
              <span>클릭하거나 직접 입력하여 질문해주세요</span>
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
      <div className="bg-white border-t px-6 py-6 rounded-b-xl">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="철도건설규정에 대해 질문해보세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
              className="w-full resize-none border-2 border-gray-300 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 placeholder:text-gray-500 text-lg"
              rows={2}
              disabled={isLoading}
            />
            <div className="absolute right-4 bottom-4 text-xs text-gray-400 bg-white px-1">
              {inputValue.length}/500
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:shadow-none min-w-[120px] flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="flex items-center space-x-2">
                <span>전송</span>
                <span>📤</span>
              </span>
            )}
          </button>
        </div>

        {/* 상태 표시 */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">AI 연결됨</span>
            </span>
            <span className="text-gray-600">{messages.length}개 대화</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-600">
            <span>💡</span>
            <span>Tip: 구체적으로 질문할수록 정확한 답변을 받을 수 있어요</span>
          </div>
        </div>
      </div>
    </div>
  );
}