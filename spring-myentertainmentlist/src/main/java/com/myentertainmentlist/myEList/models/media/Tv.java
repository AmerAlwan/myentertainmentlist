package com.myentertainmentlist.myEList.models.media;

import com.myentertainmentlist.myEList.models.medialist.MediaList;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tv")
public class Tv {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "api_id", unique = true)
    private String apiId;

    @Column(name = "title")
    private String title;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "play_time")
    private int playTime;

    @Column(name = "release_year")
    private short releaseYear;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy="tvs")
    private Set<MediaList> medialists = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "assigned_tv_categories",
            joinColumns = @JoinColumn(name = "tv_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public Tv() {}

    public Tv(String apiId, String title, String posterPath, int playTime, short releaseYear) {
        this.apiId = apiId;
        this.title = title;
        this.releaseYear = releaseYear;
        this.playTime = playTime;
        this.posterPath = posterPath;
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

    public void setPlayTime(int playTime) {
        this.playTime = playTime;
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

    public int getPlayTime() {
        return playTime;
    }
}