package rest.models;

public class User {
    private int id;
    private String firstName;
    private String lastName;
    private int canView;
    private String email;
    private String userGID;

    public int getId() {
        return id;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public int getCanView() {
        return canView;
    }
    public String getEmail() {
        return email;
    }
    public String getUserGID() {
        return userGID;
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
    public void setCanView(int canView) {
        this.canView = canView;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setUserGID(String userGID) {
        this.userGID = userGID;
    }
}