package pageObject.dashboard;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class DashboardElements {
  @FindBy(className = "userlogin")
  protected WebElement loginTextElement;
}
