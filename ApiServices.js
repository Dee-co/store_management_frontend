const api_url = process.env.VUE_APP_API_URL;
import axios from "axios";
import store from "@/store";
var authToken = store.state.authToken; 
axios.interceptors.request.use(
    function (config) {
        config.headers = {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
        };
        return config;
    },
    function (error) {
        console.log("Pre request error:", error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("Post request error:", error);
        return Promise.reject(error);
    }
);

export default {

    userLogin(obj) {
        console.log(obj);
        return new Promise((resolve, reject) => {
            axios
                .post(`${api_url}/login`, obj)
                .then((response) => {
                    if (response.request.status == 200) {
                        resolve(response.data);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getStoreData() {
        return new Promise((resolve, reject) => {
            axios
                .get(`${api_url}/stores`)
                .then((response) => {
                    if (response.request.status == 200) {
                        resolve(response.data);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

};