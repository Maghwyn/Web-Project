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
import rest.models.ProductOwner;

public class ProductOwnerDAO {
    
    private Config connection = new Config();

    public List<ProductOwner> getProductOwners() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM productowners;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<ProductOwner> list = new ArrayList<>();
                    while (rs.next()) {
                        ProductOwner p = new ProductOwner();
                        p.setId(rs.getInt("productownerid"));
                        p.setFirstName(rs.getString("productownerfirstname"));
                        p.setLastName(rs.getString("productownerlastname"));
                        p.setEmail(rs.getString("productowneremail"));
                        list.add(p);
                    }
                    return list;
                }
            }
        }
    }

    public ProductOwner getProductOwnerById(int poid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM productowners WHERE productownerid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, poid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        ProductOwner p = new ProductOwner();
                        p.setId(rs.getInt("productownerid"));
                        p.setFirstName(rs.getString("productownerfirstname"));
                        p.setLastName(rs.getString("productownerlastname"));
                        p.setEmail(rs.getString("productowneremail"));
                        return p;
                    }
                    return null;
                }
            }
        }
    }

    public void add(ProductOwner po) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO productowners (productownerfirstname, productownerlastname, productowneremail) VALUES(?, ?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, po.getFirstName());
                st.setString(2, po.getLastName());
                st.setString(3, po.getEmail());
                st.execute();
            }
        }
    }

    public void update(int poid, ProductOwner po) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE productowners SET productownerfirstname=? , productownerlastname=?, productowneremail=? WHERE productownerid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, po.getFirstName());
                st.setString(2, po.getLastName());
                st.setString(3, po.getEmail());
                st.setInt(5, poid);
                st.execute();
            }
        }
    }

    public void delete(int poid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM productowners WHERE productownerid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, poid);
                st.execute();
            }
        }
    }
}