package rest.models;

public class ClassContent {
    private int classcontentId;
    private int classId;
    private int contentCategory;
    private String contentName;
    private String contentBlob;

    public int getClassContentId() {
        return classcontentId;
    }
    public int getClassId() {
        return classId;
    }
    public int getContentCategory() {
        return contentCategory;
    }
    public String getContentName() {
        return contentName;
    }
    public String getContentBlob() {
        return contentBlob;
    }


    public void setClassContenid(int classContenId) {
        this.classcontentId = classContenId;
    }
    public void setClassId(int classId) {
        this.classId = classId;
    }
    public void setContentCategory(int contentCategory) {
        this.contentCategory = contentCategory;
    }
    public void setContentName(String contentName) {
        this.contentName = contentName;
    }
    public void setContentBlob(String contentBlob) {
        this.contentBlob = contentBlob;
    }
}
