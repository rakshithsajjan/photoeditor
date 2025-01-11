import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';

import {
  selfieAnalysisResponse,
  productsAnalysisResponse,
  skinRoutineResponse,
} from '~/app/backend/types';
import { CapturedImage } from '~/app/types/camera';
import { ENV } from '~/env';

const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});

async function apiCall(content: any, analysisTypeResponse: any) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    response_format: zodResponseFormat(analysisTypeResponse, 'response_format'),
  });
  const responseContent = response.choices[0].message.content;
  if (!responseContent) throw new Error('No content in response');
  return JSON.parse(responseContent);
}

/** STEPS FOR AI SKINCARE ROUTINE
 * get clinical descriptions & analysis of skin selfies from `selfieImages` (gpt-4o-mini)
 * read ingredients from `productImages` (gpt-4o-mini)
 * considering the clininal description analysis & how the ingridients affect the skintype + skin problems: 
  "create a skincare morning & night skincare routine" (o1-preview)
 *  - focus heavily on home remedies for solving skin problems using ayurveda
 *  - suggest ingredients that can be used & not the products itself
*/

export const getSelfieAnalysis = async (selfieImages: CapturedImage[]) => {
  const content = [
    {
      type: 'text',
      text: "You are an expert dermatologist. Analyse the selfie and respond with clinical descriptions for user's skin.",
    },
    ...selfieImages.map((image) => ({
      type: 'image_url',
      image_url: {
        url: `data:image/jpeg;base64,${image.base64}`,
      },
    })),
  ];
  try {
    return await apiCall(content, selfieAnalysisResponse);
  } catch (error) {
    console.log('API call failed for skin selfie analysis:', error);
    throw error;
  }
};

export const getProductsAnalysis = async (productImages: CapturedImage[]) => {
  const content = [
    {
      type: 'text',
      text: 'Read the ingredients of this skin product.',
    },
    ...productImages.map((image) => ({
      type: 'image_url',
      image_url: {
        url: `data:image/jpeg;base64,${image.base64}`,
      },
    })),
  ];
  console.log('running api call');
  try {
    return await apiCall(content, productsAnalysisResponse);
  } catch (error) {
    console.log('API call failed for skin products analysis:', error);
    throw error;
  }
};

const skinRoutinePrompt = (selfieAnalysis: any, productsAnalysis: any) => {
  return `As an expert dermatologist and skincare specialist, analyze the following information and create a personalized skincare routine:

SKIN ANALYSIS:
${JSON.stringify(selfieAnalysis, null, 2)}

CURRENTLY USED SKIN PRODUCT INGREDIENTS:
${JSON.stringify(productsAnalysis, null, 2)}

TASK:
Create a comprehensive skincare routine addressing the following aspects:
1. Morning Routine:
   - Cleansing recommendations
   - Treatment ayurvedic remedies & products (considering skin concerns: ${selfieAnalysis.concerns})
   - Sun protection
   - Product application order
   - Specific usage instructions

2. Evening Routine:
   - Makeup removal (if applicable)
   - Cleansing
   - Treatment ayurvedic remedies & products
   - Moisturization
   - Product application order

3. Weekly Special Care:
   - Exfoliation recommendations
   - Masks or treatments
   - Special considerations

Consider:
- Product ingredients compatibility
- Skin sensitivity and potential reactions
- Gradual introduction of new products
- Alternative product suggestions if needed
- Specific instructions for application techniques
- Frequency of use for each product
- Waiting time between products
- Potential seasonal adjustments

Provide the routine in a structured format with:
- Clear step-by-step instructions
- Product usage frequency
- Application methods
- Cautions and notes
- Expected timeline for results
- Signs of adverse reactions to watch for

Additional Recommendations:
- Lifestyle factors affecting skin health
- Dietary considerations
- Environmental protection measures
- Progress tracking suggestions`;
};

export async function getSkinRoutine(selfieAnalysis: any, productsAnalysis: any) {
  try {
    const response = await openai.chat.completions.create({
      model: 'o1-preview', // response_format not supported with this model
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: skinRoutinePrompt(selfieAnalysis, productsAnalysis),
            },
          ],
        },
      ],
      response_format: zodResponseFormat(skinRoutineResponse, 'skinroutine_response_format'),
    });
    const skinRoutine = response.choices[0].message.content;
    if (!skinRoutine) throw new Error('No content in response');
    console.log(JSON.parse(skinRoutine));
    // return it
    return JSON.parse(skinRoutine);
  } catch (error) {
    console.log('API call failed for skin routine:', error);
    throw error;
  }
}
