import { LetterFormData } from './letterTypes';

export type { LetterFormData };

export interface GeneratedLetter {
  id: string;
  content: string;
  musicUrl: string;
  writerName: string;
  isEditing?: boolean;
} 