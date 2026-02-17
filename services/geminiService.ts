
import { GoogleGenAI, Type } from "@google/genai";
import { WishCategory } from "../types";

export const generateNewYearWish = async (category: WishCategory): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy tạo một lời chúc Tết Nguyên Đán 2026 (Năm Bính Ngọ) thật hay, ý nghĩa, súc tích dành cho danh mục: ${category}. Lời chúc nên mang âm hưởng truyền thống Việt Nam, có nhắc đến hình tượng con ngựa (Bính Ngọ) và tinh thần 'Mã đáo thành công'. Trả về chỉ văn bản lời chúc.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text?.trim() || "Chúc mừng năm mới 2026 - Vạn sự như ý!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Chúc mừng năm mới 2026! An khang thịnh vượng, mã đáo thành công!";
  }
};
