import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const AudioRecorder = () => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser doesn't support speech recognition :(</span>
    }

    const listen = () => {
        SpeechRecognition.startListening({ continuous: true });
    }

  return (
    <div>
      <p>microphone: {listening? "listening" : "not listening"} </p>
      <button onClick={listen}>start</button>
      <button onClick={SpeechRecognition.stopListening}>stop</button>
      <button onClick={resetTranscript}>reset</button>
      <p>{transcript}</p>
    </div>
  )
}

export default AudioRecorder
