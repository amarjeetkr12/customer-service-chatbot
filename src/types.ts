/**
 * Types and interfaces for the Customer Service Chatbot.
 * Defines messages, supported intent classifications, and FAQ structures.
 */

// Supported customer service intent categories (37 intents)
export type IntentCategory =
  | 'greeting'
  | 'order_status'
  | 'order_tracking'
  | 'order_not_received'
  | 'order_delayed'
  | 'order_cancel'
  | 'order_modification'
  | 'shipping'
  | 'delivery_time'
  | 'delivery_address'
  | 'product_information'
  | 'product_availability'
  | 'product_price'
  | 'product_comparison'
  | 'product_damage'
  | 'wrong_product_received'
  | 'missing_item'
  | 'return'
  | 'return_process'
  | 'refund'
  | 'refund_delay'
  | 'payment'
  | 'payment_failed'
  | 'payment_refund'
  | 'cash_on_delivery'
  | 'discount'
  | 'coupon'
  | 'invoice'
  | 'warranty'
  | 'replacement'
  | 'complaint'
  | 'account_help'
  | 'contact_support'
  | 'human_agent'
  | 'thank_you'
  | 'goodbye'
  | 'unknown';

// Chat message structure for storing chat conversation history
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  intent?: IntentCategory;
  suggestedReplies?: string[];
  isError?: boolean;
}

// Predefined FAQ knowledge base entry
export interface FAQItem {
  id: string;
  category: IntentCategory;
  title: string;
  question: string;
  answer: string;
  tags: string[];
}

// Request and response interfaces for the chat API
export interface ChatApiRequest {
  message: string;
  history?: Array<{
    role: 'user' | 'model';
    parts: string;
  }>;
}

export interface ChatApiResponse {
  response: string;
  intent: IntentCategory;
  confidence?: number;
  suggestedReplies?: string[];
  source?: 'gemini' | 'local_nlp';
}
