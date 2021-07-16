import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import * as config from '../config.json';
import { search } from '../components/search/util.js';
import MediaListCard from '../components/mediapage/companies/MediaListCard'
import {Link} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../components/mediapage/mediaPage.css';

class MediaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            images: [],
            production_companies: [],
            production_countries: [],
            spoken_languages: [],
            networks: []
        }
    }

    async setData(id, prevId, type) {
        if (id !== prevId) {
            let msConfig, title, images, production_companies, production_countries, spoken_languages, networks, description, poster_path;
            let imgConfig = config.default.config.links.tmdb.image;
            const [isMovie, isTv, isGame] = [type === "movie", type === "tv", type === "game"]
            if(isMovie || isTv) {
                if(isMovie) {
                    msConfig = config.default.config.links.tmdb.movie;
                } else if(isTv) {
                    msConfig = config.default.config.links.tmdb.tv;
                }

                const results = await search(`${msConfig.link + id + "?" + msConfig.api_key + config.default.config.keys.tmdb}`);
                const imageResults = await search(`${msConfig.link + id + "/" + msConfig.images + msConfig.api_key + config.default.config.keys.tmdb}`);

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

                console.log(data);
                console.log(imageResults);
                console.log(images);

                title = isMovie ? data.title : data.name;
                description = data.overview;

                production_companies = data.production_companies;
                production_companies.forEach(company => {company.logo_path = `${imgConfig.link + imgConfig.size.logo.w45 + company.logo_path}`});

                production_countries = data.production_countries;
                production_countries.forEach(country => {country.logo_path = `https://www.countryflags.io/${country.iso_3166_1}/flat/32.png`});

                spoken_languages = data.spoken_languages;

                if(isTv) {
                    networks = data.networks;
                    networks.forEach(network => {network.logo_path = `${imgConfig.link + imgConfig.size.logo.w45 + network.logo_path}`});
                }


            } else if(isGame) {

            }

            this.setState({title: title, description: description, images: images, poster_path: poster_path, production_companies: production_companies, type: type, production_countries: production_countries, spoken_languages, networks: networks})
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        await this.setData(this.props.match.params.id, prevProps.match.params.id, this.props.match.params.type);
    }

    async componentDidMount() {
        await this.setData(this.props.match.params.id, -1, this.props.match.params.type);
    }

    render() {
        return (
        <>
             <Row className="fixRowOutOfScreen">
                <Col xl={12} xs={12}>
                    <ImageGallery
                        items={ this.state.images }
                        lazyLoad

                        disableSwipe
                        showThumbnails={ false }
                        showFullscreenButton={ false }
                        showPlayButton = { false }
                    />
                </Col>
             </Row>
              <Row className="fixRowOutOfScreen mediaCardBox" style={{margin: "0.5rem"}}>
                 <Col xs={12} xl={4}>
                    <Row>
                        <Col xs={12}>
                            <Image src={this.state.poster_path} style={{width: "calc(15rem + 6vw)", height: "auto"}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <span style={{fontSize:"calc(1rem + 1vw)", color:"#dbdbdb", textAlign: "center"}}>{this.state.title}</span>
                        </Col>
                    </Row>
                 </Col>
                 <Col xs={12} xl={4}>
                     {this.state.description}
                </Col>
                 <Col xs={4}>
                     <MediaListCard title="Production Companies" hasLogo list={this.state.production_companies} />
                     <MediaListCard title="Production Countries" hasLogo list={this.state.production_countries} idValue="iso_3166_1" />
                     <MediaListCard title="Spoken Languages" hasLogo={false} list={this.state.spoken_languages} idValue="iso_639_1" nameValue="english_name" />
                     {this.state.type === "tv" ? <MediaListCard title="Networks" hasLogo list={this.state.networks} /> : ""}
                 </Col>
              </Row>
        </>
        )
    }


}

export default MediaPage;