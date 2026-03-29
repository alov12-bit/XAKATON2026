import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Привет! Я ваш Эко-помощник. Спросите меня о том, как разлагается мусор, почему люди его создают и как он попадает в океан!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current = ai.chats.create({
      model: 'gemini-3.1-pro-preview',
      config: {
        systemInstruction: 'Вы — передовая нейросеть Gemini 3.1 Pro от Google, выступающая в роли дружелюбного эко-помощника в виртуальном музее прибрежного мусора. Ваша задача — объяснять посетителям, как разлагается мусор, почему люди его создают (культура потребления, одноразовые вещи, удобство), и как он попадает в океан. Отвечайте кратко (не более 2-3 абзацев), увлекательно и на русском языке. Предлагайте практические советы по сокращению отходов.'
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) throw new Error('Chat not initialized');
      const response = await chatRef.current.sendMessage({ message: userText });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Извините, я не смог сформулировать ответ.' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Произошла ошибка при обращении к серверу. Попробуйте позже.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Открыть эко-помощника"
      >
        <MessageCircle size={28} />
      </button>
      <div 
        className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-teal-600 text-white p-4 rounded-t-2xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <h3 className="font-bold text-lg">Эко-помощник</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-teal-100 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-sky-500 text-white' : 'bg-teal-100 text-teal-700'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`px-4 py-3 rounded-2xl max-w-[75%] ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                <div className="text-sm leading-relaxed markdown-body">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Bot size={18} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-teal-600" />
                <span className="text-sm text-slate-500">Печатает...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 rounded-b-2xl flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задайте вопрос о мусоре..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl px-4 py-2 text-sm transition-all outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
          >
            <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5' : ''} />
          </button>
        </form>
      </div>
    </>
  );
}
