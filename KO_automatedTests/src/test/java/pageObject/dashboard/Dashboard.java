package pageObject.dashboard;


import drivers.DriverManager;
import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;

public class Dashboard extends DashboardElements{


  public Dashboard() {
    PageFactory.initElements(DriverManager.getWebDriver(), this);
  }

  public String getLoginEmailText(){
    return loginTextElement.getText();
  }


  public Dashboard checkThatLoginTextIsDisplyed() {
    Assert.assertEquals(getLoginEmailText(), "Hello, test@test.com");
    return new Dashboard();
  }
}
