import Constants from 'expo-constants';

export const ENV = {
  OPENAI_API_KEY: Constants.expoConfig?.extra?.openaiApiKey ?? '',
  GEMINI_API_KEY: Constants.expoConfig?.extra?.geminiApiKey ?? '',
};

// Export individual keys for easier access
export const { OPENAI_API_KEY, GEMINI_API_KEY } = ENV;

if (!ENV.GEMINI_API_KEY) {
  throw new Error('Gemini API key is not defined in the environment.');
}
