package rest.models;

public class ProductOwnerSession {
    private int productOwnerSID;
    private int productOwnerId;

    public int getProductOwnerSID() {
        return productOwnerSID;
    }
    public int getProductOwnerId() {
        return productOwnerId;
    }

    public void setProductOwnerSID(int productOwnerSID) {
        this.productOwnerSID = productOwnerSID;
    }
    public void setProductOwnerId(int productOwnerId) {
        this.productOwnerId = productOwnerId;
    }
}
