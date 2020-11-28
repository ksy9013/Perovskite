import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateEmp extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpType = this.onChangeEmpType.bind(this);
        this.onChangeNewEmpType = this.onChangeNewEmpType.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeNewFname = this.onChangeNewFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeNewLname = this.onChangeNewLname.bind(this);
        this.onChangeSalesPay = this.onChangeSalesPay.bind(this);
        this.onChangeNewSalesPay = this.onChangeNewSalesPay.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Fname: '',
            Lname: '',
            Pay: '',
            e_type: '',
            e_type_list: [],
            ID: '',
            emp_data: [],
            New_Fname: '',
            New_Lname: '',
            New_Pay: '',
            New_eType: ''
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

        axios.post('http://localhost:5000/get_all_emp_info/',
            {
                ID: this.state.ID, Fname: e.target.value, Lname: e.target.value,
                SSN: e.target.value, Pay: e.target.value, Start_Date: e.target.value, e_type: e.target.value
            })
            .then(response => {
                this.setState({
                    emp_data: response.data.empdata
                })
            })
    }

    onChangeFname(e) {
        this.setState({
            Fname: e.target.value
        })
    }

    onChangeLname(e) {
        this.setState({
            Lname: e.target.value
        })
    }

    onChangeSalesPay(e) {
        this.setState({
            Pay: e.target.value
        })
    }

    onChangeNewEmpType(e) {
        this.setState({
            New_eType: e.target.value
        })
    }

    onChangeNewFname(e) {
        this.setState({
            New_Fname: e.target.value
        })
    }

    onChangeNewLname(e) {
        this.setState({
            New_Lname: e.target.value
        })
    }

    onChangeNewSalesPay(e) {
        this.setState({
            New_Pay: e.target.value
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

        //Prepare packet to send to backend
        const new_info = {
            ID: this.state.ID,
            e_type: this.state.e_type,
            New_eType: this.state.New_eType,
            New_Pay: this.state.New_Pay,
            New_Fname: this.state.New_Fname,
            New_Lname: this.state.New_Lname,
            emp_data: this.state.emp_data
        }

        axios.post('http://localhost:5000/update_emp/', new_info)
            .then(response => {
                this.setState({ status: response.data.status })
            })
            .catch(err => { console.error(err) });

        //Clearing out inputs
        this.setState({
            Fname: '',
            Lname: '',
            Pay: '',
            e_type: '',
            ID: '',
            New_Fname: '',
            New_Lname: '',
            New_Pay: '',
            New_eType: ''
        })

    }

    onReturnStatus(e) {
        return <h1>{this.state.status}</h1>
    }

    render() {
        return (
            <div>
                <h1>UPDATE EMPLOYEE INFO</h1>
                <form>
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
                    <br></br>
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
                        <br></br>
                    </div>
                    </form>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Employee Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.New_eType}
                            onChange={this.onChangeNewEmpType}>
                            {
                                this.state.e_type_list.map(function (New_eType) {
                                    return <option
                                        key={New_eType}
                                        value={New_eType}>{New_eType}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.New_Fname}
                            placeholder="Enter First Name..."
                            onChange={this.onChangeNewFname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.New_Lname}
                            placeholder="Enter Last Name..."
                            onChange={this.onChangeNewLname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pay: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.New_Pay}
                            placeholder="Enter ID..."
                            onChange={this.onChangeNewSalesPay}
                        />
                    </div>
                    <div>
                        <h4>Update info for {this.state.New_Fname}, {this.state.New_Lname}</h4>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                    </div>
                    </form>
                <div>
                    {this.onReturnStatus()}
                </div>
            </div>
        )
    }
}