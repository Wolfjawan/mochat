package com.mohsen.chat.business;

import com.mohsen.chat.domain.ICanHazDadJoke;
import com.mohsen.chat.integration.JokeApi;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.Optional;

public class JokeService {

    public Optional<ICanHazDadJoke> getJokes(String term, int page, int limit) {
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://icanhazdadjoke.com/")
                .addConverterFactory( GsonConverterFactory.create())
                .client(httpClient.build())
                .build();

        JokeApi jokeApi = retrofit.create( JokeApi.class );

        Call<ICanHazDadJoke> resJokes = jokeApi.getJokes(term, page, limit);

        ICanHazDadJoke jokes = new ICanHazDadJoke();

        Response<ICanHazDadJoke> response;

        try{
            response =  resJokes.execute();
            jokes = response.body();
        }catch (Exception err){
//            throw new  err;
            System.out.println(err);
        }
        return Optional.of( jokes );
    }
}
