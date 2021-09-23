package initialize;

import drivers.DriverManager;
import drivers.DriverUtils;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import static navigation.applicationUrl.URL;


public class TestBase {

  @BeforeMethod
  public void beforeTest() {
    DriverManager.getWebDriver();
    DriverUtils.setInitialConfiguration();
    DriverUtils.navigateToPage(URL);
  }

  @AfterMethod
  public void afterTest() {
  DriverManager.disposeDriver();
  }
}
