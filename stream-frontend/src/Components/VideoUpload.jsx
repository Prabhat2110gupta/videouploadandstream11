import { useState } from "react";
import videoLogo from "../assets/image.png";
import axios from "axios";

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(50);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const formFieldChange = (event) => {
    setMetaData({
      ...metaData,
      [event.target.name]: event.target.value,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a video file.");
      return;
    }
    saveVideoToServer(file, metaData);
  };
  function resetForm(){
    setMetaData({
        title:"",
        description:"",
    });
    setFile(null);
    setUploading(false);
  //  setMessage("");
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);
      const userId = localStorage.getItem("userId") || 1; // fallback to 1 for dev/test
    formData.append("userId", userId);


      const response = await axios.post(
        "http://localhost:8080/api/v1/videos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percent);
            setProgress(percent);
          },
        }
      );
      setProgress(0);

      setMessage("File uploaded successfully!" + response.data.videoId);
      setShowAlert(true);
    
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage("error in Uploading file.");
    } finally {
      setUploading(false);
      resetForm();
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload a Video</h2>

      <form noValidate className="space-y-4" onSubmit={handleForm}>
        <div>
          <label className="block mb-1 font-medium">Video Title</label>
          <input
             value={metaData.title}
            name="title"
            onChange={formFieldChange}
            type="text"
            placeholder="Enter title"
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Video Description</label>
          <textarea
             value={metaData.description}
            name="description"
            onChange={formFieldChange}
            rows="3"
            placeholder="Enter description"
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
          ></textarea>
        </div>

        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <img className="h-16 w-16 object-cover" src={videoLogo} alt="Upload icon" />
          </div>
          <label className="block">
            <span className="sr-only">Choose video file</span>
            <input
           //   value={file}
              name="file"
              type="file"
              onChange={handleFileChange}
              className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-200 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500"
            />
          </label>
        </div>

        {uploading && (
          <div className="text-sm text-gray-300">Uploading: {progress}%</div>
        )}
      {message && showAlert && (
  <div className="relative text-sm mt-2 p-3 rounded-md bg-green-600 text-white">
    {message}
    <button
      onClick={() => setShowAlert(false)}
      className="absolute top-0 right-0 mt-1 mr-2 text-white text-lg font-bold focus:outline-none"
    >
      ×
    </button>
  </div>
)}

        <div className="pt-2">
          <button disabled={uploading}
            type="submit"
            className="w-full bg-sky-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-sky-500 transition-colors"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideoUpload;
