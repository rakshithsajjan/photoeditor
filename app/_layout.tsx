import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import { StorageHelper } from '~/app/backend/storage';
import { CapturedImagesProvider } from '~/app/utils/capturedImage';
import { SkinRoutineProvider } from '~/app/utils/skinRoutine';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await StorageHelper.initialize();
        const userData = await StorageHelper.getUserData();
        console.log('User data:', userData);
        setIsOnboarded(userData.isOnboarded);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);
  if (isLoading) {
    return null;
  }
  // direct redirect if onboarded
  // if (isOnboarded) {
  //   return <Redirect href="/(tabs)/home" />;
  // }

  return (
    <CapturedImagesProvider>
      <SkinRoutineProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} redirect={isOnboarded} />
          {isOnboarded ? (
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="(screens)"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          )}
        </Stack>
      </SkinRoutineProvider>
    </CapturedImagesProvider>
  );
}
