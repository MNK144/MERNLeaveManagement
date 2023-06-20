import API from "./API";

const AuthService = {
    login : async function (payload) {
        return await API.post("/auth/login",payload);
    },
    register : async function (payload) {
        return await API.post("/auth/login",payload);
    },
    refresh: async function (payload) {
        return await API.post("/auth/refresh", payload);
    },
}

export default AuthService;