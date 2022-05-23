import SearchBar from "../../search/SearchBar";
import React from "react";
import './HomeSearchBar.css';

export function HomeSearchBar(props) {
    return (
        <>
            <h1 className='home-text-shadow' style={{
                fontSize: "calc(4rem + 6vw)",
                position: "fixed",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, calc(-120% - 2.5vh))",
                width: "100%",
                textAlign: "center",
                //textShadow: 'rgb(255, 255, 255) -1px -1px 0px, rgb(255, 255, 255) 1px -1px 0px, rgb(255, 255, 255) -1px 1px 0px, rgb(255, 255, 255) 1px 1px 0px',
                //color: '#e6e6e6'
            }}>
                MyEList
            </h1>
            <h3 className='home-text-shadow' style={{
                fontSize: "calc(1rem + 0.7vw)",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 30%)",
                width: "100%",
                textAlign: "center",
                fontWeight: 'normal',
                //textShadow: 'rgb(255, 255, 255) -1px -1px 0px, rgb(255, 255, 255) 1px -1px 0px, rgb(255, 255, 255) -1px 1px 0px, rgb(255, 255, 255) 1px 1px 0px',
                //color: '#e6e6e6'
            }}>
                Simply Search for any Movie/TV Show/Game!
            </h3>
            <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, 150%)"}}>
                <SearchBar/>
            </div>
        </>
    )
}