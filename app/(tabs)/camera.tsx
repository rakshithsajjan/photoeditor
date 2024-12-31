/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCamera } from '../hooks/useCamera';
import { Header } from '../components/Header';
import { InstructionText } from '../components/camera/instructionText';
import { CameraTool } from '../components/camera/cameraTool';
// import { CameraButton } from '../../components/camera/cameraButton';

export default function CameraTab() {
  const { takePicture, isCapturing } = useCamera('selfie');

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Header title="ClearlyYou" />
        <InstructionText message="" />
        <CameraTool
          onPhotoCapture={takePicture}
          cameraFacing="front"
          imageType="selfie"
          nextScreenRoute="/(tabs)/home"
          placeholderText="Take a clear picture of your skin to log your progress!"
        />
        {/* <CameraButton onPress={takePicture} disabled={isCapturing} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'peachpuff',
  },
});
