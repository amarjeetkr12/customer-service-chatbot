# Customer Support Assistant & NLP Chatbot

A fast, intelligent, and production-ready Customer Support AI Assistant built with **React 19, TypeScript, Tailwind CSS, Express, and Google Gemini 3.7 Flash**.

Features a **hybrid architecture** that combines instant local NLP classification (<20ms) with Gemini 3.7 Flash conversational reasoning for multi-intent handling, contextual questions, and empathy.

---

## 🚀 Quick Start (Local Setup from GitHub)

### 1. Prerequisites
Ensure you have **Node.js (v18.0.0 or higher)** and `npm` installed on your machine.
- Verify with:
  ```bash
  node -v
  npm -v
  ```

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/customer-support-assistant.git
cd customer-support-assistant
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```

Open `.env` and add your **Google Gemini API Key** (Get one for free at [Google AI Studio](https://aistudio.google.com/)):
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Note:** The chatbot also includes a built-in deterministic local NLP engine. Even if no API key is provided, the application will still run smoothly and respond to customer queries using the local policy knowledge base!

---

## 💻 Available Scripts

### Run in Development Mode
Starts the combined Express + Vite development server with TypeScript support:
```bash
npm run dev
```
Open your browser and navigate to: **`http://localhost:3000`**

### Build for Production
Compiles the React frontend via Vite and bundles the Node.js backend into a single `dist/server.cjs` using esbuild:
```bash
npm run build
```

### Start in Production Mode
Runs the pre-compiled production build:
```bash
npm start
```

### Type Checking & Linting
```bash
npm run lint
```

---

## 🌟 Key Features

- **37 Customer Service Intent Categories**: Complete coverage for Orders, Delivery, Returns, Refunds, Payments, Product Specs, Coupons, Invoices, and Complaints.
- **Multilingual Support**: Seamless comprehension of **English**, **Hindi**, and **Hinglish** (e.g., *"Mera parcel kab aayega?"*, *"Return kaise karu?"*).
- **Fast + Smart Hybrid Engine**:
  - Direct single-intent FAQs answered instantly (<20ms) with zero server lag.
  - Multi-intent questions, follow-up pronouns, and complex inquiries handled by **Gemini 3.7 Flash**.
- **100% Grounded Policy Knowledge Base**: Strict guardrails prevent hallucinations of fake order IDs, prices, or delivery dates.
- **Responsive UI**: Built with Tailwind CSS and Lucide icons, including an interactive Knowledge Base Drawer and Quick Action shortcuts.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion
- **Icons**: Lucide React
- **Backend / API**: Express 4, Node.js, `tsx`
- **AI SDK**: `@google/genai` (Gemini 3.7 Flash)
- **Bundler & Tooling**: Vite 6, esbuild, TypeScript
