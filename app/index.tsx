import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { OnboardSelfie } from './(screens)/onboardSelife';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <OnboardSelfie />
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
