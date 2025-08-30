import { useState } from 'react';

const UploadRubric = () => {

    const [file, setFile] = useState<File | null>(null);

  const backendUrl = process.env.BACKEND_URL

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

        await fetch(`${backendUrl}/send-file`, {
            method: "POST",
            body: formData
        });

        alert("File successfully uploaded!")
    };


  return (

    <div className="fileUploadDiv">
        <p>Upload your scenario document as a PDF:</p>
        <form action="/rubric_reading.py" onSubmit={sendFile}>
            <input type="file" id="rubricUpload" onChange={fileChange}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
  )
};

export default UploadRubric
