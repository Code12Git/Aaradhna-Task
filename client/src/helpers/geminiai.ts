import { GoogleGenAI } from "@google/genai";
import pLimit from 'p-limit';

const limit = pLimit(3);

const ai = new GoogleGenAI({apiKey:"AIzaSyBNd0mXSDLl-NicOoQ9kfzI_2Rdc9XA2V4"});

export async function suggestedBlog() {
    return limit(async () => {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{
                    parts: [{
                      text: "Generate exactly ONE blog title and description pair. Follow these rules:\n" +
                            "1. Output format MUST be:\n" +
                            "Title: [generated title]\n" +
                            "Description: [5 sentence description]\n" +
                            "2. Never repeat the same combination\n" +
                            "3. No additional commentary\n" +
                            "4. Cover diverse topics automatically"
                    }]
                  }],                config: {
                    thinkingConfig: {
                        thinkingBudget: 0, 
                    },
                    systemInstruction: {
                        parts: [{
                          text: "You are a professional blogger generating viral content. Your expertise covers:\n" +
                                "- Technology\n- Lifestyle\n- Business\n- Health\n- Productivity\n\n" +
                                "Rules:\n" +
                                "1. Always generate unique combinations\n" +
                                "2. Titles must be click-worthy\n" +
                                "3. Descriptions should intrigue readers\n" +
                                "4. Never ask for user input"
                        }]
                      }                }
            });
            return response.text;
        } catch(err) {
            console.log(err);
        }
    });
}