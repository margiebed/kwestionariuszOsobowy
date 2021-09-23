package drivers;

import configuration.LocalWebDriverProperties;
import org.openqa.selenium.WebDriver;

public class DriverManager {

  private static WebDriver driver; //zabezpieczamy się że mamy instancję tylko jednej klasy
  private static final BrowserType BROWSER_TYPE = BrowserType.CHROME;
  private  DriverManager() { //korzystając ze wzorca singleton konstruktor musi być prywatny
  }

  public static WebDriver getWebDriver() {

    if (driver == null) {
      driver = BrowserFactory.getBrowser(LocalWebDriverProperties.getLocalBrowser());
    }
    return driver;
  }

  public static void disposeDriver(){
    driver.close();
    if (!LocalWebDriverProperties.getLocalBrowser().equals(BrowserType.FIREFOX)) {
      driver.quit();
    }
      driver = null; //w instancji jest obiekt i po wywołaniu ponownie jetWebdriver może pamiętać wcześniejszą
  }

}
