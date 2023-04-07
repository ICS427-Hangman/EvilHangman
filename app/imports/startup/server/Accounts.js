import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, question1, answer1, question2, answer2, question3, answer3, question4, answer4, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    question1: question1,
    answer1: answer1,
    question2: question2,
    answer2: answer2,
    question3: question3,
    answer3: answer3,
    question4: question4,
    answer4: answer4,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}
// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, question1, answer1, question2, answer2, question3, answer3, question4, answer4, role }) => createUser(email, password, question1, answer1, question2, answer2, question3, answer3, question4, answer4, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
