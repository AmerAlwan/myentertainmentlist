package com.myentertainmentlist.myEList.repositories.media;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myentertainmentlist.myEList.models.media.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findById(Long id);
    Optional<Category> findByName(String name);
//    List<Category> findCategoryByMovieId(Long id);
//    List<Category> findCategoryByTvId(Long id);
//    List<Category> findCategoryByGameId(Long id);
}