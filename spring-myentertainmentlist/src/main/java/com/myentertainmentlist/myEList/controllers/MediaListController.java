package com.myentertainmentlist.myEList.controllers;

import com.myentertainmentlist.myEList.enums.MediaListType;
import com.myentertainmentlist.myEList.models.User;
import com.myentertainmentlist.myEList.models.media.Game;
import com.myentertainmentlist.myEList.models.media.Movie;
import com.myentertainmentlist.myEList.models.media.Tv;
import com.myentertainmentlist.myEList.models.medialist.MediaList;
import com.myentertainmentlist.myEList.payloads.requests.GameRequest;
import com.myentertainmentlist.myEList.payloads.requests.MediaListRequest;
import com.myentertainmentlist.myEList.payloads.requests.MovieRequest;
import com.myentertainmentlist.myEList.payloads.requests.TvRequest;
import com.myentertainmentlist.myEList.payloads.responses.MediaListResponse;
import com.myentertainmentlist.myEList.payloads.responses.MessageResponse;
import com.myentertainmentlist.myEList.repositories.UserRepository;
import com.myentertainmentlist.myEList.repositories.media.GameRepository;
import com.myentertainmentlist.myEList.repositories.media.MovieRepository;
import com.myentertainmentlist.myEList.repositories.media.TvRepository;
import com.myentertainmentlist.myEList.repositories.medialist.MediaListRepository;
import com.myentertainmentlist.myEList.security.jwt.JwtUtils;
import com.myentertainmentlist.myEList.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/medialist")
public class MediaListController {

    @Autowired
    private MediaListRepository mediaListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TvRepository tvRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private JwtUtils jwtUtils;

    // AmerALwan Token: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBbWVyQWx3YW4iLCJpYXQiOjE2NDk1NTgzNDMsImV4cCI6MTY0OTY0NDc0M30.iHe9H-sD8hi2F_U4x-OYCVpiRYBOVufO6jp79Wl8_xizRZygoIMxXTN-Rz2u1DHx-zDfkYi9UMg9jLtXqW7mHw
    // WackyBoss Token: eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJXYWNreUJvc3MiLCJpYXQiOjE2NDk2MjAzMjYsImV4cCI6MTY0OTcwNjcyNn0.CdqH7PzkokIrjXCyO-hegKwQ-UOE-qnOCxTJd0CfwZN8-zH1H1CJe5IF0IJD5twSt-XYq-9rfb_c9F9As0fFpw

    @GetMapping("/lists")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MediaList>> getAllLists(Authentication authentication) {
        Long userId = getUserId(authentication);
        List<MediaList> medialists = mediaListRepository.findMedialistsByUser_Id(userId);
        return new ResponseEntity<>(medialists, HttpStatus.OK);
    }

