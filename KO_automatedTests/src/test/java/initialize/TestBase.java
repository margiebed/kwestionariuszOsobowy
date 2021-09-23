package initialize;

import configuration.ConfigurationProperties;
import configuration.PropertiesLoader;
import drivers.DriverManager;
import drivers.DriverUtils;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

import java.util.Properties;

import static navigation.applicationUrl.URL;


public class TestBase {

  @BeforeClass
  public void beforeClass() {
    PropertiesLoader propertiesLoader = new PropertiesLoader();
    Properties propertiesFromFile = propertiesLoader.getPropertiesFromFile("configuration.properties");
    ConfigurationProperties.setProperties(propertiesFromFile);
  }

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
