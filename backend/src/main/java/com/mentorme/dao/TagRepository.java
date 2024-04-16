package com.mentorme.dao;

import com.mentorme.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findTagById(int id);
    Set<Tag> findTagsByIdIn(Set<Integer> ids);
}
