import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

const AudioRecorder = () => {

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

    alert("response clicked!")

    const response = await fetch("http://127.0.0.1:5000/send-transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ transcript })
    });

    const data = await response.json();
    console.log("Response from backend:", data);
    alert("response received!")

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
    </div>
  )
}

export default AudioRecorder
