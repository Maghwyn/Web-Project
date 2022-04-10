package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rest.app.Config;
import rest.models.ProductOwnerSession;

public class ProductOwnerSessionDAO {
    private Config connection = new Config();

    public ProductOwnerSession getSessionByGID(String gid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM productownerssession WHERE productownergid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, gid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        ProductOwnerSession us = new ProductOwnerSession();
                        us.setProductOwnerSID(rs.getString("productownersessionid"));
                        us.setProductOwnerGID(rs.getString("productownergid"));
                        return us;
                    }
                    return null;
                }
            }
        }
    }

    public void add(ProductOwnerSession userSess) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO productownerssession (productownergid) VALUES(?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, userSess.getProductOwnerGID());
                st.execute();
            }
        }
    }

    public void delete(String sid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM productownerssession WHERE productownersessionid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, sid);
                st.execute();
            }
        }
    }
}
