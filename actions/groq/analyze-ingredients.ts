"use server"

import { ingredientAnalysisSchema } from '@/schemas/ing-ana';
import { UserSettings } from '@/types';
import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function analyzeIngredientsOpenSource(userInput: string, imageBase64?: string, userSettings?: UserSettings) {
    const chatCompletion = await groq.chat.completions.create({
  "messages": [
    {
      "role": "system",
      "content": `You are Quiet Label, an AI-native consumer health copilot.\n\nFLOW:\nUser will send you an image or text or product name or ingredients list, based on the data provided to you, you must, analyse the ingredients. Make sure if you are uncertain about anything, be honest please.\n\nGOAL:\n    1. Infer intent.\n    2. Analyze ingredients.\n    3. Provide insights.\n    4. Generate the JSON as per the schema provided, You may use markdown formatting where necessary for better clarity.\n\nUSER 

      IMPORTANT: Keep your tone ${userSettings?.tone || 'neutral'} please.\n
      

      ALWAYS GENERATE RESPONSE KEEPING THE USERS DIETARY PREFERENCES AND ALLERGIES IN MIND:\n
      Dietary Preferences: ${userSettings?.dietaryPreferences && userSettings.dietaryPreferences.length > 0 ? userSettings.dietaryPreferences.join(', ') : 'None'}\n
      Allergies: ${userSettings?.allergies && userSettings.allergies.length > 0 ? userSettings.allergies.join(', ') : 'None'}\n
      `
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": `${userInput.length > 0 ? `${userInput}` : "Analyze the ingredients in this image."}  IMPORTANT: Keep your tone and writing style ${userSettings?.tone || 'humorous'} please.\n

      ALWAYS GENERATE RESPONSE KEEPING THE USERS DIETARY PREFERENCES AND ALLERGIES IN MIND:\n
      Dietary Preferences: ${userSettings?.dietaryPreferences && userSettings.dietaryPreferences.length > 0 ? userSettings.dietaryPreferences.join(', ') : 'None'}\n
      Allergies: ${userSettings?.allergies && userSettings.allergies.length > 0 ? userSettings.allergies.join(', ') : 'None'}\n`
        },
        imageBase64 ? {
            "type": "image_url",
            "image_url":{
                url: `data:image/png;base64,${imageBase64}` || ""
            }
        } : {
            "type": "text",
            "text": ""
        }
      ]
    },
  ],
  "model": "meta-llama/llama-4-maverick-17b-128e-instruct",
  "temperature": 0.7,
  "max_completion_tokens": 4024,
  "top_p": 1,
  "stream": false,
  "stop": null,
  "response_format":{
    type: "json_schema",
    json_schema: ingredientAnalysisSchema
  }
});

const result = JSON.parse(chatCompletion.choices[0].message.content || '{}');
return result;
}