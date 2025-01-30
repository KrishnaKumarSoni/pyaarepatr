export interface LetterFormData {
  writerName: string;
  partnerName: string;
  gender: string;
  relationshipDuration: string;
  sharedMemories: string;
  personalTraits: string;
  customMessage: string;
  writingStyle: string;
}

export interface GeneratedLetter {
  id: string;
  content: string;
  musicUrl: string;
  writerName: string;
  isEditing?: boolean;
} 