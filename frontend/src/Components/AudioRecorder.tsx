import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

type AudioRecorderProps = {
  onTranscriptChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscriptChange, onFeedbackChange }) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  console.log(backendUrl)

  // Hooks for Gemini's reponse
  const [feedback, setFeedback] = useState("");

  // Setting up speech recognition
  const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript]);

  useEffect(() => {
    onFeedbackChange(feedback);
  }, [feedback]);
  

  if (!browserSupportsSpeechRecognition) {
      return <span>Your browser doesn't support speech recognition :(</span>
  }

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
      
        SpeechRecognition.startListening({ continuous: true });
    }

    (SpeechRecognition as any).onstart = () => alert("Recognition started");
(SpeechRecognition as any).onend = () => alert("Recognition stopped");
(SpeechRecognition as any).onerror = (e: any) => alert("Recognition error:", e);


  return (
    <div className="audioDiv">
      <p>Click "start" to get recording!</p>
      <p>Microphone: {listening? "ON" : "OFF"}</p>
      <div className="microphoneButtons">
        <button onClick={listen}>start</button>
        <button onClick={SpeechRecognition.stopListening}>stop</button>
        <button onClick={resetTranscript}>reset</button>
        <button onClick={sendTranscript}>done!</button>
      </div>

    </div>
  )
}

export default AudioRecorder
