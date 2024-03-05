import axios from '../custom-axios/axios'

const weatherService = {
    fetchCity: (cityName) => {
      return axios.get(`/${encodeURIComponent(cityName)}`);
    },
  };

export default weatherService;