import React, { createContext, useContext, useState } from 'react';

interface CapturedImage {
  uri: string;
  base64: string;
}

interface CapturedImagesContextType {
  capturedImages: CapturedImage[];
  addCapturedImage: (image: CapturedImage) => void;
  removeCapturedImage: (uri: string) => void;
  clearCapturedImages: () => void;
}

const CapturedImagesContext = createContext<CapturedImagesContextType | undefined>(undefined);

export const CapturedImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);

  const addCapturedImage = (image: CapturedImage) => {
    setCapturedImages((prev) => [...prev, image]);
  };

  const removeCapturedImage = (uri: string) => {
    setCapturedImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  const clearCapturedImages = () => {
    setCapturedImages([]);
  };

  return (
    <CapturedImagesContext.Provider
      value={{ capturedImages, addCapturedImage, removeCapturedImage, clearCapturedImages }}>
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
