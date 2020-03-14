package com.mohsen.chat.presentation;

import com.mohsen.chat.business.JokeService;
import com.mohsen.chat.domain.ICanHazDadJoke;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class JokesController {

    @Autowired
    private JokeService jokeService;

    @RequestMapping(method = {RequestMethod.GET}, value = "/jokes")
    public ResponseEntity<Optional<ICanHazDadJoke>> getJokes(
            @RequestParam(name = "term") String term,
            @RequestParam(name = "page") int page,
            @RequestParam(name = "limit") int limit
    ) {
        Optional<ICanHazDadJoke> iCanHazDadJoke = jokeService.getJokes(term, page, limit);
        return new ResponseEntity<>(iCanHazDadJoke, HttpStatus.OK);
    }

}
