import React, { Component } from 'react'
import classnames from 'classnames';
import {registeruser,clearError} from './action/auth';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
 

class layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone:'',
            country:'',
            region:'',
            errors: {}
        }
        this.submitHandler=this.submitHandler.bind(this)
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    selectCountry (val) {
        this.setState({ country: val });
      }
     
      selectRegion (val) {
        this.setState({ region: val });
      }
    submitHandler(event) {
        event.preventDefault();
        this.props.clearError();



    


        const newUser = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            country:this.state.country,
            region:this.state.region
        }
        this.props.registeruser(newUser,this.props.history);
       
     
    }
    componentWillReceiveProps(nextProps){
        
        if(nextProps.error){
            console.log(nextProps.error);
            this.setState({errors:nextProps.error});
        }
    }
    render() {
        const errors = this.state.errors;
        return (
            <div>
                <form noValidate onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <input type="text" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                        placeholder="Name" name="name"
                                        value={this.state.name}
                                        onChange={(event) => this.changeHandler(event)}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                                        placeholder="Email Address" name="email"
                                        value={this.state.email}
                                        onChange={(event) => this.changeHandler(event)} />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                    {/* <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small> */}
                                </div>
                                <div className="form-group">
                                    <input type="phone" className={classnames('form-control form-control-lg', { 'is-invalid': errors.phone })}
                                        placeholder="phone" name="phone"
                                        value={this.state.phone}
                                        onChange={(event) => this.changeHandler(event)} />
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    {/* <input type="text" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                        placeholder="Name" name="name"
                                        value={this.state.name}
                                        onChange={(event) => this.changeHandler(event)}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )} */}

                            


<CountryDropdown
          value={this.state.country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown
          country={this.state.country} 
          value={this.state.region}
          onChange={(val) => this.selectRegion(val)} />
                                </div>
                                
                                <input type="submit" className="btn btn-success btn-block mt-4" />
                            </form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    error:state.error
 });

export default connect(mapStateToProps,{registeruser,clearError})(withRouter(layout));
