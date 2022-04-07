package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.Opinion;
import rest.services.OpinionDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/opinions")
public class OpinionController {

    private OpinionDAO dao = new OpinionDAO();

    @GetMapping("")
    public List<Opinion> getOpinions() throws SQLException, URISyntaxException{
        return dao.getOpinions();
    }

    @GetMapping("users/{uid}/publication/{pid}")
    public Opinion getOpinionByUserIdAndPublicationId(@PathVariable(value="uid") int userId, @PathVariable(value="pid") int publicationId) throws SQLException, URISyntaxException{
        return dao.getOpinionByUserIdAndPublicationId(userId, publicationId);
    }

    @PostMapping("")
    public void createOpinion(@RequestBody Opinion opinion) throws SQLException, URISyntaxException{
        dao.add(opinion);
    }

    @PutMapping("users/{uid}/publication/{pid}")
    public void updateUser(@PathVariable(value="uid") int userId, @PathVariable(value="pid") int publicationId, @RequestBody Opinion opinion) throws SQLException, URISyntaxException{
        dao.update(userId, publicationId, opinion);
    }

    @DeleteMapping("users/{uid}/publication/{pid}")
    public void updateUser(@PathVariable(value="uid") int userId, @PathVariable(value="pid") int publicationId) throws SQLException, URISyntaxException{
        dao.delete(userId, publicationId);
    }
}