import React, { createContext, useContext, useEffect, useState } from 'react';

import type { CapturedImage } from '~/app/types/camera';

interface CapturedImagesContextType {
  selfieImages: CapturedImage[];
  productImages: CapturedImage[];
  addCapturedImage: (image: CapturedImage) => void;
  removeCapturedImage: (uri: string, type: 'selfie' | 'products') => void;
  clearCapturedImages: (type: 'selfie' | 'products') => void;
}

const CapturedImagesContext = createContext<CapturedImagesContextType | undefined>(undefined);

export const CapturedImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selfieImages, setSelfieImages] = useState<CapturedImage[]>([]);
  const [productImages, setProductImages] = useState<CapturedImage[]>([]);

  // const addCapturedImage = (image: CapturedImage) => {
  //   setCapturedImages((prev) => [...prev, image]);
  //   console.log('new image added');
  // };
  const addCapturedImage = (image: CapturedImage) => {
    console.log('=== Adding new image in addCapturedImage in utils/context/capturedImage.tsx ===');
    console.log('\nNew image:', image.uri.split('-').pop());
    // console.log('Previous images:', capturedImages);
    if (image.type === 'selfie') {
      setSelfieImages((prevImages) => {
        const newImages = [...prevImages, image];
        return newImages;
      });
    } else {
      setProductImages((prevImages) => {
        const newImages = [...prevImages, image];
        return newImages;
      });
    }
  };

  // debug useEffect
  // useEffect(() => {
  //   capturedImages.forEach((img, index) => {
  //     console.log(`image ${index + 1}`, img.uri);
  //   });
  // }, [capturedImages]);
  //////////////////

  const removeCapturedImage = (uri: string, type: 'selfie' | 'products') => {
    if (type === 'selfie') {
      setSelfieImages((prev) => prev.filter((img) => img.uri !== uri));
    } else {
      setProductImages((prev) => prev.filter((img) => img.uri !== uri));
    }
  };

  const clearCapturedImages = (type: 'selfie' | 'products') => {
    if (type === 'selfie') setSelfieImages([]);
    else setProductImages([]);
  };

  return (
    <CapturedImagesContext.Provider
      value={{
        selfieImages,
        productImages,
        addCapturedImage,
        removeCapturedImage,
        clearCapturedImages,
      }}>
      {children}
    </CapturedImagesContext.Provider>
  );
};

export const useCapturedImages = () => {
  const context = useContext(CapturedImagesContext);
  if (context === undefined) {
    throw new Error('useCapturedImages must be used within a CapturedImagesProvider');
  }
  return context;
};

export default CapturedImagesContext;
