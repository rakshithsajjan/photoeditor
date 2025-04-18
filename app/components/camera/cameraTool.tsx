/* eslint-disable react/jsx-no-undef */
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { CameraButton } from './cameraButton';
import { ImageActionButtons } from './imageActionButtons';
import { useCamera } from '~/app/hooks/useCamera';

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
  const {
    hasPermission,
    cameraRef,
    takePicture,
    requestPermission,
    isCapturing,
    capturedImage,
    resetCamera,
  } = useCamera(imageType);

  useEffect(() => {
    const initializeCamera = async () => {
      if (!hasPermission) {
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
    if (capturedImage) {
      // Navigate to edit screen with the captured photo
      router.push({
        pathname: '/(app)/edit-photo',
        params: { 
          imageUri: capturedImage.uri,
          base64: capturedImage.base64
        }
      });
    }
  };

  const handleContinue = () => {
    if (capturedImage) {
      // Navigate to edit screen with the captured photo
      router.push({
        pathname: '/(app)/edit-photo',
        params: { 
          imageUri: capturedImage.uri,
          base64: capturedImage.base64
        }
      });
    }
  };

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
          <Camera 
            ref={cameraRef} 
            style={styles.camera} 
            type={cameraFacing === 'front' ? Camera.Constants.Type.front : Camera.Constants.Type.back}
          >
            <View style={styles.buttonContainer}>
              <CameraButton onPress={handleCapture} disabled={isCapturing} />
            </View>
          </Camera>
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
