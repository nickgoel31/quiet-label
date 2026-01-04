# 🔬 Quiet Label

An AI-powered food ingredient analysis tool that helps you understand what's really in your food. Uses dual AI models (Gemini 2.5 Flash & Llama 4) to provide comprehensive, context-aware ingredient insights.

![Quiet Label Demo](yt link)

## ✨ Features

- **Dual AI Analysis** - Compare perspectives from Gemini and Llama models
- **Multi-Modal Input** - Paste ingredients or scan product labels
- **Smart Context** - Processing spectrum, time-based impacts, and usage scenarios
- **Interactive Chat** - Ask follow-up questions with context awareness
- **Voice Input** - Speak your questions naturally
- **Analysis History** - Auto-saves your last 3 analyses locally
- **Three View Modes**:
  - **Whisper**: Quick summary with key highlights
  - **Full**: Complete ingredient breakdown
  - **Deep-Dive**: Comprehensive analysis with all insights

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini, Groq (Llama)
- **Markdown**: react-markdown
- **Icons**: Lucide React
- **File Upload**: UploadThing

## 🎯 How It Works

1. **Input**: Paste ingredients or upload a product image
2. **Analysis**: Both AI models analyze simultaneously
3. **Selection**: Choose your preferred AI perspective
4. **Exploration**: Browse ingredients, scenarios, and insights
5. **Chat**: Ask context-aware follow-up questions

## 🔍 Key Components

### Analysis Features

- **Processing Spectrum** - Whole food to ultra-processed scale
- **Uncertainty Bars** - Scientific consensus visualization
- **Time Impacts** - Short-term vs long-term effects
- **Contextual Scenarios** - How usage patterns affect impact
- **Conditional Insights** - Dietary restriction compatibility
- **Tradeoffs** - Balance between competing goals

## 💾 Local Storage

- Stores up to 3 analyses
- Persists between sessions
- FIFO queue (oldest removed first)
- Export/import capability (coming soon)

## 🎨 View Modes

**Whisper** → Quick TL;DR with key ingredients  
**Full** → Complete compositional map  
**Deep-Dive** → Everything: scenarios, impacts, insights, tradeoffs

## 🏆 Credits

Built for **EnCode 2026** hackathon submission.

## 🐛 Known Issues

- Image OCR accuracy depends on label clarity
- API rate limits apply to free tiers
- Large ingredient lists may take longer to process

## 📧 Contact

Questions? Open an issue or reach out at [harshgoel2004@gmail.com]

---

**Note**: This is an AI-powered tool for informational purposes. Always consult healthcare professionals for dietary decisions.
