import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { editImage } from '../backend/gemini/api';

export default function EditPhotoScreen() {
  const { imageUri, base64 } = useLocalSearchParams<{ imageUri: string; base64: string }>();
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    if (!editPrompt.trim() || !base64) return;

    setIsEditing(true);
    setError(null);
    try {
      const imageData = await editImage(base64, editPrompt);
      setEditedImage(`data:image/jpeg;base64,${imageData}`);
    } catch (error) {
      console.error('Error editing image:', error);
      setError('Failed to edit image. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Edit Photo',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: editedImage || imageUri }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.label}>Describe how you want to edit the image</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="E.g., Make the background blurry, add a vintage filter..."
          value={editPrompt}
          onChangeText={(text) => {
            setError(null);
            setEditPrompt(text);
          }}
          multiline
          numberOfLines={3}
          placeholderTextColor="#666"
        />

        <TouchableOpacity
          style={[
            styles.editButton,
            (!editPrompt.trim() || isEditing) && styles.editButtonDisabled
          ]}
          onPress={handleEdit}
          disabled={!editPrompt.trim() || isEditing}
        >
          {isEditing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.editButtonText}>Apply Edit</Text>
          )}
        </TouchableOpacity>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {isEditing && (
          <View style={styles.previewContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.previewText}>Applying your edit...</Text>
          </View>
        )}
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
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
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
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonDisabled: {
    backgroundColor: '#ccc',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
}); 