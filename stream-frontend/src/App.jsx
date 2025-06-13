  // import { Routes, Route } from 'react-router-dom';
  // import Home from './Components/Home';



  // function App() {
  //   return <Home />;
  // }
  // import { Routes, Route, Navigate } from 'react-router-dom';
  // import Home from './Components/Home';
  // import Login from './Components/Login';
  // import Register from './Components/Register';

  // function App() {
  //   const isLoggedIn = !!localStorage.getItem('token'); // or however you store your auth token

  //   return (
  //     <Routes>
  //       <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //     </Routes>
  //   );
  // }

  // export default App;
  import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false); // no localStorage, just in-memory

  return (
    <Routes>
      <Route path="/home" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />
        {/* <Route path="/home" element={<Home />} /> */}
    </Routes>
  );
}

export default App;


  // import { useState } from 'react'
  // import reactLogo from './assets/react.svg'
  // import viteLogo from '/vite.svg'
  // import './App.css'
  // import VideoUpload from './Components/VideoUpload'
  // import VideoPlayer from './Components/videoPlayer'
  // import 'video.js/dist/video-js.css';
  // function App() {
  //   const [count, setCount] = useState(0);
  //   const [videoId,setVideoId]=useState("0ee225b2-46c2-404e-9a6c-5f26ba8e9f47");
  //   const [fieldValue,setFieldValue]=useState("null");
  //   function playVideo(videoId){
  //     setCount(videoId);
  //   }
  //   return (
  //     <>
  //    <div className="flex flex-col items-center space-y-5 justify-center py-4">
  //   <h1 className="text-4xl font-extrabold text-gray-700 dark:text-gray-100">
  //     Welcome to the video streaming app
  //   </h1>
  // <div className="flex flex-wrap justify-center gap-10 w-full px-4 items-start">
  //   {/* Video Player Section */}
  //   <div className="w-full md:w-[48%] max-w-xl flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-lg">
  //     <h2 className="text-white text-xl mb-4">Playing Video</h2>

  //     <div className="w-full rounded-lg overflow-hidden">
  //       <VideoPlayer
  //         className="w-full h-auto max-h-[500px]" // This only works if VideoPlayer forwards className
  //         src={`http://localhost:8080/api/v1/videos/${videoId}/prog_index.m3u8`}
  //       />
  //     </div>
  //   </div>

  //   {/* Video Upload Section */}
  //   <div className="w-full md:w-[48%] max-w-xl flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-lg">
  //     <VideoUpload />
  //   </div>
  // </div>
  // <div className="my-4 flex space-x-4">
  //   <input  onChange={(event)=>{
  //     setFieldValue(event.target.value)
  //   }}
  //     type="text"
  //     placeholder="Enter the value of videoId here"
  //     name="video_id_field"
  //     className="border px-4 py-2 rounded-md"
  //   />
  //   <button   disabled={!fieldValue} onClick={()=>{
  //     setVideoId((fieldValue))
  //   }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
  //     Play
  //   </button>
  // </div>

  // </div>

  //     </>
  //   )
  // }

  // export default App
