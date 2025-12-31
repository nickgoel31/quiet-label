import React from 'react'

const samples = [
    {
        title: "Chocolate Chip Protein Bar",
        ingredients: "Whey protein isolate, rolled oats, dark chocolate chips (cocoa mass, sugar, cocoa butter, soy lecithin), almond butter, honey, natural vanilla flavor, sea salt.",
        prompt: `I have a peanut and tree nut allergy and try to avoid soy when possible.

Can you check this product for potential allergy risks, explain which ingredients might be problematic for me, and tell me whether it’s generally safe for someone with my allergies?

Please explain your reasoning clearly and end with a short takeaway.`
    },
    {
        title: "Spicy Chickpea Snack Mix",
        ingredients: "Roasted chickpeas, vegetable oil (sunflower and/or canola), rice flour, spice blend (paprika, cayenne, garlic powder, onion powder), salt, citric acid, natural flavors.",
        prompt: `I’m vegan and gluten-sensitive (not celiac).

Can you analyze these ingredients and point out any possible hidden concerns, cross-contamination risks, or vague ingredients I should be cautious about?

I don’t need a definitive yes/no — just help me understand the uncertainty and what to watch for.`
    }
]

const Samples = ({ onSelect }: { onSelect: (sampleText: string) => void }) => {
  return (
    <div className='space-y-4'> 
        {samples.map((sample, index) => (
            <button key={index} onClick={() => onSelect(`Name of Product: ${sample.title}\nIngredients: ${sample.ingredients}\n\n${sample.prompt}`)} className="w-full text-left p-6 bg-white border border-neutral-200 rounded-2xl hover:border-neutral-400 transition-all group shadow-sm">
                <span className="block text-lg font-serif mb-1 group-hover:italic transition-all">{sample.title}</span>
                <span className="block text-xs text-neutral-400 italic line-clamp-1">{sample.ingredients}</span>
            </button>
        ))}
    </div>
  )
}

export default Samples