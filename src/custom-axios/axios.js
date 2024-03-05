import axios from "axios";


const instance= axios.create({
    baseURL: 'http://localhost:5522/api/weather',
    // headers : {
    //     'Access-Control-Allow-Origin': '*'
    // }
})

export default instance;