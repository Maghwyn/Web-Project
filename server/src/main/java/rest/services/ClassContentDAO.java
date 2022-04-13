package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import rest.app.Config;
import rest.models.ClassContent;

public class ClassContentDAO {
    private Config connection = new Config();

    public List<ClassContent> getContentByClassId(int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM classescontent WHERE classid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                try (ResultSet rs = st.executeQuery()) {
                    List<ClassContent> list = new ArrayList<>();
                    while (rs.next()) {
                        ClassContent c = new ClassContent();
                        c.setClassContenid(rs.getInt("classcontentid"));
                        c.setClassId(rs.getInt("classid"));
                        c.setContentCategory(rs.getInt("contentcategory"));
                        c.setContentName(rs.getString("contentname"));
                        c.setContentBlob(rs.getString("contentblob"));
                        list.add(c);
                    }
                    return list;
                }
            }
        }
    }

    public void add(ClassContent content) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO classescontent (classid, contentcategory, contentname, contentblob) VALUES(?, ?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, content.getClassId());
                st.setInt(2, content.getContentCategory());
                st.setString(3, content.getContentName());
                st.setString(4, content.getContentBlob());
                st.execute();
            }
        }
    }

    public void update(int cid, ClassContent content) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE classescontent SET contentname=? WHERE classid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, content.getContentName());
                st.setInt(2, cid);
                st.execute();
            }
        }
    }

    public void delete(int cid, String name) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM classescontent WHERE classid=? and contentname=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.setString(2, name);
                st.execute();
            }
        }
    }
}