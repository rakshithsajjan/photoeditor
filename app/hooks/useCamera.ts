/* eslint-disable import/order */
import { useState, useRef } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { useCapturedImages } from '~/app/utils/capturedImageContext';
import type { CapturedImage } from '~/app/types/camera';

export const useCamera = (imageType: 'selfie' | 'products') => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const { addCapturedImage } = useCapturedImages();
  const cameraRef = useRef<CameraView>(null);
  // new state for temporary storage
  const [pendingImages, setPendingImages] = useState<CapturedImage[]>([]);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    console.log('Taking picture in useCamera.ts/takePicture()...');

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
      });
      // console.log('Photo taken in useCamera.ts/takePicture():', photo?.uri);
      if (photo) {
        const newCapturedImage = {
          // Store both uri and base64 in the state
          uri: photo.uri,
          base64: photo.base64 || '',
          type: imageType,
        };
        console.log(
          '\nCaptured image in useCamera.ts/takePicture():',
          newCapturedImage.uri.split('-').pop()
        );
        setCapturedImage(newCapturedImage);
        // add to pending images
        setPendingImages((prevImages) => [...prevImages, newCapturedImage]);
        return photo;
      }
      return null;
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const resetCamera = () => {
    console.log('current capturedImage before reset:', capturedImage?.uri.split('-').pop());
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
