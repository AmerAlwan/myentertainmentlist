import React, {Component} from 'react';
import SearchBar from '../components/search/SearchBar'
import { Row, Col } from 'react-bootstrap';
import NavBar from "../components/navbar/AppNavBar";
import {UserInfo} from "../components/profilepage/userinfo/UserInfo";
import * as config from "../config.json";
import {search} from '../components/search/util';
import Gallery from 'react-grid-gallery';
import './Home.css';
import {HomeSearchBar} from "../components/home/homesearchbar/HomeSearchBar";
import {HomeGallery} from "../components/home/homegallery/HomeGallery";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.style.overflowY = 'hidden';
        document.body.style.backgroundColor = 'black !important';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
        document.body.style.backgroundColor = 'rgb(21, 30, 44) !important';
    }

    render() {
    return (
    <>
        <NavBar showLogin position='fixed'/>
        <HomeGallery />
        <HomeSearchBar />
    </>
    )
  }
}

export default Home;
