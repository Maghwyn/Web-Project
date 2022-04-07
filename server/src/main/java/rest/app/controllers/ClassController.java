package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.Class;
import rest.services.ClassDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/classes")
public class ClassController {
    private ClassDAO dao = new ClassDAO();

    @GetMapping("")
    public List<Class> getClasses() throws SQLException, URISyntaxException{
        return dao.getClasses();
    }

    @GetMapping("{id}")
    public Class getClassById(@PathVariable(value="id") int classId) throws SQLException, URISyntaxException{
        return dao.getClassById(classId);
    }

    @PostMapping("")
    public void createClass(@RequestBody Class sclass) throws SQLException, URISyntaxException{
        dao.add(sclass);
    }

    @PutMapping("{id}")
    public void updateClass(@PathVariable(value="id") int classId, @RequestBody Class sclass) throws SQLException, URISyntaxException{
        dao.update(classId, sclass);
    }

    @DeleteMapping("{id}")
    public void updateClass(@PathVariable(value="id") int classId) throws SQLException, URISyntaxException{
        dao.delete(classId);
    }
}