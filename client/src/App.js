import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Documentation from './Documentation';
import GC from './GC';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Realizacja zadania nr2 w ramach laboratorium TCh <br/>
          Sebastian Gawron <br/>
          <Link to="/gc" className="link">Kalkulator ciagu geometrycznego</Link>
          <Link to="/documentation" className="link">Dokumentacja</Link>
          <Link to="/" className="link">Powrot na strone glowna</Link>
        </header>
        <div>
          <Route path="/gc" component={GC} />
          <Route path="/documentation" component={Documentation} />
        </div>
      </div>
    </Router>
  );
}

export default App;
