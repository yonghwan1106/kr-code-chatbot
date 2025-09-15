'use client';

import React from 'react';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export default function MessageBubble({ message, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
      <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'bg-blue-100 text-blue-600'
        }`}>
          {isUser ? '👤' : '🤖'}
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
          }`}>
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {message}
            </div>
          </div>

          {/* Timestamp */}
          <div className={`text-xs mt-1 px-2 ${
            isUser ? 'text-right text-gray-500' : 'text-left text-gray-500'
          } opacity-0 group-hover:opacity-100 transition-opacity`}>
            {isUser ? '나' : 'AI'} • {timestamp.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}