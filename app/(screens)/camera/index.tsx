/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCamera } from '../../hooks/useCamera';
import { Header } from '../../components/Header';
import { InstructionText } from '../../components/camera/instructionText';
import { CameraTool } from '../../components/camera/cameratool';
// import { CameraButton } from '../../components/camera/cameraButton';

export const CameraScreen: React.FC = () => {
  const { takePicture, isCapturing } = useCamera();

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Header />
        <InstructionText message="Did you know? our sources say: You've a brilliant smile :)" />
        <CameraTool onPhotoCapture={takePicture} />
        {/* <CameraButton onPress={takePicture} disabled={isCapturing} /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'peachpuff',
  },
});
