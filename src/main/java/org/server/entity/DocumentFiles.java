package org.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.servlet.View;


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

    @JsonView(Views.Public.class)
    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    @JsonView(Views.Public.class)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @JsonIgnore
    public Binary getFile(){
        return file;
    }

    @JsonView(Views.Public.class)
    public DocumentType getDocumentType(){ return this.documentType;}

    @JsonView(Views.Public.class)
    public String getOwner(){ return this.owner ;}

    public void setFile(Binary file){
        this.file = file;
    }
/*
    @Override
    public String toString() {
        return "File [id=" + _id + ", title=" + title + ", file=" + file + "]";
    }*/
}
