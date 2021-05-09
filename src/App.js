import React, {Component} from 'react';
import Routes from './Routes';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes/>
      <div className="App">
        <ul className='header'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/search'>Search</NavLink></li>
        </ul>
        <div className="content">
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
