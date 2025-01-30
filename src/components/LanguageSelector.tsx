import React from 'react';
import { Select, Box } from '@chakra-ui/react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  return (
    <Box position="absolute" top={4} right={4} display="flex" alignItems="center">
      <Box color="brand.red" mr={2}>
        <FaGlobe />
      </Box>
      <Select
        value={selectedLanguage.code}
        onChange={(e) => {
          const language = languages.find(lang => lang.code === e.target.value);
          if (language) {
            setSelectedLanguage(language);
          }
        }}
        size="sm"
        width="auto"
        borderColor="brand.red"
        _hover={{ borderColor: 'brand.pink' }}
        _focus={{ borderColor: 'brand.pink', boxShadow: '0 0 0 1px brand.pink' }}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </Select>
    </Box>
  );
} 