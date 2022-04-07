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
import rest.models.Ressource;

public class RessourceDAO {
    private Config connection = new Config();

    public List<Ressource> getRessources() throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM resources;";
            try (Statement st = co.createStatement()) {
                try (ResultSet rs = st.executeQuery(sql)) {
                    List<Ressource> list = new ArrayList<>();
                    while (rs.next()) {
                        Ressource c = new Ressource();
                        c.setResourceId(rs.getInt("ressourceid"));
                        c.setCategoryId(rs.getInt("categoryid"));
                        c.setResourceName(rs.getString("ressourcename"));
                        list.add(c);
                    }
                    return list;
                }
            }
        }
    }

    public Ressource getRessourceById(int rid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "SELECT * FROM categories WHERE ressourceid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, rid);
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                        Ressource c = new Ressource();
                        c.setResourceId(rs.getInt("ressourceid"));
                        c.setCategoryId(rs.getInt("categoryid"));
                        c.setResourceName(rs.getString("ressourcename"));
                        return c;
                    }
                    return null;
                }
            }
        }
    }

    public void add(Ressource ressource) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "INSERT INTO categories (categoryid, ressourcename) VALUES(?, ?);";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, ressource.getCategoryId());
                st.setString(2, ressource.getResourceName());
                st.execute();
            }
        }
    }

    public void update(int rid, Ressource ressource) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "UPDATE categories SET categoryid=? and ressourcename=? WHERE ressourceid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, ressource.getCategoryId());
                st.setString(2, ressource.getResourceName());
                st.setInt(4, rid);
                st.execute();
            }
        }
    }

    public void delete(int rid) throws SQLException, URISyntaxException {
        try (Connection co = connection.get()) {
            String sql = "DELETE FROM categories WHERE ressourceid=?;";
            try (PreparedStatement st = co.prepareStatement(sql)) {
                st.setInt(1, rid);
                st.execute();
            }
        }
    }
}
