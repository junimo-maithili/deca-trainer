import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

type AudioRecorderProps = {
  onTranscriptChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscriptChange, onFeedbackChange }) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  alert("Native SpeechRecognition")
  alert((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);


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
      alert("Attempting to start listening…");
      SpeechRecognition.startListening({ continuous: false });
      alert(`Listening state right after: ${listening}`);
      //SpeechRecognition.startListening({ continuous: true });
    }



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
      <button onClick={() => {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const rec = new SR();
  rec.onstart = () => alert("Started!");
  rec.start();  // <-- immediate inside click
}}>
  Enable Mic
</button>

    </div>
  )
}

export default AudioRecorder
