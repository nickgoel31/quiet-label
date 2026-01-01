"use server"

import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function speechToTextGroq(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        
        if (!file) {
            throw new Error("No audio file provided");
        }

        // Groq SDK accepts a File object directly in Node.js environments
        const transcription = await groq.audio.transcriptions.create({
            file: file,
            model: "whisper-large-v3-turbo",
            prompt: "The audio is about food ingredients and nutrition labels.", // Optional: helps with context
            temperature: 0,
            response_format: "verbose_json",
        });

        return transcription.text;
    } catch (error: any) {
        console.error("STT Error:", error.message);
        return null;
    }
}