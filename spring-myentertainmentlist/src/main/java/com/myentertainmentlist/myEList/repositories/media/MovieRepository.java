package com.myentertainmentlist.myEList.repositories.media;

import com.myentertainmentlist.myEList.models.media.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findById(Long id);
    Optional<Movie> findByTitle(String title);
    Optional<Movie> findByReleaseYear(Short year);
    Optional<Movie> findByApiId(String id);
    List<Movie> findMoviesByMedialistsId(Long id);
}