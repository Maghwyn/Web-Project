package rest.app;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.stereotype.Component;

@Component
public class Config {
  public Connection get() throws URISyntaxException, SQLException {

    URI dbUri = new URI(
        "postgres://fonpjmncwqvgji:9b8e02aa7ab99b7134fb99d83af1a79dc931a69b6d0d9024c6c9fc5f3314cfe1@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/d9jl916kmtmhcd");
    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

    return DriverManager.getConnection(dbUrl, username, password);
  }

}
