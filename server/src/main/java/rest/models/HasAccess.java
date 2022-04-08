package rest.models;

public class HasAccess {
    private int classId;
    private int userId;

    public int getClassId() {
        return classId;
    }
    public int getUserId() {
        return userId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
}
