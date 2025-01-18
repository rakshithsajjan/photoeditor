import { Redirect, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { StorageHelper } from '../backend/storage';

export default function OnboardingLayout() {
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const userData = await StorageHelper.getUserData();
        if (userData.isOnboarded) {
          setShouldRedirect(true);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkOnboarding();
  }, []);

  if (isChecking) {
    return null; // Or loading indicator
  }

  if (shouldRedirect) {
    return <Redirect href="/(tabs)/home" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/selfie" />
      <Stack.Screen name="onboarding/skinDetails" />
      <Stack.Screen name="onboarding/skinProducts" />
      <Stack.Screen
        name="onboarding/summary"
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="onboarded/profileScreen" />
    </Stack>
  );
}
