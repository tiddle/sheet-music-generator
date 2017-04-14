import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SheetMusic from './SheetMusic/SheetMusic.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Sheet Music Generator</h1>
          <p>Creates a 4 bar phrase in the key of C. In 6 variations of the same progression</p>
          <SheetMusic />
      </div>
    );
  }
}

export default App;