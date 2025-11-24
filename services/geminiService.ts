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

const API_KEY = getApiKey();

// Initialize the client only if the key exists to avoid immediate errors, 
// though actual calls will fail gracefully if missing.
const ai = new GoogleGenAI({ apiKey: API_KEY });

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

export const sendMessageToLittleOrange = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    // Construct the history for the model
    // Note: This simple implementation sends history as context in a fresh call 
    // or uses chat session. Let's use a chat session structure implicitly by prompt construction 
    // or properly using the chat API if we were maintaining stateful object.
    // For this stateless service function, we'll instantiate a chat.

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