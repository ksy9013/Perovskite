import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CovidDB</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Covid Data by State</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Covid Data by 3 Attributes</Link>
          </li>
          <li className="navbar-item">
          <Link to="/insert_county" className="nav-link">Insert County</Link>
          </li>
          <li className="navbar-item">
          <Link to="/random" className="nav-link">Delete County</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}