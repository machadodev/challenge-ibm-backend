const { SearchErrorsUseCase } = require('../usecases');

exports.search = (req, res) => {
  const { text } = req.body;

  const searchErrorsUseCase = new SearchErrorsUseCase();

  const response = searchErrorsUseCase.search(text);

  return res.json(response);
};
