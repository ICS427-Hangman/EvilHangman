import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, alert } from 'react-router-dom';
import { Container, Form, Grid, Header } from 'semantic-ui-react';

class DeleteAccount extends React.Component {
  // Handle Deletion submission. Delete the user and all associated data, then redirect to the home page.
  submit = () => {
    Meteor.call('accounts.deleteUser', Meteor.userId(), (error) => {
      if (error) {
        console.error('Error:', error.message);
      } else {
        console.log('User account deleted successfully');
        this.props.history.push('/');
      }
    });
  };

  // Display the deletion form. Redirect to home page after successful deletion.
  render() {
    return (
      <Container id="delete-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Delete your account
            </Header>
            <Form onSubmit={this.submit}>
              <Form.Button id="delete-form-submit" content="Delete my Account" />
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
DeleteAccount.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(DeleteAccount);
