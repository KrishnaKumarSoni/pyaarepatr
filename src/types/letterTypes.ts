export type LetterType = 'partner' | 'self' | 'parent';

export interface BaseLetterFormData {
  writerName: string;
  writingStyle: string;
  customMessage?: string;
}

export interface PartnerLetterData extends BaseLetterFormData {
  type: 'partner';
  partnerName: string;
  gender: string;
  relationshipDuration: string;
  sharedMemories: string;
  personalTraits: string;
}

export interface SelfLetterData extends BaseLetterFormData {
  type: 'self';
  currentMood: string;
  achievements: string;
  struggles: string;
  futureGoals: string;
}

export interface ParentLetterData extends BaseLetterFormData {
  type: 'parent';
  parentName: string;
  relationship: 'father' | 'mother';
  childhoodMemory: string;
  gratitude: string;
  wishes: string;
}

export type LetterFormData = PartnerLetterData | SelfLetterData | ParentLetterData;

export const letterTypeLabels: Record<LetterType, string> = {
  partner: 'Romantic Partner',
  self: 'Letter to Self',
  parent: 'Parent',
}; 