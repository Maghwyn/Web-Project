package rest.models;

public class ProductOwnerSession {
    private String productOwnerSID;
    private String productOwnerGID;

    public String getProductOwnerSID() {
        return productOwnerSID;
    }
    public String getProductOwnerGID() {
        return productOwnerGID;
    }

    public void setProductOwnerSID(String productOwnerSID) {
        this.productOwnerSID = productOwnerSID;
    }
    public void setProductOwnerGID(String productOwnerGID) {
        this.productOwnerGID = productOwnerGID;
    }
}
