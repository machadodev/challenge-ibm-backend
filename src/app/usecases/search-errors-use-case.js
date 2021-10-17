class SearchErrorsUseCase {
  constructor({ searchService, validator }) {
    this.searchService = searchService;
    this.validator = validator;
  }

  search(payload) {
    this.validator.validate(payload);
    return this.searchService.search(payload);
  }
}

module.exports = SearchErrorsUseCase;
