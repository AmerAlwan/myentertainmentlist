import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { search } from '../components/search/util.js';
import * as config from '../config.json';
import {Link} from 'react-router-dom';

class MediaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        }
    }

     static async getDerivedStateFromProps(props, prevState) {
        console.log("New componenet")
        let msConfig = null;
        console.log(props);
        let type = props.match.params.type;
      //  console.log(type);
        if(type === "movie") {
            msConfig = config.default.config.links.tmdb.movie;
        } else if(type === "tv") {
            msConfig = config.default.config.links.tmdb.tv;
        }
        let id = props.match.params.id;
        const results = await search(`${msConfig.link + id + "?" + msConfig.api_key + config.default.config.keys.tmdb}`);
        const data = results[0].data;
        console.log(data);
        return ({title: type === "movie" ?  data.title : data.name})
    }

    render() {
        return (<>{this.state.title}</>)
    }


}

export default MediaPage;