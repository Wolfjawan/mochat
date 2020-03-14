package com.mohsen.chat.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @JsonProperty("fromId")
    private int fromId;
    @JsonProperty("toId")
    private int toId;
    @Lob
    @JsonProperty("message")
    private String message;
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
}
