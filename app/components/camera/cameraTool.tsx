/* eslint-disable react/jsx-no-undef */
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { CameraButton } from './cameraButton';
import { ImageActionButtons } from './imageActionButtons';
import { useCamera } from '../../hooks/useCamera';

interface CameraViewProps {
  onPhotoCapture: (photo: string) => void;
}

export const CameraTool: React.FC<CameraViewProps> = ({ onPhotoCapture }) => {
  const {
    hasPermission,
    cameraRef,
    takePicture,
    requestPermission,
    isCapturing,
    capturedImage,
    resetCamera,
  } = useCamera();

  const handleCapture = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) return;
    }
    const photo = await takePicture();
    if (photo?.base64) {
      onPhotoCapture(photo.base64);
    }
  };

  const handleRetake = () => {
    resetCamera();
  };
  const handleContinue = () => {
    router.push('/(screens)/onboardSkinDetails');
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <>
          <Image source={{ uri: capturedImage }} style={styles.camera} resizeMode="cover" />
          <ImageActionButtons onRetake={handleRetake} onContinue={handleContinue} />
        </>
      ) : hasPermission ? (
        <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Click the button to take a selfie</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CameraButton onPress={handleCapture} disabled={isCapturing} />
      </View>
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
    paddingBottom: 24,
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
});

// import { CameraView as Camera } from 'expo-camera';
// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';

// import { useCamera } from '../../hooks/useCamera';

// interface CameraViewProps {
//   onPhotoCapture: (photo: string) => void;
// }

// export const CameraView: React.FC<CameraViewProps> = ({ onPhotoCapture }) => {
//   const { hasPermission, cameraRef } = useCamera();

//   if (hasPermission === null) {
//     return <View style={styles.container} />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera ref={cameraRef} style={styles.camera} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
// });
