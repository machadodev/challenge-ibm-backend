class SearchErrorsUseCase {
  constructor({ searchService, validator }) {
    this.searchService = searchService;
    this.validator = validator;
  }

  async search(payload) {
    this.validator.validate(payload);

    const relatedQuestions = await this.searchService.search(payload);

    const acceptedAnswersIds = relatedQuestions.map(
      (item) => item.accepted_answer_id
    );

    const possibleCorrectAnswers = await this.searchService.getAcceptedAnswer(
      acceptedAnswersIds
    );

    return possibleCorrectAnswers.map((answer) => answer.body);
  }
}

module.exports = SearchErrorsUseCase;
