package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.app.Config;
import rest.models.UserSession;

public class UserSessionDAO {
    private Config connection = new Config();

    public UserSession getSessionByGID(String gid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM userssession WHERE usergid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, gid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        UserSession us = new UserSession();
                        us.setUserSID(rs.getString("usersessionid"));
                        us.setUserGID(rs.getString("usergid"));
                        return us;
                    }
                    return null;
                }
            }
        }
    }

    public void add(UserSession userSess) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO userssession (usergid) VALUES(?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, userSess.getUserGID());
                st.execute();
            }
        }
    }

    public void delete(String sid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM userssession WHERE usersessionid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, sid);
                st.execute();
            }
        }
    }
}