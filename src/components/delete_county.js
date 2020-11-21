//Din 'Max' Chan, 1001352842
//Seonyoung 'Kaylee' Kim, 1001757188

import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteCounty extends Component {
    constructor(props) {
        super(props);
        this.onChangeStateAb = this.onChangeStateAb.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            County_Name: '',
            State_Ab: '',
            state_ab_list: [],
            counties_list: [],
            status: ''
        }
    }

    componentDidMount() {
        //Once component mounted to App.js, get existed states from backend
        axios.get('http://localhost:5000/get_all_distict_states/')
            .then(response => {
                if (response.data.states.length > 0) {
                    this.setState({
                        state_ab_list: response.data.states.map(stateAb => stateAb.State_Ab),            
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    //onChange listeners to update state values
    onChangeCounty(e) {
        this.setState({
            County_Name: e.target.value
        })
    }
    onChangeStateAb(e) {
        this.setState({
            State_Ab: e.target.value
        })
        //Once user chooses a specific state from dropdown, we update the choice for county dropdown
        axios.post('http://localhost:5000/get_all_distict_counties/',{State_Ab : e.target.value})
            .then(response => {
                if (response.data.counties.length > 0) {
                    this.setState({
                        counties_list: response.data.counties.map(countyName => countyName.County_Name),
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    onSubmit(e) {
        e.preventDefault();

        //Prepare packet to send to backend
        const county = {
            County_Name: this.state.County_Name,
            State_Ab: this.state.State_Ab,
        }

        axios.post('http://localhost:5000/delete_county/', county)
            .then(response => {
                this.setState({ status: response.data.status })
            })
            .catch(err => { console.error(err) });

        //Clearing out inputs
        this.setState({
            State_Ab: '',
            County_Name: '',
            New_County_Name: ''
        })
    }

    onReturnStatus(e) {
        return <h1>{this.state.status}</h1>
    }

    render() {
        return (
            <div>
                <h1>DELETE COVID COUNTY</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>State: </label>
                        <select ref="states"
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
                        <input type="submit" value="Delete County" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    {this.onReturnStatus()}
                </div>
            </div>
        )
    }
}