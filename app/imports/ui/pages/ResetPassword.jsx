import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

export default class ResetPassword extends React.Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    error: '',
    message: '',
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submitNewPassword = () => {
    const { newPassword, confirmPassword } = this.state;
    if (newPassword === confirmPassword) {
      Meteor.call('users.setNewPasswordWithResetToken', this.props.match.params.token, newPassword, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.setState({ error: '', message: 'Your password has been successfully reset.' });
        }
      });
    } else {
      this.setState({ error: 'Passwords do not match' });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <Container id="reset-password-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Reset Your Password
            </Header>
            {message === '' ? (
              <Form onSubmit={this.submitNewPassword}>
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
                    placeholder="Confirm password"
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
            ) : (
              <Header as="h3" textAlign="center">
                {message}
              </Header>
            )}
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Error"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
};
