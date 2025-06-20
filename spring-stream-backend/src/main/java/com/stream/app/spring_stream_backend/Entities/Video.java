package com.stream.app.spring_stream_backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="yt_videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Video {
  @Id
  private String  videoId;
  private String title;
  private String description;
  private String contentType;
  private String filePath;
  @ManyToOne
  private Course course;

  
 
  @Column(name = "userId",nullable = false)
private Integer userId; 

}
