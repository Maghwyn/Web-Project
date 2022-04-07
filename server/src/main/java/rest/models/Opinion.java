package rest.models;

public class Opinion {
    private int userId;
    private int publicationId;
    private int notation;

    public int getUserId() {
        return userId;
    }
    public int getPublicationId() {
        return publicationId;
    }
    public int getNotation() {
        return notation;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    public void setPublicationId(int publicationId) {
        this.publicationId = publicationId;
    }
    public void setNotation(int notation) {
        this.notation = notation;
    }
}
