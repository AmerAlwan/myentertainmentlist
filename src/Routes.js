import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MediaPage from './pages/MediaPage';

const routes = function Routes() {
  return (

    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/search' component={Search}/>
      <Route path='/media/:type/:id' component={MediaPage}/>
    </Switch>

  )
}

export default routes;
