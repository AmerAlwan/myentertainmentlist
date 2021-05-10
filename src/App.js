import React, {Component} from 'react';
import Routes from './Routes';
import NavBar from './components/navbar/NavBar'
import SearchBar from './components/search/SearchBar';


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
