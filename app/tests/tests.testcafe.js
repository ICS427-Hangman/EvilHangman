import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { forgetpasswordPage } from './forgetpassword.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const userInfo = { username: 'test-user@foo.com', password: 'changeme', q1: 'idk', q2: 'idk' };

fixture('evil-hangman localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, userInfo);
  await navBar.logout(testController);
});

test('Test that forget password work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await testController.click('#forget-password');
  await forgetpasswordPage.forgetPassword(testController, userInfo);
  await testController.wait(1000).expect(Selector('#signin-page').exists).ok();
  await signinPage.signin(testController, userInfo.username, 'changeme123');
});

test('Test that delete account work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, userInfo.username, 'changeme123');
  await navBar.isLoggedIn(testController, userInfo.username);
  await navBar.deleteAccount(testController);
});
