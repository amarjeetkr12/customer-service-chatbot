import React from 'react';
import { Bot, Trash2, BookOpen, Sparkles, HelpCircle } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
  onToggleFAQ: () => void;
  onToggleInfo: () => void;
  isFAQOpen: boolean;
  messageCount: number;
}

/**
 * ChatHeader Component
 * Displays project title, required subtitle, online status, and top control actions.
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClearChat,
  onToggleFAQ,
  onToggleInfo,
  isFAQOpen,
  messageCount,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-20 px-4 py-3 sm:px-6 shadow-xs">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Customer Service Chatbot
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Online
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Ask me about orders, shipping, returns, refunds, and payments.
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* FAQ Knowledge Base Button */}
          <button
            id="faq-drawer-toggle-btn"
            onClick={onToggleFAQ}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
              isFAQOpen
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="View Knowledge Base FAQ"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </button>

          {/* Educational NLP Workflow Guide */}
          <button
            id="nlp-info-modal-btn"
            onClick={onToggleInfo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="How NLP & Intent Classification Works"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>How It Works</span>
          </button>

          {/* Clear Chat Button */}
          <button
            id="clear-chat-btn"
            onClick={onClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer active:scale-95"
            title="Reset conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
