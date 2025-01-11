import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';

import { selfieAnalysisResponse, productsAnalysisResponse } from '~/app/backend/types';
import { CapturedImage } from '~/app/types/camera';

const openai = new OpenAI({
  apiKey:
    '',
});

/** STEPS FOR AI SKINCARE ROUTINE
 * get clinical descriptions & analysis of skin selfies from `selfieImages` (gpt-4o-mini)
 * read ingredients from `productImages` (gpt-4o-mini)
 * considering the clininal description analysis & how the ingridients affect the skintype + skin problems: 
  "create a skincare morning & night skincare routine" (o1-preview)
 *  - focus heavily on home remedies for solving skin problems using ayurveda
 *  - suggest ingredients that can be used & not the products itself
*/

export const selfieAnalysis = async (selfieImages: CapturedImage[]) => {
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
  const selfie_analysis = await apiCall(content, selfieAnalysisResponse);
};

export const productsAnalysis = async (productImages: CapturedImage[]) => {
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
  const products_analysis = await apiCall(content, productsAnalysisResponse);
};

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
  return response.choices[0].message['content'];
}
