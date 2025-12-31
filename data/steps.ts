// constants/steps.ts
import { Step } from 'react-joyride';

export const TOUR_STEPS: Step[] = [
  {
    target: '#main', // Add this class to your main hero/heading
    content: 'Welcome! This is where your AI thought partner analyzes your data.',
    placement: 'center',
  },
  {
    target: '#navigation', // Add this to your SettingsMenu trigger
    content: 'Here you have 3 modes to choose from: The Whisper, Deep Dive, and Full Composition',
    placement: 'right',
  },
  {
    target: '#model-select', // Add this to your sidebar analysis list
    content: 'You can change the AI model here to see different perspectives on your product.',
    placement: 'bottom',
  },
  {
    target: '#results',
    content: 'Based on your ingredients, the AI provided these insights for you to explore. Like here is the Inferred Intent section.',
    placement: 'bottom',
  },
  {
    target: '#follow-up',
    content: 'Feel free to ask any follow-up questions about the analysis right here!',
    placement: 'top',
  }
];