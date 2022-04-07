package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import rest.app.Config;
import rest.models.Opinion;

@Component
public class OpinionDAO {

    private Config connection = new Config();

    public List<Opinion> getOpinions() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM opinions;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Opinion> list = new ArrayList<>();
                    while (rs.next()) {
                        Opinion o = new Opinion();
                        o.setUserId(rs.getInt("userid"));
                        o.setPublicationId(rs.getInt("publicationid"));
                        o.setNotation(rs.getInt("notation"));
                        list.add(o);
                    }
                    return list;
                }
            }
        }
    }

    public Opinion getOpinionByUserIdAndPublicationId(int uid, int pid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM opinions WHERE userid=? and publicationid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, uid);
                st.setInt(2, pid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        Opinion o = new Opinion();
                        o.setUserId(rs.getInt("userid"));
                        o.setPublicationId(rs.getInt("publicationid"));
                        o.setNotation(rs.getInt("notation"));
                        return o;
                    }
                    return null;
                }
            }
        }
    }

    public void add(Opinion opinion) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO opinions (userid, publicationid, notation) VALUES(?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, opinion.getUserId());
                st.setInt(2, opinion.getPublicationId());
                st.setInt(3, opinion.getNotation());
                st.execute();
            }
        }
    }

    public void update(int uid, int pid, Opinion opinion) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE opinions SET userid=? , publicationid=?, notation=? WHERE userid=? and publicationid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, opinion.getUserId());
                st.setInt(2, opinion.getPublicationId());
                st.setInt(3, opinion.getNotation());
                st.setInt(4, uid);
                st.setInt(5, pid);
                st.execute();
            }
        }
    }

    public void delete(int uid, int pid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM opinions WHERE userid=? and publicationid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, uid);
                st.setInt(2, pid);
                st.execute();
            }
        }
    }
}