package com.stream.app.spring_stream_backend.Services.Impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;
import com.stream.app.spring_stream_backend.Repositories.VideoRepository;
import com.stream.app.spring_stream_backend.Services.VideoService;

import jakarta.annotation.PostConstruct;

@Service
public class VideoServiceImpl implements VideoService {

    // Inject value from application.properties
    @Value("${files.video}")
    private String videoDirectory;
    @Value("${file.video}")
    private String hslVideoDirectory;
   @PostConstruct
   public void init(){
    File file =new File(videoDirectory);
    File file1=new File(hslVideoDirectory);
    if(!file1.exists()){
        file1.mkdir();

    }
    if(!file.exists()){
        file.mkdir();
        System.out.println("Folder Created");
    }
    else{
        System.out.println("folder already created");
    }
   }
    private final VideoRepository videoRepository;

    // Constructor injection for repository
    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public Video save(Video video, MultipartFile file) {
        try {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            Path targetPath = Paths.get(videoDirectory).resolve(originalFilename);

             String fileName=file.getOriginalFilename();
        String contentType=file.getContentType();
        

            Files.createDirectories(targetPath.getParent());

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetPath,StandardCopyOption.REPLACE_EXISTING);
            }
           // InputStream inputStream=file.getInputStream();
            video.setFilePath(targetPath.toString()); // Set path only
          
            System.out.println(targetPath);
           System.out.println(originalFilename);
           video.setContentType(contentType);
           videoRepository.save(video);
            processVideo(video.getVideoId());
            return video;

        } catch (IOException e) {
            throw new RuntimeException("Failed to store video file", e);
        }
    }

    @Override
    public Video get(String videoId) {
       Video video=  videoRepository.findById(videoId).orElseThrow(()->new RuntimeException("Video Not Forund"));
       return video;
    }

    @Override
    public Video getByTitle(String title) {
     return null; 
    }

    @Override
    public List<Video> getAll() {
       return  videoRepository.findAll();      
    }

//     @Override
//     public String processVideo(String videoId) {

//         Video video= this.get(videoId);
//         String filePath= video.getFilePath();

//       // create a path
//       Path videoPath=Paths.get(filePath);


//     //   String output360s=hslVideoDirectory+videoId+"/360p/";
//     //   String output720s=hslVideoDirectory+videoId+"/720p/";
//     //   String output1080s=hslVideoDirectory+videoId+"/1080p/";
//       try{
//     //   Files.createDirectories(Paths.get(output360s));
//     //   Files.createDirectories(Paths.get(output720s));
//     //   Files.createDirectories(Paths.get(output1080s));

//       Path outputPath=Paths.get(hslVideoDirectory,videoId);
//       Files.createDirectories(outputPath);

//     //  String ffmpegCmd=String.format(
//     //       "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 " +
//     //       "-f hls -hls_time 10 -hls_list_size 0 " +
//     //       " -hls_segment_filename \"%s/segment_%%03d.ts\" " +
//     //       "\"%s/prog_index.m3u8\"",videoPath,outputPath,outputPath);
//    String ffmpegCmd = String.format(
//     "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 " +
//     "-f hls -hls_time 10 -hls_list_size 0 " +
//     "-hls_segment_filename \"%s\\segment_%%03d.ts\" " +
//     "\"%s\\prog_index.m3u8\"",
//     videoPath.toString(), outputPath.toString(), outputPath.toString()
// );
//      // StringBuilder ffmpegCmd=new StringBuilder();
//     //   ffmpegCmd.append("ffmpeg -i")
//     //            .append(videoPath.toString())
//     //            .append(" ")
//     //            .append("-map 0:v -m 0:a -s:v:0 640*360 -b:v:0 800k ")
//     //            .append("-map 0:v -m 0:a -s:v:1 1280*720 -b:v:1 2800k ")
//     //            .append("-map 0:v -m 0:a -s:v:2 1920*1080 -b:v:2 5000k ")
//     //            .append("-var_stream_map \"v:0.a:0 v:1.a:0 v:2,a:0\" ")
//     //            .append("-master_pl_name ").append(hslVideoDirectory).append(videoId).append("/master.m3u8 ")
//     //            .append("-f hls -hls_time 10 -hls_list_size 0 ")
//     //            .append(0)

//     System.out.println("Processing video for ID: " + videoId);
// System.out.println("Command: " + ffmpegCmd);
//   System.out.println(ffmpegCmd);
// ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
//   Process process = processBuilder.start();

// // Capture error stream
// try (InputStream errorStream = process.getErrorStream()) {
//     String errorOutput = new String(errorStream.readAllBytes());
//     System.err.println("FFmpeg Error Output:\n" + errorOutput);
// }

// int exit = process.waitFor();
// if (exit != 0) {
//     throw new RuntimeException("Video processing failed with exit code " + exit);
// }
//  catch (InterruptedException e) {
//     Thread.currentThread().interrupt(); // good practice
//     throw new RuntimeException("Video processing was interrupted", e);
// }
 
//   return videoId;
               
//       }catch(IOException e){
//         throw new RuntimeException("Video preocessing failed");
//       }

    

    

// }
@Override
public String processVideo(String videoId) {
    Video video = this.get(videoId);
    String filePath = video.getFilePath();

    Path videoPath = Paths.get(filePath);

    if (!Files.exists(videoPath)) {
        throw new RuntimeException("Input video file does not exist: " + videoPath);
    }

    try {
        Path outputPath = Paths.get(hslVideoDirectory, videoId);
        Files.createDirectories(outputPath);

        // Use forward slashes for ffmpeg paths
     String ffmpegPath = "C:\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe";

String ffmpegCmd = String.format(
    "\"%s\" -i \"%s\" -c:v libx264 -c:a aac -strict -2 " +
    "-f hls -hls_time 10 -hls_list_size 0 " +
    "-hls_segment_filename \"%s\\segment_%%03d.ts\" " +
    "\"%s\\prog_index.m3u8\"",
    ffmpegPath, videoPath.toString(), outputPath.toString(), outputPath.toString()
);
        System.out.println("Processing video for ID: " + videoId);
        System.out.println("Command: " + String.join(" ", ffmpegCmd));

        ProcessBuilder processBuilder = new ProcessBuilder(ffmpegCmd);
        processBuilder.redirectErrorStream(true); // merge stdout and stderr
        Process process = processBuilder.start();

        try (InputStream inputStream = process.getInputStream()) {
            String output = new String(inputStream.readAllBytes());
            System.out.println("FFmpeg output:\n" + output);
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Video processing failed with exit code " + exitCode);
        }

    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        throw new RuntimeException("Video processing was interrupted", e);
    } catch (IOException e) {
        throw new RuntimeException("Video processing failed due to IO error", e);
    }

    return videoId;
}


}