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
