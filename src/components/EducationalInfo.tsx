import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Layers, Database, Sparkles, CheckCircle, ShieldAlert, Lightbulb } from 'lucide-react';

interface EducationalInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * EducationalInfo Modal
 * Step-by-step breakdown of how the NLP-based Customer Service Chatbot works.
 */
export const EducationalInfo: React.FC<EducationalInfoProps> = ({ isOpen, onClose }) => {
  const steps = [
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      title: '1. User enters a question',
      desc: 'The customer types a free-form query into the text input or selects one of the quick inquiry prompts.'
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      title: '2. The chatbot identifies the user\'s intent',
      desc: 'The NLP classifier analyzes keywords, phrases, and grammar to map the input to intents like greeting, order_status, shipping, return, refund, payment, etc.'
    },
    {
      icon: <Database className="w-5 h-5 text-sky-600" />,
      title: '3. The knowledge base is checked',
      desc: 'The chatbot searches the predefined customer service FAQ knowledge base for verified policies and facts.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      title: '4. Gemini helps understand natural-language queries when needed',
      desc: 'Google Gemini 3.7 Flash parses nuanced phrasing, synonyms, and conversational variations while strictly adhering to knowledge base facts.'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      title: '5. The chatbot generates an appropriate response',
      desc: 'A polite, concise, and structured reply is displayed to the user along with contextual quick follow-ups.'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      title: '6. If the answer is unavailable, the chatbot recommends human support',
      desc: 'If a query is outside the knowledge base, the chatbot never invents facts and courteously directs the customer to contact support.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    How It Works
                  </h3>
                  <p className="text-xs text-slate-500">
                    Educational NLP chatbot architecture & intent pipeline
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5">
              <div className="grid gap-3">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-200 shrink-0 mt-0.5">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                Got It, Return to Chat
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
