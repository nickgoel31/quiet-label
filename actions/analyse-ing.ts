"use server"


// where_this_sits_on_the_spectrum
// decision_endings

import {
  GoogleGenAI,
  Type,
} from '@google/genai';
import { createStreamableValue } from '@ai-sdk/rsc'; // Add this
import { UserSettings } from '@/types';

async function urlToGenerativePart(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType: "image/png", // Or detect via response headers
    },
  };
}

export async function analyzeIngredients(userInput: string, imageUrl?: string, customApiKey?: string, userSettings?: UserSettings) {
  try {
    const ai = new GoogleGenAI({
    apiKey: customApiKey ? customApiKey?.length > 0 ? customApiKey : process.env.GEMINI_API_KEY! : process.env.GEMINI_API_KEY!
  });
  const config = {
    temperature: 0.7,
    thinkingConfig: {
      thinkingBudget: -1,
      includeThoughts: true,
    },
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      required: ["product_name", "judgment", "all_ingredients", "context_scenarios", "closing", "inferred_intent", "ignored_ingredients", "conditional_insights", "time_impact", "inferred_intent_user_concern", "too_long_didnt_read", "tradeoffs", "ai_limitations", "ending_decision", "spectrum_between_whole_food_and_ultra_processed"],
      properties: {
        product_name: {
          type: Type.STRING,
        },
        judgment: {
          type: Type.STRING,
        },
        what_would_change_my_mind: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        tradeoffs: {
  type: Type.OBJECT,
  description: "High-level tradeoffs the product makes between competing goals.",
  required: ["axes", "summary"],
  properties: {
    axes: {
      type: Type.ARRAY,
      minItems: 2,
      maxItems: 4,
      items: {
        type: Type.OBJECT,
        required: ["dimension", "level", "explanation"],
        properties: {
          dimension: {
            type: Type.STRING,
            description: "The competing dimension being optimized (e.g., Taste, Convenience, Nutrition)."
          },
          level: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
            description: "Relative priority given to this dimension in the product."
          },
          explanation: {
            type: Type.STRING,
            description: "Why the product scores this way on the dimension."
          }
        }
      }
    },
    summary: {
      type: Type.STRING,
      description: "Plain-language synthesis of the overall tradeoff."
    }
  }
},

        all_ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["ingredient_name", "ingredient_function", "impact"],
            properties: {
              ingredient_name: {
                type: Type.STRING,
              },
              ingredient_function: {
                type: Type.STRING,
              },
              impact: {
                type: Type.STRING,
                enum: ["low", "medium", "high"],
              },
              reasoning: {
                type: Type.STRING,
              },
            },
          },
        },
        spectrum_between_whole_food_and_ultra_processed: {
          type: Type.NUMBER,
          description: "A number between 0 and 100 indicating where this product sits on the spectrum between whole food (0) and ultra-processed (100).",
        },
        highlighted_ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["ingredient_name", "why_its_here", "the_worry", "contextural_reality", "uncertainity", "consensus"],
            properties: {
              ingredient_name: {
                type: Type.STRING,
              },
              why_its_here: {
                type: Type.STRING,
              },
              the_worry: {
                type: Type.STRING,
              },
              contextural_reality: {
                type: Type.STRING,
              },
              uncertainity: {
                type: Type.NUMBER,
                
              },
              consensus: {
                type: Type.STRING,
              },
            },
          },
        },
        context_scenarios: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["scenario", "explanation", "impact_shift"],
            properties: {
              scenario: {
                type: Type.STRING,
              },
              explanation: {
                type: Type.STRING,
              },
              impact_shift: {
                type: Type.STRING,
                enum: ["minimal", "moderate", "high"],
              },
            },
          },
        },
        closing: {
          type: Type.STRING,
        },
        inferred_intent: {
          type: Type.OBJECT,
          required: ["primary_concern", "confidence", "explanation"],
          properties: {
            primary_concern: {
              type: Type.STRING,
            },
            confidence: {
              type: Type.STRING,
            },
            explanation: {
              type: Type.STRING,
            },
          },
        },
        ignored_ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["ingredient_name", "reason"],
            properties: {
              ingredient_name: {
                type: Type.STRING,
              },
              reason: {
                type: Type.STRING,
              },
            },
          },
        },
        conditional_insights: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["condition", "insight"],
            properties: {
              condition: {
                type: Type.STRING,
              },
              insight: {
                type: Type.STRING,
              },
              can_consume: {
                type: Type.STRING,
              }
            },
          },
        },
        time_impact: {
          type: Type.OBJECT,
          required: ["short_term", "long_term"],
          properties: {
            short_term: {
              type: Type.STRING,
            },
            long_term: {
              type: Type.STRING,
            },
          },
        },
        ai_limitations: {
          type: Type.STRING,
        },
        inferred_intent_user_concern: {
          type: Type.STRING,
        },
        too_long_didnt_read: {
          type: Type.STRING,
        },
        ending_decision: {
          type: Type.STRING,
          description: "A concise decision statement summarizing the overall recommendation regarding the product. Should User eat it or not? 1 Line max. Required. What would AI do if it were the user?",
        },
        research_focus:{
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
        what_research_did_i_do: {
          type: Type.STRING,
          description: "Describe the research process you undertook to analyze the ingredients and how is it better from your competitor model Llama"
        }

      },
    },
    systemInstruction: [
        {
          text: `You are Quiet Label, an AI-native consumer health copilot.

FLOW:
User will send you an image or text or product name or ingredients list, based on the data provided to you, you must, analyse the ingredients. Make sure if you are uncertain about anything, be honest please.

GOAL:
    1. Infer intent.
    2. Analyze ingredients.
    3. Provide insights.
    4. Generate the JSON as per the schema provided, You may use markdown formatting where necessary for better clarity.

    
      IMPORTANT: Keep your tone ${userSettings?.tone || 'neutral'} please.\n
      IMPORTANT: ${userSettings?.takeaway === 'yes' ? 'Always provide a concise takeaway (Ending Decision) at the end of your analysis.' : userSettings?.takeaway === 'necessary' ? 'Only provide a takeaway (Ending Decision) when necessary.' : 'Do not provide a takeaway (Ending Decision) at the end of your analysis.'}\n

      ALWAYS GENERATE RESPONSE KEEPING THE USERS DIETARY PREFERENCES AND ALLERGIES IN MIND:\n
      Dietary Preferences: ${userSettings?.dietaryPreferences && userSettings.dietaryPreferences.length > 0 ? userSettings.dietaryPreferences.join(', ') : 'None'}\n
      Allergies: ${userSettings?.allergies && userSettings.allergies.length > 0 ? userSettings.allergies.join(', ') : 'None'}\n

`,
        }
    ],
  };
  const model = 'gemini-flash-latest';

  const parts: any[] = [{ text: userInput || "Analyze the ingredients in this image." }];
  

  if (imageUrl) {
    const imagePart = await urlToGenerativePart(imageUrl);
    parts.push(imagePart);
  }

  const contents = [
    {
      role: 'user',
      parts: parts,
    },
  ];

  const thoughtStream = createStreamableValue("");

  async function runAnalysis () {
    const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

    let fullJsonText = "";
    // 2. Iterate through the stream
  for await (const chunk of response) {
    const parts = chunk.candidates?.[0]?.content?.parts;

    if (parts) {
      for (const part of parts) {
        // 3. Handle Thoughts (Stream these immediately)
        if(!part.text){
            continue;
        }
        else if (part.thought) {
          thoughtStream.update(part.text)
        } 
        
        // 4. Handle Final Answer (Buffer this, do not stream to console)
        else {
          fullJsonText += part.text;
        }
      }
    }
  }
  thoughtStream.done();
  console.log(JSON.parse(fullJsonText))
    return JSON.parse(fullJsonText);
} 
const finalData= await runAnalysis();
  
    return {
        thoughtOutput: thoughtStream.value,
        finalData
    }
  } catch (error: any) {
    console.log("Error in analyzeIngredients:", error.message);
    
    return null;
  }
}
