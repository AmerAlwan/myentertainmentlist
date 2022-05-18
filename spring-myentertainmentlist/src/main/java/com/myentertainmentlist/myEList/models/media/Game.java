package com.myentertainmentlist.myEList.models.media;

import com.myentertainmentlist.myEList.models.medialist.MediaList;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "api_id", unique = true)
    private String apiId;

    @Column(name = "title")
    private String title;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "release_year")
    private short releaseYear;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy="games")
    private Set<MediaList> medialists = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "assigned_game_categories",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public Game() {}

    public Game(String apiId, String title, String posterPath, short releaseYear) {
        this.apiId = apiId;
        this.title = title;
        this.posterPath = posterPath;
        this.releaseYear = releaseYear;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setReleaseYear(short releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public short getReleaseYear() {
        return releaseYear;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public String getApiId() {
        return apiId;
    }

    public String getPosterPath() {
        return posterPath;
    }
}