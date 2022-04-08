package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import rest.app.Config;
import rest.models.UserSession;

public class UserSessionDAO {
    private Config connection = new Config();

    public void add(UserSession userSess) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO userssession (userid) VALUES(?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, userSess.getUserId());
                st.execute();
            }
        }
    }

    public void delete(int sid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM userssession WHERE usersessionid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, sid);
                st.execute();
            }
        }
    }
}