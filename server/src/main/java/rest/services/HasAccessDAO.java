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
import rest.models.HasAccess;

public class HasAccessDAO {
    private Config connection = new Config();

    public List<HasAccess> getAllAccess() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM hasaccess;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<HasAccess> list = new ArrayList<>();
                    while (rs.next()) {
                        HasAccess h = new HasAccess();
                        h.setClassId(rs.getInt("classid"));
                        h.setUserId(rs.getInt("userid"));
                        list.add(h);
                    }
                    return list;
                }
            }
        }
    }

    public List<HasAccess> getAllAccessByUserId(int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM hasaccess WHERE userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, uid);
                try (ResultSet rs = st.executeQuery()) {
                    List<HasAccess> list = new ArrayList<>();
                    while (rs.next()) {
                        HasAccess h = new HasAccess();
                        h.setClassId(rs.getInt("classid"));
                        h.setUserId(rs.getInt("userid"));
                        list.add(h);
                    }
                    return list;
                }
            }
        }
    }

    public HasAccess getSpecificAccessByIds(int uid, int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM hasaccess WHERE classid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.setInt(2, uid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        HasAccess h = new HasAccess();
                        h.setClassId(rs.getInt("classid"));
                        h.setUserId(rs.getInt("userid"));
                        return h;
                    }
                    return null;
                }
            }
        }
    }

    public void add(HasAccess access) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO hasaccess (classid, userid) VALUES(?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, access.getClassId());
                st.setInt(2, access.getUserId());
                st.execute();
            }
        }
    }

    public void update(int cid, int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE hasaccess SET classid=? and userid=? WHERE classid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.setInt(2, uid);
                st.setInt(3, cid);
                st.setInt(4, uid);
                st.execute();
            }
        }
    }

    public void delete(int cid, int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM hasaccess WHERE classid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.setInt(2, uid);
                st.execute();
            }
        }
    }
}