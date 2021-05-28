import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { search } from '../components/search/util.js';
import * as config from '../config.json';
import {Link} from 'react-router-dom';

class MediaPage extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        let msConfig = null;
        console.log(this.props);
        let type = this.props.match.params.type;
      //  console.log(type);
        if(type === "movie") {
            msConfig = config.default.config.links.tmdb.movie;
        } else if(type === "tv") {
            msConfig = config.default.config.links.tmdb.tv;
        }
        let id = this.props.match.params.id;
        const results = await search(`${msConfig.link + id + "?" + msConfig.api_key + config.default.config.keys.tmdb}`);
        const data = results[0].data;
        console.log(data);
    }

    render() {
        return (<></>)
    }


}

export default MediaPage;