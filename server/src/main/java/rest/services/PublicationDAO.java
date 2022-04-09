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
import rest.models.Publication;

public class PublicationDAO {
    private Config connection = new Config();

    public List<Publication> getPublications() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT P.* , U.userFirstName, C.categoryName \n" +
                    "FROM Users U, Publications P, Categories C \n" +
                    "WHERE P.userId = U.userId \n" +
                    "AND P.categoryId = C.categoryId";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Publication> list = new ArrayList<>();
                    while (rs.next()) {
                        Publication p = new Publication();
                        p.setFirstName(rs.getString("userFirstName"));
                        p.setCategoryName(rs.getString("categoryName"));
                        p.setPublicationId(rs.getInt("publicationid"));
                        p.setCategoryId(rs.getInt("categoryid"));
                        p.setUserId(rs.getInt("userid"));
                        p.setPublicationTitle(rs.getString("publicationtitle"));
                        p.setContent(rs.getString("content"));
                        p.setDate(rs.getString("date"));
                        list.add(p);
                    }
                    return list;
                }
            }
        }
    }

    public List<Publication> getPublicationByCategoryTagName() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT categoryName From Categories\n" +
                    "Group By categoryName;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Publication> list = new ArrayList<>();
                    while (rs.next()) {
                        Publication p = new Publication();
                        p.setCategoryName(rs.getString("categoryName"));
                        list.add(p);
                    }
                    return list;
                }

            }


        }

    }

    public List<Publication> getPublicationByCategoryName(String categoryName) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT P.* , U.userFirstName, C.categoryName\n" +
                    "FROM Publications P, Categories C, Users U\n" +
                    "WHERE P.categoryId = C.categoryId\n" +
                    "AND C.categoryName = ? \n" +
                    "ORDER BY P.date desc;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, categoryName);
                try (ResultSet rs = st.executeQuery()) {
                    List<Publication> list = new ArrayList<>();
                    while (rs.next()) {
                        Publication p = new Publication();
                        p.setPublicationId(rs.getInt("publicationid"));
                        p.setCategoryId(rs.getInt("categoryid"));
                        p.setCategoryName(rs.getString("categoryName"));
                        p.setUserId(rs.getInt("userid"));
                        p.setFirstName(rs.getString("userFirstName"));
                        p.setPublicationTitle(rs.getString("publicationtitle"));
                        p.setContent(rs.getString("content"));
                        p.setDate(rs.getString("date"));
                        list.add(p);
                    }
                    return list;
                }
            }
        }
    }

    public Publication getPublicationById(int pid, int cid, int uid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM publications WHERE publicationid=? and categoryid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, pid);
                st.setInt(2, cid);
                st.setInt(3, uid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        Publication p = new Publication();
                        p.setPublicationId(rs.getInt("publicationid"));
                        p.setCategoryId(rs.getInt("categoryid"));
                        p.setUserId(rs.getInt("userid"));
                        p.setPublicationTitle(rs.getString("publicationtitle"));
                        p.setContent(rs.getString("content"));
                        p.setDate(rs.getString("date"));
                        return p;
                    }
                    return null;
                }
            }
        }
    }

    public void add(Publication publication) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO publications (categoryid, userid, publicationtitle, content, date) VALUES(?, ?, ?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, publication.getCategoryId());
                st.setInt(2, publication.getUserId());
                st.setString(3, publication.getPublicationTitle());
                st.setString(4, publication.getContent());
                st.setString(5, publication.getDate());
                st.execute();
            }
        }
    }

    public void update(int cid, int uid, int pid, Publication publication) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE publications SET publicationtitle=?, content=?, date=? WHERE publicationid=? and categoryid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, publication.getPublicationTitle());
                st.setString(2, publication.getContent());
                st.setString(3, publication.getDate());
                st.setInt(4, pid);
                st.setInt(5, cid);
                st.setInt(6, uid);
                st.execute();
            }
        }
    }

    public void delete(int cid, int uid, int pid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM publications WHERE publicationid=? and categoryid=? and userid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, pid);
                st.setInt(2, cid);
                st.setInt(3, uid);
                st.execute();
            }
        }
    }
}
