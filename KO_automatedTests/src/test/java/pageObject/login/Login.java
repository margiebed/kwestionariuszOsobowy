package pageObject.login;

import driver.DriverManager;
import io.qameta.allure.Step;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.support.PageFactory;



import pageObject.dashboard.Dashboard;

public class Login extends LoginElements {

  public Login() {
    PageFactory.initElements(DriverManager.getWebDriver(), this);
  }
  private Logger logger = LogManager.getLogger(Login.class);

@Step("Typo into {emailElement}")
  public Dashboard loginAsUser() {
    emailElement.sendKeys("test@test.com");
    passwordElement.sendKeys("qwerty");
    logger.info("Logowanie na " + emailElement.getText());
    loginButtonElement.click();
    return new Dashboard();
  }
}
