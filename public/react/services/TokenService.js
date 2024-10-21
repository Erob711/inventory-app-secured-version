import axios from "axios";
import apiURL from "../api.js";

export const getToken = async () => {
    try {
        const response = await axios.get(`${apiURL}/token`);
        console.log("RESPONSE " + response.data);
        let token = response.data;
        // FOR DEMO: make git guardian action fire by including a print of the token
        if (process.env.GITGUARDIAN_API_KEY) {
            console.log("the actual token from env");
        }


        return response.data;
    } catch(error) {
        console.log(error.message);
    }
};


export const getInsufficientToken = async () => {
    try {
        const response = await axios.get(`${apiURL}/token/insufficient-token`);
        console.log("RESPONSE " + response.data);

        return response.data;
    } catch(error) {
        console.log(error.message);
    }
};