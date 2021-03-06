import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { slide as Menu } from 'react-burger-menu';
const cookies = new Cookies();

class EditCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name,
      submitted: false,
      _creator: {},
    };
    this.updateName = this.updateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(event) {
    window.location.href = `/courses/${this.props.match.params.cuid}`;
  }

  handleLogout(event) {
    //cookies.remove('instructor');
    //force a commit
    cookies.remove('token');
  }

  updateName(event) {
    var input = event.target.value;
    this.setState({
      name: input,
    });
  }

  componentWillMount() {
    this.props.dispatch(actions.getCourse(this.props.match.params.cuid));
  }

  componentDidMount() {
    this.props.dispatch(actions.getCourse(this.props.match.params.cuid));
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const instructor = cookies.get('instructor')._id;
    console.log(cookies.get('instructor')._id);
    this.setState({
      submitted: true,
    });
    this.props.dispatch(actions.editCourse(name, this.props.match.params.cuid));
    console.log(this.props.name);
    console.log(name, cookies.get('instructor')._id);
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to={`/courses/${this.props.match.params.cuid}`} />;
    }
    return (
      <div className="edit-course-form">
        <div className="menu">
          <Menu>
            <a
              id="dashboard-return"
              className="menu-item"
              href={`/courses/${this.props.match.params.cuid}`}
            >
              Back to Your Course
            </a>
            <a id="dashboard-logout" className="menu-item" href="/login">
              Logout
            </a>
          </Menu>
        </div>
        <div className="mobile-header">
          <div className="mobile-name">{this.props.name}</div>
        </div>
        <div className="edit-course-links">
          <div className="student-app-name">School Management App</div>
          <ul>
            <li>
              <Link to="/login" onClick={this.handleLogout}>Log out </Link>
            </li>
            <li>
              <Link to={`/courses/${this.props.match.params.cuid}`}>
                Back to Your Course
              </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="edit-course-name"><h2>{this.props.name}</h2></div>
          <div className="submitForm">
            <div className="field-line">
              <label htmlFor="coursename">New Course Name:</label>
              <input
                name="coursename"
                value={this.state.name}
                onChange={this.updateName}
              />
            </div>
          </div>
        </div>
        <div className="edit-course-buttons">
          <button onClick={this.handleSubmit} className="edit-course">
            Edit Course
          </button>
          <button className="edit-course-back" onClick={this.handleBack}>
            Back
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    name: state.course.course.name,
    _creator: state.course._creator,
  };
};
export default connect(mapStateToProps)(EditCoursePage);
