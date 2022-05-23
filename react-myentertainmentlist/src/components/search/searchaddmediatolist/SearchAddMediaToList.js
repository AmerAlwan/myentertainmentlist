import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, Row} from "react-bootstrap";
import './SearchAddMediaToList.css';
import MedialistService from "../../backend/medialist.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {setMediaLists} from "../../../redux/slices/UserSlice";
import * as config from "../../../config.json";
import {search} from "../util";
import MediaService from "../../backend/media.service";

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function SearchAddMediaToList(props) {
    const accessToken = useSelector(state => state.user.accessToken);
    const mediaLists = useSelector(state => state.user.mediaLists);
    const dispatch = useDispatch();

    const onDropdownItemSelect = (eventKey, e) => {
        console.log(eventKey);
        const mediaListId = eventKey.target.id;
        const mediaType = props.type;
        let media = {apiId: props.apiId, title: props.title, posterPath: props.posterPath, playTime: 0, releaseYear: props.releaseYear};
        if (mediaType === 'movie') {
           MediaService.getMovie(props.apiId).then(response => {
               media = {...media, playTime: response.data.runtime};
               MedialistService.addMovie(mediaListId, media, accessToken).then(response => {
                   MedialistService.getLists(accessToken).then(response =>
                       response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                   );
                })
               }
           )

        } else if (mediaType === 'tv') {
            MediaService.getTv(props.apiId).then(response => {
                console.log(response);
                let episode_run_time = response.data.episode_run_time;
                let episode_run_time_avg = (!episode_run_time || episode_run_time.length === 0 ? 0 : (episode_run_time.reduce((acc, curr) => acc + curr) / episode_run_time.length));
                let total_playtime = response.data.number_of_episodes && (episode_run_time_avg * response.data.number_of_episodes)
                media = {...media, playTime: total_playtime};
                MedialistService.addTv(mediaListId, media, accessToken).then(response => {
                    MedialistService.getLists(accessToken).then(response =>
                        response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                    );
                });
            });
          } else if (mediaType === 'game') {
            MediaService.getGame(props.apiId).then(response => {
                media = {...media, playTime: response.data.playtime * 60};
                MedialistService.addGame(mediaListId, media, accessToken).then(response => {
                    MedialistService.getLists(accessToken).then(response =>
                        response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                    );
                });
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
                + Add
            </Dropdown.Item>
            <hr />
        </div>
    ));
    return (
        <>
            <div className="search-add-media-list-dropdown" style={{textAlign: "center"}}>
                <Dropdown onClick={e => e.stopPropagation()}>
                    <Dropdown.Toggle style={{
                        backgroundColor: 'transparent',
                        border: 'none'
                    }}>
                        <FontAwesomeIcon icon={faCirclePlus} style={{
                            height: '20px'
                        }}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mediaListNames}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}