package rest.models;

public class UserSession {
    private String userSID;
    private String userGID;

    public String getUserSID() {
        return userSID;
    }
    public String getUserGID() {
        return userGID;
    }

    public void setUserSID(String userSID) {
        this.userSID = userSID;
    }
    public void setUserGID(String userGID) {
        this.userGID = userGID;
    }
}
