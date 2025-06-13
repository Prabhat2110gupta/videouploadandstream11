import { useState } from 'react';
import VideoUpload from './VideoUpload';
import VideoPlayer from './videoPlayer';
import 'video.js/dist/video-js.css';

function Home({ setIsLoggedIn }) {
  const [videoId, setVideoId] = useState("0ee225b2-46c2-404e-9a6c-5f26ba8e9f47");
  const [fieldValue, setFieldValue] = useState("");

  return (
    // <div><h1>hello world</h1></div>
   
    <div className="flex flex-col items-center space-y-5 justify-center py-4">
      Logout Button */
        <div className="w-full flex justify-end px-10">
        <button
          onClick={() => setIsLoggedIn(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div> 

      <h1 className="text-4xl font-extrabold text-gray-700 dark:text-gray-100">
        Welcome to the video streaming app
      </h1>

      <div className="flex flex-wrap justify-center gap-10 w-full px-4 items-start">
        {/* Video Player Section */}
        <div className="w-full md:w-[48%] max-w-xl flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-white text-xl mb-4">Playing Video</h2>
          <div className="w-full rounded-lg overflow-hidden">
            <VideoPlayer
              className="w-full h-auto max-h-[500px]"
              src={`http://localhost:8080/api/v1/videos/${videoId}/prog_index.m3u8`}
            />
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="w-full md:w-[48%] max-w-xl flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-lg">
          <VideoUpload />
        </div>
      </div>

      <div className="my-4 flex space-x-4">
        <input
          onChange={(event) => setFieldValue(event.target.value)}
          type="text"
          placeholder="Enter the value of videoId here"
          name="video_id_field"
          className="border px-4 py-2 rounded-md"
        />
        <button
          disabled={!fieldValue}
          onClick={() => setVideoId(fieldValue)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default Home;
