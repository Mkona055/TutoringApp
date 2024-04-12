package com.mentorme.model.posts;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("REQUEST")
public class Request extends Post {
    public Request() {
        super();
    }
}
