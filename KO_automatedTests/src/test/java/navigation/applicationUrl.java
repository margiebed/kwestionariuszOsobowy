package navigation;

import configuration.AppProperties;

public class applicationUrl {
  public static final String URL = AppProperties.getAllUrl();
  public static final String LOGIN_URL = URL +"/login";
}
