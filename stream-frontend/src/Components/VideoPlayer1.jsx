// import React, { useEffect }  from "react";
// import videojs from "video.js";
// import Hls from "hls.js";
// import "video.js/dist/video-js.css";
// import React, { useEffect, useRef } from "react";
// import { preload } from "react-dom";

// function VideoPlayer({src}){

//     const videoRef=useRef(null)
//     const playerRef=useRef(null)

//     useEffect(()=>{
//         playerRef.current=videojs(videoRef.current,{
//             controls:true,
//             autoplay:true,
//             muted:true,
//             preload:"auto",
//         });
//          if(Hls.isSupported()){
//         const hls=new Hls();
//         hls.loadSource(src);
//         hls.attachMedia(videoRef.current);
//         hls.on(Hls.Events.MANIFEST_PARSED,()=>{
//             videoRef.current.play();
//         });}else if(videoRef.current.canPlayType("application/vnd.apple.mpegurl"))
//         {

//             videoRef.current.src=src;
            
//             videoRef.current.addEventListener("canPlay",()=>{
//                 videoRef.current.play();
//             })
//         }else{
//             console.log("video format not supported")
//         }

//     },[src]);

   
    
//     return (
//          <div>
//          <div data-vjs-player>
//            <video ref={videoRef}  style={{
//             width:"100%",
//             height:"500px"
//            }}  className="video-js vjs-control-bar"></video>
//          </div>
//          </div>
//     );
// }


import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoElement.parentNode) {
      console.warn("Video element is not in DOM yet.");
      return;
    }

    const options = {
      controls: true,
      autoplay: true,
      muted: true,
      preload: "auto",
      sources: [
        {
          src: src,
          type: "application/x-mpegURL",
        },
      ],
    };

    playerRef.current = videojs(videoElement, options);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        style={{ width: "100%", height: "400px", backgroundColor: "black" }}
      />
    </div>
  );
};

export default VideoPlayer;
