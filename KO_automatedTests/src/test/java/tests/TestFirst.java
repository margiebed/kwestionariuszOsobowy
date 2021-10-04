package tests;

import driver.DriverUtils;
import initialize.TestBase;
import io.qameta.allure.Description;
import org.testng.annotations.Test;
import pageObject.homePage.HomePage;

import static navigation.applicationUrl.LOGIN_URL;

public class TestFirst extends TestBase {

  @Test
  @Description("Test first")
  public void myFirstTest() {
    DriverUtils.navigateToPage(LOGIN_URL);
    HomePage homePage = new HomePage();

    homePage
        .goToLoginPage()
        .loginAsUser()
        .assertThatLoginTextIsDisplyed();
  }
}
