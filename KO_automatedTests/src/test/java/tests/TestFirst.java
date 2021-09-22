package tests;

import initialize.TestBase;
import org.testng.annotations.Test;
import pageObject.dashboard.Dashboard;
import pageObject.homePage.HomePage;
import pageObject.login.Login;

public class TestFirst extends TestBase {
  HomePage homePage = new HomePage();

  @Test
  public void myFirstTest() {
    homePage.get();
    Login login = new Login();
    login.loginAsUser();
    Dashboard dashboard = new Dashboard();
    dashboard.checkThatLoginTextIsDisplyed();
  }

}
