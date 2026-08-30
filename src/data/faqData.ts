import { FAQItem, IntentCategory } from '../types';

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  { id: 'all', name: 'All Categories', description: 'Browse all customer service policies', icon: 'Sparkles' },
  { id: 'ORDER', name: 'Orders & Tracking', description: 'Tracking, delays, cancellation & modifications', icon: 'Package' },
  { id: 'SHIPPING', name: 'Shipping & Delivery', description: 'Timelines, courier, and shipping coverage', icon: 'Truck' },
  { id: 'DELIVERY', name: 'Delivery Information', description: 'Address changes, weekend delivery & timelines', icon: 'MapPin' },
  { id: 'RETURNS', name: 'Returns & Exchange', description: '7-day policy, damaged items & return steps', icon: 'RotateCcw' },
  { id: 'REFUNDS', name: 'Refunds', description: 'Processing times, payment reversals & status', icon: 'CircleDollarSign' },
  { id: 'PAYMENTS', name: 'Payments & COD', description: 'UPI, cards, payment failures & COD', icon: 'CreditCard' },
  { id: 'PRODUCTS', name: 'Products & Stock', description: 'Catalog info, availability & pricing', icon: 'ShoppingBag' },
  { id: 'DISCOUNTS', name: 'Discounts & Coupons', description: 'Promotional codes, offers & savings', icon: 'Tag' },
  { id: 'WARRANTY', name: 'Warranty & Replacement', description: 'Coverage, claims & item replacements', icon: 'ShieldCheck' },
  { id: 'COMPLAINTS', name: 'Issues & Complaints', description: 'Damaged, wrong or missing products', icon: 'AlertTriangle' },
  { id: 'ACCOUNT', name: 'Account & Invoices', description: 'Invoices, receipts & account settings', icon: 'FileText' },
  { id: 'SUPPORT', name: 'Customer Support', description: 'Human agents, email, hours & helpline', icon: 'Headphones' },
];

/**
  Comprehensive Predefined Local Knowledge Base for Customer Service.
 * Grounded policies covering all 37 customer service intents.
 */
