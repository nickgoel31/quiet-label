export const ingredientAnalysisSchema = {
  "name": "ingredient_analysis",
  "strict": true,
  "schema": {
    "type": "object",
    "required": [
  "product_name",
  "judgment",
  "what_would_change_my_mind",
  "tradeoffs",
  "all_ingredients",
  "spectrum_between_whole_food_and_ultra_processed",
  "highlighted_ingredients",
  "context_scenarios",
  "closing",
  "inferred_intent",
  "ignored_ingredients",
  "conditional_insights",
  "time_impact",
  "ai_limitations",
  "inferred_intent_user_concern",
  "too_long_didnt_read",
  "ending_decision",
  "research_focus",
  "what_research_did_i_do"
],
    "properties": {
      "product_name": {
        "type": "string"
      },
      "judgment": {
        "type": "string"
      },
      "what_would_change_my_mind": {
        "type": "array",
        "items": { "type": "string" }
      },
      "tradeoffs": {
        "type": "object",
        "required": ["axes", "summary"],
        "properties": {
          "axes": {
            "type": "array",
            "minItems": 2,
            "maxItems": 4,
            "items": {
              "type": "object",
              "required": ["dimension", "level", "explanation"],
              "properties": {
                "dimension": { "type": "string" },
                "level": {
                  "type": "string",
                  "enum": ["low", "medium", "high"]
                },
                "explanation": { "type": "string" }
              },
              "additionalProperties": false
            }
          },
          "summary": { "type": "string" }
        },
        "additionalProperties": false
      },
      "all_ingredients": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["ingredient_name", "ingredient_function", "impact", "reasoning"],
          "properties": {
            "ingredient_name": { "type": "string" },
            "ingredient_function": { "type": "string" },
            "impact": {
              "type": "string",
              "enum": ["low", "medium", "high"]
            },
            "reasoning": { "type": "string" }
          },
          "additionalProperties": false
        }
      },
      "spectrum_between_whole_food_and_ultra_processed": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "highlighted_ingredients": {
        "type": "array",
        "items": {
          "type": "object",
          "required": [
            "ingredient_name",
            "why_its_here",
            "the_worry",
            "contextural_reality",
            "uncertainity",
            "consensus"
          ],
          "properties": {
            "ingredient_name": { "type": "string" },
            "why_its_here": { "type": "string" },
            "the_worry": { "type": "string" },
            "contextural_reality": { "type": "string" },
            "uncertainity": {
              "type": "number",
              "minimum": 0,
              "maximum": 1
            },
            "consensus": { "type": "string" }
          },
          "additionalProperties": false
        }
      },
      "context_scenarios": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["scenario", "explanation", "impact_shift"],
          "properties": {
            "scenario": { "type": "string" },
            "explanation": { "type": "string" },
            "impact_shift": {
              "type": "string",
              "enum": ["minimal", "moderate", "high"]
            }
          },
          "additionalProperties": false
        }
      },
      "closing": {
        "type": "string"
      },
      "inferred_intent": {
        "type": "object",
        "required": ["primary_concern", "confidence", "explanation"],
        "properties": {
          "primary_concern": { "type": "string" },
          "confidence": { "type": "string" },
          "explanation": { "type": "string" }
        },
        "additionalProperties": false
      },
      "ignored_ingredients": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["ingredient_name", "reason"],
          "properties": {
            "ingredient_name": { "type": "string" },
            "reason": { "type": "string" }
          },
          "additionalProperties": false
        }
      },
      "conditional_insights": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["condition", "insight", "can_consume"],
          "properties": {
            "condition": { "type": "string" },
            "insight": { "type": "string" },
            "can_consume": { "type": "string" }
          },
          "additionalProperties": false
        }
      },
      "time_impact": {
        "type": "object",
        "required": ["short_term", "long_term"],
        "properties": {
          "short_term": { "type": "string" },
          "long_term": { "type": "string" }
        },
        "additionalProperties": false
      },
      "ai_limitations": {
        "type": "string"
      },
      "inferred_intent_user_concern": {
        "type": "string"
      },
      "too_long_didnt_read": {
        "type": "string"
      },
      "ending_decision": {
        "type": "string",
        "description": "A concise decision statement summarizing the overall recommendation. Should User eat it or not? One line."
      },
       research_focus:{
                type: "array",
                items: {
                  type: "string",
                },
              },
              what_research_did_i_do: {
                type: "string",
                description: "Describe the research process you undertook to analyze the ingredients and how is it better from your competitor model Llama"
              }
    },
    "additionalProperties": false
  }
}
