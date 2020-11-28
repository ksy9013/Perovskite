import React, { Component } from 'react';
import axios from 'axios';


export default class DisplayEmp extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpType = this.onChangeEmpType.bind(this);
        
        this.state = {
            e_type: '',
            e_type_list: [],
            emp_data:[]
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

    onChangeEmpType(e){
        this.setState({
            e_type: e.target.value
        })         
        axios.post('http://localhost:5000/display_all_emp_info/', { e_type: e.target.value})
        .then(response => {
            this.setState({
                emp_data: response.data.empdata
            })
        })       
    }

    displayEmp() {
        return this.state.emp_data.map(EmpData => {
            return <tr>
                <td>{EmpData.ID}</td>
                <td>{EmpData.Fname}</td>
                <td>{EmpData.Lname}</td>
                <td>{EmpData.SSN}</td>
                <td>{EmpData.Pay}</td>
                <td>{EmpData.Start_Date.substring(0, 10)}</td>
                <td>{EmpData.e_type}</td>
            </tr>;
        })
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>DEPARTMENT: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.e_type}
                            onChange={this.onChangeEmpType}>
                            {
                                this.state.e_type_list.map(function (empList) {
                                    return <option
                                        key={empList}
                                        value={empList}>{empList}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                </form>
                <div>
                    <h3>Employees in {this.state.e_type}</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>SSN</th>
                                <th>Pay</th>
                                <th>Start Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayEmp()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}