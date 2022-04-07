package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import rest.models.Category;
import rest.services.CategoryDAO;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/category")
public class CategoryController {
    private CategoryDAO dao = new CategoryDAO();

    @GetMapping("")
    public List<Category> getCategories() throws SQLException, URISyntaxException{
        return dao.getCategories();
    }

    @GetMapping("{cid}")
    public Category getCategoryById(@PathVariable(value="uid") int categoryId) throws SQLException, URISyntaxException{
        return dao.getCategoryById(categoryId);
    }

    @PostMapping("")
    public void createCategory(@RequestBody Category category) throws SQLException, URISyntaxException{
        dao.add(category);
    }

    @PutMapping("{cid}")
    public void updateCategory(@PathVariable(value="cid") int categoryId, int publicationId, @RequestBody Category category) throws SQLException, URISyntaxException{
        dao.update(categoryId, category);
    }

    @DeleteMapping("{cid}")
    public void deleteCategory(@PathVariable(value="cid") int categoryId) throws SQLException, URISyntaxException{
        dao.delete(categoryId);
    }
}
