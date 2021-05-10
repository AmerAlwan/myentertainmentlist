import React, {Component} from 'react';
import Routes from './Routes';
import NavBar from './components/navbar/NavBar'
import SearchBar from './components/search/SearchBar';
<<<<<<< HEAD

=======
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';
>>>>>>> routes-seperate-files

function App() {

  return (

      <div>
        <NavBar/>
        <SearchBar/>
        <Routes/>
      </div>
  );

}

export default App;
