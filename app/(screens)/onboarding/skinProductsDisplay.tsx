import { router } from 'expo-router';
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';

import { Header } from '../../components/Header';
import { InstructionText } from '../../components/camera/instructionText';
import { ImageCard } from '../../components/imageCard';
import { useCapturedImages } from '../../hooks/capturedImageContext';
import { useCamera } from '../../hooks/useCamera';
import { TYPOGRAPHY } from '../../styles/typography';

export const OnboardSkinProductsDisplay: React.FC = () => {
  const { capturedImages, removeCapturedImage } = useCapturedImages();

  const handleRemoveImage = (imageUri: string) => {
    removeCapturedImage(imageUri);
  };

  const handleContinue = () => {
    if (capturedImages.length === 0) {
      // Optionally show an alert or message
      return;
    }
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="ClearlyYou" />
        <InstructionText message="These are the list of the products you use." />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {capturedImages.length > 0 ? (
              capturedImages.map((image, index) => (
                <ImageCard
                  key={`${image.uri}-${index}`}
                  imageUri={image.uri}
                  onRemovePress={() => handleRemoveImage}
                />
              ))
            ) : (
              <Text style={styles.continueButtonText}>No products added yet</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, capturedImages.length === 0 && styles.disabledButton]}
            onPress={handleContinue}
            disabled={capturedImages.length === 0}>
            <Text style={styles.continueButtonText}>Let AI create your perfect skin routine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  continueButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    ...TYPOGRAPHY.body,
    color: '#fff',
    fontWeight: '600',
  },
});

export default OnboardSkinProductsDisplay;
