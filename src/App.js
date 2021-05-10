import React, {Component} from 'react';
import Routes from './Routes';
import SearchBar from './components/search/SearchBar';
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';

function App() {

  return (

      <div>
        <SearchBar/>
        <Routes/>
      </div>
  );

}

export default App;
