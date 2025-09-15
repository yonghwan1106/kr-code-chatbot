import ChatInterface from '@/components/chat/ChatInterface';
import Navbar from '@/components/layout/Navbar';

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
}