export const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  // --- 1. ORDERS ---
  {
    id: 'faq-order-status',
    category: 'order_status',
    title: 'Order Status',
    question: 'Where is my order? / What is my order status?',
    answer: 'To check your order status, please provide your order ID or use the order-tracking option in your account.',
    tags: ['order status', 'where is my order', 'order id', 'order details', 'check order', 'mera order']
  },
  {
    id: 'faq-order-tracking',
    category: 'order_tracking',
    title: 'Order Tracking',
    question: 'How can I track my order? / Can I track my package?',
    answer: 'You can track your package by entering your Order ID and phone number on our Tracking page, or via the tracking link sent in your shipment SMS/email.',
    tags: ['track order', 'tracking link', 'track package', 'courier tracking', 'track parcel']
  },
  {
    id: 'faq-order-delayed',
    category: 'order_delayed',
    title: 'Order Delayed',
    question: 'Why is my order delayed? / My order is late',
    answer: 'Orders may occasionally experience delays due to high demand, weather, or regional courier logistics. Please check your tracking link for updated live estimates, or contact support with your order ID.',
    tags: ['delayed', 'late', 'order late', 'package late', 'why delayed', 'late delivery', 'deri']
  },
  {
    id: 'faq-order-not-received',
    category: 'order_not_received',
    title: 'Order Not Received',
    question: 'My package has not arrived / Order marked delivered but not received',
    answer: 'If your order shows delivered but you haven’t received it, please check with neighbors or building security first. If still missing, contact customer support within 48 hours to initiate a courier investigation.',
    tags: ['not received', 'package not arrived', 'missing package', 'not delivered', 'nahi mila']
  },
  {
    id: 'faq-order-cancel',
    category: 'order_cancel',
    title: 'Order Cancellation',
    question: 'Can I cancel my order? / How do I cancel an order?',
    answer: 'Orders can be cancelled before they are shipped directly from your Account > Orders section. If the order has already dispatched, you can reject delivery at your doorstep or initiate a return upon arrival.',
    tags: ['cancel', 'cancel order', 'cancellation', 'stop shipment', 'order cancel']
  },
  {
    id: 'faq-order-modification',
    category: 'order_modification',
    title: 'Order Modification',
    question: 'Can I change my order or add items to an existing order?',
    answer: 'Once an order is confirmed, individual items cannot be modified. If your order has not shipped, you can cancel it and place a new order with the correct items.',
    tags: ['modify order', 'change order', 'edit order', 'add items', 'wrong product ordered']
  },

  // --- 2. SHIPPING & DELIVERY ---
  {
    id: 'faq-shipping',
    category: 'shipping',
    title: 'Shipping Policy',
    question: 'How long does shipping take? / What is the shipping time?',
    answer: 'Standard shipping usually takes 3–5 business days. Express shipping (where available) delivers within 1–2 business days.',
    tags: ['shipping', 'shipping time', 'courier', 'standard delivery', 'shipping duration', 'delivery kitne din']
  },
  {
    id: 'faq-delivery-time',
    category: 'delivery_time',
    title: 'Delivery Timelines',
    question: 'When will my package arrive? / Do you deliver on weekends?',
    answer: 'Deliveries typically occur Monday through Saturday between 9:00 AM and 7:00 PM. Weekend delivery depends on regional courier coverage.',
    tags: ['delivery time', 'when will it arrive', 'weekend delivery', 'sunday delivery', 'delivery hours']
  },
  {
    id: 'faq-delivery-address',
    category: 'delivery_address',
    title: 'Delivery Address Change',
    question: 'Can I change my delivery address after placing an order?',
    answer: 'You can update your delivery address before the order is dispatched by contacting support with your Order ID. Address changes cannot be processed once the package is in transit.',
    tags: ['change address', 'delivery address', 'wrong address', 'update location', 'shipping address']
  },

  // --- 3. RETURNS & REPLACEMENTS ---
  {
    id: 'faq-return',
    category: 'return',
    title: 'Return Policy',
    question: 'What is your return policy? / Can I return a product?',
    answer: 'Products can be returned within 7 days of delivery, provided they are unused, in original packaging, and with all tags intact.',
    tags: ['return', 'return policy', 'return window', '7 days', 'send back', 'wapas']
  },
  {
    id: 'faq-return-process',
    category: 'return_process',
    title: 'Return Process',
    question: 'How do I return a product? / How to initiate a return?',
    answer: 'To initiate a return:\n1. Go to "My Orders" and select the item.\n2. Click "Request Return" and choose your reason.\n3. A courier partner will pick up the package within 2–3 business days.\n4. Your refund is processed once the returned item passes quality inspection.',
    tags: ['how to return', 'return process', 'pickup', 'return steps', 'return kaise kare']
  },
  {
    id: 'faq-replacement',
    category: 'replacement',
    title: 'Product Replacement',
    question: 'Can I exchange or replace a product?',
    answer: 'Yes, if you received a defective, damaged, or incorrect size item, you can request a free replacement within 7 days of delivery through the Orders section.',
    tags: ['replacement', 'exchange', 'swap product', 'replace item', 'badalna']
  },

  // --- 4. REFUNDS ---
  {
    id: 'faq-refund',
    category: 'refund',
    title: 'Refund Policy',
    question: 'When will I get my refund? / How long does a refund take?',
    answer: 'Approved refunds are generally processed within 5–7 business days to your original payment method (or bank account for COD orders).',
    tags: ['refund', 'money back', 'refund time', 'reimbursement', 'paisa kab aayega']
  },
  {
    id: 'faq-refund-delay',
    category: 'refund_delay',
    title: 'Refund Delay',
    question: 'Where is my refund? / My refund has not arrived',
    answer: 'If your refund is approved but not reflected after 7 business days, please check with your bank using the ARN/UTR reference number. You can also contact support to request the transaction reference ID.',
    tags: ['refund delay', 'refund not received', 'where is refund', 'late refund', 'refund nahi mila']
  },
  {
    id: 'faq-payment-refund',
    category: 'payment_refund',
    title: 'Cancelled Order Refund',
    question: 'Can I get a refund for a cancelled order?',
    answer: 'Yes, if you cancel a prepaid order before dispatch, the full refund is initiated immediately and credited to your account within 5–7 business days.',
    tags: ['cancelled order refund', 'prepaid refund', 'immediate refund', 'cancel refund']
  },

  // --- 5. PAYMENTS & COD ---
  {
    id: 'faq-payment',
    category: 'payment',
    title: 'Accepted Payment Methods',
    question: 'What payment methods do you accept? / Can I pay using UPI?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm), Debit Cards, Credit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD).',
    tags: ['payment methods', 'pay', 'upi', 'gpay', 'phonepe', 'cards', 'net banking', 'payment kaise kare']
  },
  {
    id: 'faq-cash-on-delivery',
    category: 'cash_on_delivery',
    title: 'Cash on Delivery (COD)',
    question: 'Do you accept Cash on Delivery? / Is COD available?',
    answer: 'Yes, Cash on Delivery is available for most pincodes on orders up to standard value limits. You can pay cash or scan the courier’s UPI QR code at delivery.',
    tags: ['cod', 'cash on delivery', 'pay on delivery', 'cash', 'doorstep payment']
  },
  {
    id: 'faq-payment-failed',
    category: 'payment_failed',
    title: 'Payment Failed / Money Deducted',
    question: 'Money was deducted but my order failed / Payment failed',
    answer: 'If money was deducted for a failed order, banking networks usually auto-reverse the amount within 3–5 business days. Please avoid making duplicate attempts immediately. If the amount is not reversed, share the bank reference UTR number with our support team.',
    tags: ['payment failed', 'money deducted', 'transaction failed', 'order not placed', 'paisa kat gaya']
  },

  // --- 6. PRODUCTS & PRICING ---
  {
    id: 'faq-product-info',
    category: 'product_information',
    title: 'Product Information',
    question: 'Tell me about a product / Where can I find product specifications?',
    answer: 'Detailed product specifications, dimensions, materials, and user reviews are listed on each product’s detail page in our catalog.',
    tags: ['product info', 'specifications', 'details', 'catalog', 'product description', 'features']
  },
  {
    id: 'faq-product-avail',
    category: 'product_availability',
    title: 'Product Availability',
    question: 'Is the product available in stock?',
    answer: 'Product availability depends on our current warehouse inventory. Please provide the specific product name or SKU to check stock availability.',
    tags: ['product availability', 'stock', 'in stock', 'out of stock', 'inventory', 'available hai']
  },
  {
    id: 'faq-product-price',
    category: 'product_price',
    title: 'Product Pricing',
    question: 'How much does this product cost? / What is the price?',
    answer: 'Product prices inclusive of all applicable taxes are displayed on the product catalog page. Prices may vary based on ongoing promotional offers.',
    tags: ['price', 'cost', 'how much', 'mrp', 'rate', 'kitne ka hai']
  },
  {
    id: 'faq-product-comparison',
    category: 'product_comparison',
    title: 'Product Comparison',
    question: 'Which product is better? / Can you compare products?',
    answer: 'You can compare features, dimensions, and customer ratings directly on the catalog comparison tool, or share the product names for specific feature highlights.',
    tags: ['compare', 'comparison', 'which is better', 'difference', 'better product']
  },

  // --- 7. DISCOUNTS & COUPONS ---
  {
    id: 'faq-discount',
    category: 'discount',
    title: 'Discounts & Current Offers',
    question: 'Do you have any discounts or offers available?',
    answer: 'Current promotions, seasonal sales, and bank discount offers are highlighted on our homepage banner and during checkout.',
    tags: ['discount', 'offers', 'sale', 'promotions', 'deals', 'chhoot']
  },
  {
    id: 'faq-coupon',
    category: 'coupon',
    title: 'Coupon Codes & Usage',
    question: 'How do I use a coupon? / Why is my coupon code not working?',
    answer: 'Enter your valid promo code in the "Apply Coupon" field at checkout. If a code fails, check minimum cart value requirements, expiration date, or brand exclusions. Note that only one coupon can be used per order.',
    tags: ['coupon', 'promo code', 'voucher', 'coupon not working', 'apply coupon']
  },

  // --- 8. WARRANTY & CLAIMS ---
  {
    id: 'faq-warranty',
    category: 'warranty',
    title: 'Warranty Coverage',
    question: 'Does this product have a warranty? / How to claim warranty?',
    answer: 'Eligible electronic and branded products come with a standard manufacturer warranty (usually 1 year). Your tax invoice acts as official proof of purchase for warranty claims.',
    tags: ['warranty', 'guarantee', 'claim warranty', 'manufacturer warranty', 'warranty period']
  },

  // --- 9. COMPLAINTS & DEFECTS ---
  {
    id: 'faq-complaint',
    category: 'complaint',
    title: 'Customer Complaints',
    question: 'I have a complaint / I am dissatisfied with my service',
    answer: 'We sincerely apologize for the inconvenience. Please share your order number and specific issue so our senior customer care team can resolve it on priority.',
    tags: ['complaint', 'dissatisfied', 'bad service', 'unhappy', 'escalation', 'shikayat']
  },
  {
    id: 'faq-product-damage',
    category: 'product_damage',
    title: 'Damaged Product Received',
    question: 'My product arrived damaged / Broken item received',
    answer: 'We are sorry to hear that. Please report any damaged items within 48 hours of delivery along with photos of the outer box and product to receive an immediate free replacement or refund.',
    tags: ['damaged', 'broken', 'cracked', 'defective', 'damaged package', 'toota hua']
  },
  {
    id: 'faq-wrong-product',
    category: 'wrong_product_received',
    title: 'Wrong Product Received',
    question: 'I received the wrong item / Different product delivered',
    answer: 'If you received an incorrect item, please initiate a return/exchange from "My Orders" or contact support with photos of the item received. We will arrange a priority pickup and send the correct product.',
    tags: ['wrong product', 'wrong item', 'different item', 'incorrect item', 'galat product']
  },
  {
    id: 'faq-missing-item',
    category: 'missing_item',
    title: 'Missing Item in Package',
    question: 'An item is missing from my package / Incomplete order',
    answer: 'Some orders are shipped in multiple packages from separate warehouses. If all packages have arrived and an item is still missing, please contact support within 48 hours.',
    tags: ['missing item', 'incomplete order', 'item missing', 'missing product']
  },

  // --- 10. ACCOUNT & INVOICES ---
  {
    id: 'faq-invoice',
    category: 'invoice',
    title: 'Invoice & Bill Download',
    question: 'How can I get my invoice / Can I download my bill?',
    answer: 'You can download tax invoices directly from "My Orders" by clicking "Download Invoice" next to the delivered order. Invoices are also emailed automatically upon dispatch.',
    tags: ['invoice', 'bill', 'receipt', 'tax invoice', 'download bill']
  },
  {
    id: 'faq-account-help',
    category: 'account_help',
    title: 'Account Help',
    question: 'How do I reset my password or update my account details?',
    answer: 'Go to the Profile / Account Settings page to update your email, phone number, saved delivery addresses, or reset your login password.',
    tags: ['account help', 'reset password', 'profile', 'login issue', 'change number']
  },

  // --- 11. CUSTOMER SUPPORT & HUMAN AGENTS ---
  {
    id: 'faq-contact-support',
    category: 'contact_support',
    title: 'Contact Customer Support',
    question: 'How can I contact customer support? / Customer care number?',
    answer: 'You can contact our customer support team via email at support@example.com or call our toll-free helpline at 1800-123-4567 (Mon–Sat, 9:00 AM – 6:00 PM IST).',
    tags: ['contact support', 'customer care', 'email support', 'helpline', 'phone number', 'help desk']
  },
  {
    id: 'faq-human-agent',
    category: 'human_agent',
    title: 'Speak to a Human Agent',
    question: 'I want to speak with a human / Connect me to an agent',
    answer: 'I can connect you with our live support team. Our human agents are available Mon–Sat from 9:00 AM to 6:00 PM IST via helpline 1800-123-4567 or email support@example.com.',
    tags: ['human agent', 'speak to human', 'talk to agent', 'real person', 'live agent', 'human']
  }
];

