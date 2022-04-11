package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import rest.app.Config;
import rest.models.User;

public class UserDAO {
    
    private Config connection = new Config();

    public List<User> getUsers() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM users;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<User> list = new ArrayList<>();
                    while (rs.next()) {
                        User u = new User();
                        u.setId(rs.getInt("userid"));
                        u.setFirstName(rs.getString("userfirstname"));
                        u.setLastName(rs.getString("userlastname"));
                        u.setCanView(rs.getInt("canview"));
                        u.setEmail(rs.getString("useremail"));
                        u.setUserGID(rs.getString("usergid"));
                        list.add(u);
                    }
                    return list;
                }
            }
        }
    }

    public User getUserById(int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM users WHERE userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, uid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        User u = new User();
                        u.setId(rs.getInt("userid"));
                        u.setFirstName(rs.getString("userfirstname"));
                        u.setLastName(rs.getString("userlastname"));
                        u.setCanView(rs.getInt("canview"));
                        u.setEmail(rs.getString("useremail"));
                        u.setUserGID(rs.getString("usergid"));
                        return u;
                    }
                    return null;
                }
            }
        }
    }

    public User getUserByGID(String gid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM users WHERE usergid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, gid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        User u = new User();
                        u.setId(rs.getInt("userid"));
                        u.setFirstName(rs.getString("userfirstname"));
                        u.setLastName(rs.getString("userlastname"));
                        u.setCanView(rs.getInt("canview"));
                        u.setEmail(rs.getString("useremail"));

                        System.out.println(u.getId());
                        return u;
                    }
                    return null;
                }
            }
        }
    }

    public void add(User user) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO users (userfirstname, userlastname, useremail, canview, usergid) VALUES(?, ?, ?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, user.getFirstName());
                st.setString(2, user.getLastName());
                st.setString(3, user.getEmail());
                st.setInt(4, user.getCanView());
                st.setString(5, user.getUserGID());
                st.execute();
            }
        }
    }

    public void update(int uid, User user) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE users SET userfirstname=? , userlastname=?, useremail=?, canview=? WHERE userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, user.getFirstName());
                st.setString(2, user.getLastName());
                st.setString(3, user.getEmail());
                st.setInt(4, user.getCanView());
                st.setInt(5, uid);
                st.execute();
            }
        }
    }

    public void delete(int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM users WHERE userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, uid);
                st.execute();
            }
        }
    }
}