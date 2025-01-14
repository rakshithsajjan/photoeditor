import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { Selfie } from './(screens)/onboarding/selfie';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Selfie />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontSize: 16,
    color: '#2e78b7',
    padding: 12,
  },
});
