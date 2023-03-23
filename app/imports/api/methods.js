// imports/api/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'accounts.deleteUser'(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to delete a user account');
    }

    // You may want to add additional checks here to ensure that the currently logged-in user
    // has sufficient privileges to delete other user accounts

    Meteor.users.remove({ _id: userId }, (error) => {
      if (error) {
        throw new Meteor.Error('delete-user-failed', error.message);
      }
    });
  },
});