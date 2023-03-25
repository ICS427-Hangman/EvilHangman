import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Questions } from '../../api/stuff/Question';
import QuestionItem from '../components/QuestionsItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAnswer extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Answers</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Question1</Table.HeaderCell>
              <Table.HeaderCell>Answer1</Table.HeaderCell>
              <Table.HeaderCell>Question2</Table.HeaderCell>
              <Table.HeaderCell>Answer2</Table.HeaderCell>
              <Table.HeaderCell>Question3</Table.HeaderCell>
              <Table.HeaderCell>Answer3</Table.HeaderCell>
              <Table.HeaderCell>Question4</Table.HeaderCell>
              <Table.HeaderCell>Answer4</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.questions.map((question) => <QuestionItem key={question._id} question={question} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListAnswer.propTypes = {
  questions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Questions.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const questions = Questions.collection.find({}).fetch();
  return {
    questions,
    ready,
  };
})(ListAnswer);
