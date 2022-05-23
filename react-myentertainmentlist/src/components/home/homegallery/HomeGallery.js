import Gallery from "react-grid-gallery";
import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import * as config from "../../../config.json";
import {search} from "../../search/util";
import './HomeGallery.css';

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

export function HomeGallery(props) {
    const [images, setImages] = useState([]);
    const [windowResize, setWindowResize] = useState(false);
    const updateTiles = () => {
        let ogX = -100, ogY = -400, posX = ogX, posY = ogY, ogTranslateY = 61, numOfRows = 1;
        let translateX = 265, translateY = ogTranslateY, tileHeight = 175;
        document.querySelectorAll(".ReactGridGallery_tile").forEach((tile, i) => {
            tile.style.display = 'initial';
            tile.style.transform = 'scaleX(1) scaleY(1) scaleZ(1) rotateX(-3deg) rotateY(-34deg) rotateZ(16deg) translateX(0px) translateY(0px) translateZ(0px) skewX(-14deg) skewY(-7deg)';
            tile.style.left = posX + 'px';
            tile.style.top = posY + 'px';
            posX += translateX;
            posY += translateY;
            if (posX > window.innerWidth) {
                posX = ogX;
                posY = tileHeight * numOfRows + ogY;
                translateY = ogTranslateY;
                numOfRows++;
            }
            if (posY > window.innerHeight + 200) {
                tile.style.display = 'none';
            }
        });
    }


    useLayoutEffect(() => {
        waitForElm(".ReactGridGallery_tile").then((elm) => {
            updateTiles();
        });
        window.addEventListener('resize', updateTiles);
        return () => window.removeEventListener('resize', updateTiles);
    }, []);

    const formatDate = date => date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 9 ? '0' : '') + date.getDate();
    const getFirstDate = date => (date.getMonth() <= 2 ? date.getFullYear() - 1 : date.getFullYear()) + '-' + (date.getMonth() < 9 ? '0' : '') + ((date.getMonth() <= 2 ? 11 - date.getMonth() : (date.getMonth() - 3)) + 1) + '-01';
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const getImages = useCallback(async() => {
        const cConfig = config.default.config.links.tmdb;
        const gConfig = config.default.config.links.rawg;

        const currDate = new Date();

        const fromDate = getFirstDate(currDate);
        const toDate = formatDate(currDate);

        const movieImagesResults = await search(`${cConfig.discovermovie.link + cConfig.discovermovie.api_key + config.default.config.keys.tmdb + cConfig.discovermovie.query + '&page=' + Math.floor((Math.random() * 5) + 1)}`);
        const movieImagesResults2 = await search(`${cConfig.discovermovie.link + cConfig.discovermovie.api_key + config.default.config.keys.tmdb + cConfig.discovermovie.query + '&page=' + Math.floor(5 + (Math.random() * 5) + 1)}`);

        const tvImagesResults = await search(`${cConfig.discovertv.link + cConfig.discovertv.api_key + config.default.config.keys.tmdb + cConfig.discovertv.query + '&page=' + Math.floor((Math.random() * 5) + 1)}`);
        const tvImagesResults2 = await search(`${cConfig.discovertv.link + cConfig.discovertv.api_key + config.default.config.keys.tmdb + cConfig.discovertv.query + '&page=' + Math.floor(5 + (Math.random() * 5) + 1)}`);

        const gameImagesResults = await search(`${gConfig.list.link + 'key=' + config.default.config.keys.rawg + '&dates=' + fromDate + ',' + toDate + '&page=' + Math.floor((Math.random() * 5) + 1)}`);
        const gameImagesResults2 = await search(`${gConfig.list.link + 'key=' + config.default.config.keys.rawg + '&dates=' + fromDate + ',' + toDate + '&page=' + Math.floor(5 + (Math.random() * 5) + 1)}`);

        if (!movieImagesResults  || ! movieImagesResults2 || !tvImagesResults || !tvImagesResults2 || !gameImagesResults || !gameImagesResults2) return;
        const movieImagesData = movieImagesResults[0].data.results.concat(movieImagesResults2[0].data.results);

        const tvImagesData = tvImagesResults[0].data.results.concat(tvImagesResults2[0].data.results);

        const gameImagesData = gameImagesResults[0].data.results.concat(gameImagesResults2[0].data.results);

        const movieImagesProps = movieImagesData.filter(movie =>movie.backdrop_path).map((movie, i) => ({
            src: `${cConfig.image.link + '/w300/' + movie.backdrop_path}`,
            thumbnail: `${cConfig.image.link + '/w300/' + movie.backdrop_path}`,
            thumbnailWidth: 300,
            thumbnailHeight: 169
        }));

        const tvImagesProps = tvImagesData.filter(tv => tv.backdrop_path).map((tv, i) => ({
            src: `${cConfig.image.link + '/w300/' + tv.backdrop_path}`,
            thumbnail: `${cConfig.image.link + '/w300/' + tv.backdrop_path}`,
            thumbnailWidth: 300,
            thumbnailHeight: 169
        }));

        const gameImagesProps = gameImagesData.filter(game => game.background_image).map((game, i) => ({
            src: game.background_image,
            thumbnail: game.background_image,
            thumbnailWidth: 300,
            thumbnailHeight: 169
        }));

        let movieIndexes = shuffleArray(Array.from(Array(movieImagesProps.length).keys()));
        let tvIndexes = shuffleArray(Array.from(Array(tvImagesProps.length).keys()));
        let gameIndexes = shuffleArray(Array.from(Array(gameImagesProps.length).keys()));

        const imageProps = shuffleArray(
            movieIndexes
                .slice(0,25)
                .map(i => movieImagesProps[i])
            .concat(tvIndexes
                .slice(0,25)
                .map(i => tvImagesProps[i])
            )
            .concat(gameIndexes
                .slice(0,10)
                .map(i => gameImagesProps[i])
            )
        );

        console.log(imageProps);

        setImages(imageProps);
    }, []);

    useEffect(() => {
        getImages()
    }, [getImages]);

    return (
        <>
            <div className='gallery-gradient' />
            <div className='gallery-container' style={{
                display: "block",
                minHeight: "1px",
                width: "100%",
                overflow: "hidden",
                position: 'absolute',
                cursor: 'none',
                zIndex: '-2',
                top: '-30%',
                left: '-30%'
            }}>
                {images.map((image, i) => {
                    return (
                    <img key={i}
                        className='ReactGridGallery_tile'
                        src={image.thumbnail}
                        style={{
                            width: image.thumbnailWidth,
                            height: image.thumbnailHeight,
                            position: 'fixed',
                            zIndex: 2000
                        }}
                    />
                    )
                })}
            </div>
        </>
    )
}
