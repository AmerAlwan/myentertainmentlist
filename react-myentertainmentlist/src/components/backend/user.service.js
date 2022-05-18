import http from "./http-common";
import AxiosError from "axios";

class UserDataService {

    authenticate(token) {
        return http.get("/authenticate",  {headers: {Authorization: `Bearer ${token}`}}).catch(error => error.response);
    }

    getAll(filter = null) {
        return http.get("/users", filter);
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users/register", data).catch(error => error.response);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    findUserByUsername(username) {
        return http.get(`/users/username/${username}`).catch(error => false);
    }

    findUserByEmail (email) {
         return http.get(`/users/email/${email}`).catch(error => false);
    }

    validateLogin(data) {
        return http.post('/users/login', data).catch(error => error.response);
    }
}

export default new UserDataService();
