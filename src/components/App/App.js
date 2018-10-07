import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Carousel duration={1000}></Carousel>
      </div>
    );
  }
}

export default App;
