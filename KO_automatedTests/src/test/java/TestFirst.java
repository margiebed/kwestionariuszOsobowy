import initialize.TestFirstBase;
import org.openqa.selenium.By;
import org.testng.annotations.Test;

public class TestFirst extends TestFirstBase {

  @Test
  public void myFirstTest() {    driver.findElement(By.id("email")).sendKeys("test@test.com");
    driver.findElement(By.id("password")).sendKeys("qwerty");
  }

}
