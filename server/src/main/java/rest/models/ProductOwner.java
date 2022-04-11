package rest.models;

public class ProductOwner {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String poGID;

    public int getId() {
        return id;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getEmail() {
        return email;
    }
    public String getPoGID() {
        return poGID;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPoGID(String poGID) {
        this.poGID = poGID;
    }
}