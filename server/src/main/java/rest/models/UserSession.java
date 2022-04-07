package rest.models;

public class UserSession {
    private int userSID;
    private int userId;

    public int getUserSID() {
        return userSID;
    }
    public int getUserId() {
        return userId;
    }

    public void setUserSID(int userSID) {
        this.userSID = userSID;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
}
