package driver;

import driver.listeners.WebDriverEventListenerRegistrar;
import org.openqa.selenium.WebDriver;

import static configuration.TestRunProperties.getBrowserToRun;
import static configuration.TestRunProperties.getIsRemoteRun;

public class DriverManager {

  public static void setWebDriverThreadLocal(ThreadLocal<WebDriver> webDriverThreadLocal) {
    DriverManager.webDriverThreadLocal = webDriverThreadLocal;
  }

  private static ThreadLocal<WebDriver> webDriverThreadLocal = new ThreadLocal<>();
  private static ThreadLocal<BrowserType> browserTypeThreadLocal = new ThreadLocal<>();

  private DriverManager() {
  }

  public static void setWebDriverThreadLocal(BrowserType browserType) {
    WebDriver browser = null;
    if (browserType == null) {
      browserType = getBrowserToRun();
      browser = new BrowserFactory(browserType, getIsRemoteRun()).getBrowser();
    } else {
      browser = new BrowserFactory(browserType, getIsRemoteRun()).getBrowser();
    }
    browser = WebDriverEventListenerRegistrar.registerWebDriverEventListener(browser);

    browserTypeThreadLocal.set(browserType);
    webDriverThreadLocal.set(browser);
  }

  public static WebDriver getWebDriver() {
    if (webDriverThreadLocal.get() == null) {
      throw new IllegalStateException("Webdriver Instatnce was null");
    }
    return webDriverThreadLocal.get();
  }

  public static void disposeDriver() {
    webDriverThreadLocal.get().close();
    if (!browserTypeThreadLocal.get().equals(BrowserType.FIREFOX)) {
      webDriverThreadLocal.get().quit();
    }
    webDriverThreadLocal.remove();
    browserTypeThreadLocal.remove();
  }

}
