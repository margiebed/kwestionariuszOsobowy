package pageObject.dashboard;


import driver.DriverManager;
import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;

import static generic.assertions.AssertWebElement.assertThat;

public class Dashboard extends DashboardElements{


  public Dashboard() {
    PageFactory.initElements(DriverManager.getWebDriver(), this);
  }

  public String getLoginEmailText(){

    return loginTextElement.getText().toString();
  }


  public Dashboard assertThatLoginTextIsDisplyed() {
//    Assert.assertEquals(getLoginEmailText(), "Hello, test@test.com");
    assertThat(loginTextElement).isDisplayed();
    return new Dashboard();
  }


}
