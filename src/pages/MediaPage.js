import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
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
            let msConfig, title, images, production_companies, production_countries, spoken_languages, networks;
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

                console.log(data);
                console.log(imageResults);
                console.log(images);

                title = isMovie ? data.title : data.name;

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

            this.setState({title: title, images: images, production_companies: production_companies, type: type, production_countries: production_countries, spoken_languages, networks: networks})
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
                <Col xs={12}>
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
              <Row className="fixRowOutOfScreen">
                 <Col xs={12} style={{textAlign: "center"}}>
                     <span style={{fontSize:"calc(1rem + 6vw)", color:"#dbdbdb"}}>{this.state.title}</span>
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