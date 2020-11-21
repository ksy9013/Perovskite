import React, { Component } from 'react';
import axios from 'axios';

export default class InsertCounty extends Component {
    constructor(props) {
        super(props);
        this.onChangeStateAb = this.onChangeStateAb.bind(this);
        this.onChangeCounty = this.onChangeCounty.bind(this);
        this.onChangePopulation = this.onChangePopulation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            County_Name: '',
            State_Ab: '',
            Population: '',
            state_ab_list: [],
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
    }
    onChangePopulation(e) {
        this.setState({
            Population: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        //Prepare packet to send to backend
        const new_covid_data = {
            County_Name: this.state.County_Name,
            State_Ab: this.state.State_Ab,
            Population: this.state.Population
        }

        axios.post('http://localhost:5000/insert_county/', new_covid_data)
            .then(response => {
                this.setState({ status: response.data.status })
            })
            .catch(err => { console.error(err) });
    }

    onReturnStatus(e) {
        return <h1>{this.state.status}</h1>
    }

    render() {
        return (
            <div>
                <h1>INSERT COVID COUNTY</h1>
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
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.County_Name}
                            placeholder="Enter county..."
                            onChange={this.onChangeCounty}
                        />
                    </div>
                    <div className="form-group">
                        <label>Population: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Population}
                            placeholder="Enter population..."
                            onChange={this.onChangePopulation}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create County" className="btn btn-primary" />
                    </div>

                </form>
                <div>
                    {this.onReturnStatus()}
                </div>
            </div>
        )
    }
}