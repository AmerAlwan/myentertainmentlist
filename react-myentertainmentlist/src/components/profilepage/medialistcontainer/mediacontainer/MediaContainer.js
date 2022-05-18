import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './MediaContainer.css';
import {MediaCard} from "./mediacard/MediaCard";
import MedialistService from "../../../backend/medialist.service";
import {useSelector} from "react-redux";

export function MediaContainer(props) {
    const [mediaList, setMediaList] = useState(props.mediaList);

    useEffect(() => {
        setMediaList(props.mediaList);
    }, [props.mediaList]);

    const accessToken = useSelector(state => state.user.accessToken);

    const deleteMedia = (media, type) => {
        console.log("DELETE")
        if (type === 'movie') {
            MedialistService.deleteMovieFromList(mediaList.id, media.id, accessToken).then(response => {
                console.log(response);
                props.setResetMediaList(true);
            })
        }

        if (type === 'tv') {
            MedialistService.deleteTvFromList(mediaList.id, media.id, accessToken).then(response => {
                console.log(response);
                props.setResetMediaList(true);
            })
        }

        if (type === 'game') {
            MedialistService.deleteGameFromList(mediaList.id, media.id, accessToken).then(response => {
                console.log(response);
                props.setResetMediaList(true);
            })
        }
    }

    const numRows = Math.ceil((mediaList.movies.length + mediaList.tvs.length + mediaList.games.length) / 6);
    let mediaComponents = [];
    mediaList.movies.map(movie => (
        mediaComponents.push(<MediaCard deleteMedia={deleteMedia} media={movie} type="movie" />)
    ));

    mediaList.tvs.map(tv => (
        mediaComponents.push(<MediaCard deleteMedia={deleteMedia} media={tv} type="tv" />)
    ));

    mediaList.games.map(game => (
        mediaComponents.push(<MediaCard deleteMedia={deleteMedia} media={game} type="game" />)
    ));



    const mediaRows = [];
    for (let i = 0; i < numRows; i++) {
        mediaRows.push((
           <div key={i}>
               <Row>
                   {[0, 1, 2, 3, 4, 5].map(col => (
                       <Col key={col}>
                           {mediaComponents[(i * 6) + col]}
                       </Col>
                   ))}
               </Row>
           </div>
        ));
    }

    return (
        <Row className="media-container">
            <Col>
                <div className="media-inner">
                    <h1>{mediaList.name}</h1>
                    {mediaRows}
                </div>
            </Col>
        </Row>
    )
}