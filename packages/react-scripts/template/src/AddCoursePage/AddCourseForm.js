import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { slide as Menu } from 'react-burger-menu';
const cookies = new Cookies();

class AddCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      submitted: false,
      _creator: {},
    };
    this.updateName = this.updateName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  updateName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleBack(event) {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
  }

  handleLogout(event) {
    cookies.remove('instructor');
    cookies.remove('token');
  }
  onSubmit(event) {
    const name = this.state.name;
    const instructor = cookies.get('instructor')._id;
    console.log(cookies.get('instructor')._id);
    this.setState({
      submitted: true,
    });
    this.props.dispatch(actions.addCourse(name, instructor));
    console.log(this.props.name);
    console.log(name, cookies.get('instructor')._id);
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/auth/dashboard" />;
    }
    return (
      <div className="add-course-form">
        <div className="menu">
          <Menu>
            <a
              id="dashboard-return"
              className="menu-item"
              href="/auth/dashboard"
            >
              Return to Dashboard
            </a>
            <a id="dashboard-logout" className="menu-item" href="/login">
              Logout
            </a>
          </Menu>
        </div>
        <div className="mobile-header">
          <div className="mobile-name">Add a Course</div>
        </div>
        <div className="add-course-links">
          <div className="student-app-name">School Management App</div>
          <ul>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
            <li><Link to="/auth/dashboard">Back to Your Dashboard</Link></li>
          </ul>
        </div>
        <div className="add-course-header">
          <h1>Add a Course</h1>
        </div>
        <div className="add-course-container">
          <div className="add-coursename-field-line">
            <label htmlFor="coursename">Course Name:</label>
            <input
              id="coursename"
              name="coursename"
              value={this.state.name}
              onChange={this.updateName}
            />
          </div>
          <div className="button-container">
            <button onClick={this.onSubmit} className="add-course">
              Add Course
            </button>
            <button className="add-course-back" onClick={this.handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    name: state.course.coursename,
    _creator: state.course._creator,
  };
};
export default connect(mapStateToProps)(AddCoursePage);
