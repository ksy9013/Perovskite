import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteEmp extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpType = this.onChangeEmpType.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            e_type: '',
            e_type_list: [],
            ID: '',
            emp_data: []
        }
    }

    componentDidMount() {
        //Once component mounted to App.js, get existed states from backend
        axios.get('http://localhost:5000/get_emp_type/')
            .then(response => {
                if (response.data.types.length > 0) {
                    this.setState({
                        e_type_list: response.data.types.map(etype => etype.e_type),
                    })
                }
            })
            .catch((err) => { console.error(err) });
    }

    //onChange listens to updated forms
    onChangeID(e) {
        this.setState({
            ID: e.target.value
        })
    }

    onChangeEmpType(e) {
        this.setState({
            e_type: e.target.value
        })

        //populate employee info
        axios.post('http://localhost:5000/get_all_emp_info/', { e_type: e.target.value, ID: this.state.ID })
            .then(response => {
                this.setState({
                    emp_data: response.data.empdata
                })
            })
    }

    verifyEmp() {
        return this.state.emp_data.map(EmpData => {
            return <tr>
                <td>{EmpData.e_type}</td>
                <td>{EmpData.Fname}</td>
                <td>{EmpData.Lname}</td>
                <td>{EmpData.SSN}</td>
                <td>{EmpData.Pay}</td>
                <td>{EmpData.Start_Date.substring(0, 10)}</td>
            </tr>;
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const emp = {
            ID: this.state.ID,
            e_type: this.state.e_type
        }

        //Prepare packet to send to backend
        axios.post('http://localhost:5000/delete_emp/', emp)
            .then(response => {
                this.setState({ status: response.data.status })
            })
            .catch(err => { console.error(err) });

        //Clearing out inputs
        this.setState({
            e_type: '',
            ID: ''
        })
    }

    onReturnStatus(e) {
        return <h1>{this.state.status}</h1>
    }

    render() {
        return (
            <div>
                <h1>DELETE EMPLOYEE</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ID}
                            placeholder="Enter ID..."
                            onChange={this.onChangeID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select ref="counties"
                            required
                            className="form-control"
                            value={this.state.e_type}
                            onChange={this.onChangeEmpType}>
                            {
                                this.state.e_type_list.map(function (eList) {
                                    return <option
                                        key={eList}
                                        value={eList}>{eList}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <h5>Verify an employee information to make sure it is a right person.{this.state.State_Ab}</h5>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Type</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>SSN</th>
                                    <th>Pay</th>
                                    <th>Start Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.verifyEmp()}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    {this.onReturnStatus()}
                </div>
            </div>
        )
    }
}