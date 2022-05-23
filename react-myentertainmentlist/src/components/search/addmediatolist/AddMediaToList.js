import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {Dropdown, Row} from "react-bootstrap";
import './AddMediaToList.css';
import MedialistService from "../../backend/medialist.service";
import {setMediaLists} from "../../../redux/slices/UserSlice";
//import {setMediaLists} from "../../../redux/slices/UserSlice";

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function AddMediaToList(props) {
    const accessToken = useSelector(state => state.user.accessToken);
    const mediaLists = useSelector(state => state.user.mediaLists);
    const dispatch = useDispatch();

    const onDropdownItemSelect = (eventKey, e) => {
        console.log(eventKey);
        const mediaListId = eventKey.target.id;
        const mediaType = props.type;
        console.log(props.playTime);
        const media = {apiId: props.apiId, title: props.title, posterPath: props.posterPath, playTime: props.playTime, releaseYear: props.releaseYear};
        if (mediaType === 'movie') {
            MedialistService.addMovie(mediaListId, media, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            });
        } else if (mediaType === 'tv') {
            MedialistService.addTv(mediaListId, media, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            });
        } else if (mediaType === 'game') {
            MedialistService.addGame(mediaListId, media, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            });
        }
    }

    const mediaListNames = mediaLists.map(mediaList => (
        <div key={mediaList.id}>
            <Dropdown.Header>
                <Row>
                    <h6 style={{textAlign: "center"}}>
                        {mediaList.name}
                    </h6>
                </Row>
                <Row>
                    <p style={{textAlign: "center"}}>
                        {"<" + getMedialistType(mediaList.mediaListType) + ">"}
                    </p>
                </Row>
            </Dropdown.Header>
            <Dropdown.Item id={mediaList.id} onSelect={(eventKey, e) => onDropdownItemSelect(e)}>
                + Add to list...
            </Dropdown.Item>
            <hr />
        </div>
    ));
    return (
        <>
            <div className="add-media-list-dropdown" style={{textAlign: "center"}}>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Add to Media List
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mediaListNames}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}