import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Form, Row, Col, Card, Image} from "react-bootstrap";
import './UserInfo.css';
import {search} from "../../search/util";
import * as config from "../../../config.json";

export function UserInfo(props) {

    const [bgImage, setBgImage] = useState('');
    const user = useSelector(state => state.user);
    const mediaLists = useSelector(state => state.user.mediaLists);

    let numMovies = 0, numTvs = 0, numGames = 0, numMedia = 0, uniqueMovies = [], uniqueTvs = [], uniqueGames = [];

    if (mediaLists) {
        console.log(mediaLists);
        mediaLists.forEach(mediaList => {
            mediaList.movies.forEach(movie => {
                if (!uniqueMovies.includes(movie.id)) uniqueMovies.push(movie.id);
            });
            mediaList.tvs.forEach(tv => {
                if (!uniqueTvs.includes(tv.id)) uniqueTvs.push(tv.id);
            });
            mediaList.games.forEach(game => {
                if (!uniqueGames.includes(game.id)) uniqueGames.push(game.id);
            });
        });
    }

    const getBgImage = useCallback(async () => {
        const cConfig = config.default.config.links.tmdb;
        const movieImagesResults = await search(`${cConfig.discovermovie.link + cConfig.discovermovie.api_key + config.default.config.keys.tmdb + cConfig.discovermovie.query + '&page=' + Math.floor((Math.random() * 5) + 1)}`);
        const movieImagesData = movieImagesResults[0].data.results;
        const randMovie = movieImagesData[Math.floor(Math.random() * movieImagesResults.length)]
        console.log(randMovie);
        setBgImage(`${cConfig.image.link + '/original/' + randMovie.backdrop_path}`);
    }, []);

    useEffect(getBgImage, []);

    numMovies = uniqueMovies.length;
    numTvs = uniqueTvs.length;
    numGames = uniqueGames.length;

    numMedia = numMovies + numTvs + numGames;

    return (
        <>
            <Row className='align-items-center' style={{height: '80vh'}}>
                <div className='user-profile-image-gradient'></div>
                <div className='user-profile-image-container' style={{backgroundImage: 'url(' + bgImage + ')'}}>
                </div>
                <Col xs={2}>
                    <Image className='user-profile-picture' src={require('../../../images/default_profile.png').default} />
                </Col>
                <Col xs={10}>
                    <Row className='user-profile-name'>
                        {user.username}
                    </Row>
                    <Row>
                        <Col xs={12} ml={6} xl={4}>
                            <Row>
                                <Col xs={3}>
                                    <Row>
                                        <p className='user-media-num-title'>
                                            {'Media'}
                                        </p>
                                        <p className='user-media-num-value'>
                                            {numMedia}
                                        </p>
                                    </Row>
                                </Col>
                                <Col xs={3}>
                                    <p className='user-media-num-title'>
                                        {'Movies'}
                                    </p>
                                    <p className='user-media-num-value'>
                                        {numMovies}
                                    </p>
                                </Col>
                                <Col xs={3}>
                                    <p className='user-media-num-title'>
                                        {'Tvs'}
                                    </p>
                                    <p className='user-media-num-value'>
                                        {numTvs}
                                    </p>
                                </Col>
                                <Col xs={3}>
                                    <p className='user-media-num-title'>
                                        {'Games'}
                                    </p>
                                    <p className='user-media-num-value'>
                                        {numGames}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}