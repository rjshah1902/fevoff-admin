import axios from "axios";
import { baseAPIUrl } from "../baseUrl";

const PostMethod = async (url, objData) => {

    const urlLink = baseAPIUrl + url;

    const config = {
        url: urlLink,
        method: 'POST',
        data: objData
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

export default PostMethod;