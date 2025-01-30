import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Text,
  VStack,
  Button,
  useToast,
  IconButton,
  HStack,
  Textarea,
  ButtonGroup,
} from '@chakra-ui/react';
import { FaEdit, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaSave, FaTimes } from 'react-icons/fa';
import { GeneratedLetter } from '../types/letter';
import MusicPlayer from '../components/MusicPlayer';
import Confetti from '../components/Confetti';

export default function LetterView() {
  const { id } = useParams<{ id: string }>();
  const [letter, setLetter] = useState<GeneratedLetter | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const storedLetter = localStorage.getItem(id);
      if (storedLetter) {
        setLetter(JSON.parse(storedLetter));
      }
    }
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      status: 'success',
      duration: 2000,
    });
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(letter?.content || '');
  };

  const handleSave = () => {
    if (id && letter) {
      const updatedLetter = {
        ...letter,
        content: editedContent,
      };
      localStorage.setItem(id, JSON.stringify(updatedLetter));
      setLetter(updatedLetter);
      setIsEditing(false);
      toast({
        title: 'Letter updated!',
        status: 'success',
        duration: 2000,
      });
      triggerConfetti();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out this love letter I created!')}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent('Check out this love letter I created! ' + window.location.href)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=A Love Letter for You&body=${encodeURIComponent('Check out this love letter I created! ' + window.location.href)}`;
  };

  if (!letter) {
    return (
      <Container centerContent py={10}>
        <Text>Letter not found</Text>
      </Container>
    );
  }

  return (
    <>
      <Container py={10}>
        <VStack spacing={6}>
          <Box
            p={10}
            bg="brand.gray"
            boxShadow="2xl"
            borderRadius="xl"
            w="100%"
            position="relative"
            onClick={!isEditing ? handleEdit : undefined}
            cursor={!isEditing ? 'pointer' : 'text'}
            transition="all 0.2s"
            _hover={!isEditing ? { transform: 'scale(1.01)', boxShadow: '3xl' } : undefined}
            border="1px solid"
            borderColor="brand.red"
          >
            {isEditing ? (
              <VStack spacing={4}>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  minH="300px"
                  fontSize="2xl"
                  fontFamily="letter"
                  autoFocus
                  bg="brand.black"
                  border="1px solid"
                  borderColor="brand.red"
                  _hover={{ borderColor: 'brand.pink' }}
                  _focus={{ borderColor: 'brand.pink', boxShadow: '0 0 0 1px brand.pink' }}
                  p={6}
                  lineHeight={1.8}
                  letterSpacing="0.5px"
                />
                <ButtonGroup size="sm">
                  <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleSave}>
                    Save
                  </Button>
                  <Button leftIcon={<FaTimes />} onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </ButtonGroup>
              </VStack>
            ) : (
              <Text 
                whiteSpace="pre-wrap" 
                fontSize="2xl"
                fontFamily="letter"
                lineHeight={1.8}
                color="white"
                letterSpacing="0.5px"
                textAlign="left"
                sx={{
                  '&::first-letter': {
                    fontSize: '3xl',
                    fontWeight: 'bold',
                    color: 'brand.red',
                  }
                }}
              >
                {letter.content}
              </Text>
            )}
          </Box>

          <VStack spacing={4} w="100%">
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <MusicPlayer onPlay={triggerConfetti} />
              <ButtonGroup variant="outline" spacing={2} flexWrap="wrap">
                <IconButton
                  aria-label="Share on Facebook"
                  icon={<FaFacebook />}
                  onClick={shareOnFacebook}
                  colorScheme="facebook"
                />
                <IconButton
                  aria-label="Share on Twitter"
                  icon={<FaTwitter />}
                  onClick={shareOnTwitter}
                  colorScheme="twitter"
                />
                <IconButton
                  aria-label="Share on WhatsApp"
                  icon={<FaWhatsapp />}
                  onClick={shareOnWhatsApp}
                  colorScheme="whatsapp"
                />
                <IconButton
                  aria-label="Share via Email"
                  icon={<FaEnvelope />}
                  onClick={shareViaEmail}
                />
                <Button
                  leftIcon={<FaShare />}
                  onClick={handleCopyLink}
                >
                  Copy Link
                </Button>
              </ButtonGroup>
            </HStack>
          </VStack>
        </VStack>
      </Container>

      <Confetti active={showConfetti} />
    </>
  );
} 