//Din 'Max' Chan, 1001352842
//Seonyoung 'Kaylee' Kim, 1001757188

import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import CovidByState from "./components/covid_by_state_name"
import InsertCounty from "./components/insert_county"
import UpdateCounty from "./components/update_county"
import DeleteCounty from "./components/delete_county"
import CovidBy3Attr from "./components/covid_by_3attr"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={CovidByState} />
          <Route path="/insert_county" exact component={InsertCounty} />
          <Route path="/update_county" exact component={UpdateCounty} />
          <Route path="/delete_county" exact component={DeleteCounty} />
          <Route path="/covid_by_3attr" exact component={CovidBy3Attr}/>
        </div>
      </Router>
    );
  }
}

export default App;
