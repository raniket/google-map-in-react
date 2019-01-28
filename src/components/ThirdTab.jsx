import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import FormValidator from '../utils/FormValidator';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../actions/';
import 'react-toastify/dist/ReactToastify.css';
class ThirdTab extends Component {

  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: 'first_name',
        method: 'isEmpty',
        validWhen: false,
        message: 'first name is required.',
      },
      {
        field: 'first_name',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'fist name must be between 1 - 100 charachers',
      },
      // {
      //   field: 'middle_name',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'middle name is required.',
      // },
      // {
      //   field: 'middle_name',
      //   method: 'isLength',
      //   args: [{ min: 0, max: 100 }],
      //   validWhen: true,
      //   message: 'middle name must be between 1 - 100 charachers',
      // },
      {
        field: 'last_name',
        method: 'isEmpty',
        validWhen: false,
        message: 'last name is required.',
      },
      {
        field: 'last_name',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'last name must be between 1 - 100 charachers',
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'you must provide valid email.'
      },
      {
        field: 'phone_personal',
        method: 'isEmpty',
        validWhen: false,
        message: 'phone number is required.'
      },
      {
        field: 'phone_personal',
        method: 'isNumeric',
        // args: [{ min: 10, max: 10 }],
        validWhen: true,
        message: 'phone number can contain only numbers.'
      },
      {
        field: 'phone_personal',
        method: 'isLength',
        args: [{ min: 10, max: 10 }],
        validWhen: true,
        message: 'phone number should be 10 digits long.'
      },
      {
        field: 'phone_personal',
        method: 'isMobilePhone',
        args: ['en-IN', { strictMode: true }],
        validWhen: false,
        message: 'only Indian phone number is allowed.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'password is required.',
      },
      {
        field: 'gender',
        method: 'isEmpty',
        validWhen: false,
        message: 'you must select gender.'
      }
    ]);

    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      phone_personal: '',
      email: '',
      password: '',
      gender: '',
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  componentDidMount() {
    this.props.updateCurrentPath(this.props.match.path)
  }


  handleInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handelFormSubmit = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submited = true;
    console.log('Is vAlid : ', validation.isValid);

    if (validation.isValid) {
      toast.success('Your have submitted the form! 👍');
    }
  }

  render() {

    console.log('IN THIEFLD  ; ', this.props);

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div>
        <form onSubmit={this.handelFormSubmit} className="text-center border border-light p-5 rounded cloudy-knoxville-gradient z-depth-1-half animated fadeInRightBig fast">

          <p className="h4 mb-4">Dummy Form</p>

          <hr />

          <div className={validation.first_name.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="first_name" className="float-right">First name : </label>
              </div>
              <div className="col-5">
                <input type="text" id="first_name" name="first_name" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder={``} />
                <span className="help-block deep-orange-text">{validation.first_name.message}</span>
              </div>
            </div>
          </div>

          {/* <div className={validation.middle_name.isInvalid.toString() && 'has-error'}> */}
          <div className="row justify-content-md-center ml-2 mr-2 mb-4">
            <div className="col-3 mt-1">
              <label htmlFor="middle_name" className="float-right">Middle name : </label>
            </div>
            <div className="col-5">
              <input type="text" id="middle_name" name="middle_name" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder={``} />
              {/* <span className="help-block deep-orange-text">{validation.middle_name.message}</span> */}
            </div>
          </div>
          {/* </div> */}

          <div className={validation.last_name.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="last_name" className="float-right">Last name : </label>
              </div>
              <div className="col-5">
                <input type="text" id="last_name" name="last_name" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder={``} />
                <span className="help-block deep-orange-text">{validation.last_name.message}</span>
              </div>
            </div>
          </div>

          <div className={validation.phone_personal.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="phone_personal" className="float-right">Phone number : </label>
              </div>
              <div className="col-5">
                <input type="text" id="phone_personal" name="phone_personal" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder={``} />
                <span className="help-block deep-orange-text">{validation.phone_personal.message}</span>
              </div>
            </div>
          </div>

          <div className={validation.email.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="email" className="float-right">E-mail : </label>
              </div>
              <div className="col-5">
                <input type="email" id="email" name="email" className="form-control mb-4" onChange={this.handleInputValueChange} placeholder={``} />
                <span className="help-block deep-orange-text">{validation.email.message}</span>
              </div>
            </div>
          </div>

          <div className={validation.password.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="password" className="float-right">Password : </label>
              </div>
              <div className="col-5">
                <input type="password" id="password" name="password" className="form-control mb-4" onChange={this.handleInputValueChange} value={this.state.password} />
                <span className="help-block deep-orange-text">{validation.password.message}</span>
              </div>
            </div>
          </div>

          <div className={validation.gender.isInvalid.toString() && 'has-error'}>
            <div className="row justify-content-md-center ml-2 mr-2 mb-4">
              <div className="col-3 mt-1">
                <label htmlFor="email" className="float-right">Gender : </label>
              </div>
              <div className="col-5">
                <div className="custom-control custom-radio custom-control-inline float-left">
                  <input type="radio" className="custom-control-input " id="defaultInline1" name="gender" value="MALE" onChange={this.handleInputValueChange} />
                  <label className="custom-control-label" htmlFor="defaultInline1">Male</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline float-left">
                  <input type="radio" className="custom-control-input" id="defaultInline2" name="gender" value="FEMALE" onChange={this.handleInputValueChange} />
                  <label className="custom-control-label" htmlFor="defaultInline2">Female</label>
                </div>
                <br />
                <div className="help-block deep-orange-text">{validation.gender.message}</div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <button className="btn btn-info btn-block col-4" type="submit" >
              {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'Add'}
            </button>
          </div>

        </form>

        <ToastContainer />

      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  const currentPath = (ownProps.match.path);
  return {
    currentPath: currentPath,
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdTab);
