class SearchErrorsUseCase {
  constructor({ searchService, validator }) {
    this.searchService = searchService;
    this.validator = validator;
  }

  async search(payload) {
    this.validator.validate(payload);

    const { items } = await this.searchService.search(payload);

    const acceptedAnswersIds = items.map((item) => item.accepted_answer_id);

    const possibleCorrectAnswers = await this.searchService.getAcceptedAnswer(
      acceptedAnswersIds
    );

    return possibleCorrectAnswers;
  }
}

module.exports = SearchErrorsUseCase;
