import 'dotenv/config';

export default {
  expo: {
    name: 'ClearlyYou',
    scheme: 'ClearlyYou',
    version: '1.0.0',
    extra: {
      openaiApiKey: process.env.OPENAI_API_KEY,
      geminiApiKey: process.env.GEMINI_API_KEY,
    },
    newArchEnabled: true,
    plugins: [
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
        },
      ],
    ],
  },
};
