import React, { Component } from 'react';

import Layout from './component/layout';
import Thanks from './component/thanks'
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class App extends Component {
  render(){
    return(
      <Router>
        <Route exact path='/' component={Layout}/>
        <Route exact path='/thanks' component={Thanks}/>
      </Router>
    )
  }
}

export default App;
