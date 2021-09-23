package pageObject.login;


import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginElements {

  @FindBy(id = "email")
  protected WebElement emailElement;

  @FindBy(id = "password")
  protected WebElement passwordElement;

  @FindBy(tagName = "button")
  protected WebElement loginButtonElement;

}
