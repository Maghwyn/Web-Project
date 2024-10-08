package rest.models;

public class Class {
    private int classId;
    private int productOwnerId;
    private String className;
    private String date;
    private String productOwnerFirstName;
    private String productOwnerLastName;

    public int getClassId() {
        return classId;
    }
    public int getProductOwnerId() {
        return productOwnerId;
    }
    public String getClassName() {
        return className;
    }
    public String getDate() {
        return date;
    }
    public String getProductOwnerFirstName() {
        return productOwnerFirstName;
    }
    public String getProductOwnerLastName() {
        return productOwnerLastName;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }
    public void setProductOwnerId(int productOwnerId) {
        this.productOwnerId = productOwnerId;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public void setProductOwnerFirstName(String productOwnerFirstName) {
        this.productOwnerFirstName = productOwnerFirstName;
    }
    public void setProductOwnerLastName(String productOwnerLastName) {
        this.productOwnerLastName = productOwnerLastName;
    }
}
