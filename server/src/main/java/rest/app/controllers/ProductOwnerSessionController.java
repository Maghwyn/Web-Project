package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.*;
import rest.models.ProductOwnerSession;
import rest.services.ProductOwnerSessionDAO;

@RestController
@RequestMapping("api/v1/productowners/session")
public class ProductOwnerSessionController {
    private ProductOwnerSessionDAO dao = new ProductOwnerSessionDAO();

    @GetMapping("{gid}")
    public Boolean getSessionByGID(@PathVariable(value="gid") String poGID) throws SQLException, URISyntaxException {
        return dao.getSessionByGID(poGID) != null;
    }

    @PostMapping("")
    public void createAccess(@RequestBody ProductOwnerSession posess) throws SQLException, URISyntaxException{
        dao.add(posess);
    }

    @DeleteMapping("{sid}")
    public void deleteAccess(@PathVariable(value="sid") String sessId) throws SQLException, URISyntaxException{
        dao.delete(sessId);
    }
}
