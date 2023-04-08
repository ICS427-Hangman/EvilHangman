import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
      error: '',
      redirectToReferer: false,
    };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, question1, answer1, question2, answer2 } = this.state;

    // Validation checks for email and password
    if (!email) {
      this.setState({ error: 'Please provide your Email' });
      return;
    }
    if (!password) {
      this.setState({ error: 'Please Create a password' });
      return;
    }
    // Validation checks for security questions and answers
    if (!question1 || !question2 || !answer1 || !answer2) {
      this.setState({ error: 'Please provide both security questions and answers.' });
      return;
    }
    Accounts.createUser(
      {
        email,
        username: email,
        password,
        profile: {
          securityQuestions: [
            { question: question1, answer: answer1 },
            { question: question2, answer: answer2 },
          ],
        },
      },
      (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.setState({ error: '', redirectToReferer: true });
        }
      },
    );
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { home } = this.props.location.state || { from: { pathname: '/landing' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={home}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Security Question 1"
                  id="signup-form-question1"
                  icon="question circle"
                  iconPosition="left"
                  name="question1"
                  placeholder="Security Question 1"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Answer 1"
                  id="signup-form-answer1"
                  icon="comment"
                  iconPosition="left"
                  name="answer1"
                  placeholder="Answer 1"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Security Question 2"
                  id="signup-form-question2"
                  icon="question circle"
                  iconPosition="left"
                  name="question2"
                  placeholder="Security Question 2"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Answer 2"
                  id="signup-form-answer2"
                  icon="comment"
                  iconPosition="left"
                  name="answer2"
                  placeholder="Answer 2"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
