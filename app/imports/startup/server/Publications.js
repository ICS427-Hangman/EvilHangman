import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Questions } from '../../api/stuff/Question';

// User-level publication.

Meteor.publish(Questions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Questions.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
