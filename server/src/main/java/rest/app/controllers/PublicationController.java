package rest.app.controllers;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.Publication;
import rest.services.PublicationDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/publications")
public class PublicationController {
    private PublicationDAO dao = new PublicationDAO();

    @GetMapping("")
    public List<Publication> getPublications() throws SQLException, URISyntaxException{
        return dao.getPublications();
    }

    @GetMapping("{pid}/categories/{cid}/users/{uid}")
    public Publication getPublicationById(@PathVariable(value="pid") int publicationId, @PathVariable(value="cid") int categoryId, @PathVariable(value="uid") int userId) throws SQLException, URISyntaxException{
        return dao.getPublicationById(publicationId, categoryId, userId);
    }

    @PostMapping("")
    public void createPublication(@RequestBody Publication publication) throws SQLException, URISyntaxException{
        dao.add(publication);
    }

    @PutMapping("users/{uid}/publication/{pid}")
    public void updatePublication(@PathVariable(value="pid") int publicationId, @PathVariable(value="cid") int categoryId, @PathVariable(value="uid") int userId, @RequestBody Publication publication) throws SQLException, URISyntaxException{
        dao.update(publicationId, categoryId, userId, publication);
    }

    @DeleteMapping("users/{uid}/publication/{pid}")
    public void deletePublication(@PathVariable(value="pid") int publicationId, @PathVariable(value="cid") int categoryId, @PathVariable(value="uid") int userId) throws SQLException, URISyntaxException{
        dao.delete(publicationId, categoryId, userId);
    }
}
