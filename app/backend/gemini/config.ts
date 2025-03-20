import { GEMINI_API_KEY } from '~/env';

export const GEMINI_CONFIG = {
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  model: 'gemini-2.0-flash-exp-image-generation',
  apiKey: GEMINI_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
}; 