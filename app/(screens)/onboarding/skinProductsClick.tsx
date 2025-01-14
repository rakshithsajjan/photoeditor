/* eslint-disable import/order */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCamera } from '../../hooks/useCamera';
import { Header } from '../../components/Header';
import { InstructionText } from '../../components/camera/instructionText';
import { CameraTool } from '../../components/camera/cameraTool';
// import { CameraButton } from '../../components/camera/cameraButton';

export const SkinProductsClick: React.FC = () => {
  const { takePicture, isCapturing } = useCamera('products');

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Header title="ClearlyYou" />
        <InstructionText message="take a picture of your skin product's composition:" />
        <CameraTool
          onPhotoCapture={() => takePicture()}
          cameraFacing="back"
          imageType="products"
          nextScreenRoute="/(screens)/onboarding/summary"
          placeholderText="Click to show us your skin products composition"
        />
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

export default SkinProductsClick;
