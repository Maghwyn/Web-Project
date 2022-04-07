package rest.models;

public class Publication {
    private int publicationId;
    private int categoryId;
    private int userId;
    private String publicationTitle;
    private String content;
    private String date;

    public int getPublicationId() {
        return publicationId;
    }
    public int getCategoryId() {
        return categoryId;
    }
    public int getUserId() {
        return userId;
    }
    public String getPublicationTitle() {
        return publicationTitle;
    }
    public String getContent() {
        return content;
    }
    public String getDate() {
        return date;
    }

    public void setPublicationId(int publicationId) {
        this.publicationId = publicationId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public void setPublicationTitle(String publicationTitle) {
        this.publicationTitle = publicationTitle;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setDate(String date) {
        this.date = date;
    }
}
