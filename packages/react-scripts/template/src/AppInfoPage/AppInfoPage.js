import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class AppInfoPage extends React.Component {
  constuctor(props, context) {}
  super(props, context) {}
  render() {
    return (
      <div className="info pre">
        <h1>About Me and This Application</h1>
        <div className="main-info">
          <p>
            Hi, Welcome to the School Management Application! This app allows instructors to organize their
            {' '}
            student information by adding courses and subsequently adding students and their contact information.
            You are then free to add and delete students and other course information as well.
            {' '}
          </p>

          <p>
            The front end portion of this application was built using React and the back end
            was built using Mongoose, Express, and Node. mLab was also used for storage of the
            instructor's data and Passport.js is used for authentication purposes.
            //Forcing a push to heroku
          </p>
        </div>
        <div className="return-link">
          <Link to="/signup">
            <span className="return-link">
              Click here to head to the signup page.
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default AppInfoPage;
