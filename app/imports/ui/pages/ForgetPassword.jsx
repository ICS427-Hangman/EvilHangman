import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

export default class ForgotPassword extends React.Component {
  state = {
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    error: '',
    message: '',
    hasSecurityQuestions: false,
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    if (name === 'email') {
      Meteor.call('users.hasSecurityQuestions', value, (err, res) => {
        if (err) {
          console.error(err);
          if (err.error === 'invalid-email') {
            this.setState({ error: '', hasSecurityQuestions: false });
          } else {
            this.setState({ error: err.reason, hasSecurityQuestions: false });
          }
        } else {
          console.log('Response from server:', res); // Add this line
          this.setState({ error: '', hasSecurityQuestions: res });
        }
      });
    }
  }

  handleBlur = () => {
    const { email } = this.state;
    Meteor.call('users.hasSecurityQuestions', email, (err, res) => {
      if (err) {
        this.setState({ error: err.reason, hasSecurityQuestions: false });
      } else {
        this.setState({ error: '', hasSecurityQuestions: res });
      }
    });
  }

  handleSubmit = () => {
    const { email, securityQuestion, securityAnswer } = this.state;
    Meteor.call('users.createResetTokenWithSecurityQuestion', email, securityQuestion, securityAnswer, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', message: 'A password reset email has been sent to your email address.' });
      }
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.handleSubmit();
  }

  render() {
    const { hasSecurityQuestions } = this.state;
    return (
      <Container id="forgot-password-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Reset Your Password
            </Header>
            <Form onSubmit={this.handleFormSubmit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="forgot-password-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {hasSecurityQuestions && (
                  <>
                    <Form.Input
                      label="Security Question"
                      id="forgot-password-form-security-question"
                      name="securityQuestion"
                      placeholder="What is your favorite color?"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Security Answer"
                      id="forgot-password-form-security-answer"
                      name="securityAnswer"
                      placeholder="Blue"
                      onChange={this.handleChange}
                    />
                  </>
                )}
                <Form.Button content="Reset password" disabled={!this.state.email || !hasSecurityQuestions}/>
              </Segment>
            </Form>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Failed to reset password"
                content={this.state.error}
              />
            )}
            {this.state.message === '' ? (
              ''
            ) : (
              <Message
                success
                header="Password reset email sent"
                content={this.state.message}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
};
