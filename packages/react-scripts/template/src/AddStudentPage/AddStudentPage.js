import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { slide as Menu } from 'react-burger-menu';
const cookies = new Cookies();

class AddStudentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      student: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        streetAddress: '',
        miscAddress: '',
      },
      isSubmitted: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  updateInput(event) {
    const field = event.target.name;
    const student = this.state.student;
    student[field] = event.target.value;
    this.setState({
      student,
    });
  }
  handleSubmit(event) {
    const firstName = this.state.student.firstName;
    const lastName = this.state.student.lastName;
    const phoneNumber = this.state.student.phoneNumber;
    const streetAddress = this.state.student.streetAddress;
    const miscAddress = this.state.student.miscAddress;
    const courses = this.props.match.params.cuid;
    this.setState({
      isSubmitted: true,
    });
    this.props.dispatch(
      actions.addStudent(
        firstName,
        lastName,
        phoneNumber,
        streetAddress,
        miscAddress,
        courses
      )
    );
  }

  handleLogout() {
    cookies.remove('instructor');
    cookies.remove('token');
  }

  handleBack(event) {
    event.preventDefault();
    window.location.href = `/courses/${this.props.match.params.cuid}`;
    console.log('working?');
  }

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to={`/courses/${this.props.match.params.cuid}`} />;
    }
    return (
      <div className="add-student-form">
        <div className="add-student-links">
          <div className="student-app-name">School Management App</div>
          <ul>
            <li>
              <a
                id="course-return"
                className="menu-item"
                href={`/courses/${this.props.match.params.cuid}`}
              >
                Back to Your Course
              </a>
            </li>
            <li>
              <a id="course-logout" className="menu-item" href="/login">
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className="mobile-header">
          <div className="mobile-name">Add a Student</div>
        </div>
        <div className="menu">
          <div className="course-app-name">School Management App</div>
          <Menu>
            <Link to={`/courses/${this.props.match.params.cuid}`}>
              Back to Your Course Page
            </Link>
            <Link to="/login" onClick={this.handleLogout}>Log out </Link>
          </Menu>
        </div>
        <div className="container">
          <h2 className="add-student-header">Add A Student</h2>
          <div className="submitForm">
            <div className="add-student-field-line">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="streetAddress">Street Address:</label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={this.state.streetAddress}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-field-line">
              <label htmlFor="miscAddress">City, State, Zip:</label>
              <input
                id="miscAddress"
                name="miscAddress"
                value={this.state.miscAddress}
                onChange={this.updateInput}
              />
            </div>
            <div className="add-student-buttons">
              <button onClick={this.handleSubmit} className="add-student">
                Add Student
              </button>
              <button className="add-student-back" onClick={this.handleBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    firstName: state.student.firstName,
    lastName: state.student.lastName,
    phoneNumber: state.student.phoneNumber,
    courses: state.student.courses,
  };
};
export default connect(mapStateToProps)(AddStudentPage);
