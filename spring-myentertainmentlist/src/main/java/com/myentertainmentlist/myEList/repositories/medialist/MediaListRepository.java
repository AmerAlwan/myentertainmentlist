package com.myentertainmentlist.myEList.repositories.medialist;

import com.myentertainmentlist.myEList.enums.MediaListType;
import com.myentertainmentlist.myEList.models.medialist.MediaList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MediaListRepository extends JpaRepository<MediaList, Long> {
    Optional<MediaList> findById(Long id);
    Optional<MediaList> findByName(String name);
    Optional<MediaList> findByIdAndUser_Id(Long id, Long userId);
    Optional<MediaList> findByNameAndUser_Id(String name, Long id);
    Optional<MediaList> findByIsAllAndUser_Id(boolean isAll, Long id);
   // @Query("select m from MediaList m join fetch m.users u where u.username = 'AmerAlwan'")
    List<MediaList> findMedialistsByUser_Id(Long id);
    List<MediaList> findMedialistsByMovies_Id(Long id);
    List<MediaList> findMedialistsByTvs_Id(Long id);
    List<MediaList> findMedialistsByGames_Id(Long id);
    List<MediaList> findMediaListByMediaListTypeAndUserId(MediaListType mediaListType, Long id);
}