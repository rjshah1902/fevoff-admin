import axios from "axios";
import { baseAPIUrl } from "../baseUrl";

const DeleteMethod = async (url, id) => {

    const urlLink = baseAPIUrl + url + id;

    const config = {
        url: urlLink,
        method: 'DELETE',
    }

    try {

        const response = await axios.request(config);

        return {
            status: true,
            message: response.data.message || "",
            data: response.data.data,
        };

    } catch (error) {

        return {
            status: false,
            message: (error.response && error.data) || error.message,
            data: []
        };

    }

};

export default DeleteMethod;