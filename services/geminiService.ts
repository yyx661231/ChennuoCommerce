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

// --- DEMO MODE LOGIC ---
// Used when no API Key is found to prevent app crash and provide a simulated experience.
const getDemoResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('钱') || lowerMsg.includes('价') || lowerMsg.includes('费用') || lowerMsg.includes('998')) {
    return "亲，晨诺电商核心合伙人计划目前限时特惠 ¥998（原价 ¥3398）！一次付费，永久陪跑，包含全套课程、8个月一对一指导、AI大模型使用权以及全网头部货源对接。没有任何二次隐形收费哦！🍊";
  }
  
  if (lowerMsg.includes('货') || lowerMsg.includes('供应链') || lowerMsg.includes('产品')) {
    return "咱们团队拥有全网家电类目头部供应链，包括志高、荣事达、先科等知名品牌。浙江慈溪、江苏宿迁、河南商丘三地工厂直发，直接给学员全网最低拿货价，利润空间非常有保障！📦";
  }
  
  if (lowerMsg.includes('小白') || lowerMsg.includes('新') || lowerMsg.includes('没经验') || lowerMsg.includes('懂')) {
    return "完全没问题的！我们的陪跑就是专门针对0基础学员设计的。从怎么注册账号、怎么养号、怎么选品到怎么出单，全程都有老师一对一指导。而且还有我（AI小橙子）24小时辅助您解决问题，非常适合新手上手！✨";
  }

  if (lowerMsg.includes('微信') || lowerMsg.includes('联系') || lowerMsg.includes('加入')) {
    return "欢迎加入！您可以点击页面右上角的“立即加入”按钮，或者直接添加晨诺本人微信号：at1ol881231（记得备注“来意”哦），我们会在微信上给您发详细资料～🤝";
  }

  if (lowerMsg.includes('你好') || lowerMsg.includes('hi') || lowerMsg.includes('在吗')) {
    return "你好呀！我是晨诺团队研发的AI运营助手小橙子🍊。有什么关于闲鱼电商、选品或者我们团队的问题，随时都可以问我哦！";
  }
  
  // Default fallback
  return "这个问题比较专业，小橙子建议您直接添加晨诺本人微信 at1ol881231 详细咨询，以便给您最准确的针对性解答哦！🍊";
};

export const sendMessageToLittleOrange = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const apiKey = getApiKey();
  
  // 1. DEMO MODE (No API Key)
  if (!apiKey) {
    console.warn("Gemini API Key missing. Running in DEMO MODE.");
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getDemoResponse(newMessage);
  }

  // 2. REAL MODE
  try {
    const ai = getAiClient(apiKey);
    
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
    // Fallback to demo response if API call fails (e.g. quota exceeded or invalid key)
    return getDemoResponse(newMessage);
  }
};