import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import InsertEmp from "./components/insert_emp"
import DeleteEmp from "./components/delete_emp"
import UpdateEmp from "./components/update_emp"
import DisplayEmp from "./components/display_emp"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/insert_emp" exact component={InsertEmp} />
          <Route path="/delete_emp" exact component={DeleteEmp} /> 
          <Route path="/update_emp" exact component={UpdateEmp} />
          <Route path="/display_emp" exact component={DisplayEmp} /> 
        </div>
      </Router>
    );
  }
}

export default App;
