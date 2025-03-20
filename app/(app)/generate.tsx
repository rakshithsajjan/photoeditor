import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { generateImage } from '../backend/gemini/api';

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const imageData = await generateImage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${imageData}`);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Generate Image',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Describe the image you want to create</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="E.g., A serene landscape with mountains and a lake at sunset..."
          value={prompt}
          onChangeText={(text) => {
            setError(null);
            setPrompt(text);
          }}
          multiline
          numberOfLines={4}
          placeholderTextColor="#666"
        />
        
        <Text style={styles.tip}>
          💡 Tip: Be specific about details, style, lighting, and mood for better results
        </Text>

        <TouchableOpacity
          style={[
            styles.generateButton,
            (!prompt.trim() || isGenerating) && styles.generateButtonDisabled
          ]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Image</Text>
          )}
        </TouchableOpacity>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={styles.imagePreview}>
          {generatedImage ? (
            <Image 
              source={{ uri: generatedImage }} 
              style={styles.generatedImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.previewText}>
              Your generated image will appear here
            </Text>
          )}
        </View>
      </ScrollView>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  promptInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonDisabled: {
    backgroundColor: '#ccc',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  generatedImage: {
    width: '100%',
    height: '100%',
  },
  previewText: {
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
}); 