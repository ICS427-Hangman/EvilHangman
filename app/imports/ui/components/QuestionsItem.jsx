import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class QuestionsItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.question.name}</Table.Cell>
        <Table.Cell>{this.props.question.description}</Table.Cell>
        <Table.Cell>{this.props.question.answer}</Table.Cell>
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
    name: PropTypes.string,
    description: PropTypes.string,
    answer: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(QuestionsItem);
