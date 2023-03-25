import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class QuestionsItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.question.email}</Table.Cell>
        <Table.Cell>{this.props.question.name}</Table.Cell>
        <Table.Cell>{this.props.question.question1}</Table.Cell>
        <Table.Cell>{this.props.question.answer1}</Table.Cell>
        <Table.Cell>{this.props.question.question2}</Table.Cell>
        <Table.Cell>{this.props.question.answer2}</Table.Cell>
        <Table.Cell>{this.props.question.question3}</Table.Cell>
        <Table.Cell>{this.props.question.answer3}</Table.Cell>
        <Table.Cell>{this.props.question.question4}</Table.Cell>
        <Table.Cell>{this.props.question.answer4}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.question._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
QuestionsItem.propTypes = {
  question: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    question1: PropTypes.string,
    answer1: PropTypes.string,
    question2: PropTypes.string,
    answer2: PropTypes.string,
    question3: PropTypes.string,
    answer3: PropTypes.string,
    question4: PropTypes.string,
    answer4: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(QuestionsItem);
