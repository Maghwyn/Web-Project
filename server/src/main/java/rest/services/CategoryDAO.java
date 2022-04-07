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
import rest.models.Category;

public class CategoryDAO {
    private Config connection = new Config();

    public List<Category> getCategories() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM categories;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Category> list = new ArrayList<>();
                    while (rs.next()) {
                        Category c = new Category();
                        c.setCategoryId(rs.getInt("categoryid"));
                        c.setCategoryName(rs.getString("categoryname"));
                        list.add(c);
                    }
                    return list;
                }
            }
        }
    }

    public Category getCategoryById(int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM categories WHERE categoryid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        Category c = new Category();
                        c.setCategoryId(rs.getInt("categoryid"));
                        c.setCategoryName(rs.getString("categoryname"));
                        return c;
                    }
                    return null;
                }
            }
        }
    }

    public void add(Category category) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO categories (categoryname) VALUES(?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, category.getCategoryName());
                st.execute();
            }
        }
    }

    public void update(int cid, Category category) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE categories SET categoryname=? WHERE categoryid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setString(1, category.getCategoryName());
                st.setInt(2, cid);
                st.execute();
            }
        }
    }

    public void delete(int cid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM categories WHERE categoryid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, cid);
                st.execute();
            }
        }
    }
}