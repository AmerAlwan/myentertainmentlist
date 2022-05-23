import {Col, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import './MediaContainer.css';
import {MediaCard} from "./mediacard/MediaCard";
import MedialistService from "../../../backend/medialist.service";
import {useDispatch, useSelector} from "react-redux";
import {setMediaLists} from "../../../../redux/slices/UserSlice";

export function MediaContainer(props) {
    const [mediaList, setMediaList] = useState(props.mediaList);

    const mediaContainerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => mediaContainerRef.current.scrollIntoView({behavior: 'smooth', block: 'start'}), 100)
    });

    useEffect(() => {
        setMediaList(props.mediaList);
    }, [props.mediaList]);

    const accessToken = useSelector(state => state.user.accessToken);

    const dispatch = useDispatch();

    const isSmall = window.innerWidth <= 428;
    const isMedium = window.innerWidth > 428 && window.innerWidth <= 768;

    const deleteMedia = (media, type) => {
        console.log("DELETE")
        if (type === 'movie') {
            MedialistService.deleteMovieFromList(mediaList.id, media.id, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            })
        }

        if (type === 'tv') {
            MedialistService.deleteTvFromList(mediaList.id, media.id, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            })
        }

        if (type === 'game') {
            MedialistService.deleteGameFromList(mediaList.id, media.id, accessToken).then(response => {
                MedialistService.getLists(accessToken).then(response =>
                    response && response.status === 200 && response.data && dispatch((setMediaLists(response.data)))
                );
            })
        }
    }

    const numRows = Math.ceil((mediaList.movies.length + mediaList.tvs.length + mediaList.games.length) / (isMedium ? 2 : 4));
    let mediaComponents = [];

    let _mediaList = {...mediaList};

    const allMedias = _mediaList.movies
        .map(movie => {
            movie = {...movie, type: 'movie'};
            return movie;
        })
        .concat(_mediaList.tvs
            .map(tv => {
                tv = {...tv, type: 'tv'};
                return tv;
            })
            .concat(_mediaList.games
                .map(game => {
                    game = {...game, type: 'game'}
                    return game;
                })))
        .sort((cM, pM) => cM.title && cM.title.localeCompare(pM.title));


    allMedias.map(media => (
        mediaComponents.push(<MediaCard deleteMedia={deleteMedia} media={media} type={media.type} />)
    ))

    const mediaRows = [];
    for (let i = 0; i < numRows; i++) {
        mediaRows.push((
           <div key={i}>
               <Row className='justify-content-center'>
                   {(isMedium ? [0,1] : [0, 1, 2, 3]).map(col => (
                       <Col xs={12} md={6} xl={3} key={col}>
                           {mediaComponents[(i * (isMedium ? 2 : 4)) + col]}
                       </Col>
                   ))}
               </Row>
           </div>
        ));
    }

    const mediaContainerTitle = `${mediaList.name}  ${allMedias.length !== 0 ? `(${allMedias.length})` : ''}`;

    return (
        <Row className="media-container">
            <Col>
                <div className="media-inner" ref={mediaContainerRef}>
                    <h2 style={{
                        color: 'white'
                    }}>
                        {mediaContainerTitle}
                    </h2>
                    {mediaRows}
                </div>
            </Col>
        </Row>
    )
}