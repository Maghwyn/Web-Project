package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.HasAccess;
import rest.services.HasAccessDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/access")
public class HasAccessController {
    private HasAccessDAO dao = new HasAccessDAO();

    @GetMapping("")
    public List<HasAccess> getAllAccess() throws SQLException, URISyntaxException{
        return dao.getAllAccess();
    }

    @GetMapping("users/{uid}/classes/{cid}")
    public HasAccess getSpecificAccessByIds(@PathVariable(value="uid") int userId, @PathVariable(value="cid") int classId) throws SQLException, URISyntaxException{
        return dao.getSpecificAccessByIds(userId, classId);
    }

    @PostMapping("")
    public void createAccess(@RequestBody HasAccess opinion) throws SQLException, URISyntaxException{
        dao.add(opinion);
    }

    @PutMapping("users/{uid}/classes/{cid}")
    public void updateAccess(@PathVariable(value="uid") int userId, @PathVariable(value="cid") int classId) throws SQLException, URISyntaxException{
        dao.update(userId, classId);
    }

    @DeleteMapping("users/{uid}/classes/{cid}")
    public void deleteAccess(@PathVariable(value="uid") int userId, @PathVariable(value="cid") int classId) throws SQLException, URISyntaxException{
        dao.delete(userId, classId);
    }
}
