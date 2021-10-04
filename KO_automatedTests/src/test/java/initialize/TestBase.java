package initialize;

import configuration.ConfigurationProperties;
import configuration.PropertiesLoader;
import driver.BrowserType;
import driver.DriverManager;
import driver.DriverUtils;
import io.qameta.allure.Step;
import org.testng.annotations.*;

import java.util.Properties;

import static navigation.applicationUrl.URL;


public class TestBase {

  @Step("Configuration from configuration.properties")
  @BeforeClass
  public void beforeClass() {
    PropertiesLoader propertiesLoader = new PropertiesLoader();
    Properties propertiesFromFile = propertiesLoader.getPropertiesFromFile("configuration.properties");
    ConfigurationProperties.setProperties(propertiesFromFile);
  }

  @Step("Setting up browser to: {browserType} and navigating to Home Page")
  @Parameters("browser")
  @BeforeMethod
  public void beforeTest(@Optional BrowserType browserType) {
    DriverManager.setWebDriverThreadLocal(browserType);
    DriverManager.getWebDriver();
    DriverUtils.setInitialConfiguration();
    DriverUtils.navigateToPage(URL);
  }

  @Step("Disposing browser")
  @AfterMethod
  public void afterTest() {
    DriverManager.disposeDriver();
  }
}
