const { SearchErrorsUseCase } = require('../usecases');
const container = require('../providers');

exports.search = (req, res) => {
  const { text } = req.body;

  const searchErrorsUseCase = new SearchErrorsUseCase({
    searchService: new container.resolve('searchService'),
    validator: new container.resolve('validateTextSearch'),
  });

  const response = searchErrorsUseCase.search(text);

  return res.json(response);
};
