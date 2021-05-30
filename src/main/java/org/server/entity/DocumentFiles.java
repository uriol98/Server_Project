package org.server.entity;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document
public class DocumentFiles {

    @Id
    private String _id;

    private String title;

    private Binary file;

    private String owner;

    private DocumentType documentType;

    public DocumentFiles(String title, DocumentType documentType, String owner){
        super();
        this.title = title;
        this.documentType = documentType;
        this.owner = owner;
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Binary getFile(){
        return file;
    }

    public DocumentType getDocumentType(){ return this.documentType;}

    public String getOwner(){ return this.owner ;}

    public void setFile(Binary file){
        this.file = file;
    }

    @Override
    public String toString() {
        return "File [id=" + _id + ", title=" + title + ", file=" + file + "]";
    }
}
