import React from 'react';
import Routes from './Routes';
import NavBar from './components/navbar/AppNavBar'
import {Spinner} from "react-bootstrap";
import {useSelector} from "react-redux";

function App() {

    document.body.style.backgroundColor = "#212529";
    document.body.style.color = "grey";

  return (

      <div>
        <Routes/>
      </div>
  );

}

export default App;
