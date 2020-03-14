package com.mohsen.chat.integration;

import com.mohsen.chat.domain.ICanHazDadJoke;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Query;

public interface JokeApi {

    @Headers({"Accept: Application/json"})
    @GET("search")
    public Call<ICanHazDadJoke> getJokes(
            @Query("term") String term,
            @Query("page") int page,
            @Query("limit") int limit
    );
}
