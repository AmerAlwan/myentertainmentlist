import React, {Component} from 'react';
import SearchBar from '../components/search/SearchBar'
import { Row, Col } from 'react-bootstrap';
import NavBar from "../components/navbar/NavBar";

class Home extends Component {
  render() {
    return (

    <>
        <NavBar/>
        <h1 style={{fontSize: "calc(4rem + 6vw)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -150%)", width: "100%", textAlign: "center"}}>MyEList</h1>
        <h3 style={{fontSize: "calc(1.1rem + 0.7vw)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -200%)", width: "100%", textAlign: "center"}}>Simply Search for any Movie/TV Show/Game!</h3>
        <div style={{width: "calc(300px + 25vw)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)"}}>
            <SearchBar/>
        </div>

        </>
    )
  }
}

export default Home;
