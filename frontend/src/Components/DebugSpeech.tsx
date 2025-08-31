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

    recognition.onstart = () => console.log("Recognition started");
    recognition.onend = () => console.log("Recognition ended");
    recognition.onerror = (e: any) => console.error("Recognition error:", e);
    recognition.onresult = (e: any) =>
      alert(`Transcript: ${e.results[0][0].transcript}`);

    recognition.start();
  }, []);

  return <p>Debugging speech recognition...</p>;
}