import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Frontend React & Tailwind CSS engineer. 
Your goal is to convert UI sketches (hand-drawn or wireframes) into production-ready, responsive, and beautiful HTML/CSS code.

RULES:
1. Use a single HTML file containing all necessary CSS and JS.
2. ALWAYS use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.
3. Use FontAwesome for icons if needed: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">.
4. Use Google Fonts (Inter or Roboto) for typography.
5. Use "https://picsum.photos/id/{random_id}/200/300" for placeholder images.
6. The design should be modern, clean, and spacious.
7. Return ONLY the raw HTML code. Do not wrap it in markdown code blocks (e.g., no \`\`\`html).
8. Ensure the layout is responsive (mobile-first).
`;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCodeFromSketch = async (
  base64Image: string,
  promptText: string = "Turn this sketch into a working HTML/Tailwind website."
): Promise<string> => {
  const ai = getClient();
  
  // Clean base64 string if it has prefix
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png", // Assuming PNG or compatible for simplicity, API handles standard types
              data: cleanBase64,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Lower temperature for more deterministic code
      },
    });

    const text = response.text || "";
    // Post-processing to ensure no markdown fences remain
    return text.replace(/```html/g, "").replace(/```/g, "").trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const refineCode = async (
  currentCode: string,
  instruction: string
): Promise<string> => {
  const ai = getClient();
  
  const prompt = `
  Here is the current HTML code:
  ${currentCode}

  User Instruction: ${instruction}

  Update the code according to the instruction. Keep the existing structure unless asked to change it.
  Return ONLY the updated raw HTML code. No markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const text = response.text || "";
    return text.replace(/```html/g, "").replace(/```/g, "").trim();
  } catch (error) {
    console.error("Gemini Refinement Error:", error);
    throw error;
  }
};
