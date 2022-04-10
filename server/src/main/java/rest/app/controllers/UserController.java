package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import rest.models.User;
import rest.services.UserDAO;

@CrossOrigin(origins = "http://localhost:3000")
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