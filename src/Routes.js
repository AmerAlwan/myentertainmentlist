import React from 'react';
import {Route, NavLink, BrowserRouter, Switch} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Search from './pages/Search';

function Routes() {
  return (

    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/search' component={Search}/>
    </Switch>

  )
}

export default Routes;
