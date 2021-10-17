const API_STACKOVERFLOW = 'https://api.stackexchange.com/2.3';
const axios = require('axios');

class StackOverflowSearchService {
  search(payload) {
    // Go to https://api.stackexchange.com/docs/advanced-search
    // to know what parameters you can use to search
    const filters = {
      q: payload.text,
      pagesize: payload.pagesize ?? 1,
      sort: payload.sort ?? 'relevance',
      order: payload.order ?? 'desc',
      accepted: payload.accepted ?? 'True',
    };

    const SEARCH_URL = `${API_STACKOVERFLOW}/search/advanced?page=1&pagesize=${filters.pagesize}&order=${filters.order}&sort=${filters.sort}&q=${filters.q}&accepted=${filters.accepted}&site=stackoverflow`;

    return new Promise((resolve, reject) => {
      axios
        .get(SEARCH_URL)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  async getAcceptedAnswer(acceptedAnswersIds) {
    const filters = {
      acceptedAnswersIds: acceptedAnswersIds.reduce(
        (previousValue, currentValue) => `${previousValue};${currentValue}`
      ),
    };

    const SEARCH_URL = `${API_STACKOVERFLOW}/answers/${filters.acceptedAnswersIds}?order=desc&sort=activity&site=stackoverflow&filter=withbody`;

    return new Promise((resolve, reject) => {
      axios
        .get(SEARCH_URL)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}

module.exports = StackOverflowSearchService;
