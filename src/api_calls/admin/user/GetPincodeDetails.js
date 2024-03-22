import axios from "axios";

const baseAPIUrl = "https://api.postalpincode.in/pincode/";

const AdminLogin = async (pincode) => {

    const urlLink = baseAPIUrl + pincode;

    const config = {
        url: urlLink,
        method: 'GET',
    }

    try {

        const response = await axios.request(config);

        console.log(response.data[0].Message);

        return {
            status: true,
            message: response.data[0].Message,
            data: response.data[0].PostOffice,
        };

    } catch (error) {

        return {
            status: false,
            message: (error.response && error.data[0].Message) || error.message,
            data: []
        };

    }


}

export default AdminLogin;