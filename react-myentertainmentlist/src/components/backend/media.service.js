import http from './http-common';
import config from '../../config.json';
import axios from "axios";

class MediaService {

    getMovie(apiId) {
        return axios.get(`https://api.themoviedb.org/3/movie/${apiId}?api_key=${config.config.keys.tmdb}`).catch(error => error.response);
    }

    getTv(apiId) {
        return axios.get(`https://api.themoviedb.org/3/tv/${apiId}?api_key=${config.config.keys.tmdb}`).catch(error => error.response);
    }

    getGame(apiId) {
        return axios.get(`https://api.rawg.io/api/games/${apiId}?key=${config.config.keys.rawg}`).catch(error => error.response);
    }

}

export default new MediaService();