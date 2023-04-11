// imports/api/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import bcrypt from 'bcryptjs';

Meteor.methods({
  'users.getSecurityQuestion'(email) {
    check(email, String);

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('invalid-email', 'Invalid email address');
    }

    return user.securityQuestion;
  },

  'users.hasSecurityQuestions'(email) {
    check(email, String);
    const user = Meteor.users.findOne({ emails: { $elemMatch: { address: email } } });
    console.log('User found:', user); // Add this line
    if (!user) {
      throw new Meteor.Error('invalid-email', 'Invalid email address');
    }

    if (user.securityQuestions && user.securityQuestions.length > 0) {
      return true;
    }

    return false;
  },
  'users.createResetTokenWithSecurityQuestion'(email, securityQuestion, securityAnswer) {
    check(email, String);
    check(securityQuestion, String);
    check(securityAnswer, String);

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('invalid-email', 'Invalid email address');
    }

    if (securityAnswer !== user.securityAnswer) {
      throw new Meteor.Error('invalid-security-answer', 'Invalid security answer');
    }

    const token = Random.secret();

    Meteor.users.update(user._id, {
      $set: {
        'services.password.reset': {
          token,
          tokenExpires: new Date(Date.now() + 3600000), // Token expires in 1 hour
        },
      },
    });

    return token;
  },

  'users.setNewPasswordWithResetToken'(token, newPassword) {
    check(token, String);
    check(newPassword, String);

    const user = Meteor.users.findOne({
      'services.password.reset.token': token,
      'services.password.reset.tokenExpires': { $gt: new Date() },
    });

    if (!user) {
      throw new Meteor.Error('invalid-token', 'Invalid or expired token');
    }

    Accounts.setPassword(user._id, newPassword);
  },
  'accounts.deleteUser'(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to delete a user account');
    }
    Meteor.users.remove({ _id: userId }, (error) => {
      if (error) {
        throw new Meteor.Error('delete-user-failed', error.message);
      }
    });
  },
  'accounts.hashAnswers'(answers) {
    check(answers, [String]);
      return answers.map((answer) => bcrypt.hashSync(answer, 10));
  },
});
