import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Questions } from '../../api/stuff/Question';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  email: String,
  name: String,
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  question1: {
    type: String,
    allowedValues: ['What city were you born in?'],
  },
  question2: {
    type: String,
    allowedValues: ['What is your oldest sibling’s middle name?'],
  },
  question3: {
    type: String,
    allowedValues: ['What college were you attended?'],
  },
  question4: {
    type: String,
    allowedValues: ['In what city or town did your parents meet?'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AskQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { email, name, question1, answer1, question2, answer2, question3, answer3, question4, answer4 } = data;
    const owner = Meteor.user().username;
    Questions.collection.insert({ email, name, question1, answer1, question2, answer2, question3, answer3, question4, answer4, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Answer added successfully', 'success');
          formRef.reset();
          this.setState({ error: '', redirectToReferer: true });
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/hangman' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Security Question</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='email'/>
              <TextField name='name'/>
              <SelectField name='question1'/>
              <TextField name='answer1'/>
              <SelectField name='question2'/>
              <TextField name='answer2'/>
              <SelectField name='question3'/>
              <TextField name='answer3'/>
              <SelectField name='question4'/>
              <TextField name='answer4'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}
/* Ensure that the React Router location object is available in case we need to redirect. */
AskQuestions.propTypes = {
  location: PropTypes.object,
};

export default AskQuestions;
