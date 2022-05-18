import http from './http-common';
import config from '../../config.json';

class MedialistService {

    addMovie(listId, movie, token) {
        return http.post(`/medialist/lists/${listId}/movie`, movie, {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    addTv(listId, tv, token) {
        return http.post(`/medialist/lists/${listId}/tv`, tv, {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    addGame(listId, game, token) {
        return http.post(`/medialist/lists/${listId}/game`, game, {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    deleteMovieFromList(listId, movieId, token) {
        return http.delete(`/medialist/lists/${listId}/movie/${movieId}`,{headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    deleteTvFromList(listId, tvId, token) {
        return http.delete(`/medialist/lists/${listId}/tv/${tvId}`,{headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    deleteGameFromList(listId, gameId, token) {
        return http.delete(`/medialist/lists/${listId}/game/${gameId}`,{headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    addMediaList(mediaList, token) {
        return http.post(`/medialist/lists/`, mediaList, {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    deleteMediaList(listId, token) {
        return http.delete(`/medialist/lists/${listId}`, {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    getLists(token) {
        return http.get('/medialist/lists', {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

}

export default new MedialistService();