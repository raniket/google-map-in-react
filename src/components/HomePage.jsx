import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {
  state = {}
  render() {
    return (
      <NavLink to="/firstTab">
        <div className="card">
        </div>
      </NavLink>
    );
  }
}

export default HomePage;