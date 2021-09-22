package pageObject.dashboard;

import org.testng.Assert;

public class DashboardAssertion {
  public Dashboard checkThatLoginTextIsDisplyed(Dashboard page){
    Assert.assertEquals(page.getLoginEmailText(), "test@test.com");
    return page;
  }
}
