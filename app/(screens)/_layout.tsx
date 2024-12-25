import { Stack } from 'expo-router';
import React from 'react';

export default function ScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboardSelfie" />
      <Stack.Screen name="onboardSkinDetails" />
      <Stack.Screen name="onboardSkinProducts" />
    </Stack>
  );
}
