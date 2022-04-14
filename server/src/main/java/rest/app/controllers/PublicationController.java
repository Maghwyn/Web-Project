package rest.app.controllers;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import rest.models.Publication;
import rest.services.PublicationDAO;

@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/{categoryName}")
    public List<Publication> getPublicationByCategoryName(@PathVariable(value = "categoryName") String categoryName) throws SQLException, URISyntaxException {
        return dao.getPublicationByCategoryName(categoryName);
    }

    @GetMapping("/categoryTagName")
    public List<Publication> getPublicationByCategoryTagName() throws SQLException, URISyntaxException {
        return dao.getPublicationByCategoryTagName();
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
