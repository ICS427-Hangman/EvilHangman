import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

export default class ForgotPassword extends React.Component {
  state = {
    email: '',
    securityAnswer: '',
    error: '',
    randomSecurityQuestion: null,
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    if (name === 'email') {
      Meteor.call('users.hasSecurityQuestions', value, (err, res) => {
        if (err) {
          this.setState({ error: err.reason, randomSecurityQuestion: null });
        } else {
          this.setState({ error: '', randomSecurityQuestion: res });
        }
      });
    }
  };

  handleSubmit = () => {
    const { email, securityAnswer, randomSecurityQuestion } = this.state;
    if (randomSecurityQuestion) {
      Meteor.call('users.createResetTokenWithSecurityQuestion', email, randomSecurityQuestion.question, securityAnswer, (err, token) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.props.history.push(`/reset-password/${token}`);
        }
      });
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.handleSubmit();
  };

  render() {
    const { randomSecurityQuestion } = this.state;
    const hasSecurityQuestion = randomSecurityQuestion !== null;

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
                />
                {hasSecurityQuestion && (
                  <>
                    <Form.Input
                      label="Security Question"
                      id="forgot-password-form-security-question"
                      name="securityQuestion"
                      value={randomSecurityQuestion.question}
                      readOnly
                    />
                    <Form.Input
                      label="Security Answer"
                      id="forgot-password-form-security-answer"
                      name="securityAnswer"
                      placeholder="Your answer"
                      onChange={this.handleChange}
                    />
                  </>
                )}
                <Form.Button id='reset-password' content="Reset password" disabled={!this.state.email || !hasSecurityQuestion}/>
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
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
};
