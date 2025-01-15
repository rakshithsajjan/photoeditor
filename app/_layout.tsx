import { Stack } from 'expo-router';

import { CapturedImagesProvider } from './utils/capturedImage';
import { SkinRoutineProvider } from './utils/skinRoutine';

export default function Layout() {
  return (
    <CapturedImagesProvider>
      <SkinRoutineProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SkinRoutineProvider>
    </CapturedImagesProvider>
  );
}
