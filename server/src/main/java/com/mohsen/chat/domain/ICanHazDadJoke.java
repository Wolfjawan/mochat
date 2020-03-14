package com.mohsen.chat.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

public class ICanHazDadJoke {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    @JsonProperty("results")
    private List<Joke> results;
    @JsonProperty("total_pages")
    private Integer total_pages;
    @JsonProperty("previous_page")
    private Integer previous_page;
    @JsonProperty("current_page")
    private Integer current_page;
    @JsonProperty("next_page")
    private Integer next_page;
}
