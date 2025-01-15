import { createContext, useContext, useState } from 'react';
import { z } from 'zod';

import { skinRoutineResponse } from '~/app/backend/types';

type SkinRoutineType = z.infer<typeof skinRoutineResponse>;

type SkinRoutineContextType = {
  skinRoutine: SkinRoutineType | null;
  setSkinRoutine: (routine: SkinRoutineType | null) => void;
};

const SkinRoutineContext = createContext<SkinRoutineContextType | undefined>(undefined);

export function SkinRoutineProvider({ children }: { children: React.ReactNode }) {
  const [skinRoutine, setSkinRoutine] = useState<SkinRoutineContextType['skinRoutine']>(null);

  return (
    <SkinRoutineContext.Provider value={{ skinRoutine, setSkinRoutine }}>
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
