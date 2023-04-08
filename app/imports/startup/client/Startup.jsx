import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

/* global document */

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  render(<App/>, document.getElementById('root'));
  console.log('All user email addresses:');
  Meteor.users.find().forEach((user) => {
    console.log(user.emails[0].address);
  });
});
