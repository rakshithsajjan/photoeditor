import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditScreen() {
  const handleOptionPress = (option: 'gallery' | 'generate' | 'camera') => {
    switch (option) {
      case 'gallery':
        router.push('/(app)/gallery');
        break;
      case 'generate':
        router.push('/(app)/generate');
        break;
      case 'camera':
        router.push('/(app)/camera');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'AI Photo Editor',
          headerShown: true,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Create or Edit Photos</Text>
        <Text style={styles.subtitle}>Choose an option to begin</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.option} 
            onPress={() => handleOptionPress('gallery')}
          >
            <Ionicons name="images-outline" size={32} color="#007AFF" />
            <Text style={styles.optionTitle}>Choose from Gallery</Text>
            <Text style={styles.optionDescription}>Select an existing photo to edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={() => handleOptionPress('generate')}
          >
            <Ionicons name="create-outline" size={32} color="#007AFF" />
            <Text style={styles.optionTitle}>Generate New Image</Text>
            <Text style={styles.optionDescription}>Create an image using AI</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={() => handleOptionPress('camera')}
          >
            <Ionicons name="camera-outline" size={32} color="#007AFF" />
            <Text style={styles.optionTitle}>Take a Picture</Text>
            <Text style={styles.optionDescription}>Capture and edit a new photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 