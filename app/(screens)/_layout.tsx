import { Stack } from 'expo-router';
import React from 'react';

export default function ScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/selfie" />
      <Stack.Screen name="onboarding/skinDetails" />
      <Stack.Screen name="onboarding/skinProductsClick" />
      <Stack.Screen name="onboarding/skinProductsDisplay" />
      <Stack.Screen name="onboarded/profileScreen" />
    </Stack>
  );
}
