"use server";

import { GoogleGenAI } from "@google/genai";



const tools = [
  {
    googleSearch:{}
  }
]

export async function chatFollowUp(
  userInput: string, 
  history: any[], 
  productContext: {gemini: any, llama: any},
  focusedBlock: any, // Added currentSelectedBlock
  customApiKey?: string // Added customApiKey
) {
  try {
    const genAI = new GoogleGenAI({
      apiKey: customApiKey ? customApiKey?.length > 0 ? customApiKey : process.env.GEMINI_API_KEY! : process.env.GEMINI_API_KEY!
    });

    // Create a specialized focus string
    const focusContextString = focusedBlock 
      ? `The user is currently FOCUSING on this specific section: ${JSON.stringify(focusedBlock.data)}. 
         The type of focus is: ${focusedBlock.cardType}. 
         If their question is vague (e.g., "why?"), answer regarding this focused data.`
      : "No specific block is selected. Answer based on the general product analysis.";

    const systemPrompt = `
      You are Ingredient Whisperer. 
      PRODUCT: ${productContext.gemini.product_name}
      FULL ANALYSIS: ${JSON.stringify(productContext)}
      
      ${focusContextString}

      TASK:
      1. Provide a concise, insightful response.
      2. Use Markdown for emphasis (bolding, lists).
      3. If the user is focused on an ingredient, provide deep-dive scientific context if applicable.
      4. Keep your tone friendly, approachable, and informative. 

      BE CONCIZE, AND STAY ON TOPIC. Keep it short Please.
    `;

    const config = {
      temperature: 0.7,
      systemInstructions:systemPrompt,
      tools,
    }
    const model = 'gemini-flash-lite-latest';

    const chat = genAI.chats.create({
      model,
      config,
      history:[
        {
          role: 'user',
          parts: [{text:'analyze these ingredients'}]
        },
        {
          role: 'model',
          parts: [{text:JSON.stringify(productContext)}]
        },
        {
          role: 'user',
          parts: [{text: `PRODUCT NAME: ${productContext.product_name} \n ${focusContextString} Now, answer the user's follow-up questions`}]
        },
        {
          role: 'model',
          parts: [{text: 'Acknowledged. Ready for user questions.'}]
        },
        ...history
      ],
    })


    const result = await chat.sendMessage({
      message: userInput
    });
    console.log("Chat Result:", result.text);
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return { content: "My reasoning core is temporarily offline.", suggested_actions: [] };
  }
}