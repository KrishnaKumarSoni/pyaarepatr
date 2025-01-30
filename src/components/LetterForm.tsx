import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  Progress,
} from '@chakra-ui/react';
import { LetterFormData } from '../types/letter';

const initialFormData: LetterFormData = {
  writerName: '',
  partnerName: '',
  gender: '',
  relationshipDuration: '',
  sharedMemories: '',
  personalTraits: '',
  customMessage: '',
  writingStyle: '',
};

export default function LetterForm({ onSubmit, initialData }: { 
  onSubmit: (data: LetterFormData) => Promise<void>;
  initialData?: LetterFormData;
}) {
  const [formData, setFormData] = useState<LetterFormData>(initialData || initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate letter. Please try again.',
        status: 'error',
        duration: 5000,
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px" p={6}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input
            name="writerName"
            value={formData.writerName}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Partner's Name</FormLabel>
          <Input
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            placeholder="Enter your partner's name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange} placeholder="Select gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Relationship Duration</FormLabel>
          <Input
            name="relationshipDuration"
            value={formData.relationshipDuration}
            onChange={handleChange}
            placeholder="e.g., 2 years"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Shared Memories</FormLabel>
          <Textarea
            name="sharedMemories"
            value={formData.sharedMemories}
            onChange={handleChange}
            placeholder="Share some special moments together"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Personal Traits</FormLabel>
          <Textarea
            name="personalTraits"
            value={formData.personalTraits}
            onChange={handleChange}
            placeholder="What makes them special?"
            rows={3}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Custom Message</FormLabel>
          <Textarea
            name="customMessage"
            value={formData.customMessage}
            onChange={handleChange}
            placeholder="Any specific message you'd like to include?"
            rows={3}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Writing Style</FormLabel>
          <Select
            name="writingStyle"
            value={formData.writingStyle}
            onChange={handleChange}
            placeholder="Select style"
          >
            <option value="romantic">Romantic</option>
            <option value="funny">Funny</option>
            <option value="poetic">Poetic</option>
            <option value="deep">Deep & Meaningful</option>
          </Select>
        </FormControl>

        {isLoading && <Progress size="xs" isIndeterminate w="100%" />}

        <Button
          type="submit"
          colorScheme="pink"
          isLoading={isLoading}
          loadingText="Generating..."
          w="100%"
        >
          {initialData ? 'Update Letter' : 'Generate Love Letter'}
        </Button>
      </VStack>
    </Box>
  );
} 