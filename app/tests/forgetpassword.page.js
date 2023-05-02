import { Selector } from 'testcafe';

class ForgetpasswordPage {
  constructor() {
    this.pageId = '#forgot-password-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async forgetPassword(testController, userInfo) {
    await this.isDisplayed(testController);
    await testController.typeText('#forgot-password-form-email', userInfo.username);
    await testController.typeText('#forgot-password-form-security-answer', userInfo.q1);
    await testController.click('#reset-password');
    await testController.typeText('#reset-password-form-new-password', 'changeme123');
    await testController.typeText('#reset-password-form-confirm-password', 'changeme123');
    await testController.click('#set-new-password');
  }
}

export const forgetpasswordPage = new ForgetpasswordPage();
