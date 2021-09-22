package pageObject.login;

import initialize.Browser;
import org.openqa.selenium.support.PageFactory;

public class Login extends LoginElements {

  public Login() {
    PageFactory.initElements(Browser.driver(), this);
  }

  public Login loginAsUser() {
    emailElement.sendKeys("test@test.com");
    passwordElement.sendKeys("qwerty");
    loginButtonElement.click();
    return this;
  }
}
