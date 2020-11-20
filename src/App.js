import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import CovidByState from "./components/covid_by_state_name"
import InsertCounty from "./components/insert_county"
import UpdateCounty from "./components/update_county"

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
          {/* <Route path="/edit/:id" component={EditExercise} />
  <Route path="/create" component={CreateExercise} />
  <Route path="/user" component={CreateUser} /> */}
        </div>
      </Router>
    );
  }

  //   <Router>
  //   <div className="container">
  //   <Navbar />
  //   <br/>
  //   <Route path="/" exact component={ExercisesList} />
  //   <Route path="/edit/:id" component={EditExercise} />
  //   <Route path="/create" component={CreateExercise} />
  //   <Route path="/user" component={CreateUser} />
  //   </div>
  // </Router>
  // <form method='post' action='http://localhost:5000/'>
  //   <div className='submit'>
  //     <input type='submit'/>
  //   </div>
  // </form>
}

export default App;
