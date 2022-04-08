package rest.services;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import rest.app.Config;
import rest.models.ProductOwnerSession;

public class ProductOwnerSessionDAO {
    private Config connection = new Config();

    public void add(ProductOwnerSession userSess) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO productownerssession (userid) VALUES(?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, userSess.getProductOwnerId());
                st.execute();
            }
        }
    }

    public void delete(int sid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM productownerssession WHERE productownersessionid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, sid);
                st.execute();
            }
        }
    }
}
