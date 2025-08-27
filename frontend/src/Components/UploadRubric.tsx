import { useState } from 'react';

const UploadRubric = () => {

    const [file, setFile] = useState<File | null>(null);

    const fileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const sendFile = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            alert("Upload a file!")
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("http://127.0.0.1:5000/send-file", {
          method: "POST",
          body: formData
        })

        alert(response)
    
        const data = await response.json();
        alert("response received!")
        alert(data);
    };


  return (

    <div>
        <form action="/rubric_reading.py" onSubmit={sendFile}>
            <input type="file" name="rubricUpload" onChange={fileChange}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
};

export default UploadRubric
