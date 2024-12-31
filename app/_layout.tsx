import { Stack } from 'expo-router';

import { CapturedImagesProvider } from './hooks/capturedImageContext';

export default function Layout() {
  return (
    <CapturedImagesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CapturedImagesProvider>
  );
}
