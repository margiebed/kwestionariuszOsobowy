package drivers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class BrowserFactory {
  public static WebDriver getBrowser(BrowserType browserType) {
    switch (browserType) {
      case CHROME:
//        System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
        return new ChromeDriver();
      case FIREFOX:
        System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
        return new FirefoxDriver();
      default:
        throw new IllegalStateException("Unknown browser type! Please check your configuration");
    }
  }
}
