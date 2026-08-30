import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

/**
 * ChatInput Component
 * Captures user text input, handles submission on Enter or Send button click,
 * and maintains clean accessible state.
 * 
 * Educational note:
 * Step 1 of NLP Chatbot Pipeline: User text is captured, trimmed, and validated
 * before dispatching to the backend for intent categorization.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInputText('');

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto-adjust height up to 120px
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t border-slate-200 bg-white p-3 sm:p-4 sticky bottom-0 z-10">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-50 border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 rounded-2xl p-1.5 sm:p-2 transition-all">
          {/* Textarea for multi-line support with automatic resize */}
          <textarea
            id="chat-user-input"
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Type your question here (e.g. 'How long does delivery take?')..."
            className="flex-1 bg-transparent text-slate-800 placeholder:text-slate-400 text-sm px-3 py-1.5 focus:outline-hidden resize-none max-h-28 overflow-y-auto leading-relaxed disabled:opacity-50"
          />

          {/* Send Action Button */}
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors shadow-xs shrink-0 cursor-pointer"
            title="Send message (Enter)"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3 text-slate-400" />
            Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 font-mono">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600 font-mono">Shift + Enter</kbd> for new line
          </span>
          <span className="font-mono text-[10px]">
            {inputText.length > 0 ? `${inputText.length} chars` : 'Grounded on FAQ'}
          </span>
        </div>
      </div>
    </div>
  );
};
