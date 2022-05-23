import React, {Component} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import {Circle} from 'react-circle';
import * as config from '../config.json';
import {search} from '../components/search/util.js';
import {MediaListCard} from '../components/mediapage/companies/MediaListCard';
import {Link} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import SearchBar from '../components/search/SearchBar'
import 'react-image-gallery/styles/css/image-gallery.css';
import '../components/mediapage/mediaPage.css';
import NavBar from "../components/navbar/AppNavBar";
import AppNavBar from "../components/navbar/AppNavBar";
import {setIsLoading, setNotLoading} from "../redux/slices/LoadingSlice";
import {connect} from "react-redux";
import {AddMediaToList} from "../components/search/addmediatolist/AddMediaToList";

const cardStyle = {};

class MediaPage extends Component {
    constructor(props) {
        super(props);
        this.handleScrollY = this.handleScrollY.bind(this);
        this.state = {
            title: "",
            images: [],
            production_companies: [],
            production_countries: [],
            spoken_languages: [],
            networks: [],
            genres: [],
            info: [],
            offsetY: 0
        }
    }

    handleScrollY = () => {
        this.setState({offsetY: window.scrollY});
    }


    async setData(id, prevId, type) {
        if (id !== prevId) {
            this.props.toggleLoading();
            let msConfig, title, images, production_companies, production_countries, spoken_languages, networks,
                description, poster_path, genres, vote_average, vote_count, popularity, platforms, stores, developers,
                publishers, tags, release_date, play_time;
            let info = [];
            let imgConfig = config.default.config.links.tmdb.image;
            const [isMovie, isTv, isGame] = [type === "movie", type === "tv", type === "game"]
            if (isMovie || isTv) {
                if (isMovie) {
                    msConfig = config.default.config.links.tmdb.movie;
                } else if (isTv) {
                    msConfig = config.default.config.links.tmdb.tv;
                }

                const results = await search(`${msConfig.link + id + "?" + msConfig.api_key + config.default.config.keys.tmdb}`);
                const imageResults = await search(`${msConfig.link + id + "/" + msConfig.images + msConfig.api_key + config.default.config.keys.tmdb}`);

                if (!results) {
                    this.setState({type: "error"})
                    return;
                }

                const data = results[0].data;
                const imageData = imageResults[0].data;

                images = imageData.backdrops.map(img =>
                    (
                        {
                            original: `${imgConfig.link + imgConfig.size.original + img.file_path}`,
                            originalClass: "customOriginal"
                        }
                    ));

                poster_path = `${imgConfig.link + imgConfig.size.poster.medium + data.poster_path}`;

                //console.log(data);
                //console.log(imageResults);
                //console.log(images);

                title = isMovie ? data.title : data.name;
                description = data.overview;

                genres = data.genres;

                production_companies = data.production_companies;
                production_companies.forEach(company => {
                    company.logo_path = `${imgConfig.link + imgConfig.size.logo.w45 + company.logo_path}`
                });

                production_countries = data.production_countries;
                production_countries.forEach(country => {
                    country.logo_path = `https://www.countryflags.io/${country.iso_3166_1}/flat/32.png`
                });

                spoken_languages = data.spoken_languages;

                info.push({name: "Status: " + data.status});

                vote_average = data.vote_average;
                vote_count = data.vote_count;
                popularity = data.popularity;
                if (isMovie) {
                    info.push({name: "Release Date: " + data.release_date});
                    info.push({name: "Runtime: " + data.runtime + " mins"});
                    info.push({name: "Budget: " + (data.budget != 0 ? "$" + data.budget : "unknown")});
                    info.push({name: "Revenue: " + (data.revenue != 0 ? "$" + data.revenue : "unknown")});
                    release_date = data.release_date;
                    play_time = data.runtime;
                } else if (isTv) {
                    networks = data.networks;
                    networks.forEach(network => {
                        network.logo_path = `${imgConfig.link + imgConfig.size.logo.w45 + network.logo_path}`
                    });

                    let episode_run_time = data.episode_run_time;
                    let episode_run_time_avg = (!episode_run_time || episode_run_time.length === 0 ? 0 : (episode_run_time.reduce((acc, curr) => acc + curr) / episode_run_time.length));
                    let total_playtime = data.number_of_episodes && (episode_run_time_avg * data.number_of_episodes)

                    info.push({name: "First Air Date: " + data.first_air_date || ""});
                    info.push({name: "Last Air Date: " + data.last_air_date || ""});
                    info.push({name: "Avg. Ep. Runtime: " + episode_run_time_avg + "m"});
                    info.push({name: "Total Seasons: " + data.number_of_seasons || 0});
                    info.push({name: "Total Episodes: " + data.number_of_episodes || 0});
                    console.log(data);
                    release_date = data.first_air_date;
                    play_time = total_playtime;
                }

                //  console.table(info);


            } else if (isGame) {
                msConfig = config.default.config.links.rawg.game;
                const results = await search(`${msConfig.link + id + "?" + msConfig.api_key + config.default.config.keys.rawg}`);
                const imageResults = await search(`${msConfig.link + id + "/screenshots" + "?" + msConfig.api_key + config.default.config.keys.rawg}`);

                if (!results) {
                    this.setState({type: "error"})
                    return;
                }

                //console.log(results);
                //console.log(imageResults);

                const data = results[0].data;
                const imageData = imageResults[0].data;

                title = data.name;
                description = data.description_raw;

                images = imageData.results.map(img =>
                    (
                        {
                            original: `${img.image}`,
                            originalClass: "customOriginal"
                        }
                    ));

                poster_path = data.background_image;

                platforms = data.platforms;
                platforms.forEach(platform => {
                    platform.name = platform.platform.name;
                    platform.id = platform.platform.id;
                    platform.logo_path = platform.platform.image_background;
                });

                stores = data.stores;
                stores.forEach(store => {
                    store.name = store.store.name;
                    store.id = store.id;
                    store.logo_path = store.store.image_background;
                });

                developers = data.developers;
                developers.forEach(developer => {
                    developer.logo_path = developer.image_background;
                });

                genres = data.genres;
                genres.forEach(genre => {
                    genre.logo_path = genre.image_background;
                });

                publishers = data.publishers;
                publishers.forEach(publisher => {
                    publisher.logo_path = publisher.image_background;
                });

                tags = data.tags;
                tags.forEach(tag => {
                    tag.logo_path = tag.image_background;
                });

                vote_average = data.rating;
                vote_count = data.ratings_count;

                info.push({name: "Released: " + data.released || ""});
                info.push({name: "Metacritic: " + data.metacritic || ""});
                info.push({name: "Playtime: " + (data.playtime || 0) + "h"});
                info.push({name: "Achievements: " + data.achievements_count || 0});

                release_date = data.released;
                play_time = data.playtime * 60;

                // console.table(info);
            }

            if (release_date) {
                release_date = release_date.split("-")[0];
            }

            console.log(release_date);


            this.setState({
                title: title,
                description: description,
                genres: genres,
                images: images,
                poster_path: poster_path,
                production_companies: production_companies,
                type: type,
                production_countries: production_countries,
                spoken_languages,
                networks: networks,
                info: info,
                vote_average: vote_average,
                vote_count: vote_count,
                popularity: popularity,
                platforms: platforms,
                stores: stores,
                developers: developers,
                publishers: publishers,
                tags: tags,
                release_date: release_date,
                play_time: play_time
            })
            this.props.stopLoading();
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        await this.setData(this.props.match.params.id, prevProps.match.params.id, this.props.match.params.type);
    }

    async componentDidMount() {
        await this.setData(this.props.match.params.id, -1, this.props.match.params.type)
    }

    render() {
        if (this.state.type === 'movie' || this.state.type === 'tv' || this.state.type === 'game') {
            return (
                <>
                    <div style={{overflow: "hidden",
                        backgroundColor: '#837960',
                        backgroundImage: 'linear-gradient(to bottom, transparent, black 700px), url(' + (this.state.images ? this.state.images[0] ? this.state.images[0].original : '' : '') + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'

                    }}>
                        <NavBar showSearchBar showLogin position='relative'/>
                        <Row className="fixRowOutOfScreen justify-content-center"
                             style={{marginTop: "6rem", padding: "1rem"}}>
                            <Image src={this.state.poster_path}
                                   style={{
                                       maxWidth: "60vh",
                                       height: "auto"
                            }}/>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h1 style={{
                                    fontSize: "10vh",
                                    color: "#dbdbdb",
                                    textAlign: "center",
                                    marginTop: this.state.images.length !== 0 ? "0" : "5rem"
                                }}>{this.state.title}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AddMediaToList
                                    apiId={this.props.match.params.id}
                                    title={this.state.title}
                                    releaseYear={this.state.release_date}
                                    type={this.state.type}
                                    posterPath={this.state.poster_path}
                                    playTime={this.state.play_time}
                                />
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: '20px'
                        }}>
                            <Col xs={2} xl={2} />
                            <Col xs={8} xl={8} className="mediaCardBox">
                                <p className="mediaCardTitle">Summary</p>
                                <p style={{
                                    textAlign: "justify",
                                    textAlignLast: "left"
                                }}>{this.state.description}</p>
                            </Col>
                            <Col xs={2} xl={2}></Col>
                        </Row>
                        <Row className="" style={{
                            marginTop: '20px'
                        }}>
                            <Col xs={0} md={1} xl={2} style={{
                                paddingRight: '0 !important'
                            }} />
                            <Col className="" xs={12} md={5} xl={4} style={{
                                paddingLeft: '0 !important'
                            }}>
                                <Row className='justify-content-xl-center justify-content-md-start justify-content-center'>
                                    <MediaListCard title="Info" hasLogo={false} list={this.state.info}
                                               style={cardStyle}/>
                                </Row>
                            </Col>
                            <Col xs={12} md={5} xl={4} style={{maxWidth: '638px', paddingLeft: '0'}}>
                                <Row className="justify-content-center justify-content-xl-center justify-content-md-end">
                                    <Col className="mediaCardBox justify-content-center" xs={6} xl={4}
                                         style={{minHeight: "1rem", marginTop: "1rem", maxWidth: '300px !important', textAlign: 'center'}}>
                                        <p className="mediaCardTitle">Rating</p>
                                        <div style={{marginTop: "0.5rem"}}>
                                            <Circle size="85" progress={Math.round(this.state.vote_average) * 10}/>
                                        </div>
                                        <hr/>
                                        <p className="mediaCardTitle">Vote Count</p>
                                        <p style={{
                                            margin: "0 0.5rem",
                                            marginBottom: "0.5rem"
                                        }}>{this.state.vote_count}</p>
                                        <hr/>
                                        <p className="mediaCardTitle">Popularity</p>
                                        <p style={{margin: "0 0.5rem"}}>{this.state.popularity}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={0} md={1} xl={2}></Col>
                        </Row>

                        <Row className="fixRowOutOfScreen"
                             style={{margin: "2rem 1rem 0 1rem", padding: "1rem"}}>
                            {/* <Col xs={12} xl={4}>
                                <Row>
                                    <Col xs={12}>
                                        <Image src={this.state.poster_path}
                                               style={{maxWidth: "100%", height: "auto"}}/>
                                    </Col>
                                </Row>
                            </Col> */}
                            <Col xs={12} xl={12}>
                                <Row>
                                {(this.state.type === "movie" || this.state.type === "tv") &&
                                    <Col>
                                        <MediaListCard title="Genres" id="genres1" hasLogo={false} list={this.state.genres}
                                               style={cardStyle}/>
                                    </Col>}
                                {(this.state.type === "movie" || this.state.type === "tv") &&
                                    <Col>
                                        <MediaListCard title="Production Companies" id="production_companies" hasLogo
                                               list={this.state.production_companies}/>
                                    </Col>}
                                {(this.state.type === "movie" || this.state.type === "tv") &&
                                    <Col>
                                        <MediaListCard title="Production Countries" id="production_countries" hasLogo
                                               list={this.state.production_countries}
                                               idValue="iso_3166_1" style={cardStyle}/>
                                    </Col>}
                                {(this.state.type === "movie" || this.state.type === "tv") &&
                                    <Col>
                                        <MediaListCard title="Spoken Languages" id="spoken_languages" hasLogo={false}
                                               list={this.state.spoken_languages}
                                               idValue="iso_639_1" nameValue="english_name" style={cardStyle}/>
                                    </Col>}
                                {this.state.type === "tv" &&
                                    <Col>
                                        <MediaListCard title="Networks" id="networks" hasLogo list={this.state.networks}
                                                   style={cardStyle}/>
                                    </Col>}
                                {this.state.type === "game" &&
                                    <Col>
                                        <MediaListCard title="Genres" id="genres2" hasLogo list={this.state.genres}
                                               style={cardStyle}/>
                                    </Col>}
                                {this.state.type === "game" &&
                                    <Col>
                                        <MediaListCard title="Developers" id="developers" hasLogo list={this.state.developers}
                                               style={cardStyle}/>
                                    </Col>}
                                {this.state.type === "game" &&
                                    <Col>
                                        <MediaListCard title="Publishers" id="publishers" hasLogo list={this.state.publishers}
                                               style={cardStyle}/>
                                    </Col>}
                                {this.state.type === "game" &&
                                    <Col>
                                        <MediaListCard title="Tags" id="tags" hasLogo list={this.state.tags} style={cardStyle}/>
                                    </Col>}
                                </Row>
                            </Col>
                        </Row>
                        <Row className="fixRowOutOfScreen justify-content-center">
                            <Col xl={6} xs={12}>
                                <ImageGallery
                                    items={this.state.images}
                                    lazyLoad
                                    autoPlay={false}
                                    disableSwipe
                                    showThumbnails={false}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    showIndex
                                />
                            </Col>
                        </Row>
                        <div style={{
                            height: '100px',
                            backgroundColor: 'transparent'
                        }}>
                        </div>
                    </div>
                </>
            )
        } /* else if (this.state.type === 'game') {
            return (
                <>
                    <div style={{overflow: "hidden"}}>
                        <NavBar showSearchBar showLogin/>
                        <Row className="fixRowOutOfScreen">
                            <Col xl={12} xs={12}>
                                <ImageGallery
                                    items={this.state.images}
                                    lazyLoad
                                    autoPlay
                                    disableSwipe
                                    showThumbnails={false}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <h1 style={{
                                    fontSize: "7rem",
                                    color: "#dbdbdb",
                                    textAlign: "center",
                                    marginTop: this.state.images.length !== 0 ? "0" : "5rem"
                                }}>{this.state.title}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AddMediaToList
                                    apiId={this.props.match.params.id}
                                    title={this.state.title}
                                    releaseYear={this.state.release_date}
                                    type={this.state.type}
                                    posterPath={this.state.poster_path}
                                />
                            </Col>
                        </Row>
                        <Row className="fixRowOutOfScreen mediaCardBox"
                             style={{margin: "2rem 1rem 0 1rem", padding: "1rem"}}>
                            <Col xs={12} xl={4}>
                                <Row>
                                    <Col xs={12}>
                                        <Image src={this.state.poster_path}
                                               style={{width: "100%", height: "auto"}}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} xl={12} className="mediaCardBox" style={{
                                        margin: "0.5rem 0"
                                    }}>
                                        <p className="mediaCardTitle">Summary</p>
                                        <p style={{
                                            textAlign: "justify",
                                            textAlignLast: "center",
                                            color: "grey"
                                        }}>{this.state.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} xl={4}>
                                <Row>
                                    <Col xs={12} xl={8}>
                                        <MediaListCard title="Info" hasLogo={false} list={this.state.info}
                                                       style={cardStyle}/>
                                    </Col>
                                    <Col className="mediaCardBox" xs={6} xl={3}
                                         style={{minHeight: "1rem", marginTop: "1rem"}}>
                                        <p className="mediaCardTitle">Rating</p>
                                        <div style={{marginTop: "0.5rem"}}>
                                            <Circle size="85"
                                                    progress={Math.round(((this.state.vote_average / 5) * 100) * 10) / 10}/>
                                        </div>
                                        <hr/>
                                        <p className="mediaCardTitle">Vote Count</p>
                                        <p style={{
                                            margin: "0 0.5rem",
                                            marginBottom: "0.5rem"
                                        }}>{this.state.vote_count}</p>
                                    </Col>
                                    <Col xl={1}></Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <MediaListCard title="Stores" id="stores" hasLogo list={this.state.stores}
                                                       style={cardStyle}/>
                                        <MediaListCard title="Platforms" hasLogo list={this.state.platforms}
                                                       style={{margin: "0 auto"}}/>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={12} xl={4}>
                                <MediaListCard title="Genres" id="genres2" hasLogo list={this.state.genres}
                                               style={cardStyle}/>
                                <MediaListCard title="Developers" id="developers" hasLogo list={this.state.developers}
                                               style={cardStyle}/>
                                <MediaListCard title="Publishers" id="publishers" hasLogo list={this.state.publishers}
                                               style={cardStyle}/>
                                <MediaListCard title="Tags" id="tags" hasLogo list={this.state.tags} style={cardStyle}/>
                            </Col>
                        </Row>
                    </div>
                </>
            )
        } */ else if (this.state.type === "error") {
            return (<><h1>Not Found!</h1></>)
        } else {
            return (<></>)
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleLoading: loading => dispatch(setIsLoading()),
        stopLoading: loading => dispatch(setNotLoading())
    }
}

export default connect(null, mapDispatchToProps)(MediaPage);