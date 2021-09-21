package initialize;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class TestFirstBase {
  public WebDriver driver;

  @BeforeMethod
  public void beforeTest() {
    driver = new ChromeDriver();
    driver.navigate().to("https://questionnaires-49d5a.web.app/login");
  }

  @AfterMethod
  public void afterTest() {
    driver.close();
    driver.quit();
  }
}
