const { SearchErrorsUseCase } = require('../usecases');
const container = require('../providers');
const logger = require('../config/logger');

exports.search = async (req, res) => {
  let result = null;

  try {
    const { text } = req.body;

    const searchErrorsUseCase = new SearchErrorsUseCase({
      searchService: new container.resolve('searchService'),
      validator: new container.resolve('validateTextSearch'),
    });

    const response = await searchErrorsUseCase.search(text);

    result = res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    result = res.status(500).json({ message: 'Internal Error' });
  }

  return result;
};
