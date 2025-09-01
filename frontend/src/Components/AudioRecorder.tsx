import { useState, useEffect, useRef } from "react";

type AudioRecorderProps = {
  onTranscriptChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscriptChange, onFeedbackChange }) => {

  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [transcript, setTranscript] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    onFeedbackChange(feedback);
  }, [feedback]);

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript]);

  // Send POST request for transcript
  const sendTranscript = async() => {

    const response = await fetch(`${backendUrl}/send-transcript`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transcript })
    });

    const data = await response.json();
    alert("response received!")
    setFeedback(data.response);
  };

    const listen = () => {
      
      alert("start");
      
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) {
          alert("Speech recognition not supported in your browser :(");
          return;
        }
      
        const rec = new SR();
        recognitionRef.current = rec;
        rec.continuous = true;
        rec.interimResults = true;
      
        rec.onstart = () => {
          setListening(true);
        };

        rec.onend = () => {
          setListening(false);
        }

        rec.onresult = (event: any) => {
          setTranscript(Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join(""));
          onTranscriptChange(transcript);
        };
        rec.start();
    }

    const stop = () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  
    const reset = () => {
      setTranscript("");
      onTranscriptChange("");
    };



  return (
    <div className="audioDiv">
      <p>Click "start" to get recording!</p>
      <p>Microphone: {listening? "ON" : "OFF"}</p>
      <div className="microphoneButtons">
        <button onClick={listen}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={reset}>reset</button>
        <button onClick={sendTranscript}>done!</button>
        </div>

    </div>
  )
}

export default AudioRecorder
