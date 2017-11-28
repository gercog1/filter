import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class App extends React.Component {

    render() {
        return(
       <div>
           <h1 className="chooseOption">CHOOSE OPTION :</h1>
           <Link className="link" to="/100">LINK TO 100</Link>
           <Link className="link" to="/1000">LINK TO 1000</Link>
           <Link className="link" to="/10000">LINK TO 10000</Link>
       </div>
        )
    }
}

export default App;
