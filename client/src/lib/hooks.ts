import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  const startListening = (onTranscript: (text: string) => void) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript) {
        onTranscript(transcript);
        toast({
          title: "Voice Captured",
          description: "Your speech has been added to the diary.",
        });
      }
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      toast({
        title: "Error",
        description: "Could not capture your voice. Please try again.",
        variant: "destructive"
      });
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, startListening, stopListening };
};

export const insertTextAtCursor = (
  textarea: HTMLTextAreaElement,
  text: string
) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  const newValue = before + text + after;

  textarea.value = newValue;
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  
  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
