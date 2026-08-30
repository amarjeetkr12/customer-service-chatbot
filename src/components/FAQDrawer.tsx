import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, BookOpen, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { FAQ_KNOWLEDGE_BASE, KNOWLEDGE_CATEGORIES } from '../data/faqData';

interface FAQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery: (query: string) => void;
}

/**
 * FAQDrawer Component
 * Displays the 12 structured customer support knowledge categories.
 * Allows users to inspect policies and click to test questions in chat.
 */
export const FAQDrawer: React.FC<FAQDrawerProps> = ({ isOpen, onClose, onSelectQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFAQs = FAQ_KNOWLEDGE_BASE.filter((faq) => {
    const matchesSearch =
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'ORDER') {
        matchesCategory = ['order_status', 'order_tracking', 'order_delayed', 'order_not_received', 'order_cancel', 'order_modification'].includes(faq.category);
      } else if (selectedCategory === 'SHIPPING') {
        matchesCategory = ['shipping'].includes(faq.category);
      } else if (selectedCategory === 'DELIVERY') {
        matchesCategory = ['delivery_time', 'delivery_address'].includes(faq.category);
      } else if (selectedCategory === 'RETURNS') {
        matchesCategory = ['return', 'return_process', 'replacement'].includes(faq.category);
      } else if (selectedCategory === 'REFUNDS') {
        matchesCategory = ['refund', 'refund_delay', 'payment_refund'].includes(faq.category);
      } else if (selectedCategory === 'PAYMENTS') {
        matchesCategory = ['payment', 'cash_on_delivery', 'payment_failed'].includes(faq.category);
      } else if (selectedCategory === 'PRODUCTS') {
        matchesCategory = ['product_information', 'product_availability', 'product_price', 'product_comparison'].includes(faq.category);
      } else if (selectedCategory === 'DISCOUNTS') {
        matchesCategory = ['discount', 'coupon'].includes(faq.category);
      } else if (selectedCategory === 'WARRANTY') {
        matchesCategory = ['warranty'].includes(faq.category);
      } else if (selectedCategory === 'COMPLAINTS') {
        matchesCategory = ['complaint', 'product_damage', 'wrong_product_received', 'missing_item'].includes(faq.category);
      } else if (selectedCategory === 'ACCOUNT') {
        matchesCategory = ['invoice', 'account_help'].includes(faq.category);
      } else if (selectedCategory === 'SUPPORT') {
        matchesCategory = ['contact_support', 'human_agent'].includes(faq.category);
      }
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200"
            id="faq-knowledge-base-drawer"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Knowledge Base</h2>
                  <p className="text-xs text-slate-500">
                    12 Categories • Grounded Policies & Guidelines
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Knowledge Base Grounding Notice */}
            <div className="p-3 bg-blue-50/70 border-b border-blue-100 flex items-start gap-2.5 text-xs text-blue-800">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Source of Truth & No Hallucinations</p>
                <p className="text-blue-700 mt-0.5 leading-relaxed">
                  All automated responses strictly adhere to these official policies.
                </p>
              </div>
            </div>

            {/* Search Input & Category Filter */}
            <div className="p-3.5 border-b border-slate-100">
              <div className="relative mb-2.5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search policies (e.g. UPI, delivery, refund, invoice)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-100/80 focus:bg-white text-xs text-slate-800 border border-slate-200 focus:border-blue-500 rounded-lg focus:outline-hidden transition-all"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {KNOWLEDGE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-sm">No matching knowledge base entries found.</p>
                </div>
              ) : (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-3.5 bg-slate-50 hover:bg-white rounded-xl border border-slate-200/90 hover:border-blue-200 hover:shadow-xs transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {faq.title}
                      </span>

                      <button
                        onClick={() => {
                          onSelectQuery(faq.question.split(' / ')[0]);
                          onClose();
                        }}
                        className="text-[11px] text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Ask this question in chat"
                      >
                        Ask this
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <h3 className="text-xs font-semibold text-slate-800 mb-1 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100 font-normal whitespace-pre-wrap">
                      {faq.answer}
                    </p>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {faq.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-slate-400 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{FAQ_KNOWLEDGE_BASE.length} Grounded Policies</span>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
