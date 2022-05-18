package com.myentertainmentlist.myEList.repositories.media;

import com.myentertainmentlist.myEList.models.media.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findById(Long id);
    Optional<Game> findByTitle(String title);
    Optional<Game> findByReleaseYear(Short year);
    Optional<Game> findByApiId(String id);
    List<Game> findGamesByMedialistsId(Long id);
//    List<Game> findGameByCategoryId(Long id);
//    List<Game> findGameByCategoryName(String name);
}