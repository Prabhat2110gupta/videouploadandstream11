package com.stream.app.spring_stream_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.stream.app.spring_stream_backend.Services.VideoService;

@SpringBootTest
class SpringStreamBackendApplicationTests {
	@Autowired
   private  VideoService videoService;

	 @Test
    void testProcessVideoSuccessfully() {
        // Given: A valid video ID in the DB and its file exists
        String videoId = "e90c6e07-29b4-4d8d-99d0-2765711d8d30";

        // When: processing the video
        String result = videoService.processVideo(videoId);

        // Then: result should match input
        assertEquals(videoId, result);
    }

}
