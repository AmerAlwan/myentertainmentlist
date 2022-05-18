package com.myentertainmentlist.myEList.payloads.responses;

import com.myentertainmentlist.myEList.models.media.Game;
import com.myentertainmentlist.myEList.models.media.Movie;
import com.myentertainmentlist.myEList.models.media.Tv;

import java.util.Set;

public class MediaListResponse {

    private Long id;
    private String name;
    private String description;
    private boolean isPrivate;
    private Set<Movie> movies;
    private Set<Tv> tvs;
    private Set<Game> games;

    public MediaListResponse(Long id, String name, String description, boolean isPrivate, Set<Movie> movies, Set<Tv> tvs, Set<Game> games) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.movies = movies;
        this.tvs = tvs;
        this.games = games;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }

    public void setTvs(Set<Tv> tvs) {
        this.tvs = tvs;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    public Set<Tv> getTvs() {
        return tvs;
    }

    public Set<Game> getGames() {
        return games;
    }
}