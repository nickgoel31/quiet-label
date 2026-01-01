"use client"

import { speechToTextGroq } from '@/actions/groq/speech-to-text';
import { Mic, Square } from 'lucide-react';
import { useState, useRef } from 'react';

export default function VoiceInput({ onTranscription }: { onTranscription: (text: string) => void }) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'audio/m4a' });
            const file = new File([blob], "recording.m4a", { type: 'audio/m4a' });
            
            // Prepare FormData for the Server Action
            const formData = new FormData();
            formData.append('file', file);

            const text = await speechToTextGroq(formData);
            if (text) onTranscription(text);
        };

        mediaRecorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    return (
        <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
        >
            {isRecording ? <Square size={18} /> : <Mic size={18} />}
        </button>
    );
}