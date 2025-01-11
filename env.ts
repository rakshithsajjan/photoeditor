import Constants from 'expo-constants';

export const ENV = {
  OPENAI_API_KEY: Constants.expoConfig?.extra?.openaiApiKey ?? '',
};

if (!ENV.OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not defined in the environment.');
}
