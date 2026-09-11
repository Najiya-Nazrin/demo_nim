import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export const CustomerSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Hello! I am the Nim AI property assistant. I can answer questions about our properties, pricing, and availability based on our internal documents. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: 'Sorry, I am having trouble connecting to the server right now.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">AI Customer Support</h1>
        <p className="text-muted">Chat with our RAG-powered assistant grounded in property FAQs.</p>
      </div>

      <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-border bg-card/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white">Property Assistant AI</h3>
            <p className="text-xs text-accent flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Online
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0F19]/50">
          {messages.map((msg) => (
            <div key={msg.id} className={clsx(
              "flex gap-4 max-w-[80%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}>
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-secondary text-white" : "bg-primary/20 text-primary"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={clsx(
                "p-4 rounded-2xl shadow-sm",
                msg.role === 'user' 
                  ? "bg-secondary text-white rounded-tr-none" 
                  : "bg-card border border-border text-gray-200 rounded-tl-none"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-card border border-border flex items-center gap-2 text-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is searching documents...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-card border-t border-border">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about properties, prices, or availability..."
              className="w-full bg-[#0B0F19] border border-border rounded-xl pl-4 pr-12 py-3 text-white placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-center text-muted mt-2">
            This is a real AI Assistant connected to your Supabase database. Try asking what properties are available!
          </p>
        </div>
      </div>
    </div>
  );
};
