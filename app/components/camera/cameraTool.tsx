/* eslint-disable react/jsx-no-undef */
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { CameraButton } from './cameraButton';
import { ImageActionButtons } from './imageActionButtons';
import { useCamera } from '~/app/hooks/useCamera';

import { useCapturedImages } from '~/app/hooks/capturedImageContext';

interface CameraViewProps {
  onPhotoCapture: () => void;
  cameraFacing?: 'front' | 'back';
  imageType: 'selfie' | 'products';
  nextScreenRoute?: string;
  placeholderText?: string;
}

export const CameraTool: React.FC<CameraViewProps> = ({
  onPhotoCapture,
  cameraFacing,
  imageType,
  nextScreenRoute,
  placeholderText,
}) => {
  //////////
  // const { capturedImages } = useCapturedImages();

  // useEffect(() => {
  //   for (const capturedImage of capturedImages) {
  //     console.log('capturedImage in cameraTool.tsx:', capturedImage.uri);
  //   }
  // }, [capturedImages]);
  //////////
  const {
    hasPermission,
    cameraRef,
    takePicture,
    requestPermission,
    isCapturing,
    capturedImage,
    resetCamera,
    handleAddCapturedImage,
    pendingImages,
    handleAddAllPendingImages,
  } = useCamera(imageType);

  useEffect(() => {
    const initializeCamera = async () => {
      if (!hasPermission) {
        // const granted = await requestPermission();
        // if (!granted) return;
        await requestPermission();
      }
    };
    initializeCamera();
  }, [hasPermission, requestPermission]);

  const handleCapture = async () => {
    const photo = await takePicture();
    if (photo?.base64) {
      onPhotoCapture();
    }
  };

  const handleRetake = () => {
    resetCamera();
  };

  const handleAdd = () => {
    console.log('\ncurrent capturedImage in cameraTool.tsx/handleAdd:', capturedImage?.uri.split('-').pop());
    if (capturedImage) {
      // store the current taken image
      handleAddCapturedImage({
        uri: capturedImage.uri,
        base64: capturedImage.base64,
        type: capturedImage.type,
      });
      resetCamera(); // Reset so the UI allows user to take another pic
    }
  };

  const handleContinue = () => {
    console.log('\ncurrent capturedImage in cameraTool.tsx/handleContinue:', capturedImage?.uri.split('-').pop());
    handleAddAllPendingImages();
    router.push(nextScreenRoute as any);
  };

  ////////// debug
  // useEffect(() => {
  //   console.log('Total images:', capturedImages.length);
  //   capturedImages.forEach((img, index) => {
  //     console.log(`Image ${index + 1}:`, img.uri);
  //   });
  // }, [capturedImages]);

  /////////////

  // const capturedImagesCount = capturedImages.length + (capturedImage ? 1 : 0);
  return (
    <View style={styles.container}>
      {capturedImage ? (
        <>
          <Image source={{ uri: capturedImage.uri }} style={styles.camera} resizeMode="cover" />
          <ImageActionButtons
            onRetake={handleRetake}
            onAdd={handleAdd}
            onContinue={handleContinue}
          />
        </>
      ) : hasPermission ? (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing={cameraFacing} />
          <View style={styles.buttonContainer}>
            <CameraButton onPress={handleCapture} disabled={isCapturing} />
          </View>
        </>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
  imageCountContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
  imageCountText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CameraTool;
