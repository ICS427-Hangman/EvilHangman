import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

export default class ResetPassword extends React.Component {
  state = {
    token: this.props.match.params.token, // Fetch the reset token from the URL parameter
    newPassword: '',
    confirmPassword: '',
    error: '',
    success: false,
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { token, newPassword, confirmPassword } = this.state;

    if (newPassword !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    Meteor.call('users.setNewPasswordWithResetToken', token, newPassword, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', success: true });
        setTimeout(() => {
          this.props.history.push('/signin');
        }, 3000);
      }
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.handleSubmit();
  };

  render() {
    return (
      <Container id="reset-password-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Set Your New Password
            </Header>
            <Form onSubmit={this.handleFormSubmit}>
              <Segment stacked>
                <Form.Input
                  label="New Password"
                  id="reset-password-form-new-password"
                  icon="lock"
                  iconPosition="left"
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Confirm Password"
                  id="reset-password-form-confirm-password"
                  icon="lock"
                  iconPosition="left"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  onChange={this.handleChange}
                />
                <Form.Button id='set-new-password' content="Set new password" disabled={!this.state.token || !this.state.newPassword || !this.state.confirmPassword}/>
              </Segment>
            </Form>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Failed to set new password"
                content={this.state.error}
              />
            )}
            {this.state.success ? (
              <Message
                success
                header="New password set"
                content="Your new password has been set successfully."
              />
            ) : (
              ''
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

ResetPassword.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
