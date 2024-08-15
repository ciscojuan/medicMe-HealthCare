import axios from "axios";
const url = 'http://localhost:5535/api/v1/login';

const auth = async credentials => {
    //console.log(`credentials: ${JSON.stringify(credentials)}`)
    const res = await axios.post(url, credentials)
    return res.data

}

export default { auth }