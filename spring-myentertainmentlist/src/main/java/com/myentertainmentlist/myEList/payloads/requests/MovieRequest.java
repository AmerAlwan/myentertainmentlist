package com.myentertainmentlist.myEList.payloads.requests;

import javax.validation.constraints.NotBlank;

public class MovieRequest {
    @NotBlank
    private String apiId;

    @NotBlank
    private String title;

    private String posterPath;

    private short releaseYear;

    public  MovieRequest() {}

    public MovieRequest(String apiId, String title, String posterPath, short releaseYear) {
        this.apiId = apiId;
        this.title = title;
        this.posterPath = posterPath;
        this.releaseYear = releaseYear;
    }

    public void setApiId(String apiId) {
        this.apiId = apiId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setReleaseYear(short releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getApiId() {
        return apiId;
    }

    public String getTitle() {
        return title;
    }

    public short getReleaseYear() {
        return releaseYear;
    }

    public String getPosterPath() {
        return posterPath;
    }
}
