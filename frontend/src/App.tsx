import { useState } from 'react'
import './App.css'
import AudioRecorder from "./Components/AudioRecorder"
import UploadRubric from "./Components/UploadRubric"
import Camera from "./Components/Camera"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>        
      <h1>Deca Trainer!</h1>
      <Camera />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <AudioRecorder />
      <UploadRubric />
    </>
  )
}

export default App
