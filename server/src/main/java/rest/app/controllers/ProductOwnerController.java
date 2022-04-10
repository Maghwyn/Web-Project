package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

import rest.models.ProductOwner;
import rest.services.ProductOwnerDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/productowners")
public class ProductOwnerController {
    private ProductOwnerDAO dao = new ProductOwnerDAO();

    @GetMapping("")
    public List<ProductOwner> getProductOwners() throws SQLException, URISyntaxException{
        return dao.getProductOwners();
    }

    @GetMapping("/{id}")
    public ProductOwner getProductOwnerById(@PathVariable(value="id") int poId) throws SQLException, URISyntaxException{
        return dao.getProductOwnerById(poId);
    }

    @GetMapping("g/{gid}/{token}")
    public ProductOwner getProductOwnerByGID(@PathVariable(value="gid") String poGID, @PathVariable(value="token") String token) throws SQLException, URISyntaxException{
        if(!Objects.equals(token, "3KM0gO-at1nxoVfqb5W5E-HLEHrYH5BLiwpC-jNRlOd")) return new ProductOwner();
        return dao.getProductOwnerByGID(poGID);
    }

    @PostMapping("")
    public void createProductOwner(@RequestBody ProductOwner po) throws SQLException, URISyntaxException{
        dao.add(po);
    }

    @PutMapping("/{id}")
    public void updateProductOwner(@PathVariable(value="id") int poId, @RequestBody ProductOwner po) throws SQLException, URISyntaxException{
        dao.update(poId, po);
    }

    @DeleteMapping("/{id}")
    public void deleteProductOwner(@PathVariable(value="id") int poId) throws SQLException, URISyntaxException{
        dao.delete(poId);
    }
}