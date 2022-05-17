import axios from "axios"
import { useDispatch } from "react-redux";

export const getAsync = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}

export const postAsync = async (endpoint, data) => {
    try {
        const response = await axios.post(endpoint, data);

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}

export const putAsync = async (endpoint, data) => {
    try {
        const response = await axios.put(endpoint, data);

        return response.data;

    } catch (error) {
        return error.response.data;
    }
}