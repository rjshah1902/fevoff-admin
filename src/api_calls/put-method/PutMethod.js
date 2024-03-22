import axios from "axios";
import { baseAPIUrl } from "../baseUrl";

const PutMethod = async (url, id = null, objData) => {

    let urlLink = baseAPIUrl + url;

    if (id !== "" && id != null) {
        urlLink += "/" + id;
    }

    const config = {
        url: urlLink,
        method: 'PUT',
        data: objData,
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

export default PutMethod;