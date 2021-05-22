import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

const routes = function Routes() {
  return (

    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/search' component={Search}/>
    </Switch>

  )
}

export default routes;