// Quick Action Buttons requested in specification
export const QUICK_ACTIONS = [
  { id: 'track', label: 'Track Order', emoji: '📦', query: 'How can I track my order?' },
  { id: 'shipping', label: 'Shipping & Delivery', emoji: '🚚', query: 'How long does shipping take?' },
  { id: 'return', label: 'Return Product', emoji: '↩️', query: 'What is your return policy?' },
  { id: 'refund', label: 'Refund', emoji: '💰', query: 'When will I get my refund?' },
  { id: 'payment', label: 'Payment Help', emoji: '💳', query: 'What payment methods do you accept?' },
  { id: 'product', label: 'Product Info', emoji: '🛍️', query: 'Tell me about product information' },
  { id: 'discounts', label: 'Discounts', emoji: '🏷️', query: 'Do you have any discounts or coupons?' },
  { id: 'support', label: 'Contact Support', emoji: '👨‍💼', query: 'How can I contact customer support?' },
];

// Formats the entire structured knowledge base for Gemini system instruction grounding
export function getFormattedKnowledgeBase(): string {
  return FAQ_KNOWLEDGE_BASE.map(
    (item, index) => `${index + 1}. [${item.title.toUpperCase()} - Category: ${item.category}]
Question: ${item.question}
Answer: ${item.answer}`
  ).join('\n\n');
}
