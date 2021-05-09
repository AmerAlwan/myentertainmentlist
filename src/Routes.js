import React from 'react';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/search' component={Search}/>
      </Switch>
  </BrowserRouter>
)
}
