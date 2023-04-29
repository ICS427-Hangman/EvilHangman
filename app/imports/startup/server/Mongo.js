import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/stuff/Question.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addQuestion(data) {
  console.log(`  Adding: ${data.name} (${data.question})`);
  Questions.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Questions.collection.find().count() === 0) {
  if (Meteor.settings.defaultQuestions) {
    console.log('Creating default data.');
    Meteor.settings.defaultQuestions.map(data => addQuestion(data));
  }
}
