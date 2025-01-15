import { router } from 'expo-router';
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { set } from 'zod';

import { getSelfieAnalysis, getProductsAnalysis, getSkinRoutine } from '~/app/backend/openai/api';
import { Header } from '~/app/components/Header';
import { InstructionText } from '~/app/components/camera/instructionText';
import { ImageCard } from '~/app/components/imageCard';
import { TYPOGRAPHY } from '~/app/styles/typography';
import type { CapturedImage } from '~/app/types/camera';
import { useCapturedImages } from '~/app/utils/capturedImage';
import { useSkinRoutine } from '~/app/utils/skinRoutine';

const ImageSection: React.FC<{
  title: string;
  images: CapturedImage[];
  onRemoveImage: (uri: string, type: 'selfie' | 'products') => void;
}> = ({ title, images, onRemoveImage }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.gridContainer}>
      {images.length > 0 ? (
        images.map((image, index) => (
          <ImageCard
            key={`${image.uri}-${index}`}
            imageUri={image.uri}
            onRemovePress={() => onRemoveImage(image.uri, image.type)}
          />
        ))
      ) : (
        <Text style={styles.noImagesText}>No images added yet</Text>
      )}
    </View>
  </View>
);

export const Summary: React.FC = () => {
  const { selfieImages, productImages, removeCapturedImage } = useCapturedImages();
  const { setSkinRoutine } = useSkinRoutine();

  const handleRemoveImage = (imageUri: string, type: 'selfie' | 'products') => {
    removeCapturedImage(imageUri, type);
  };

  const letAiMakeSkinRoutine = async () => {
    if (selfieImages.length === 0 && productImages.length === 0) {
      // Optionally show an alert or message
      return;
    }
    // let AI make skin routine
    try {
      // Wait for both analyses to complete
      const [selfieAnalysis, productsAnalysis] = await Promise.all([
        getSelfieAnalysis(selfieImages),
        getProductsAnalysis(productImages),
      ]);

      // Get the skin routine using the analysis results
      const skinRoutine = JSON.parse(await getSkinRoutine(selfieAnalysis, productsAnalysis));
      setSkinRoutine(skinRoutine);

      // push to home after AI routine is created
      router.push('/home');
    } catch (error) {
      console.error('Error generating skin routine:', error);
      // Handle error appropriately
    }

    // push to home after AI routine is created
    router.push('/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="ClearlyYou" />
        <InstructionText message="" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <ImageSection
            title="Skin Selfies"
            images={selfieImages}
            onRemoveImage={handleRemoveImage}
          />
          <ImageSection
            title="Product Images"
            images={productImages}
            onRemoveImage={handleRemoveImage}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selfieImages.length === 0 && productImages.length === 0 && styles.disabledButton,
            ]}
            onPress={letAiMakeSkinRoutine}
            disabled={selfieImages.length === 0 && productImages.length === 0}>
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
  // images section
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body,
    marginBottom: 12,
    paddingHorizontal: 16,
    color: '#333',
  },
  noImagesText: {
    ...TYPOGRAPHY.body,
    color: '#666',
    textAlign: 'center',
    padding: 16,
  },
});

export default Summary;
