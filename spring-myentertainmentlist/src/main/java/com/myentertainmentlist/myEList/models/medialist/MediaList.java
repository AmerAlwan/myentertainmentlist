package com.myentertainmentlist.myEList.models.medialist;

import com.myentertainmentlist.myEList.enums.MediaListType;
import com.myentertainmentlist.myEList.models.User;
import com.myentertainmentlist.myEList.models.media.Game;
import com.myentertainmentlist.myEList.models.media.Movie;
import com.myentertainmentlist.myEList.models.media.Tv;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "medialist")
public class MediaList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", length = 256)
    private String description;

    @Column(name = "is_private")
    private boolean isPrivate = false;

    @Column(name = "poster_name")
    private String posterName = "default_poster";

    @Enumerated(EnumType.STRING)
    @Column(name="medialist_type", length = 20)
    private MediaListType mediaListType = MediaListType.MEDIA_ALL;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "medialist_movies",
            joinColumns = @JoinColumn(name = "medialist_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private Set<Movie> movies = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "medialist_tvs",
            joinColumns = @JoinColumn(name = "medialist_id"),
            inverseJoinColumns = @JoinColumn(name = "tv_id"))
    private Set<Tv> tvs = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "medialist_games",
            joinColumns = @JoinColumn(name = "medialist_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id"))
    private Set<Game> games = new HashSet<>();

    public MediaList() {}

    public MediaList(String name, String description, boolean isPrivate, MediaListType mediaListType) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.mediaListType = mediaListType;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
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

    public String getPosterName() {
        return posterName;
    }

    public String isDescription() {
        return description;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public MediaListType getMediaListType() {
        return mediaListType;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(User user) {
        this.user = user;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public void setMediaListType(MediaListType mediaListType) {
        this.mediaListType = mediaListType;
    }

    public void setPosterName(String posterName) {
        this.posterName = posterName;
    }

    public void addMovie(Movie movie) {
        this.movies.add(movie);
    }

}