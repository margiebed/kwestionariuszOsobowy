package initialize;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class TestBase {
  public WebDriver driver;

  @BeforeMethod
  public void beforeTest() {

  }

  @AfterMethod
  public void afterTest() {
    Browser.close();
    Browser.quit();
  }
}
