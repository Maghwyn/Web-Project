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
        "postgres://cqzghqhjzvgpbt:6c5ece08e764fa97cb4da958ae8b906b12017e880987f9ac4ec56f547ae7864a@ec2-54-228-32-29.eu-west-1.compute.amazonaws.com:5432/d4hd8gpo1p93eu");
    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

    return DriverManager.getConnection(dbUrl, username, password);
  }

}
