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

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('invalid-email', 'The provided email address does not exist.');
    }

    if (user.profile && user.profile.securityQuestions && user.profile.securityQuestions.length > 0) {
      // Return a random security question from the user profile
      const randomIndex = Math.floor(Math.random() * user.profile.securityQuestions.length);
      return user.profile.securityQuestions[randomIndex];
    }

    return null;
  },
  'users.createResetTokenWithSecurityQuestion'(email, securityQuestion, securityAnswer) {
    check(email, String);
    check(securityQuestion, String);
    check(securityAnswer, String);

    const user = Meteor.users.findOne({ 'emails.address': email });

    if (!user) {
      throw new Meteor.Error('invalid-email', 'No account found with this email address');
    }

    const correctSecurityQuestion = user.profile.securityQuestions.find(
      (sq) => sq.question === securityQuestion && sq.answer === securityAnswer,
    );

    if (!correctSecurityQuestion) {
      throw new Meteor.Error('invalid-answer', 'The security question answer is incorrect');
    }

    const token = Random.hexString(20);
    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 48);

    Meteor.users.update(user._id, {
      $set: {
        'services.password.reset.token': token,
        'services.password.reset.tokenExpires': tokenExpires,
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
