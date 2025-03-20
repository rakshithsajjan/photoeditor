/* eslint-disable import/order */
import { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { useCapturedImages } from '~/app/utils/capturedImage';
import type { CapturedImage } from '~/app/types/camera';

export const useCamera = (imageType: 'selfie' | 'products') => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const { addCapturedImage } = useCapturedImages();
  const cameraRef = useRef<Camera>(null);
  // new state for temporary storage
  const [pendingImages, setPendingImages] = useState<CapturedImage[]>([]);

  const requestPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const isGranted = status === 'granted';
      setHasPermission(isGranted);
      return isGranted;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
      return false;
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return null;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });

      if (photo && photo.base64) {
        const newCapturedImage = {
          uri: photo.uri,
          base64: photo.base64,
          type: imageType,
        };
        setCapturedImage(newCapturedImage);
        return photo;
      }
      return null;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
  };

  const handleAddCapturedImage = (photo: CapturedImage) => {
    console.log(
      '\nphoto to add in handleAddCapturedImage() in hooks/useCamera.ts:',
      photo.uri.split('-').pop()
    );
    addCapturedImage({
      uri: photo.uri,
      base64: photo.base64,
      type: photo.type,
    });
  };

  // handle multiple images (pending)
  const handleAddAllPendingImages = () => {
    pendingImages.forEach((image) => {
      handleAddCapturedImage(image);
    });
    setPendingImages([]); // clear pending images after adding
  };

  return {
    hasPermission,
    cameraRef,
    isCapturing,
    capturedImage,
    takePicture,
    requestPermission,
    resetCamera,
    handleAddCapturedImage,
    pendingImages,
    handleAddAllPendingImages,
  };
};

export default useCamera;
