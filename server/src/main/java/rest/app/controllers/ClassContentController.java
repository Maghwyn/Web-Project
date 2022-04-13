package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.ClassContent;
import rest.services.ClassContentDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/content")
public class ClassContentController {
    private ClassContentDAO dao = new ClassContentDAO();

    @GetMapping("classes/{cid}")
    public List<ClassContent> getContentByClassId(@PathVariable(value="cid") int classId) throws SQLException, URISyntaxException{
        return dao.getContentByClassId(classId);
    }

    @PostMapping("")
    public void createClass(@RequestBody ClassContent content) throws SQLException, URISyntaxException{
        dao.add(content);
    }

    @PutMapping("classes/{cid}")
    public void updateClass(@PathVariable(value="cid") int classId, @RequestBody ClassContent content) throws SQLException, URISyntaxException{
        dao.update(classId, content);
    }

    @DeleteMapping("classes/{cid}/{name}")
    public void deleteClass(@PathVariable(value="cid") int classId, @PathVariable(value="name") String name) throws SQLException, URISyntaxException{
        dao.delete(classId, name);
    }
}