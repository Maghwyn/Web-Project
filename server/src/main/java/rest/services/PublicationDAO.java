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
            String sql = "SELECT P.*," +
                        "SUM(case when O.notation=1 then 1 else 0 end) as liked," +
                        "SUM(case when O.notation=2 then 1 else 0 end) as rework," +
                        "SUM(case when O.notation=3 then 1 else 0 end) as deprecated," +
                        "O.publicationId,  U.userFirstName, C.categoryName " +
                        "FROM Publications P " +
                        "JOIN users U on U.userId = P.userId " +
                        "JOIN Categories C on C.categoryId = P.categoryId " +
                        "LEFT JOIN Opinions O on P.publicationid = O.publicationid " +
                        "GROUP BY P.publicationId, O.publicationId, U.userFirstName, C.categoryName " +
                        "ORDER BY P.date desc;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Publication> list = new ArrayList<>();
                    while (rs.next()){
                        Publication p = new Publication();
                            p.setPublicationId(rs.getInt("publicationid"));
                            p.setCategoryId(rs.getInt("categoryid"));
                            p.setUserId(rs.getInt("userid"));
                            p.setPublicationTitle(rs.getString("publicationtitle"));
                            p.setContent(rs.getString("content"));
                            p.setDate(rs.getString("date"));
                            p.setLiked(rs.getInt("liked"));
                            p.setRework(rs.getInt("rework"));
                            p.setDeprecated(rs.getInt("deprecated"));
                            p.setNotationPublicationId(rs.getInt("publicationid"));
                            p.setFirstName(rs.getString("userFirstname"));
                            p.setCategoryName(rs.getString("categoryname"));
                            list.add(p);
                        }
                    return list;
                }
            }
        }
    }

    public List<Publication> getPublicationByCategoryTagName() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT categoryname FROM categories;";
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
            String sql = "Select P.*, U.userFirstName, C.categoryName\n" +
                        "FROM publications P\n" +
                        "Left JOIN users U On U.userId = P.userid\n" +
                        "Left JOIN categories C on C.categoryid = P.categoryid\n" +
                        "Where C.categoryname = ?\n" +
                        "ORDER BY  P.date desc;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, categoryName);
                try (ResultSet rs = st.executeQuery()) {
                    List<Publication> list = new ArrayList<>();
                    while (rs.next()) {
                        Publication p = new Publication();
                        p.setNotationPublicationId(rs.getInt("publicationid"));
                        p.setFirstName(rs.getString("userFirstname"));
                        p.setCategoryName(rs.getString("categoryname"));
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
            String sql = "INSERT INTO publications (categoryid, userid, publicationtitle, content) VALUES(?, ?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, publication.getCategoryId());
                st.setInt(2, publication.getUserId());
                st.setString(3, publication.getPublicationTitle());
                st.setString(4, publication.getContent());
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
