import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8090/api",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    }
});