    @GetMapping("/lists/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MediaList> getListById(@PathVariable("id") long id, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaList = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (mediaList.isPresent()) return new ResponseEntity<>(mediaList.get(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/lists/movies")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MediaList>> getAllMovieLists(Authentication authentication) {
        List<MediaList> medialists = mediaListRepository.findMediaListByMediaListTypeAndUserId(
                MediaListType.MEDIA_MOVIE,
                getUserId(authentication));
        if (medialists.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(medialists, HttpStatus.OK);
    }

    @GetMapping("/lists/tv")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MediaList>> getAllTvsLists(Authentication authentication) {
        List<MediaList> medialists = mediaListRepository.findMediaListByMediaListTypeAndUserId(
                MediaListType.MEDIA_TV,
                getUserId(authentication));
        if (medialists.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(medialists, HttpStatus.OK);
    }

    @GetMapping("/lists/games")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<MediaList>> getAllGamesLists(Authentication authentication) {
        List<MediaList> medialists = mediaListRepository.findMediaListByMediaListTypeAndUserId(
                MediaListType.MEDIA_GAME,
                getUserId(authentication));
        if (medialists.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(medialists, HttpStatus.OK);
    }

    @PostMapping("/lists")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createList(@RequestBody MediaListRequest mediaListRequest) {
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        MediaList mediaList = new MediaList(mediaListRequest.getName(), mediaListRequest.getDescription(), mediaListRequest.getIsPrivate(), mediaListRequest.getMediaListType());

        Optional<MediaList> mediaListExists = mediaListRepository.findByNameAndUser_Id(mediaList.getName(), userDetailsImpl.getId());

        if (mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with that name already exists!"), HttpStatus.BAD_REQUEST);

        Optional<User> user = userRepository.findById(userDetailsImpl.getId());
        if (user.isPresent()) {
            mediaList.setUser(user.get());
            MediaList newMediaList = mediaListRepository.save(mediaList);
            String posterName = "default_poster.jpg";
            newMediaList.setPosterName(posterName);
            mediaListRepository.save(mediaList);
        } else return new ResponseEntity<>(new MessageResponse("User not found!"), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(new MediaListResponse(mediaList.getId(), mediaList.getName(), mediaList.getDescription(), mediaList.isPrivate(), mediaList.getMovies(), mediaList.getTvs(), mediaList.getGames()), HttpStatus.OK);
    }

    @PostMapping("/lists/{id}/movie")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addMovieToList(@PathVariable("id") long id, @RequestBody MovieRequest movieRequest, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Movie> movieExists = movieRepository.findByApiId(movieRequest.getApiId());
        if (movieExists.isPresent()) {
            Movie movie = movieExists.get();
            mediaList.getMovies().add(movie);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            Movie _movie = new Movie(movieRequest.getApiId(), movieRequest.getTitle(), movieRequest.getPosterPath(), movieRequest.getReleaseYear());
            movieRepository.save(_movie);
            Optional<Movie> movie = movieRepository.findByApiId(_movie.getApiId());
            if (movie.isPresent()) {
                mediaList.getMovies().add(movie.get());
                mediaListRepository.save(mediaList);
                return new ResponseEntity<>(movie, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/lists/{id}/tv")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addTvToList(@PathVariable("id") long id, @RequestBody TvRequest tvRequest, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Tv> tvExists = tvRepository.findByApiId(tvRequest.getApiId());
        if (tvExists.isPresent()) {
            Tv tv = tvExists.get();
            mediaList.getTvs().add(tv);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(tv, HttpStatus.OK);
        } else {
            Tv _tv = new Tv(tvRequest.getApiId(), tvRequest.getTitle(), tvRequest.getPosterPath(), tvRequest.getReleaseYear());
            tvRepository.save(_tv);
            Optional<Tv> tv = tvRepository.findByApiId(_tv.getApiId());
            if (tv.isPresent()) {
                mediaList.getTvs().add(tv.get());
                mediaListRepository.save(mediaList);
                return new ResponseEntity<>(tv, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   

    @PostMapping("/lists/{id}/game")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addGameToList(@PathVariable("id") long id, @RequestBody GameRequest gameRequest, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Game> gameExists = gameRepository.findByApiId(gameRequest.getApiId());
        if (gameExists.isPresent()) {
            Game game = gameExists.get();
            mediaList.getGames().add(game);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(game, HttpStatus.OK);
        } else {
            Game _game = new Game(gameRequest.getApiId(), gameRequest.getTitle(), gameRequest.getPosterPath(), gameRequest.getReleaseYear());
            gameRepository.save(_game);
            Optional<Game> game = gameRepository.findByApiId(_game.getApiId());
            if (game.isPresent()) {
                mediaList.getGames().add(game.get());
                mediaListRepository.save(mediaList);
                return new ResponseEntity<>(game, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/lists/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<MediaList> deleteListById(@PathVariable("id") long id, Authentication authentication) {
        Long userId = getUserId(authentication);
        mediaListRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/lists/{id}/movie/{movie_id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteMovieFromList(@PathVariable("id") long id, @PathVariable("movie_id") long movie_id, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Movie> movieExists = movieRepository.findById(movie_id);
        if (movieExists.isPresent()) {
            Movie movie = movieExists.get();
            mediaList.getMovies().remove(movie);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/lists/{id}/tv/{tv_id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteTvFromList(@PathVariable("id") long id, @PathVariable("tv_id") long tv_id, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Tv> tvExists = tvRepository.findById(tv_id);
        if (tvExists.isPresent()) {
            Tv tv = tvExists.get();
            mediaList.getTvs().remove(tv);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/lists/{id}/game/{game_id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteGameFromList(@PathVariable("id") long id, @PathVariable("game_id") long game_id, Authentication authentication) {
        Long userId = getUserId(authentication);
        Optional<MediaList> mediaListExists = mediaListRepository.findByIdAndUser_Id(id, userId);
        if (!mediaListExists.isPresent()) return new ResponseEntity<>(new MessageResponse("List with id " + id + " not found!"), HttpStatus.NOT_FOUND);
        MediaList mediaList = mediaListExists.get();
        Optional<Game> gameExists = gameRepository.findById(game_id);
        if (gameExists.isPresent()) {
            Game game = gameExists.get();
            mediaList.getGames().remove(game);
            mediaListRepository.save(mediaList);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Long getUserId(Authentication authentication) {
        return ((UserDetailsImpl) authentication.getPrincipal()).getId();
    }
}