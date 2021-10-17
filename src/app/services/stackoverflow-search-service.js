const API_STACKOVERFLOW = 'https://api.stackexchange.com/2.3';
const axios = require('axios');

class StackOverflowSearchService {
  // eslint-disable-next-line no-unused-vars
  search(payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${API_STACKOVERFLOW}/answers?todate=1634428800&order=desc&sort=activity&site=stackoverflow`
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}

module.exports = StackOverflowSearchService;
