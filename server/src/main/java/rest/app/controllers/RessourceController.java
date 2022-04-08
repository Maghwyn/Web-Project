package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.Ressource;
import rest.services.RessourceDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/ressource")
public class RessourceController {
    private RessourceDAO dao = new RessourceDAO();

    @GetMapping("")
    public List<Ressource> getRessources() throws SQLException, URISyntaxException{
        return dao.getRessources();
    }

    @GetMapping("{rid}")
    public Ressource getRessourceById(@PathVariable(value="rid") int resourceId) throws SQLException, URISyntaxException{
        return dao.getRessourceById(resourceId);
    }

    @PostMapping("")
    public void createRessource(@RequestBody Ressource ressource) throws SQLException, URISyntaxException{
        dao.add(ressource);
    }

    @PutMapping("{rid}")
    public void updateRessource(@PathVariable(value="rid") int resourceId, @RequestBody Ressource ressource) throws SQLException, URISyntaxException{
        dao.update(resourceId, ressource);
    }

    @DeleteMapping("{rid}")
    public void deleteRessource(@PathVariable(value="rid") int resourceId) throws SQLException, URISyntaxException{
        dao.delete(resourceId);
    }
}