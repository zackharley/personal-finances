import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'react-table/react-table.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Dashboard>
          <Route path="/transactions" component={Transactions} />
        </Dashboard>
      </Router>
    );
  }
}

export default App;
