/*
 *
 * Login
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectLogin from './selectors';
import { validation } from './validate';

class LoginForm extends React.PureComponent {
  state = {
    value1: '',
    value2: '',
    buttonState: 'Submit',
  };

  updateValue = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  render() {
    const { validate, errors } = this.props;
    const { value1, value2, buttonState } = this.state;
    return (
      <form onSubmit={() => validate(this.state)}>
        {errors.length && errors.map((item) => <span>{item.error1}</span>)}
        <div style={{display: 'block', width: 250}}>
          <input value={value1} onChange={this.updateValue} name="value1"/>
        </div>
        <div style={{display: 'block', width: 250}}>
          <input value={value2} onChange={this.updateValue} name="value2"/>
        </div>
        <button onClick={() => validate(this.state)} type="button">{buttonState}</button>
      </form>
    );
  }
}

export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    errors: new Map()
  };
  validate = (state) => {
    const errors = validation(state);
    console.log(errors);
    if(errors.length) {
      this.setState({
        errors
      })
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <LoginForm
          validate={this.validate}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapStateToProps = selectLogin();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
