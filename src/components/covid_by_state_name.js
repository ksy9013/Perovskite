import React, { Component } from 'react';
import axios from 'axios';

// const Exercise = props => (
//   <tr>
//     <td>{props.exercise.username}</td>
//     <td>{props.exercise.description}</td>
//     <td>{props.exercise.duration}</td>
//     <td>{props.exercise.date.substring(0,10)}</td>
//     <td>
//       <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
//     </td>
//   </tr>
// )

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeStateAb = this.onChangeStateAb.bind(this);
        // this.deleteExercise = this.deleteExercise.bind(this)

        // this.state = {exercises: []};
        this.state = {
            State_Ab: '',
            state_ab_list: [],
            covid_data: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get_all_distict_states/')
            .then(response => {
                console.log(response);
                if (response.data.data.length > 0) {
                    this.setState({
                        state_ab_list: response.data.data.map(stateAb => stateAb.State_Ab),
                        State_Ab: response.data.data[0].State_Ab
                    })
                }
            })
            .catch((err) => { console.error(err) });
        // axios.get('http://localhost:5000/exercises/')
        //   .then(response => {
        //     this.setState({ exercises: response.data })
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
    }

    onChangeStateAb(e) {
        this.setState({
            State_Ab: e.target.value
        })
    }

    //   deleteExercise(id) {
    //     axios.delete('http://localhost:5000/exercises/'+id)
    //       .then(response => { console.log(response.data)});

    //     this.setState({
    //       exercises: this.state.exercises.filter(el => el._id !== id)
    //     })
    //   }

    //   exerciseList() {
    //     return this.state.exercises.map(currentexercise => {
    //       return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    //     })
    //   }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>State: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.State_Ab}
                            onChange={this.onChangeStateAb}>
                            {
                                this.state.state_ab_list.map(function (State_Ab) {
                                    return <option
                                        key={State_Ab}
                                        value={State_Ab}>{State_Ab}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                </form>
                {/* <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div> */}
            </div>
        )
    }
}