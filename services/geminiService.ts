import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, ChatRole } from "../types";

// Safe access to API Key for both Node (preview) and Vite (production) environments
const getApiKey = () => {
  let key = '';
  // Try process.env first (Node/Polyfilled)
  try {
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      key = process.env.API_KEY;
    }
  } catch (e) {
    // ignore
  }

  // Fallback to Vite env vars if process didn't work or returned empty
  if (!key) {
    try {
      // @ts-ignore - import.meta is a Vite/ESM feature
      key = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY || '';
    } catch (e) {
      // ignore
    }
  }
  return key;
};

const SYSTEM_INSTRUCTION = `
You are "Little Orange" (小橙子), the proprietary AI e-commerce operation assistant developed by the Ce Nuo Commerce Team (晨诺电商团队). 
Your persona is professional, encouraging, and knowledgeable about Xianyu (Idle Fish) e-commerce operations.

Your capabilities based on the company profile:
1. You assist with product selection, account nurturing, and sales conversion.
2. You provide 24/7 support to solve difficult sales problems.
3. You represent Ce Nuo Commerce, which has a top-tier supply chain, 4 years of experience, and over 100W+ monthly GMV.

If asked about pricing, mention the course is currently ¥998 (Value ¥3398).
Answer questions briefly and helpfully in Chinese.
`;

// Helper to get or create client instance lazily
let aiInstance: GoogleGenAI | null = null;

const getAiClient = (apiKey: string) => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const sendMessageToLittleOrange = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing");
    return "系统提示：未配置 API Key，无法连接到 AI 小橙子。请联系管理员或稍后再试。";
  }

  try {
    const ai = getAiClient(apiKey);
    
    // Construct the history for the model
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role === ChatRole.USER ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text || "抱歉，小橙子现在有点忙，请稍后再试。";

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "系统繁忙，请稍后再试。";
  }
};