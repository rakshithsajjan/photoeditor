import { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';

import { StorageHelper } from '~/app/backend/storage';
import { skinRoutineResponse } from '~/app/backend/types';

type SkinRoutineType = z.infer<typeof skinRoutineResponse>;

type SkinRoutineContextType = {
  skinRoutine: SkinRoutineType | null;
  setSkinRoutine: (routine: SkinRoutineType | null) => void;
  isLoading: boolean;
};

const SkinRoutineContext = createContext<SkinRoutineContextType | undefined>(undefined);

export function SkinRoutineProvider({ children }: { children: React.ReactNode }) {
  const [skinRoutine, setSkinRoutine] = useState<SkinRoutineContextType['skinRoutine']>(null);
  const [isLoading, setIsLoading] = useState(true);

  // load initial data from storage
  useEffect(() => {
    const loadSavedRoutine = async () => {
      try {
        const userData = await StorageHelper.getUserData();
        setSkinRoutine(userData.skinRoutine);
      } catch (error) {
        console.error('Error loading skin routine from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSavedRoutine();
  }, []);

  const handleSetSkinRoutine = async (newRoutine: SkinRoutineType | null) => {
    try {
      // Update React state immediately for UI responsiveness
      setSkinRoutine(newRoutine);
      // Then update storage in background
      await StorageHelper.updateUserData({ skinRoutine: newRoutine });
    } catch (error) {
      // If storage fails, revert the state
      setSkinRoutine(skinRoutine); // Revert to previous value
      console.error('Error saving skin routine:', error);
      throw error;
    }
  };

  return (
    <SkinRoutineContext.Provider
      value={{ skinRoutine, setSkinRoutine: handleSetSkinRoutine, isLoading }}>
      {children}
    </SkinRoutineContext.Provider>
  );
}

export function useSkinRoutine() {
  const context = useContext(SkinRoutineContext);
  if (context === undefined) {
    throw new Error('useSkinRoutine must be used within a SkinRoutineProvider');
  }
  return context;
}
