/* eslint-disable import/order */
import { useState, useRef } from 'react';
import { Camera, CameraView } from 'expo-camera';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  const resetCamera = () => {
    setCapturedImage(null);
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      if (photo) {
        setCapturedImage(photo.uri);
        return photo;
      }
      return null;
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    hasPermission,
    cameraRef,
    isCapturing,
    capturedImage,
    takePicture,
    requestPermission,
    resetCamera,
  };
};

export default useCamera;