import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


//For testing
import axios from 'axios';

axios.get('http://localhost:5000/', "Kaylee")
      .then(res => console.log(res.data));

function App() {
  return (
    // <Router>
    //   <div className="container">
    //   <Navbar />
    //   <br/>
    //   <Route path="/" exact component={ExercisesList} />
    //   <Route path="/edit/:id" component={EditExercise} />
    //   <Route path="/create" component={CreateExercise} />
    //   <Route path="/user" component={CreateUser} />
    //   </div>
    // </Router>
    <form method='post' action='http://localhost:5000/'>
      <div className='submit'>
        <input type='submit'/>
      </div>
    </form>
  );
}

export default App;
