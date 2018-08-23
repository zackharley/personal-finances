import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header style={{ display: 'flex' }}>
        <Link to="/">
          <h1>Personal Finances</h1>
        </Link>
        <nav style={{ marginLeft: 'auto' }}>
          <Link to="/transactions">Transactions</Link>
        </nav>
      </header>
    );
  }
}
