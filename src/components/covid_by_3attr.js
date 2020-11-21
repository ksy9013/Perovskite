//Din 'Max' Chan, 1001352842
//Seonyoung 'Kaylee' Kim, 1001757188

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class COVID_19 extends Component {
    constructor(props) {
        super(props);
        this.onChangeStateAb = this.onChangeStateAb.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        //Initialize state with new attributes
        this.state = {
            County_Name: '',
            State_Ab: '',
            state_ab_list: [],
            counties_list: [],
            date: new Date(),
            covid_data: []
        }
    }

    componentDidMount() {
        //Once component mounted to App.js, get existed states from backend
        axios.get('http://localhost:5000/get_all_distict_states/')
            .then(response => {
                if (response.data.states.length > 0) {
                    this.setState({
                        state_ab_list: response.data.states.map(stateAb => stateAb.State_Ab),
                        // State_Ab: response.data.states[0].State_Ab
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    //onChange listens to updated forms
    onChangeCounty(e) {
        this.setState({
            County_Name: e.target.value
        })
    }
    onChangeStateAb(e) {
        this.setState({
            State_Ab: e.target.value
        })

        axios.post('http://localhost:5000/get_all_distict_counties/', { State_Ab: e.target.value })
            .then(response => {
                if (response.data.counties.length > 0) {
                    this.setState({
                        counties_list: response.data.counties.map(countyName => countyName.County_Name)
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    onChangeDate(e) {
        this.setState({
            date: e
        })
        const my_packet = {
            State_Ab: this.state.State_Ab,
            County_Name: this.state.County_Name,
            date: e
        }
        //populate covid data
        axios.post('http://localhost:5000/populate_coviddata_by_3attr/', my_packet)
        .then(response => {
            this.setState({
                covid_data: response.data.coviddata
            })
        })
    }

    covidDataList() {
        return this.state.covid_data.map(currenCovidData => {
          return <tr>
          <td>{currenCovidData.CDate.substring(0,10)}</td>
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
                    <div className="form-group">
                        <label>County: </label>
                        <select ref="counties"
                            required
                            className="form-control"
                            value={this.state.County_Name}
                            onChange={this.onChangeCounty}>
                            {
                                this.state.counties_list.map(function (County_Name) {
                                    return <option
                                        key={County_Name}
                                        value={County_Name}>{County_Name}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
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