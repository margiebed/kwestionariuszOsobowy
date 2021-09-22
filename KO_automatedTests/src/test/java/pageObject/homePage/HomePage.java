package pageObject.homePage;

import initialize.Browser;
import org.openqa.selenium.support.ui.LoadableComponent;

import static org.testng.Assert.assertTrue;

public class HomePage extends LoadableComponent<HomePage> {

  static String url = "https://questionnaires-49d5a.web.app/login";
private static String title = "Questionnaires";

  protected void load() {
    Browser.open(url);
  }

  protected void isLoaded() throws Error {
    assertTrue(Browser.driver().getTitle().equals(title));
  }
}
