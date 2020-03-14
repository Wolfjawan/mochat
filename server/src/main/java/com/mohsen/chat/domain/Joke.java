package com.mohsen.chat.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Joke {
    @JsonProperty("id")
    private String id;
    @JsonProperty("joke")
    private String joke;
}
