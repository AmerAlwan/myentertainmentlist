package com.myentertainmentlist.myEList.models.media;

import javax.persistence.*;
import java.util.Set;
import java.util.HashSet;
import java.util.Collection;

import com.myentertainmentlist.myEList.models.media.Movie;
import com.myentertainmentlist.myEList.models.media.Tv;
import com.myentertainmentlist.myEList.models.media.Game;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    private Set<Movie> movies = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    private Set<Tv> tvs = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories")
    private Set<Game> games = new HashSet<>();

    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public void setMovies(Set<Movie> movies) {
//        this.movies = movies;
//    }
//
//    public void setTvs(Set<Tv> tvs) {
//        this.tvs = tvs;
//    }
//
//    public void setGames(Set<Game> games) {
//        this.games = games;
//    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
//
//    public Set<Movie> getMovies() {
//        return movies;
//    }
//
//    public Set<Tv> getTvs() {
//        return tvs;
//    }
//
//    public Set<Game> getGames() {
//        return games;
//    }
}