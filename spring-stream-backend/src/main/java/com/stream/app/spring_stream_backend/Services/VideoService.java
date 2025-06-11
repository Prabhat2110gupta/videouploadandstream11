package com.stream.app.spring_stream_backend.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.stream.app.spring_stream_backend.Entities.Video;

public interface VideoService {

    Video save(Video video,MultipartFile file);
    Video  get(String videoId);
    Video getByTitle(String title);
    List<Video>getAll();
    String processVideo(String videoId);

}
