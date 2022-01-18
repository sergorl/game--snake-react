import './App.css';
import React from 'react';
import Field from './Field.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  render() {
    return (
      <Field/>
    );
  }
}


export default App;
