import React, { Component } from 'react';

class ServerError extends Component {
  render() {
    return (
      <div className='server-error'>
        <div className='server-error_alert'>&#9888;</div>
        <h1>Oops, we have a problem</h1>
        <p>Sorry, we couldn't access the repositories. Please try again in a few moments.</p>
      </div>
    );
  }
}

export default ServerError;

