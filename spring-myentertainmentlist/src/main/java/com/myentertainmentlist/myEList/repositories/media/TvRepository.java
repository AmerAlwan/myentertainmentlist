package com.myentertainmentlist.myEList.repositories.media;

import com.myentertainmentlist.myEList.models.media.Tv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TvRepository extends JpaRepository<Tv, Long> {
    Optional<Tv> findById(Long id);
    Optional<Tv> findByApiId(String id);
    Optional<Tv> findByTitle(String title);
    Optional<Tv> findByReleaseYear(Short year);
    List<Tv> findTvsByMedialistsId(Long id);
//    List<Tv> findTvByCategoryId(Long id);
//    List<Tv> findTvByCategoryName(String name);
}