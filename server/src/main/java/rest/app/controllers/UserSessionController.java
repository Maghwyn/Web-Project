package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;

import rest.models.UserSession;
import rest.services.UserSessionDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users/session")
public class UserSessionController {
    private UserSessionDAO dao = new UserSessionDAO();

    @PostMapping("")
    public void createAccess(@RequestBody UserSession posess) throws SQLException, URISyntaxException{
        dao.add(posess);
    }

    @DeleteMapping("{sid}")
    public void deleteAccess(@PathVariable(value="sid") int sessId) throws SQLException, URISyntaxException{
        dao.delete(sessId);
    }
}
