package pageObject.homePage;

import pageObject.login.Login;

public class HomePage  {

  public Login goToLoginPage(){
    return new Login();
  }

}
