import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import LetterForm from '../components/LetterForm';
import { LetterFormData } from '../types/letter';
import { generateLetter } from '../utils/api';

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = async (formData: LetterFormData) => {
    try {
      const letterContent = await generateLetter(formData);
      const letterId = Date.now().toString();
      localStorage.setItem(letterId, JSON.stringify({
        id: letterId,
        content: letterContent,
        writerName: formData.writerName,
        musicUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }));
      navigate(`/letter/${letterId}`);
    } catch (error) {
      console.error('Failed to generate letter:', error);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="center">
        <Heading size="xl" color="brand.pink">
          PyaarePatr
        </Heading>
        <Text textAlign="center" fontSize="lg">
          Create a beautiful, AI-generated love letter for your special someone
        </Text>
        <LetterForm onSubmit={handleSubmit} />
      </VStack>
    </Container>
  );
} 