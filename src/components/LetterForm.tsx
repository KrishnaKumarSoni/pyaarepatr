import React, { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { LetterFormData, LetterType, letterTypeLabels } from '../types/letterTypes';

const initialPartnerData = {
  type: 'partner' as const,
  writerName: '',
  partnerName: '',
  gender: '',
  relationshipDuration: '',
  sharedMemories: '',
  personalTraits: '',
  customMessage: '',
  writingStyle: '',
};

const initialSelfData = {
  type: 'self' as const,
  writerName: '',
  currentMood: '',
  achievements: '',
  struggles: '',
  futureGoals: '',
  customMessage: '',
  writingStyle: '',
};

const initialParentData = {
  type: 'parent' as const,
  writerName: '',
  parentName: '',
  relationship: 'father' as const,
  childhoodMemory: '',
  gratitude: '',
  wishes: '',
  customMessage: '',
  writingStyle: '',
};

export default function LetterForm({ onSubmit }: { onSubmit: (data: LetterFormData) => Promise<void> }) {
  const [activeTab, setActiveTab] = useState<LetterType>('partner');
  const [partnerData, setPartnerData] = useState(initialPartnerData);
  const [selfData, setSelfData] = useState(initialSelfData);
  const [parentData, setParentData] = useState(initialParentData);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields based on active tab
    let isValid = true;
    let currentData;
    switch (activeTab) {
      case 'partner':
        currentData = partnerData;
        isValid = validatePartnerData(partnerData);
        break;
      case 'self':
        currentData = selfData;
        isValid = validateSelfData(selfData);
        break;
      case 'parent':
        currentData = parentData;
        isValid = validateParentData(parentData);
        break;
    }

    if (!isValid) {
      toast({
        title: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      // Mark all fields as touched to show errors
      const fields = Object.keys(currentData);
      const newTouched = fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
      setTouched(newTouched);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(currentData);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    switch (activeTab) {
      case 'partner':
        setPartnerData(prev => ({ ...prev, [name]: value }));
        break;
      case 'self':
        setSelfData(prev => ({ ...prev, [name]: value }));
        break;
      case 'parent':
        setParentData(prev => ({ ...prev, [name]: value }));
        break;
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validatePartnerData = (data: typeof partnerData) => {
    return Boolean(data.writerName) && Boolean(data.partnerName) && Boolean(data.gender) && 
           Boolean(data.relationshipDuration) && Boolean(data.sharedMemories) && Boolean(data.personalTraits);
  };

  const validateSelfData = (data: typeof selfData) => {
    return Boolean(data.writerName) && Boolean(data.currentMood) && Boolean(data.achievements) && 
           Boolean(data.struggles) && Boolean(data.futureGoals);
  };

  const validateParentData = (data: typeof parentData) => {
    return Boolean(data.writerName) && Boolean(data.parentName) && Boolean(data.relationship) && 
           Boolean(data.childhoodMemory) && Boolean(data.gratitude) && Boolean(data.wishes);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'partner':
        return partnerData;
      case 'self':
        return selfData;
      case 'parent':
        return parentData;
      default:
        return partnerData;
    }
  };

  const isFieldInvalid = (name: string) => {
    const currentData = getCurrentData();
    return touched[name] && !currentData[name as keyof typeof currentData];
  };

  const handleTabChange = (index: number) => {
    const newTab = ['partner', 'self', 'parent'][index] as LetterType;
    setActiveTab(newTab);
    setTouched({}); // Reset touched state when changing tabs
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px" p={6} noValidate>
      <Tabs variant="soft-rounded" colorScheme="red" onChange={handleTabChange}>
        <TabList mb={4}>
          {Object.entries(letterTypeLabels).map(([type, label]) => (
            <Tab key={type}>{label}</Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <FormControl 
                isRequired 
                isInvalid={isFieldInvalid('writerName')}
              >
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="writerName"
                  value={partnerData.writerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('partnerName')}
              >
                <FormLabel>Partner's Name</FormLabel>
                <Input
                  name="partnerName"
                  value={partnerData.partnerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your partner's name"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('gender')}
              >
                <FormLabel>Gender</FormLabel>
                <Select 
                  name="gender" 
                  value={partnerData.gender} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Select gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('relationshipDuration')}
              >
                <FormLabel>Relationship Duration</FormLabel>
                <Input
                  name="relationshipDuration"
                  value={partnerData.relationshipDuration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g., 2 years"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('sharedMemories')}
              >
                <FormLabel>Shared Memories</FormLabel>
                <Textarea
                  name="sharedMemories"
                  value={partnerData.sharedMemories}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share some special moments together"
                  rows={4}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('personalTraits')}
              >
                <FormLabel>Personal Traits</FormLabel>
                <Textarea
                  name="personalTraits"
                  value={partnerData.personalTraits}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What makes them special?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4}>
              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('writerName')}
              >
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="writerName"
                  value={selfData.writerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('currentMood')}
              >
                <FormLabel>Current Mood</FormLabel>
                <Input
                  name="currentMood"
                  value={selfData.currentMood}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="How are you feeling right now?"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('achievements')}
              >
                <FormLabel>Recent Achievements</FormLabel>
                <Textarea
                  name="achievements"
                  value={selfData.achievements}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What have you accomplished recently?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('struggles')}
              >
                <FormLabel>Current Struggles</FormLabel>
                <Textarea
                  name="struggles"
                  value={selfData.struggles}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What challenges are you facing?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('futureGoals')}
              >
                <FormLabel>Future Goals</FormLabel>
                <Textarea
                  name="futureGoals"
                  value={selfData.futureGoals}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What do you want to achieve?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4}>
              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('writerName')}
              >
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="writerName"
                  value={parentData.writerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('parentName')}
              >
                <FormLabel>Parent's Name</FormLabel>
                <Input
                  name="parentName"
                  value={parentData.parentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your parent's name"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('relationship')}
              >
                <FormLabel>Relationship</FormLabel>
                <Select
                  name="relationship"
                  value={parentData.relationship}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                </Select>
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('childhoodMemory')}
              >
                <FormLabel>Childhood Memory</FormLabel>
                <Textarea
                  name="childhoodMemory"
                  value={parentData.childhoodMemory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share a special memory from your childhood"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('gratitude')}
              >
                <FormLabel>Gratitude</FormLabel>
                <Textarea
                  name="gratitude"
                  value={parentData.gratitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What are you grateful for?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>

              <FormControl 
                isRequired
                isInvalid={isFieldInvalid('wishes')}
              >
                <FormLabel>Wishes</FormLabel>
                <Textarea
                  name="wishes"
                  value={parentData.wishes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What are your wishes for them?"
                  rows={3}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <VStack mt={6} spacing={4}>
        <FormControl>
          <FormLabel>Writing Style</FormLabel>
          <Select
            name="writingStyle"
            value={
              activeTab === 'partner'
                ? partnerData.writingStyle
                : activeTab === 'self'
                ? selfData.writingStyle
                : parentData.writingStyle
            }
            onChange={handleChange}
            placeholder="Select style"
          >
            <option value="romantic">Romantic</option>
            <option value="funny">Funny</option>
            <option value="poetic">Poetic</option>
            <option value="deep">Deep & Meaningful</option>
            <option value="casual">Casual & Light</option>
            <option value="formal">Formal & Respectful</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Custom Message (Optional)</FormLabel>
          <Textarea
            name="customMessage"
            value={
              activeTab === 'partner'
                ? partnerData.customMessage
                : activeTab === 'self'
                ? selfData.customMessage
                : parentData.customMessage
            }
            onChange={handleChange}
            placeholder="Any specific message you'd like to include?"
            rows={3}
          />
        </FormControl>

        {isLoading && <Progress size="xs" isIndeterminate w="100%" />}

        <Button
          type="submit"
          colorScheme="red"
          isLoading={isLoading}
          loadingText="Generating..."
          w="100%"
        >
          Generate Letter
        </Button>
      </VStack>
    </Box>
  );
} 