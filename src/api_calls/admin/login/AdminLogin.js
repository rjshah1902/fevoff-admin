import axios from "axios";

import { baseAPIUrl } from "../../baseUrl";

const AdminLogin = async (adminDetails) => {

    const data = adminDetails || {};

    const urlLink = baseAPIUrl + "admin";

    const config = {
        url: urlLink,
        method: 'POST',
        data: data,
    }

    try {

        const response = await axios.request(config);

        return {
            status: true,
            message: response.data.message,
            data: response.data
        };

    } catch (error) {

        return {
            status: false,
            message: (error.response && error.response.data.message) || error.message,
            data: []
        };

    }


}

export default AdminLogin;