package com.honey.backend.domain.hotissue;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@EqualsAndHashCode(of = "id")
@ToString
@Table(name = "hot_issue")
public class HotIssue {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hot_issue_id")
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String summary;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String original;

    private String url;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    @Builder
    public HotIssue(String title, String summary, String url, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void addOriginal(String original){
        this.original = original;
    }

    public void addSummary(String summary){
        this.summary = summary;
    }
}
