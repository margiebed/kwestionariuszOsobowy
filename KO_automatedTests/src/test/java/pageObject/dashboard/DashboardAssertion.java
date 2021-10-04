package pageObject.dashboard;

import org.testng.Assert;

import static generic.assertions.AssertWebElement.assertThat;

public class DashboardAssertion  {
  public Dashboard checkThatLoginTextIsDisplyed() {
    return checkThatLoginTextIsDisplyed();
  }

  public Dashboard checkThatLoginTextIsDisplyed(Dashboard page){
    assertThat(page.loginTextElement).isDisplayed();
//    Assert.assertEquals(page.getLoginEmailText(), "test@test.com");
    return new Dashboard();
  }
}
