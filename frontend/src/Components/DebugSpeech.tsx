import { useEffect } from "react";

export default function DebugSpeech() {
  useEffect(() => {
    const SpeechRecognition = 
      (window.SpeechRecognition || window.webkitSpeechRecognition) as any;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onstart = () => alert("Recognition started");
    recognition.onend = () => alert("Recognition ended");
    recognition.onerror = () => alert("Recognition error:");
    recognition.onresult = (e: any) =>alert(`Transcript: ${e.results[0][0].transcript}`);

    recognition.start();
  }, []);

  return <p>Debugging speech recognition...</p>;
}