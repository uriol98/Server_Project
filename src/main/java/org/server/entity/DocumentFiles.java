package org.server.entity;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Documents {

    @Id
    private String _id;

    private String title;

    private Binary pdf;
}
