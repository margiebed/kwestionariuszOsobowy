package pageObject.login;

import drivers.DriverManager;
import org.openqa.selenium.support.PageFactory;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import pageObject.dashboard.Dashboard;

public class Login extends LoginElements {

  public Login() {
    PageFactory.initElements(DriverManager.getWebDriver(), this);
  }
  private Logger logger = LogManager.getRootLogger();

  public Dashboard loginAsUser() {
    emailElement.sendKeys("test@test.com");
    passwordElement.sendKeys("qwerty");
    logger.info("Logowanie na " + emailElement.getText());
    loginButtonElement.click();
    return new Dashboard();
  }
}
