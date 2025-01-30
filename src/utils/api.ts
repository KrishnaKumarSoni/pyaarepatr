import OpenAI from 'openai';
import { LetterFormData } from '../types/letter';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateLetter = async (formData: LetterFormData): Promise<string> => {
  const prompt = `Write a ${formData.writingStyle || 'romantic'} love letter (maximum 1000 characters) to ${formData.partnerName}.
    Consider these details:
    - Gender: ${formData.gender}
    - Relationship duration: ${formData.relationshipDuration}
    - Shared memories: ${formData.sharedMemories}
    - Personal traits: ${formData.personalTraits}
    ${formData.customMessage ? `- Custom message to include: ${formData.customMessage}` : ''}
    Make it personal, emotional, and specific to the details provided.
    End the letter with "With love, ${formData.writerName}"`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 400, // Approximately 1000 characters
  });

  return completion.choices[0].message.content || 'Failed to generate letter';
}; 