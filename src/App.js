import React, {Component} from 'react';
import Routes from './Routes';
import NavBar from './components/navbar/NavBar'
import SearchBar from './components/search/SearchBar';
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';

function App() {

  return (

      <div>
        <NavBar/>
        <Routes/>
      </div>
  );

}

export default App;
