package configuration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesLoader {
  private Logger logger = LogManager.getLogger(PropertiesLoader.class);
  public Properties getPropertiesFromFile(String propertiesFileName) {
    InputStream inputStream = null;
    Properties properties = new Properties();
    try {
      logger.info("Trying to load properties with file name: " + propertiesFileName);
      inputStream = getClass().getClassLoader().getResourceAsStream(propertiesFileName);

      //Jeśli plik properties by nie istniał, obiekt inputStream będzie null-em. W związku z czym
      // zostanie rzucony wyjątek FileNotFoundException
      if (inputStream != null) {
        //Ładujemy properties w formie InputStream do właściwego obiektu typu Properties
        properties.load(inputStream);
        logger.info("Successfully loaded properties for file: " + propertiesFileName);
      } else {
        throw new FileNotFoundException("Property file '" + propertiesFileName + "' not found in the classpath");
      }

    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException("Cannot load properties due to IOException!");
    } finally {
      // Na sam koniec zamykamy InputStream wywołując prywatną metodę closeResource
      closeResource(inputStream);
    }

    //Zwracamy zainicjalizowany obiekt properties
    return properties;
  }

  private void closeResource(InputStream inputStream) {
    try {
      inputStream.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}