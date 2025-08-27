import { useState } from "react";
import ReactMarkdown from "react-markdown"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const AudioRecorder = () => {

  // Hooks for Gemini's reponse
  const [feedback, setFeedback] = useState("");

  // Setting up speech recognition
  const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
      return <span>Your browser doesn't support speech recognition :(</span>
  }

  // Send POST request for transcript
  const sendTranscript = async() => {

    const response = await fetch("http://127.0.0.1:5000/send-transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transcript })
    });

    const data = await response.json();
    alert("response received!")
    setFeedback(JSON.stringify(data.response));
  };

    const listen = () => {
        SpeechRecognition.startListening({ continuous: true });
    }

  return (
    <div>
      <p>microphone: {listening? "listening" : "not listening"} </p>
      <button onClick={listen}>start</button>
      <button onClick={SpeechRecognition.stopListening}>stop</button>
      <button onClick={resetTranscript}>reset</button>
      <button onClick={sendTranscript}>I'm done!</button>
      <p>{transcript}</p>
      <ReactMarkdown>{feedback? `${feedback}` : "Gemini hasn't given a response :("}</ReactMarkdown>
    </div>
  )
}

export default AudioRecorder
