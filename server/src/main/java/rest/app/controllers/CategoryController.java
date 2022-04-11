package rest.app.controllers;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import rest.models.Category;
import rest.services.CategoryDAO;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/category")
public class CategoryController {
    private CategoryDAO dao = new CategoryDAO();

    @GetMapping("")
    public List<Category> getCategories() throws SQLException, URISyntaxException{
        return dao.getCategories();
    }

    @GetMapping("/name/{categoryName}")
    public Category getCategoryByName(@PathVariable(value = "categoryName") String categoryName) throws SQLException, URISyntaxException {
        return dao.getCategoryByName(categoryName);
    }

    @GetMapping("{cid}")
    public Category getCategoryById(@PathVariable(value="cid") int categoryId) throws SQLException, URISyntaxException{
        return dao.getCategoryById(categoryId);
    }

    @PostMapping("")
    public void createCategory(@RequestBody Category category) throws SQLException, URISyntaxException{
        dao.createCategory(category);
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
