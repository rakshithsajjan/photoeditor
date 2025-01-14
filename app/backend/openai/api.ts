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
  console.log(responseContent);
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
  // console.log('running api call');
  try {
    return await apiCall(content, productsAnalysisResponse);
  } catch (error) {
    console.log('API call failed for skin products analysis:', error);
    throw error;
  }
};

const skinRoutinePrompt = (selfieAnalysis: any, productsAnalysis: any) => {
  return `I want a comprehensive, personalized skincare routine based on facial analysis and current skin products usage data.
    Each recommendation should be evidence-based, incorporating both modern skincare science and traditional Ayurvedic practices, with a focus on addressing identified skin concerns and optimizing skin health.
    For the routine, return:

    Morning Routine with:
    Step-by-step product application order
    Specific product recommendations
    Application techniques
    Timing between steps


    Evening Routine with:
    Step-by-step product application order
    Specific product recommendations
    Application techniques
    Timing between steps


    Weekly Special Care with:
    Exfoliation schedule
    Mask recommendations
    Special treatments


    Additional Guidelines including:
    Product introduction timeline
    Progress tracking methods
    Expected results timeline
    Warning signs to watch for

    Be careful to:

    Verify ingredient compatibility before making recommendations
    Ensure products don't conflict or cancel each other out
    Consider skin sensitivity and potential allergic reactions
    Account for seasonal changes and environmental factors
    Provide alternatives for any unavailable products

    --
    For context: The analysis comes from facial scanning data and current product ingredient analysis:
    Selfie Analysis: ${JSON.stringify(selfieAnalysis, null, 2)}
    Product Analysis: ${JSON.stringify(productsAnalysis, null, 2)}
    Skin concerns: ${selfieAnalysis.concerns}
    The routine should account for:

    Lifestyle factors affecting skin health
    Dietary considerations
    Environmental protection measures
    Current skincare habits and preferences
    Need for both immediate and long-term results
    Preference for incorporating natural and Ayurvedic remedies
    Focus on sustainable, long-term skin health practices`;
};

export async function getSkinRoutine(selfieAnalysis: any, productsAnalysis: any) {
  const content = [
    {
      type: 'text',
      text: skinRoutinePrompt(selfieAnalysis, productsAnalysis),
    },
  ];
  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini', // response_format not supported with this model
    //   messages: [
    //     {
    //       role: 'user',
    //       content: [
    //         {
    //           type: 'text',
    //           text: skinRoutinePrompt(selfieAnalysis, productsAnalysis),
    //         },
    //       ],
    //     },
    //   ],
    //   response_format: zodResponseFormat(skinRoutineResponse, 'response_format'),
    // });
    // const skinRoutine = response.choices[0].message.content;
    // if (!skinRoutine) throw new Error('No content in response');
    // console.log(JSON.parse(skinRoutine));
    // // return it
    // return JSON.parse(skinRoutine);
    return await apiCall(content, skinRoutineResponse);
  } catch (error) {
    console.log('API call failed for skin routine:', error);
    throw error;
  }
}
