import React, {Component} from 'react';
import {Route, Link, BrowserRouter, Switch} from 'react-router-dom';

function SearchBar() {

  return (

      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/search'>Search</Link></li>
        </ul>
      </div>
  );

}

export default SearchBar;
