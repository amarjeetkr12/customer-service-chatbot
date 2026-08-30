import { ChatApiResponse, IntentCategory } from './types';
import { FAQ_KNOWLEDGE_BASE } from './data/faqData';

/**
 * Enhanced Educational NLP & Intent Classifier Engine
 * 
 * Features:
 * 1. Fast, zero-lag local resolution for simple/direct single-intent questions.
 * 2. Multi-intent & complex query detection (triggers Gemini when reasoning is needed).
 * 3. Robust Hinglish, Hindi, and English natural variations.
 * 4. Grounded strictly on customer service facts without hallucinations.
 */

export interface IntentMatchRule {
  intent: IntentCategory;
  patterns: RegExp[];
  response: string;
  suggestedReplies: string[];
}

export const INTENT_RULES: IntentMatchRule[] = [
  // 1. Human Agent Request (Immediate escalation)
  {
    intent: 'human_agent',
    patterns: [
      /\b(speak\s*(with|to)\s*(an?|a\s*)?(human|person|agent|executive|representative)|connect\s*(me\s*)?(with|to)\s*(an?|a\s*)?(human|agent|person|representative|executive)|talk\s*to\s*(an?|a\s*)?(human|agent|person|representative|executive)|human\s*support|real\s*person|live\s*agent|customer\s*care\s*se\s*baat|agent\s*se\s*baat|human\s*chahiye)\b/i,
      /^talk\s*to\s*(an?|a)?\s*agent$/i,
      /^i\s*want\s*(to\s*speak\s*with\s*)?(an?|a\s*)?human$/i,
      /^connect\s*me\s*to\s*(an?|a)?\s*agent$/i,
    ],
    response: 'I can connect you with our live support team. Our human support agents are available Monday through Saturday, 9:00 AM – 6:00 PM IST via helpline 1800-123-4567 or email support@example.com.',
    suggestedReplies: [
      'How can I contact customer support?',
      'Where is my order?',
      'What is your return policy?'
    ],
  },

  // 2. Complaints & Dissatisfaction
  {
    intent: 'complaint',
    patterns: [
      /\b(this\s*is\s*ridiculous|very\s*disappointed|waiting\s*for\s*days|worst\s*service|bad\s*service|file\s*a\s*complaint|i\s*have\s*a\s*complaint|dissatisfied|unacceptable|poor\s*experience|pathetic|horrible|angry|shikayat|bahut\s*kharab)\b/i,
    ],
    response: 'I’m truly sorry for the inconvenience. I understand how frustrating this can be. Please share your order ID or details of the issue so we can escalate this to our senior care team for immediate resolution.',
    suggestedReplies: [
      'I want to speak with a human',
      'Where is my order?',
      'How can I contact customer support?'
    ],
  },

  // 3. Payment Failed / Money Deducted
  {
    intent: 'payment_failed',
    patterns: [
      /\b(payment\s*failed|money\s*(was\s*)?deducted|amount\s*deducted|transaction\s*failed|order\s*failed\s*money\s*cut|deducted\s*but\s*order\s*failed|paisa\s*kat\s*gaya|paisa\s*cut\s*ho\s*gaya)\b/i,
    ],
    response: `I’m sorry about that. This can happen if the payment succeeds but the order creation times out.

Please:
1. Check whether you received an order confirmation email or SMS.
2. Check your bank or UPI app transaction status.
3. Avoid making duplicate payments immediately.
4. If the amount remains deducted without an order, your bank will auto-reverse it within 3–5 business days. You can also contact support with the transaction reference ID.`,
    suggestedReplies: [
      'When will I get my refund?',
      'How can I contact customer support?',
      'What payment methods do you accept?'
    ],
  },

  // 4. Payment Refund / Cancelled Order Refund
  {
    intent: 'payment_refund',
    patterns: [
      /\b(refund\s*for\s*(a\s*)?cancelled\s*order|prepaid\s*refund|payment\s*refund(ed)?|cancelled\s*order\s*money|money\s*back\s*for\s*cancelled|get\s*my\s*payment\s*refunded)\b/i,
    ],
    response: 'For cancelled prepaid orders, the full refund is initiated immediately and reflected in your bank account within 5–7 business days.',
    suggestedReplies: [
      'When will I get my refund?',
      'What payment methods do you accept?'
    ],
  },

  // 5. Refund Delay (Check before order_not_received to avoid "refund hasn't arrived" confusion)
  {
    intent: 'refund_delay',
    patterns: [
      /\b(refund\s*(has\s*not|hasn't)\s*arrived|where\s*is\s*my\s*refund|refund\s*late|haven't\s*received\s*(my\s*)?refund|refund\s*nahi\s*mila|refund\s*delay|paisa\s*wapas\s*nahi\s*aaya|mujhe\s*refund\s*nahi\s*mila)\b/i,
    ],
    response: 'Approved refunds take 5–7 business days to credit. If it has been more than 7 business days, please check with your bank using your ARN/UTR number or contact support for the transaction reference ID.',
    suggestedReplies: [
      'How long does a refund take?',
      'How can I contact customer support?'
    ],
  },

  // 6. Return Process (Check before general return)
  {
    intent: 'return_process',
    patterns: [
      /\b(how\s*(can|do)\s*i\s*return|how\s*to\s*return|return\s*steps|return\s*kaise\s*(kare|karu)|process\s*to\s*return|initiate\s*a\s*return|return\s*karna\s*hai|steps\s*for\s*return)\b/i,
    ],
    response: `To return a product:
1. Go to "My Orders" in your account.
2. Select the item and click "Request Return".
3. Choose your reason and submit.
4. A courier partner will pick up the package within 2–3 business days.
5. Refund is released once the item passes verification.`,
    suggestedReplies: [
      'What is your return policy?',
      'When will I get my refund?',
      'Can I exchange or replace a product?'
    ],
  },

  // 7. Order Modification (e.g. "I ordered the wrong product")
  {
    intent: 'order_modification',
    patterns: [
      /\b(i\s*ordered\s*(the\s*)?wrong|change\s*(my\s*)?order|modify\s*order|edit\s*order|add\s*items?\s*to\s*order|order\s*me\s*change)\b/i,
    ],
    response: 'Once an order is placed, items cannot be edited. If the order has not dispatched, you can cancel it and place a new order with the updated items.',
    suggestedReplies: [
      'Can I cancel my order?',
      'Can I change my delivery address?',
      'How can I contact customer support?'
    ],
  },

  // 8. Damaged Product
  {
    intent: 'product_damage',
    patterns: [
      /\b(damaged\s*product|product\s*is\s*damaged|broken\s*item|cracked|damaged\s*package|defective\s*product|item\s*damaged|toota\s*hua|damage\s*mila|damaged\s*item)\b/i,
      /\b(damaged|broken|cracked)\b/i,
    ],
    response: 'We are sorry about the damage. Please report damaged items within 48 hours of delivery with photos of the product and outer box to receive an immediate free replacement or full refund.',
    suggestedReplies: [
      'How do I get a replacement?',
      'When will I get my refund?',
      'How can I contact customer support?'
    ],
  },

  // 9. Wrong Product Received
  {
    intent: 'wrong_product_received',
    patterns: [
      /\b(received\s*(the\s*)?wrong|different\s*(product|item)\s*delivered|wrong\s*(item|product|package)\s*received|galat\s*(item|product|saman)|incorrect\s*item)\b/i,
    ],
    response: 'If you received an incorrect product, you can initiate a return or exchange from "My Orders" within 7 days. We will arrange a free doorstep pickup and dispatch the correct item.',
    suggestedReplies: [
      'How do I return a product?',
      'How do I get a replacement?',
      'How can I contact customer support?'
    ],
  },

  // 10. Missing Item
  {
    intent: 'missing_item',
    patterns: [
      /\b(missing\s*(item|product|part)|item\s*is\s*missing|incomplete\s*order|package\s*is\s*empty|saman\s*gayab|missing\s*package)\b/i,
    ],
    response: 'Some items may ship separately from different fulfillment centers. If all packages have arrived and an item is still missing, please contact support within 48 hours for immediate investigation.',
    suggestedReplies: [
      'How can I track my order?',
      'How can I contact customer support?'
    ],
  },

  // 11. Order Delayed / Late
  {
    intent: 'order_delayed',
    patterns: [
      /\b(my\s*order\s*is\s*late|why\s*(is\s*my\s*order|hasn't\s*my\s*order|is\s*my\s*delivery)\s*(late|delayed|arrived)|delivery\s*delayed|package\s*is\s*late|order\s*abhi\s*tak\s*nahi\s*aaya|deri\s*kyu\s*hai|supposed\s*to\s*arrive\s*yesterday)\b/i,
    ],
    response: 'We apologize for the delay. Orders may occasionally be delayed due to courier logistics or weather conditions. Please check your live tracking link or share your Order ID with support for an expedited update.',
    suggestedReplies: [
      'How can I track my order?',
      'Can I cancel my order?',
      'How can I contact customer support?'
    ],
  },

  // 12. Order Not Received
  {
    intent: 'order_not_received',
    patterns: [
      /\b(order\s*not\s*received|package\s*not\s*arrived|order\s*abhi\s*tak\s*nahi\s*mila|not\s*received\s*my\s*(order|package|parcel)|hasn't\s*arrived|has\s*not\s*arrived|marked\s*delivered\s*not\s*received)\b/i,
    ],
    response: 'If your tracking indicates delivered but you have not received the package, please check with household members or building reception first. If still missing, contact support within 48 hours for courier investigation.',
    suggestedReplies: [
      'How can I track my order?',
      'How can I contact customer support?'
    ],
  },

  // 13. Order Cancellation
  {
    intent: 'order_cancel',
    patterns: [
      /\b(can\s*i\s*cancel|cancel\s*(my\s*)?order|i\s*want\s*to\s*cancel|cancellation\s*policy|how\s*to\s*cancel|stop\s*my\s*order|order\s*cancel\s*karna|cancel\s*karna\s*hai)\b/i,
      /\b(cancel|cancellation|cancelling)\b/i,
    ],
    response: 'Orders can be cancelled before they are shipped directly from "My Orders". If your order has already shipped, you can refuse the package at delivery or initiate a return upon receipt.',
    suggestedReplies: [
      'When will I get my refund?',
      'How can I track my order?',
      'How can I contact customer support?'
    ],
  },

  // 14. Delivery Address Change
  {
    intent: 'delivery_address',
    patterns: [
      /\b(change\s*(my\s*)?delivery\s*address|change\s*address|update\s*address|wrong\s*address|deliver\s*to\s*different\s*address|address\s*change\s*karna)\b/i,
    ],
    response: 'You can update your delivery address before the order is dispatched by contacting support with your Order ID. Address changes cannot be modified once the package is with the courier.',
    suggestedReplies: [
      'How can I contact customer support?',
      'How can I track my order?'
    ],
  },

  // 15. Order Tracking
  {
    intent: 'order_tracking',
    patterns: [
      /\b(track\s*(my\s*|an\s*)?order|how\s*can\s*i\s*track|track\s*package|track\s*parcel|tracking\s*link|tracking\s*number|track\s*karna\s*hai)\b/i,
      /\b(track|tracking)\b/i,
    ],
    response: 'You can track your package by entering your Order ID and phone number on our Tracking page, or through the tracking link sent via SMS and email upon dispatch.',
    suggestedReplies: [
      'How long does shipping take?',
      'Where is my order?',
      'How can I contact customer support?'
    ],
  },

  // 16. Order Status / Where is my order
  {
    intent: 'order_status',
    patterns: [
      /\b(where\s*is\s*my\s*order|what\s*is\s*my\s*order\s*status|order\s*status|tell\s*me\s*where\s*my\s*package\s*is|find\s*my\s*order|locate\s*my\s*order|order\s*kahan\s*hai|mera\s*order\s*kab\s*aayega|package\s*kaha(n)?\s*hai|mera\s*order|order\s*kab\s*aayega|parcel\s*kab\s*aayega|mera\s*parcel\s*kab\s*aayega)\b/i,
    ],
    response: 'To check your order status, please provide your order ID or use the order-tracking option in your account dashboard.',
    suggestedReplies: [
      'How can I track my order?',
      'How long does shipping take?',
      'Can I cancel my order?'
    ],
  },

  // 17. Cash on Delivery (COD)
  {
    intent: 'cash_on_delivery',
    patterns: [
      /\b(cash\s*on\s*delivery|cod\s*(available|accepted)?|do\s*you\s*accept\s*cod|pay\s*on\s*delivery|doorstep\s*cash|cash\s*payment)\b/i,
      /\b(cod)\b/i,
    ],
    response: 'Yes, Cash on Delivery (COD) is accepted for most pincodes. You can pay cash or scan the courier’s UPI QR code upon delivery.',
    suggestedReplies: [
      'What payment methods do you accept?',
      'How long does shipping take?',
      'What is your return policy?'
    ],
  },

  // 18. Refund Policy / General
  {
    intent: 'refund',
    patterns: [
      /\b(when\s*will\s*i\s*get\s*(my\s*)?(refund|money)|refund\s*policy|how\s*long\s*(does\s*a\s*refund\s*take|is\s*the\s*refund)|money\s*back|reimbursement|refund\s*processed|get\s*a\s*refund|wait\s*for\s*my\s*money|paisa\s*kab\s*milega|refund\s*kab\s*aayega)\b/i,
      /\b(refund|refunds|refunded)\b/i,
    ],
    response: 'Approved refunds are generally processed within 5–7 business days back to your original payment method.',
    suggestedReplies: [
      'What is your return policy?',
      'How do I return a product?',
      'How can I contact customer support?'
    ],
  },

  // 19. Return Policy
  {
    intent: 'return',
    patterns: [
      /\b(what\s*is\s*your\s*return\s*policy|return\s*policy|can\s*i\s*return\s*(a\s*)?product|return\s*window|send\s*(this\s*item\s*)?back|return\s*conditions|items?\s*returnable|i\s*want\s*to\s*return|wapas\s*karna\s*hai|return\s*hoga)\b/i,
      /\b(return|returns|returning)\b/i,
    ],
    response: 'Products can be returned within 7 days of delivery, provided they are unused, in original packaging, and with all tags intact.',
    suggestedReplies: [
      'How do I return a product?',
      'When will I get my refund?',
      'How do I get a replacement?'
    ],
  },

  // 20. Replacement / Exchange
  {
    intent: 'replacement',
    patterns: [
      /\b(replacement|exchange|swap\s*product|replace\s*(my\s*)?product|exchange\s*policy|badalna\s*hai|replace\s*karna|how\s*do\s*i\s*get\s*a\s*replacement)\b/i,
      /\b(replace|exchange)\b/i,
    ],
    response: 'Yes, if you received a defective, damaged, or incorrect size item, you can request a free replacement within 7 days of delivery through the Orders section.',
    suggestedReplies: [
      'What is your return policy?',
      'How long does shipping take?',
      'How can I contact customer support?'
    ],
  },

  // 21. Delivery Time / Timelines / Weekend
  {
    intent: 'delivery_time',
    patterns: [
      /\b(when\s*will\s*(my\s*)?package\s*arrive|delivery\s*time|do\s*you\s*deliver\s*on\s*weekends|sunday\s*delivery|delivery\s*hours|delivery\s*timeline|choose\s*a\s*delivery\s*date)\b/i,
    ],
    response: 'Deliveries typically happen Monday through Saturday between 9:00 AM and 7:00 PM. Weekend delivery depends on regional courier coverage in your area.',
    suggestedReplies: [
      'How long does shipping take?',
      'How can I track my order?',
      'Can I change my delivery address?'
    ],
  },

  // 22. Shipping Policy
  {
    intent: 'shipping',
    patterns: [
      /\b(how\s*long\s*(does\s*)?(shipping|delivery)\s*take|shipping\s*time|shipping\s*duration|delivery\s*kitne\s*din|standard\s*delivery|shipping\s*policy|delivery\s*normally\s*take|what\s*areas\s*do\s*you\s*deliver)\b/i,
      /\b(shipping|delivery|deliver|shipment|courier)\b/i,
    ],
    response: 'Standard delivery usually takes 3–5 business days.',
    suggestedReplies: [
      'How can I track my order?',
      'Do you deliver on weekends?',
      'What is your return policy?'
    ],
  },

  // 23. Payments General / UPI / Cards
  {
    intent: 'payment',
    patterns: [
      /\b(what\s*payment\s*methods|can\s*i\s*pay\s*(with|using)\s*upi|upi\s*se\s*payment|payment\s*options|accepted\s*payment|how\s*to\s*pay|debit\s*card|credit\s*card|net\s*banking|payment\s*kaise\s*kare)\b/i,
      /\b(payment|payments|pay|upi)\b/i,
    ],
    response: 'We accept UPI (Google Pay, PhonePe, Paytm), debit cards, credit cards, Net Banking, and Cash on Delivery.',
    suggestedReplies: [
      'Do you accept Cash on Delivery?',
      'How long does shipping take?',
      'What is your return policy?'
    ],
  },

  // 24. Coupon & Promo Codes
  {
    intent: 'coupon',
    patterns: [
      /\b(coupon|promo\s*code|voucher|coupon\s*not\s*working|can\s*i\s*use\s*a\s*coupon|apply\s*coupon|discount\s*code)\b/i,
    ],
    response: 'You can apply valid promo codes during checkout in the "Apply Coupon" section. Ensure your cart meets any minimum order value or brand eligibility requirements. One coupon is permitted per order.',
    suggestedReplies: [
      'Do you have any discounts or offers?',
      'What payment methods do you accept?'
    ],
  },

  // 25. Discounts & Offers
  {
    intent: 'discount',
    patterns: [
      /\b(discount|any\s*discount|current\s*offers?|special\s*offer|sale|deals?|promotions?|chhoot|offer\s*hai)\b/i,
    ],
    response: 'Active discounts, seasonal sales, and bank offers are displayed on our homepage banner and applied automatically or via promo code at checkout.',
    suggestedReplies: [
      'Can I use a coupon?',
      'What payment methods do you accept?'
    ],
  },

  // 26. Product Price
  {
    intent: 'product_price',
    patterns: [
      /\b(how\s*much\s*does\s*(this\s*)?product\s*cost|what\s*is\s*the\s*price|product\s*price|mrp|cost|kitne\s*ka\s*hai|price\s*kya\s*hai)\b/i,
    ],
    response: 'Product prices inclusive of taxes are listed on each product detail page in our catalog. Prices reflect any ongoing promotional discounts.',
    suggestedReplies: [
      'Tell me about a product',
      'Do you have any discounts or offers?'
    ],
  },

  // 27. Product Comparison
  {
    intent: 'product_comparison',
    patterns: [
      /\b(which\s*product\s*is\s*better|compare\s*products|difference\s*between|product\s*comparison)\b/i,
    ],
    response: 'You can compare specifications, dimensions, and customer reviews on the catalog comparison tool, or specify which products you’d like details on.',
    suggestedReplies: [
      'Tell me about a product',
      'Is the product available?'
    ],
  },

  // 28. Product Availability
  {
    intent: 'product_availability',
    patterns: [
      /\b(is\s*(the|this|it|a)?\s*(product|item)?\s*(available|in\s*stock)|available\s*in\s*stock|check\s*stock|out\s*of\s*stock|stock\s*available|product\s*availability|inventory|available\s*hai|stock\s*hai)\b/i,
      /\b(in\s*stock|out\s*of\s*stock|stock|availability|available)\b/i,
    ],
    response: 'Product availability depends on warehouse inventory. Please provide the specific product name or SKU to verify stock.',
    suggestedReplies: [
      'Tell me about a product',
      'How long does shipping take?',
      'How can I contact customer support?'
    ],
  },

  // 29. Product Information
  {
    intent: 'product_information',
    patterns: [
      /\b(tell\s*me\s*about\s*(a\s*|this\s*)?product|product\s*information|product\s*info|product\s*details|catalog|specs|features\s*of|item\s*details)\b/i,
      /\b(product\s*catalog|product\s*description|product\s*details)\b/i,
    ],
    response: 'Detailed specifications, user manuals, and sizing charts are available on each product’s catalog page.',
    suggestedReplies: [
      'Is the product available?',
      'Does this product have a warranty?',
      'How long does shipping take?'
    ],
  },

  // 30. Warranty
  {
    intent: 'warranty',
    patterns: [
      /\b(warranty|guarantee|claim\s*warranty|warranty\s*coverage|manufacturer\s*warranty|warranty\s*period)\b/i,
    ],
    response: 'Eligible products come with a standard manufacturer warranty (usually 1 year). Your downloaded tax invoice serves as official proof of purchase for all warranty claims.',
    suggestedReplies: [
      'How can I get my invoice?',
      'How can I contact customer support?'
    ],
  },

  // 31. Invoice / Bill Download
  {
    intent: 'invoice',
    patterns: [
      /\b(invoice|download\s*(my\s*)?bill|tax\s*invoice|receipt|get\s*(my\s*)?invoice|bill\s*download)\b/i,
    ],
    response: 'You can download your official tax invoice by visiting "My Orders" and clicking "Download Invoice" next to the delivered order.',
    suggestedReplies: [
      'Where is my order?',
      'Does this product have a warranty?'
    ],
  },

  // 32. Account Help
  {
    intent: 'account_help',
    patterns: [
      /\b(account\s*help|reset\s*(my\s*)?password|password|login\s*problem|change\s*phone\s*number|profile\s*settings|update\s*profile)\b/i,
    ],
    response: 'You can update your phone number, email, saved addresses, and login credentials anytime in the Profile / Account Settings section.',
    suggestedReplies: [
      'How can I contact customer support?',
      'Where is my order?'
    ],
  },

  // 33. Contact Support
  {
    intent: 'contact_support',
    patterns: [
      /\b(how\s*can\s*i\s*contact\s*(customer\s*)?support|contact\s*customer\s*care|support\s*email|helpline\s*number|customer\s*care\s*number|help\s*desk|contact\s*details|support\s*team)\b/i,
      /\b(contact\s*support|customer\s*care|customer\s*support|help\s*desk)\b/i,
    ],
    response: 'You can reach our customer support team via email at support@example.com or toll-free at 1800-123-4567 (Monday–Saturday, 9:00 AM – 6:00 PM IST).',
    suggestedReplies: [
      'I want to speak with a human',
      'Where is my order?',
      'What is your return policy?'
    ],
  },

  // 34. Thank you
  {
    intent: 'thank_you',
    patterns: [
      /\b(thank\s*you|thanks|thx|thank\s*u|appreciate\s*it|much\s*appreciated|grateful|dhanyawad|shukriya)\b/i,
      /^thanks?\b/i,
    ],
    response: "You're welcome! Let me know if you need any further assistance with your orders, shipping, or payments.",
    suggestedReplies: [
      'How can I track my order?',
      'What is your return policy?',
      'How can I contact customer support?'
    ],
  },

  // 35. Goodbye
  {
    intent: 'goodbye',
    patterns: [
      /\b(bye|goodbye|cya|see\s*you|farewell|have\s*a\s*good\s*(day|night|one)|talk\s*to\s*you\s*later|alvida|tata)\b/i,
      /^bye\b/i,
    ],
    response: 'Goodbye! Have a wonderful day, and feel free to reach out whenever you need assistance.',
    suggestedReplies: [
      'Start New Question',
      'How can I contact customer support?'
    ],
  },

  // 36. Greeting
  {
    intent: 'greeting',
    patterns: [
      /^(hi|hello|hey|greetings|hola|good\s*(morning|afternoon|evening|day|night)|start|howdy|welcome|namaste|helo|hii+)\b/i,
      /\b(hello|hey|good\s*morning|good\s*afternoon|good\s*evening)\b/i,
      /^hi\b/i,
    ],
    response: `Hello! 👋 Welcome to Customer Support.

How can I help you today with your orders, shipping, returns, refunds, or payments?`,
    suggestedReplies: [
      'How long does shipping take?',
      'What is your return policy?',
      'How can I track my order?',
      'What payment methods are accepted?'
    ],
  },
];

/**
 * Normalizes input string for reliable regex & rule matching.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\d]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Evaluates whether a query is simple enough to answer with high-confidence instant local NLP
 * or if it needs Gemini for multi-intent, complex reasoning, ambiguity clarification, or context.
 */
export function isQueryComplexOrAmbiguous(text: string): boolean {
  const lower = text.toLowerCase().trim();

  // 1. Multiple questions / clauses
  const multiClauseCount = (lower.match(/\b(and|also|plus|along with|or|aur|bhi)\b/g) || []).length;
  const questionMarkCount = (lower.match(/\?/g) || []).length;
  if (multiClauseCount >= 2 || questionMarkCount >= 2) return true;

  // 2. Pronouns or conversational context references ("it", "that", "this one", "usme")
  if (/\b(it|that|this\s*one|same|usme|uska|iska|unka)\b/i.test(lower) && lower.split(/\s+/).length <= 6) {
    return true;
  }

  // 3. Ambiguous problem statements ("my order has a problem", "problem hai", "issue with order", "i want to cancel")
  if (/^(my\s*order\s*has\s*a\s*problem|problem\s*hai|issue\s*hai|something\s*wrong|need\s*help)$/i.test(lower)) {
    return true;
  }

  // 4. Frustrated/angry complaints that benefit from empathetic reasoning
  if (/\b(ridiculous|disappointed|worst|terrible|pathetic|horrible|angry|cheat|fraud)\b/i.test(lower)) {
    return true;
  }

  // 5. Very long complex queries (> 25 words)
  if (lower.split(/\s+/).length > 25) return true;

  return false;
}

/**
 * Classify user intent and return deterministic grounded knowledge base answer.
 * Runs instantly in milliseconds.
 */
export function classifyIntentAndAnswer(userMessage: string): ChatApiResponse {
  const originalText = userMessage.trim();
  const normalized = normalizeText(originalText);

  // 1. Test against each structured intent rule in priority order
  for (const rule of INTENT_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(originalText) || pattern.test(normalized)) {
        return {
          intent: rule.intent,
          response: rule.response,
          confidence: 0.95,
          suggestedReplies: rule.suggestedReplies,
          source: 'local_nlp',
        };
      }
    }
  }

  // 2. Safe unknown response for out-of-scope questions without hallucination
  return {
    intent: 'unknown',
    response: 'I’m sorry, I don’t have enough information to answer that. Please contact customer support at support@example.com or helpline 1800-123-4567 for further assistance.',
    confidence: 0.2,
    suggestedReplies: [
      'How can I track my order?',
      'How long does shipping take?',
      'What is your return policy?',
      'How can I contact customer support?'
    ],
    source: 'local_nlp',
  };
}
