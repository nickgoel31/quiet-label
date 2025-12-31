export const sampleData = {
  "product_name": "RXBAR Chocolate Sea Salt",
  "judgment": "This product is a relatively healthy snack option, given its high protein content and lack of added sugars. However, it contains common allergens like eggs, tree nuts, and potential cross-contamination with peanuts and milk.",
  "what_would_change_my_mind": [
    "Presence of added sugars",
    "Lower protein content",
    "Presence of artificial flavors or preservatives"
  ],
  "tradeoffs": {
    "axes": [
      {
        "dimension": "Protein Content",
        "level": "high",
        "explanation": "The product contains 12g of protein per serving, making it a good option for those seeking high protein snacks."
      },
      {
        "dimension": "Allergen Risk",
        "level": "high",
        "explanation": "The product contains eggs, cashews, and almonds, and may be cross-contaminated with peanuts and milk, posing a risk to individuals with allergies."
      },
      {
        "dimension": "Added Sugars",
        "level": "low",
        "explanation": "The product has 0g of added sugars, which is beneficial for those monitoring their sugar intake."
      },
      {
        "dimension": "Processing Level",
        "level": "medium",
        "explanation": "While the product contains natural ingredients, it is still a processed bar with some processed components like egg whites and natural flavors."
      }
    ],
    "summary": "The product offers high protein and no added sugars but comes with a high allergen risk and moderate processing level."
  },
  "all_ingredients": [
    {
      "ingredient_name": "Dates",
      "ingredient_function": "Natural sweetener and binder",
      "impact": "low",
      "reasoning": "Dates are a natural source of sweetness and fiber, contributing positively to the product's nutritional profile."
    },
    {
      "ingredient_name": "Egg Whites",
      "ingredient_function": "Protein source",
      "impact": "medium",
      "reasoning": "Egg whites are a high-quality protein source but may be a concern for those with egg allergies."
    },
    {
      "ingredient_name": "Cashews",
      "ingredient_function": "Texture and flavor",
      "impact": "medium",
      "reasoning": "Cashews add texture and flavor but are a common allergen."
    },
    {
      "ingredient_name": "Almonds",
      "ingredient_function": "Texture and flavor",
      "impact": "medium",
      "reasoning": "Almonds contribute to texture and flavor but are also a common allergen."
    },
    {
      "ingredient_name": "Chocolate",
      "ingredient_function": "Flavor",
      "impact": "low",
      "reasoning": "Chocolate adds flavor, but its impact is considered low as it is not overly processed."
    },
    {
      "ingredient_name": "Cocoa",
      "ingredient_function": "Flavor",
      "impact": "low",
      "reasoning": "Cocoa is a natural flavor component, contributing to the chocolate flavor without adding significant negative impact."
    },
    {
      "ingredient_name": "Natural Flavors",
      "ingredient_function": "Flavor enhancement",
      "impact": "medium",
      "reasoning": "Natural flavors can be a positive addition, but their exact composition can be uncertain."
    },
    {
      "ingredient_name": "Sea Salt",
      "ingredient_function": "Flavor enhancer",
      "impact": "low",
      "reasoning": "Sea salt enhances flavor without adding significant calories or negative health impacts."
    }
  ],
  "spectrum_between_whole_food_and_ultra_processed": 40,
  "highlighted_ingredients": [
    {
      "ingredient_name": "Egg Whites",
      "why_its_here": "High-quality protein source",
      "the_worry": "Allergen risk for those with egg allergies",
      "contextural_reality": "Commonly used in protein bars for its high protein content",
      "uncertainity": 0.2,
      "consensus": "Generally considered safe and beneficial for protein content"
    },
    {
      "ingredient_name": "Cashews",
      "why_its_here": "Adds texture and flavor",
      "the_worry": "Allergen risk for those with tree nut allergies",
      "contextural_reality": "Commonly used in snacks for texture and flavor",
      "uncertainity": 0.3,
      "consensus": "Can be a healthy addition in moderation, but poses allergy risks"
    }
  ],
  "context_scenarios": [
    {
      "scenario": "Consumed by someone with egg allergies",
      "explanation": "Could cause an allergic reaction",
      "impact_shift": "high"
    },
    {
      "scenario": "Consumed as part of a balanced diet",
      "explanation": "Can be a healthy snack option due to high protein and fiber content",
      "impact_shift": "minimal"
    }
  ],
  "closing": "Overall, RXBAR Chocolate Sea Salt is a nutritious snack option with high protein and no added sugars, but it contains allergens and has a moderate processing level.",
  "inferred_intent": {
    "primary_concern": "Nutritional value and allergen safety",
    "confidence": "high",
    "explanation": "The analysis focused on the nutritional content and potential allergens, which are critical for consumer health decisions."
  },
  "ignored_ingredients": [
    {
      "ingredient_name": "May contain peanuts, other tree nuts and milk",
      "reason": "Cross-contamination warning rather than an ingredient"
    }
  ],
  "conditional_insights": [
    {
      "condition": "Individuals with egg or tree nut allergies",
      "insight": "Should avoid this product due to the presence of eggs, cashews, and almonds.",
      "can_consume": "No"
    },
    {
      "condition": "Individuals seeking high protein snacks",
      "insight": "This product is suitable due to its high protein content.",
      "can_consume": "Yes"
    }
  ],
  "time_impact": {
    "short_term": "Can be a satisfying snack, potentially aiding in short-term satiety.",
    "long_term": "Regular consumption can contribute to overall protein intake and potentially support muscle health."
  },
  "ai_limitations": "The analysis is based on the provided image and may not account for all potential health considerations or the most current research.",
  "inferred_intent_user_concern": "Understanding the nutritional value and safety of the product for consumption.",
  "too_long_didnt_read": "RXBAR Chocolate Sea Salt is a high-protein snack with no added sugars but contains common allergens.",
  "ending_decision": "Suitable for those seeking high protein snacks without added sugars, but not for individuals with egg or tree nut allergies."
}