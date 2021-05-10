import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
    <div className="navbar">
      <ul className="navbar-buttons">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/search'>Search</Link></li>
      </ul>
    </div>
  )
  }

}

export default NavBar;
