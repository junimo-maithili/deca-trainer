import Webcam from 'react-webcam'
import { useRef } from "react"
import dotenv from 'dotenv'
//import { useRef, useEffect } from "react"

const Camera = () => {

  dotenv.config();
  const backendUrl = process.env.BACKEND_URL

  const camSetup = {
    width: 500,
    height: 500,
    facingMode: "user"
  }

  const webcamRef = useRef<Webcam>(null);

    /*

    // POST request to send video
    const sendVideo = async(img: string) => {

      const response = await fetch(`${backendUrl}/send-video`, {
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
    */

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={camSetup}
        className="webcam"
      />
    </div>
  )
}

export default Camera
