import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown, Row} from "react-bootstrap";
import './SearchAddMediaToList.css';
import MedialistService from "../../backend/medialist.service";

const getMedialistType = type => (type === 'MEDIA_MOVIE' && 'movie') || (type === 'MEDIA_TV' && 'tv') || (type === 'MEDIA_GAME' && 'game') || 'all';

export function SearchAddMediaToList(props) {
    const accessToken = useSelector(state => state.user.accessToken);
    const [mediaLists, setMediaLists] = useState([]);

    useEffect(() => MedialistService.getLists(accessToken).then(response => {
        if (response.status === 200) setMediaLists(response.data.slice().sort((cML, pML) => cML.name.localeCompare(pML.name)));
    }), []);

    const onDropdownItemSelect = (eventKey, e) => {
        console.log(eventKey);
        const mediaListId = eventKey.target.id;
        const mediaType = props.type;
        const media = {apiId: props.apiId, title: props.title, posterPath: props.posterPath, releaseYear: props.releaseYear};
        if (mediaType === 'movie') {
            MedialistService.addMovie(mediaListId, media, accessToken).then(response => {
            });
        } else if (mediaType === 'tv') {
            MedialistService.addTv(mediaListId, media, accessToken).then(response => {
            });
        } else if (mediaType === 'game') {
            MedialistService.addGame(mediaListId, media, accessToken).then(response => {
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
                    <Dropdown.Toggle variant="info" style={{
                        padding: '3px 20px 8px 10px'
                    }}>
                        +
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mediaListNames}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}