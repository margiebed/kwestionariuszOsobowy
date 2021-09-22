package pageObject.dashboard;

import initialize.Browser;
import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;

import java.time.Duration;

public class Dashboard extends DashboardElements{


  public Dashboard() {
    PageFactory.initElements(Browser.driver(), this);
  }

  public String getLoginEmailText(){
    return loginTextElement.getText();
  }


  public void checkThatLoginTextIsDisplyed() {
    Browser.driver().manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    Assert.assertEquals(getLoginEmailText(), "test@test.com");
  }
}
