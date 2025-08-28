import Webcam from 'react-webcam'
import { useRef, useCallback, useEffect } from "react"

const Camera = () => {

  const camSetup = {
    width: 500,
    height: 500,
    facingMode: "user"
  }

    const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    
    
    }, [webcamRef]);

    // POST request to send video
    const sendVideo = async(img: string) => {

      const response = await fetch("http://127.0.0.1:5000/send-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ frame: img })
      });
  
      const data = await response.json();
      alert("response received!")
      alert(data)
    };    

    // Get and send screenshots every 200ms
    useEffect(() => {
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();

        if (screenshot) {
          sendVideo(screenshot); // pass the screenshot to send
        }  
      }

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
    </div>
  )
}

export default Camera
