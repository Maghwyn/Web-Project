package rest.models;

public class Publication {
    private int publicationId;
    private int categoryId;
    private int userId;
    private String publicationTitle;
    private String content;
    private String date;
    private int liked;
    private int rework;
    private int deprecated; 
    private int notationPublicationId;
    private String firstName;
    private String categoryName;

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
    public int getLiked() {
        return liked;
    }
    public int getRework() {
        return rework;
    }
    public int getDeprecated() {
        return deprecated;
    }
    public int getNotationPublicationId() {
        return notationPublicationId;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getCategoryName() {
        return categoryName;
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
    public void setLiked(int liked) {
        this.liked = liked;
    }
    public void setRework(int rework) {
        this.rework = rework;
    }
    public void setDeprecated(int deprecated) {
        this.deprecated = deprecated;
    }
    public void setNotationPublicationId(int notationPublicationId) {
        this.notationPublicationId = notationPublicationId;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
