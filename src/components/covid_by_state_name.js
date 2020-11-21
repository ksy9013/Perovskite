import React, { Component } from 'react';
import axios from 'axios';


export default class CovidDataList extends Component {
    constructor(props) {
        super(props);
        this.onChangeStateAb = this.onChangeStateAb.bind(this);

        this.state = {
            State_Ab: '',
            state_ab_list: [],
            covid_data: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get_all_distict_states/')
            .then(response => {
                if (response.data.states.length > 0) {
                    this.setState({
                        state_ab_list: response.data.states.map(stateAb => stateAb.State_Ab),
                        State_Ab: response.data.states[0].State_Ab
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    onChangeStateAb(e) {
        this.setState({
            State_Ab: e.target.value
        })
        axios.post('http://localhost:5000/covid_by_state/', { State_Ab: e.target.value })
            .then(response => {
                this.setState({
                    covid_data: response.data.covid_data
                })
            })
            .catch(err => { console.error(err) });
    }

    covidDataList() {
        return this.state.covid_data.map(currenCovidData => {
            return <tr>
                <td>{currenCovidData.CDate.substring(0, 10)}</td>
                <td>{currenCovidData.State_Ab}</td>
                <td>{currenCovidData.County_Name}</td>
                <td>{currenCovidData.Daily_Count_Cases}</td>
                <td>{currenCovidData.Daily_Deaths}</td>
            </tr>;
        })
    }

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
                <div>
                    <h3>COVID DATA FOR {this.state.State_Ab}</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>CDate</th>
                                <th>State_Ab</th>
                                <th>County_Name</th>
                                <th>Daily_Count_Cases</th>
                                <th>Daily_Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.covidDataList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}