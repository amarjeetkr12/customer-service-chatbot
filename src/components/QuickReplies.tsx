import React from 'react';
import { Sparkles } from 'lucide-react';
import { QUICK_ACTIONS } from '../data/faqData';

interface QuickRepliesProps {
  onSelectQuery: (query: string) => void;
  disabled?: boolean;
}

/**
 * QuickReplies Component
 * Displays the 8 primary customer service quick action buttons.
 */
export const QuickReplies: React.FC<QuickRepliesProps> = ({
  onSelectQuery,
  disabled = false,
}) => {
  return (
    <div className="px-4 py-2.5 sm:px-6 border-t border-slate-100 bg-slate-50/80">
      <div className="max-w-3xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Quick Actions:
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Click to ask instantly
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              id={`quick-action-btn-${action.id}`}
              onClick={() => onSelectQuery(action.query)}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200/90 px-3 py-1.5 rounded-full shadow-2xs whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              title={`Ask: "${action.query}"`}
            >
              <span>{action.emoji}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
