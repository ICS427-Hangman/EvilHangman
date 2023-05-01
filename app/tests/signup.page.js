import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, userInfo) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', userInfo.username);
    await testController.typeText('#signup-form-password', userInfo.password);
    await testController.click('#signup-form-question1');
    await testController.click(Selector('.menu').child(1));
    await testController.typeText('#signup-form-answer1', userInfo.q1);
    await testController.click('#signup-form-question2');
    await testController.click(Selector('.menu').child(1).nth(-1));
    await testController.typeText('#signup-form-answer2', userInfo.q2);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, userInfo.username);
  }
}

export const signupPage = new SignupPage();
