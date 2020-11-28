import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class InsertEmp extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpType = this.onChangeEmpType.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeSSN = this.onChangeSSN.bind(this);
        this.onChangeSalesPay = this.onChangeSalesPay.bind(this);
        this.oneChangeStartDate = this.oneChangeStartDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Fname: '',
            Lname: '',
            SSN: '',
            Pay: '',
            ID: '',
            Start_Date: new Date(),
            e_type: '',
            e_type_list: []
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

    onChangeEmpType(e) {
        this.setState({
            e_type: e.target.value
        })
    }

    onChangeID(e){
        this.setState({
            ID: e.target.value
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

    onChangeSSN(e) {
        this.setState({
            SSN: e.target.value
        })
    }

    onChangeSalesPay(e) {
        this.setState({
            Pay: e.target.value
        })
    }

    oneChangeStartDate(e) {
        this.setState({
            Start_Date: e
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const new_emp_info = {
            Fname: this.state.Fname,
            Lname: this.state.Lname,
            SSN: this.state.SSN,
            Pay: this.state.Pay,
            ID: this.state.ID,
            Start_Date: this.state.Start_Date,
            e_type: this.state.e_type
        }

        axios.post('http://localhost:5000/insert_info/', new_emp_info)
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
                <h1>INSERT NEW EMPLOYEE INFORMATION</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Employee Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.e_type}
                            onChange={this.onChangeEmpType}>
                            {
                                this.state.e_type_list.map(function (e_type) {
                                    return <option
                                        key={e_type}
                                        value={e_type}>{e_type}
                                    </option>;
                                })
                            }
                        </select>                    
                    </div>
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
                        <label>First Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Fname}
                            placeholder="Enter First Name..."
                            onChange={this.onChangeFname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Lname}
                            placeholder="Enter Last Name..."
                            onChange={this.onChangeLname}
                        />
                    </div>
                    <div className="form-group">
                        <label>SSN: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.SSN}
                            placeholder="Enter SSN..."
                            onChange={this.onChangeSSN}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pay: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Pay.substring(0,10)}
                            placeholder="Enter Pay..."
                            onChange={this.onChangeSalesPay}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.Start_Date}
                                onChange={this.oneChangeStartDate}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>

                </form>
                <div>
                    {this.onReturnStatus()}
                </div>
            </div>
        )
    }


}