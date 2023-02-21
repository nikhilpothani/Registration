import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstNameError: false,
    lastNameError: false,
    isSubmitted: false,
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onBlurValidateFirstName = () => {
    const validate = this.validateFirstName()

    this.setState({firstNameError: validate})
  }

  onBlurValidateLastName = () => {
    const validate = this.validateLastName()

    this.setState({lastNameError: validate})
  }

  onChangeGetFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeGetLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const firstNameInput = this.validateFirstName()
    const lastNameInput = this.validateLastName()

    if (firstNameInput && lastNameInput) {
      this.setState({isSubmitted: true})
    } else {
      this.setState({
        isSubmitted: false,
        firstNameError: firstNameInput,
        lastNameError: lastNameInput,
      })
    }
  }

  renderInputForm = () => {
    const {firstName, lastName, firstNameError, lastNameError} = this.state
    const firstInputError = firstNameError && 'error'
    const lastInputError = lastNameError && 'error'

    return (
      <form onSubmit={this.onSubmitForm()} className="form-container">
        <div className="input-container">
          <label htmlFor="firstName" className="input-label">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            className={`input-value ${firstInputError}`}
            placeholder="First name"
            onChange={this.onChangeGetFirstName()}
            onBlur={this.onBlurValidateFirstName()}
          />
          {firstNameError && <p className="error-text">Required</p>}
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="input-label">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            className={`input-value ${lastInputError}`}
            placeholder="Last name"
            onChange={this.onChangeGetLastName()}
            onBlur={this.onBlurValidateLastName()}
          />
          {lastNameError && <p className="error-text">Required</p>}
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    )
  }

  renderSuccessfulSubmission = () => (
    <div className="submission-success-container">
      <img
        className="success-logo"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="success-title">Submitted Successfully</p>
      <button
        className="resubmission-button"
        type="button"
        onClick={this.onClickReSubmit()}
      >
        Submit Another Response
      </button>
    </div>
  )

  onClickReSubmit = () => {
    this.setState({isSubmitted: false, firstName: '', lastName: ''})
  }

  render() {
    const {isSubmitted} = this.state
    return (
      <div className="registration-app-container">
        <h1 className="main-heading">Registration</h1>
        <div className="registration-card-container">
          {isSubmitted
            ? this.renderSuccessfulSubmission()
            : this.renderInputForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
