import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Perovskite DB</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/display_emp" className="nav-link">Diplay an Employee Info</Link>
          </li>        
          <li className="navbar-item">
          <Link to="/insert_emp" className="nav-link">Add an Employee Info</Link>
          </li>
          <li className="navbar-item">
          <Link to="/update_emp" className="nav-link">Update an Employee Info</Link>
          </li>
          <li className="navbar-item">
          <Link to="/delete_emp" className="nav-link">Delete an Employee Info</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}