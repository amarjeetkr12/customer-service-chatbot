import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { FAQ_KNOWLEDGE_BASE, getFormattedKnowledgeBase } from './src/data/faqData';
import { classifyIntentAndAnswer } from './src/nlpEngine';
import { ChatApiRequest, ChatApiResponse, IntentCategory } from './src/types';

// Load environment variables (.env / system runtime)
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON body parsing for incoming API requests
app.use(express.json());

// Initialize Google Gemini Client using recommended @google/genai SDK
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ALL_INTENT_CATEGORIES: IntentCategory[] = [
  'greeting',
  'order_status',
  'order_tracking',
  'order_not_received',
  'order_delayed',
  'order_cancel',
  'order_modification',
  'shipping',
  'delivery_time',
  'delivery_address',
  'product_information',
  'product_availability',
  'product_price',
  'product_comparison',
  'product_damage',
  'wrong_product_received',
  'missing_item',
  'return',
  'return_process',
  'refund',
  'refund_delay',
  'payment',
  'payment_failed',
  'payment_refund',
  'cash_on_delivery',
  'discount',
  'coupon',
  'invoice',
  'warranty',
  'replacement',
  'complaint',
  'account_help',
  'contact_support',
  'human_agent',
  'thank_you',
  'goodbye',
  'unknown'
];

/**
 * API ROUTE: /api/chat
 * Handles natural language queries using Google Gemini 3.7 Flash with multi-turn history
 * and automatic fallback to the local NLP knowledge base engine.
 */
app.post('/api/chat', async (req: Request<{}, {}, ChatApiRequest>, res: Response) => {
  const { message, history } = req.body;

  // Step 1: Input Validation
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'Message parameter is required and cannot be empty.'
    });
  }

  const userQuery = message.trim();

  // If Gemini client is not initialized, instantly return local NLP response
  if (!aiClient) {
    const localResult = classifyIntentAndAnswer(userQuery);
    return res.json({
      ...localResult,
      source: 'local_nlp'
    });
  }

  try {
    const knowledgeBaseText = getFormattedKnowledgeBase();

    const systemInstruction = `You are an expert, professional, fast, and polite Customer Support Assistant.

Your objective: FAST RESPONSE + SMART UNDERSTANDING + HELPFUL EXPLANATION + PROFESSIONAL CUSTOMER SERVICE.

You support English, Hindi, and Hinglish queries seamlessly (e.g. "Mera order kab aayega?", "Return kaise karu?", "Mujhe refund nahi mila", "UPI se payment kar sakta hu?").

==================================================
KNOWLEDGE BASE (YOUR SOURCE OF TRUTH):
==================================================
${knowledgeBaseText}

==================================================
CRITICAL OPERATIONAL RULES:
==================================================
1. NEVER HALLUCINATE OR INVENT:
   - Do NOT invent fake order IDs, tracking codes, prices, customer names, refund amounts, fake links, or live database records.
   - If a customer asks about a specific real order status, explain how order tracking works and remind them to provide their Order ID or use the account dashboard.

2. ADAPTIVE RESPONSE LENGTH & FORMATTING:
   - For simple, direct questions (e.g., "How long does shipping take?"): Give a crisp, short answer (1-2 sentences).
   - For troubleshooting/procedures (e.g., payment deducted for failed order, return steps, invoice download): Use structured numbered steps (1, 2, 3).
   - For multi-intent questions (e.g., "My order is late and can I cancel it?", "I got wrong product, can I return and when will I get refund?"): Address ALL parts thoroughly using bullet points or clean paragraphs. Never answer only the first part.

3. CONTEXT & FOLLOW-UP AWARENESS:
   - Use the conversation history to resolve pronouns ("it", "that", "how long will it take?"). If the user previously asked about returns and now asks "how long does it take?", answer about the return/refund timeline.

4. AMBIGUOUS QUESTIONS:
   - If the customer's request is ambiguous (e.g., "My order has a problem", "Need help with order"), do not guess randomly. Ask a polite clarifying question:
     "I’d be happy to help. Is the problem related to delivery, payment, a damaged product, or something else?"

5. FRUSTRATED / ANGRY CUSTOMER HANDLING:
   - When a customer is frustrated (e.g., "This is ridiculous!", "I've been waiting for days!"), respond with calm empathy first:
     "I’m sorry for the inconvenience. I understand how frustrating this can be. Let me assist you..."

6. HUMAN SUPPORT ESCALATION:
   - If the user asks for a human ("I want to speak with a human", "Connect me to an agent") or the issue is unresolvable, provide the support contact details (support@example.com, toll-free 1800-123-4567, Mon-Sat 9AM-6PM IST).

7. OUT-OF-SCOPE QUESTIONS:
   - If the user asks about non-customer-service topics (weather, recipes, coding, poems, trivia), classify intent as "unknown", explain politely that you are a customer support assistant, and suggest reaching support for store queries.

8. TONE:
   - Professional, courteous, empathetic, friendly, and concise. Never say "As an AI language model..."`;

    // Step 2: Format conversation contents for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Add recent history if provided (up to last 6 turns)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn.role && turn.parts) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.parts }]
          });
        }
      }
    }

    // Add current user query
    contents.push({
      role: 'user',
      parts: [{ text: userQuery }]
    });

    // Step 3: Create a timeout promise to guarantee the server never hangs (5000ms max)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Gemini API call timed out')), 5000);
    });

    // Step 4: Call Gemini with structured output JSON schema
    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.7-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.15,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            intent: {
              type: Type.STRING,
              enum: ALL_INTENT_CATEGORIES,
              description: 'The classified customer service intent category from the 37 supported categories.'
            },
            response: {
              type: Type.STRING,
              description: 'The concise, polite customer service answer strictly grounded in the knowledge base.'
            },
            suggestedReplies: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: '2 to 4 suggested follow-up questions for the customer.'
            }
          },
          required: ['intent', 'response']
        }
      }
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const responseText = response.text?.trim();

    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    const parsedData = JSON.parse(responseText) as {
      intent: IntentCategory;
      response: string;
      suggestedReplies?: string[];
    };

    const finalResult: ChatApiResponse = {
      intent: parsedData.intent || 'unknown',
      response: parsedData.response || 'I’m sorry, I don’t have enough information to answer that. Please contact customer support for further assistance.',
      suggestedReplies: parsedData.suggestedReplies && parsedData.suggestedReplies.length > 0
        ? parsedData.suggestedReplies
        : ['How long does shipping take?', 'What is your return policy?', 'How can I track my order?', 'How can I contact customer support?'],
      source: 'gemini'
    };

    return res.json(finalResult);

  } catch (error: any) {
    console.warn('Falling back to local NLP engine:', error?.message || error);
    // Instant, 100% resilient fallback to local NLP engine
    const localResult = classifyIntentAndAnswer(userQuery);
    return res.json({
      ...localResult,
      source: 'local_nlp'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.7-flash',
    faqCount: FAQ_KNOWLEDGE_BASE.length
  });
});

// Knowledge base inspection endpoint
app.get('/api/faq', (req, res) => {
  res.json({
    faqs: FAQ_KNOWLEDGE_BASE
  });
});

// Vite middleware configuration for Development and Production builds
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Customer Service Chatbot Server listening on port ${PORT}`);
  });
}

startServer();
