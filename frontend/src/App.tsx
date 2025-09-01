import './App.css'
import { useState } from "react"
import AudioRecorder from "./Components/AudioRecorder"
import UploadRubric from "./Components/UploadRubric"
import Camera from "./Components/Camera"
import Markdown from "react-markdown"

function App() {

  // Hooks for transcript and feedback
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [unfinishedTranscript, setUnfinishedTranscript] = useState("");

  return (
    <>
      <h1>Presentation Trainer!</h1>
      <p>Watch yourself as you deliver your DECA-style presentation and get instant feedback.</p>
      <div className="container"> 
        <Camera />
        
        <div className="options">
          <UploadRubric />
          <AudioRecorder onTranscriptChange={setTranscript} onFeedbackChange={setFeedback} onUnfinishedChange={setUnfinishedTranscript}/>
        </div>
      </div>

      <div className="transcriptFeedback">
        <h3>Your transcript:</h3>
        <p>{transcript}</p>
        <p>{unfinishedTranscript}</p>
        <h3>Your feedback:</h3>
        <Markdown>{feedback}</Markdown>
        
      </div>

    </>
  )
}

export default App
