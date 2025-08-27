import Webcam from 'react-webcam'
import { useRef, useCallback, useState, useEffect } from "react"

const Camera = () => {

  const [imgSrc, setImgSrc] = useState<string | null>("");

  const camSetup = {
    width: 500,
    height: 500,
    facingMode: "user"
  }

    const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setImgSrc(webcamRef.current.getScreenshot());
    }
    
    }, [webcamRef]);

    // POST request to send video
    const sendVideo = async() => {

      const response = await fetch("http://127.0.0.1:5000/send-video", {
        method: "POST",
        body: JSON.stringify({ imgSrc })
      });
  
      const data = await response.json();
      alert("response received!")
      alert(data)
    };    

    // Send frames every 200ms
    useEffect(() => {
      const interval = setInterval(sendVideo, 200);
      return () => clearInterval(interval);
    }, []);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={camSetup}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  )
}

export default Camera
