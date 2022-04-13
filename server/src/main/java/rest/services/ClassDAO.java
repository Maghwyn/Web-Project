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
import rest.models.Class;

public class ClassDAO {
    private Config connection = new Config();

    public List<Class> getClasses() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM classes;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Class> list = new ArrayList<>();
                    while (rs.next()) {
                        Class c = new Class();
                        c.setClassId(rs.getInt("classid"));
                        c.setProductOwnerId(rs.getInt("productownerid"));
                        c.setClassName(rs.getString("classname"));
                        c.setDate(rs.getString("date"));
                        list.add(c);
                    }
                    return list;
                }
            }
        }
    }

    public List<Class> getClassesAndPoNames() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql =
                    "SELECT C.classid, C.productownerid, C.classname, C.date, P.productownerfirstname, P.productownerlastname\n" +
                    "FROM classes as C, productowners as P\n" +
                    "WHERE C.productownerid = P.productownerid;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                try (ResultSet rs = st.executeQuery()) {
                    List<Class> list = new ArrayList<>();
                    while (rs.next()) {
                        Class c = new Class();
                        c.setClassId(rs.getInt("classid"));
                        c.setClassName(rs.getString("classname"));
                        c.setDate(rs.getString("date"));
                        c.setProductOwnerFirstName(rs.getString("productownerfirstname"));
                        c.setProductOwnerLastName(rs.getString("productownerlastname"));
                        list.add(c);
                    }
                    return list;
                }
            }
        }
    }

    public Class getClassById(int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM classes WHERE classid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        Class c = new Class();
                        c.setClassId(rs.getInt("classid"));
                        c.setProductOwnerId(rs.getInt("productownerid"));
                        c.setClassName(rs.getString("classname"));
                        c.setDate(rs.getString("date"));
                        return c;
                    }
                    return null;
                }
            }
        }
    }

    public void add(Class sclass) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO classes (productownerid, classname, date) VALUES(?, ?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, sclass.getProductOwnerId());
                st.setString(2, sclass.getClassName());
                st.setString(3, sclass.getDate());
                st.execute();
            }
        }
    }

    public void update(int cid, Class sclass) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE classes SET productownerid=?, classname=?, date=? WHERE classid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, sclass.getProductOwnerId());
                st.setString(2, sclass.getClassName());
                st.setString(3, sclass.getDate());
                st.setInt(4, cid);
                st.execute();
            }
        }
    }

    public void delete(int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM classes WHERE classid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.execute();
            }
        }
    }
}