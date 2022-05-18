package com.myentertainmentlist.myEList.payloads.requests;

import com.myentertainmentlist.myEList.enums.MediaListType;

import javax.validation.constraints.NotBlank;

public class MediaListRequest {
    @NotBlank
    private String name;

    private String description;

    private MediaListType mediaListType = MediaListType.MEDIA_ALL;

    private boolean isPrivate = false;

    public MediaListRequest() {

    }

    public MediaListRequest(String name, String description, MediaListType mediaListType, boolean isPrivate) {
        this.name = name;
        this.description = description;
        this.mediaListType = mediaListType;
        this.isPrivate = isPrivate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMediaListType(MediaListType mediaListType) {
        this.mediaListType = mediaListType;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public MediaListType getMediaListType() {
        return mediaListType;
    }

    public boolean getIsPrivate() {
        return isPrivate;
    }
}
