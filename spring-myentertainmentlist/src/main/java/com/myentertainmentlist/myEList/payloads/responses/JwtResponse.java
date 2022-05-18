package com.myentertainmentlist.myEList.payloads.responses;

import com.myentertainmentlist.myEList.models.medialist.MediaList;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private List<String> roles;
    private List<MediaList> mediaLists;

    public JwtResponse(String accessToken, Long id, String username, List<String> roles, List<MediaList> mediaLists) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.mediaLists = mediaLists;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public List<MediaList> getMediaLists() {
        return mediaLists;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setLists(List<MediaList> mediaLists) {
        this.mediaLists = mediaLists;
    }
}