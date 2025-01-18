import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { StorageHelper } from '~/app/backend/storage';

export default function TabLayout() {
  // const router = useRouter();

  // // Protect tabs from unauthorized access
  // useEffect(() => {
  //   const checkOnboarding = async () => {
  //     const userData = await StorageHelper.getUserData();
  //     if (!userData.isOnboarded) {
  //       router.replace('/(screens)/onboarding/selfie');
  //     }
  //   };
  //   checkOnboarding();
  // }, []);

  const [isChecking, setIsChecking] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const userData = await StorageHelper.getUserData();
        setIsOnboarded(userData.isOnboarded);
      } catch (error) {
        console.error('Error checking access:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAccess();
  }, []);

  if (isChecking) {
    return null; // Or loading indicator
  }

  if (!isOnboarded) {
    return <Redirect href="/(screens)/onboarding/selfie" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 24 : 4,
          backgroundColor: '#2D2D2D',
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#FFFFFF',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="camera-outline" size={size} color={color} />
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
