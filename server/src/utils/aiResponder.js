import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI client with the API key from environment variables
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

/**
 * Generates an AI-powered conversational response from the perspective of the connection profile using Gemini.
 * Falls back to local rule-based responses if Gemini is not configured or fails.
 */
export const generateAIResponse = async (recipientProfile, userMessageText) => {
  const name = recipientProfile.fullName || "Your connection";
  const role = recipientProfile.role || "student";
  const department = recipientProfile.department || "Engineering";
  const company = recipientProfile.company || recipientProfile.university || "UniLink";
  const bio = recipientProfile.bio || "";

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessageText,
        config: {
          systemInstruction: `You are roleplaying as a UniLink campus connection. You must stay in character.
Your profile details:
- Name: ${name}
- Role: ${role}
- Department: ${department}
- Company/University: ${company}
- Bio: ${bio}

Instructions:
1. Respond to the user's message as this person.
2. Keep your response conversational, concise (1-3 sentences maximum), helpful, and natural.
3. Match the tone of your bio (e.g. enthusiastic, professional, curious).
4. Do not include prefix lines like "${name}:" in your output. Just output the message itself.`,
        },
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (err) {
      console.error('Gemini API call failed, falling back to local simulation:', err);
    }
  }

  // Fallback Rule-based responder if Gemini is not set up
  return generateLocalResponse(recipientProfile, userMessageText);
};

const generateLocalResponse = (recipientProfile, userMessageText) => {
  const role = recipientProfile.role || "student";
  const department = recipientProfile.department || "Engineering";
  const company = recipientProfile.company || recipientProfile.university || "UniLink";
  const text = userMessageText.toLowerCase().trim();

  if (text === "hi" || text === "hello" || text === "hey" || text.includes("nice to meet")) {
    if (role === "alumni") {
      return `Hey! Great to connect with you. I'm currently working at ${company} in ${department}. How is everything going on campus?`;
    }
    return `Hi! Thanks for reaching out. Always good to meet fellow students in ${department}. What are you currently working on?`;
  }

  if (text.includes("how are you") || text.includes("how's it going") || text.includes("whats up")) {
    return `Doing great, thanks for asking! Just wrapping up some tasks at ${company}. How about you?`;
  }

  if (text.includes("thank") || text.includes("thanks")) {
    return `No problem at all! Happy to help out. Let me know if you have other questions.`;
  }

  if (text.includes("google") || text.includes("job") || text.includes("work") || text.includes("intern") || text.includes("career")) {
    if (role === "alumni") {
      return `Breaking into ${company} took some preparation. I focused heavily on coding consistency and mock interviews. I'd be happy to review your resume sometime!`;
    }
    return `I'm also looking for internships right now! Have you started preparing your resume?`;
  }

  return `Interesting! As a ${role} in ${department}, I always find that networking and sharing experiences makes college life much easier. What are your goals for this semester?`;
};
