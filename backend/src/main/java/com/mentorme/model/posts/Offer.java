package com.mentorme.model.posts;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("OFFER")
public class Offer extends Post {
}
