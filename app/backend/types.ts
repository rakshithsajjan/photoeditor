import { z } from 'zod';

export const selfieAnalysisResponse = z.object({
  skinType: z.object({
    primary: z.enum(['oily', 'dry', 'combination', 'normal', 'acne']),
    description: z.string(),
    characteristics: z.array(z.string()),
  }),

  texture: z.object({
    overall: z.enum(['smooth', 'rough', 'uneven', 'bumpy']),
    pores: z.enum(['minimal', 'visible', 'enlarged']),
    description: z.string(),
  }),

  hydration: z.object({
    hydrationLevel: z.enum(['dehydrated', 'adequately hydrated', 'well hydrated']),
    signs: z.array(z.string()),
  }),

  concerns: z.object({
    acne: z.object({
      present: z.boolean(),
      severity: z.enum(['none', 'mild', 'moderate', 'severe']),
      type: z.array(z.enum(['comedonal', 'inflammatory', 'cystic', 'pustular'])),
      description: z.string(),
    }),
    pigmentation: z.object({
      present: z.boolean(),
      types: z.array(z.enum(['post inflammatory', 'melasma', 'sun spots', 'freckles'])),
      severity: z.enum(['none', 'mild', 'moderate', 'severe']),
      description: z.string(),
    }),
    aging: z.object({
      signs: z.array(z.enum(['fine lines', 'wrinkles', 'loss of firmness', 'none'])),
      severity: z.enum(['minimal', 'mild', 'moderate', 'advanced']),
      description: z.string(),
    }),
  }),
  visibleSigns: z.object({
    redness: z.object({
      present: z.boolean(),
      intensity: z.enum(['mild', 'moderate', 'severe']),
      distribution: z.string(),
    }),
    visibleVessels: z.object({
      visible: z.boolean(),
      confidence: z.enum(['low', 'medium', 'high']),
      // Only if clearly visible in photos
    }),
    possibleSunDamage: z.object({
      visualSigns: z.array(
        z.enum(['sunspots', 'uneven pigmentation', 'premature wrinkles', 'rough texture', 'none'])
      ),
      confidence: z.enum(['low', 'medium', 'high']),
    }),
  }),

  overallAssessment: z.string(),
  recommendedFocus: z.array(z.string()),
});

export const productsAnalysisResponse = z.object({
  ingredients: z.array(z.string()),
  productType: z.enum(['cleanser', 'moisturizer', 'serum', 'toner', 'mask', 'scrub', 'sunscreen']),
});

/////////////////////////////////////////////////////////////////////////////////////////
// Skin Routine
const routineStepSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  duration: z.string(), // e.g., "1-2 minutes"
  frequency: z.string(), // e.g., "daily", "twice daily"
  instructions: z.string(),
  warnings: z.array(z.string()).optional(),
  waitTime: z.string().optional(), // Time to wait before next step
});

export const skinRoutineResponse = z.object({
  morningRoutine: z.object({
    steps: z.array(routineStepSchema),
    totalDuration: z.string(),
    specialNotes: z.array(z.string()),
  }),

  eveningRoutine: z.object({
    steps: z.array(routineStepSchema),
    totalDuration: z.string(),
    specialNotes: z.array(z.string()),
  }),

  lifestyle: z.object({
    dietary: z.array(z.string()),
    habits: z.array(z.string()),
    environmental: z.array(z.string()),
  }),

  warnings: z.array(
    z.object({
      type: z.enum(['ingredients conflict', 'general']),
      description: z.string(),
      recommendation: z.string(),
    })
  ),
});
