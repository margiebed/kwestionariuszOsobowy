package tests;

import drivers.DriverUtils;
import initialize.TestBase;
import org.testng.annotations.Test;
import pageObject.homePage.HomePage;

import static navigation.applicationUrl.LOGIN_URL;

public class TestFirst1 extends TestBase {


  @Test
  public void myFirstTest() {
    DriverUtils.navigateToPage(LOGIN_URL);
    HomePage homePage = new HomePage();

    homePage
        .goToLoginPage()
        .loginAsUser()
        .checkThatLoginTextIsDisplyed();
  }

}
