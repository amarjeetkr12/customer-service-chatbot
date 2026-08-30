import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Copy, Check, Sparkles, Tag } from 'lucide-react';
import { ChatMessage, IntentCategory } from '../types';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onRetry?: (messageText: string) => void;
  onSelectQuickReply: (query: string) => void;
}

// Intent badge styling configuration for all 37 customer support intents
const INTENT_BADGE_MAP: Record<IntentCategory, { label: string; color: string; bg: string }> = {
  greeting: { label: 'Greeting', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  order_status: { label: 'Order Status', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  order_tracking: { label: 'Order Tracking', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  order_not_received: { label: 'Order Not Received', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  order_delayed: { label: 'Order Delayed', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  order_cancel: { label: 'Order Cancel', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  order_modification: { label: 'Order Modification', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  shipping: { label: 'Shipping Policy', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' },
  delivery_time: { label: 'Delivery Time', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' },
  delivery_address: { label: 'Delivery Address', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200' },
  product_information: { label: 'Product Info', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  product_availability: { label: 'Product Stock', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
  product_price: { label: 'Product Price', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  product_comparison: { label: 'Product Compare', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  product_damage: { label: 'Damaged Product', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  wrong_product_received: { label: 'Wrong Product', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  missing_item: { label: 'Missing Item', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  return: { label: 'Return Policy', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  return_process: { label: 'Return Process', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  refund: { label: 'Refund Policy', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  refund_delay: { label: 'Refund Delay', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  payment: { label: 'Payment Options', color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200' },
  payment_failed: { label: 'Payment Failed', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  payment_refund: { label: 'Payment Refund', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  cash_on_delivery: { label: 'Cash on Delivery', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  discount: { label: 'Discounts & Offers', color: 'text-fuchsia-700', bg: 'bg-fuchsia-50 border-fuchsia-200' },
  coupon: { label: 'Coupon Help', color: 'text-fuchsia-700', bg: 'bg-fuchsia-50 border-fuchsia-200' },
  invoice: { label: 'Invoice & Bills', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  warranty: { label: 'Warranty & Claims', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  replacement: { label: 'Replacement', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
  complaint: { label: 'Complaint / Feedback', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  account_help: { label: 'Account Help', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
  contact_support: { label: 'Customer Support', color: 'text-pink-700', bg: 'bg-pink-50 border-pink-200' },
  human_agent: { label: 'Human Agent', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  thank_you: { label: 'Thank You', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  goodbye: { label: 'Goodbye', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
  unknown: { label: 'Out of Scope / Help', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  onSelectQuickReply,
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-scroll down whenever new messages arrive or loading changes
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
      <div className="max-w-3xl mx-auto space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isBot = message.sender === 'bot';
            const intentInfo = message.intent ? INTENT_BADGE_MAP[message.intent] : null;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 sm:gap-3.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                id={`message-bubble-${message.id}`}
              >
                {/* Bot Avatar */}
                {isBot && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs ring-2 ring-blue-50 mt-1">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs transition-all break-words min-w-0 ${
                    isBot
                      ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs font-normal shadow-blue-500/10'
                  }`}
                >
                  {/* Top Metadata for Bot Messages */}
                  {isBot && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {intentInfo && (
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${intentInfo.bg} ${intentInfo.color}`}
                            title={`Classified Intent: ${intentInfo.label}`}
                          >
                            <Tag className="w-3 h-3" />
                            Intent: {intentInfo.label}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {message.timestamp}
                        </span>
                        <button
                          onClick={() => handleCopy(message.id, message.text)}
                          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* User Timestamp */}
                  {!isBot && (
                    <div className="flex items-center justify-end gap-1 mb-1 text-[10px] text-blue-100 font-mono">
                      <span>{message.timestamp}</span>
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                    {message.text}
                  </div>

                  {/* Follow-up Quick Suggestions from Bot */}
                  {isBot && message.suggestedReplies && message.suggestedReplies.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      <p className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        Suggested Follow-ups:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {message.suggestedReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => onSelectQuickReply(reply)}
                            className="text-xs font-medium text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 hover:text-indigo-800 border border-indigo-200/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isBot && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 shadow-xs ring-2 ring-slate-100 mt-1">
                    <User className="w-4.5 h-4.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing / Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 items-start justify-start"
            id="bot-typing-indicator"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs ring-2 ring-blue-50">
              <Bot className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-3">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Thinking & checking policies...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={scrollEndRef} />
      </div>
    </div>
  );
};
