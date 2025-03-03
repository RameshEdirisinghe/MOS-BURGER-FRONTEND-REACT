import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrl(response.data); // The uploaded image URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container">
      <h2>Upload Image to AWS S3</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width="300px" />
        </div>
      )}
    </div>
  );
}

export default App;
