import { useState, useEffect, useRef } from "react";

type AudioRecorderProps = {
  onTranscriptChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
  onUnfinishedChange?: (unfinishedTranscript: string) => void;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onTranscriptChange, onFeedbackChange, onUnfinishedChange }) => {

  // React hooks for listening state, feedback and transcript
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [transcript, setTranscript] = useState("");
  const [unfinishedTranscript, setUnfinishedTranscript] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const recognitionRef = useRef<any>(null);

  // Update info when changed
  useEffect(() => {
    onFeedbackChange(feedback);
  }, [feedback]);

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript]);

  useEffect(() => {
    if (onUnfinishedChange) onUnfinishedChange(unfinishedTranscript);
  }, [unfinishedTranscript]);
  

  // Send POST request for transcript
  const sendTranscript = async() => {

    alert("sending transcript...")

    const response = await fetch(`${backendUrl}/send-transcript`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transcript })
    });

    const data = await response.json();
    alert("feedback ready!")
    setFeedback(data.response);
  };

    // Listen to user
    const listen = () => {
            
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
          let finalText = "";
          let interimText = "";
        
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalText += result[0].transcript;
            } else {
              interimText += result[0].transcript;
            }
          }
        
          setTranscript(prev => {
            const updated = prev + finalText;
            onTranscriptChange(updated);
            return updated;
          });
        
          setUnfinishedTranscript(interimText);
          if (onUnfinishedChange) onUnfinishedChange(interimText);
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
