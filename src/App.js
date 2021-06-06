import React from 'react';
import Routes from './Routes';
import NavBar from './components/navbar/NavBar'

function App() {

    document.body.style.backgroundColor = "#212529";
    document.body.style.color = "grey";

  return (

      <div>
        <NavBar/>
        <Routes/>
      </div>
  );

}

export default App;
