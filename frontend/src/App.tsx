import './App.css'
import { useState } from "react"
import AudioRecorder from "./Components/AudioRecorder"
import UploadRubric from "./Components/UploadRubric"
import Camera from "./Components/Camera"

function App() {

  // Hooks for transcript and feedback
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <h1>Deca Trainer!</h1>
      <p>Watch yourself as you deliver your presentation and get instant feedback.</p>
      <div className="container"> 
        <Camera />
        
        <div className="options">
          <UploadRubric />
          <AudioRecorder onTranscriptChange={setTranscript} onFeedbackChange={setFeedback}/>
        </div>
      </div>

      <div className="transcriptFeedback">
        <h3>Your transcript:</h3>
        <p>{transcript}</p>
        <h3>Your feedback:</h3>
        <p>{feedback}</p>
      </div>

    </>
  )
}

export default App
