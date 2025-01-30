import OpenAI from 'openai';
import { LetterFormData, PartnerLetterData, SelfLetterData, ParentLetterData } from '../types/letterTypes';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const getLanguageInstruction = (languageCode: string): string => {
  switch (languageCode) {
    case 'hi-en':
      return 'in Hinglish (mix of Hindi and English, written in Roman script). Use casual and friendly tone with common Hindi expressions mixed with English.';
    case 'hi-en-bh':
      return 'in Bhojpuri-style Hinglish (mix of Bhojpuri, Hindi and English, written in Roman script). Use Bhojpuri expressions like "ka", "ba", "hamar", "tohar" mixed with English. Keep the tone very warm and folksy.';
    case 'hi-en-rj':
      return 'in Rajasthani-style Hinglish (mix of Rajasthani, Hindi and English, written in Roman script). Use Rajasthani expressions like "sa", "padharo", "tharo" mixed with English. Keep the tone respectful with Rajasthani warmth.';
    case 'hi-en-mh':
      return 'in Maharashtrian-style Hinglish (mix of Marathi, Hindi and English, written in Roman script). Use Marathi expressions like "kay", "zhalay", "ekdum" mixed with English. Add "-ch" suffix where appropriate.';
    case 'hi-en-south':
      return 'in South Indian-style Hinglish (mix of South Indian languages, Hindi and English, written in Roman script). Use expressions like "da", "machaa", "only", "simply" frequently. End some sentences with "ya" or "na". Add Tamil/Malayalam/Telugu style English constructions.';
    default:
      return `in ${languageCode} language`;
  }
};

const getPromptByType = (data: LetterFormData, languageCode: string = 'en'): string => {
  switch (data.type) {
    case 'partner':
      return generatePartnerPrompt(data, languageCode);
    case 'self':
      return generateSelfPrompt(data, languageCode);
    case 'parent':
      return generateParentPrompt(data, languageCode);
  }
};

const generatePartnerPrompt = (data: PartnerLetterData, languageCode: string): string => {
  const languageInstr = getLanguageInstruction(languageCode);
  return `Write a ${data.writingStyle || 'romantic'} love letter (maximum 1000 characters) to ${data.partnerName} ${languageInstr}.
    Consider these details:
    - Gender: ${data.gender}
    - Relationship duration: ${data.relationshipDuration}
    - Shared memories: ${data.sharedMemories}
    - Personal traits: ${data.personalTraits}
    ${data.customMessage ? `- Custom message to include: ${data.customMessage}` : ''}
    Make it personal, emotional, and specific to the details provided.
    End the letter with "With love, ${data.writerName}"`;
};

const generateSelfPrompt = (data: SelfLetterData, languageCode: string): string => {
  const languageInstr = getLanguageInstruction(languageCode);
  return `Write a ${data.writingStyle || 'reflective'} letter (maximum 1000 characters) to yourself ${languageInstr}.
    Consider these aspects of your life:
    - Current mood and state of mind: ${data.currentMood}
    - Recent achievements and proud moments: ${data.achievements}
    - Current struggles and challenges: ${data.struggles}
    - Future goals and aspirations: ${data.futureGoals}
    ${data.customMessage ? `- Additional thoughts: ${data.customMessage}` : ''}
    Make it encouraging, honest, and introspective. Focus on self-compassion and growth.
    End the letter with "With self-love, ${data.writerName}"`;
};

const generateParentPrompt = (data: ParentLetterData, languageCode: string): string => {
  const languageInstr = getLanguageInstruction(languageCode);
  return `Write a ${data.writingStyle || 'heartfelt'} letter (maximum 1000 characters) to your ${data.relationship}, ${data.parentName} ${languageInstr}.
    Include these elements:
    - A cherished childhood memory: ${data.childhoodMemory}
    - Express gratitude for: ${data.gratitude}
    - Your wishes and hopes: ${data.wishes}
    ${data.customMessage ? `- Special message: ${data.customMessage}` : ''}
    Make it sincere, emotional, and specific to your relationship.
    End the letter with "With love and respect, ${data.writerName}"`;
};

export const generateLetter = async (formData: LetterFormData, languageCode: string = 'en'): Promise<string> => {
  const prompt = getPromptByType(formData, languageCode);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    max_tokens: 2000,
  });

  return completion.choices[0].message.content || 'Failed to generate letter';
}; 