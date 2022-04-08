package rest.models;

public class Ressource {
    private int resourceId;
    private int categoryId;
    private String resourceName;

    public int getResourceId() {
        return resourceId;
    }
    public int getCategoryId() {
        return categoryId;
    }
    public String getResourceName() {
        return resourceName;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }
}
