package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.User;
import rest.services.UserDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private UserDAO dao = new UserDAO();

    @GetMapping("")
    public List<User> getUsers() throws SQLException, URISyntaxException{
        return dao.getUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable(value="id") int userId) throws SQLException, URISyntaxException{
        return dao.getUserById(userId);
    }

    @PostMapping("")
    public void createUser(@RequestBody User user) throws SQLException, URISyntaxException{
        dao.add(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable(value="id") int userId, @RequestBody User user) throws SQLException, URISyntaxException{
        dao.update(userId, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable(value="id") int userId) throws SQLException, URISyntaxException{
        dao.delete(userId);
    }
}