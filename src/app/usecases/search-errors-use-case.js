class SearchErrorsUseCase {
  constructor({ searchService, validator }) {
    this.searchService = searchService;
    this.validator = validator;
  }

  async search(payload) {
    let result = [];

    this.validator.validate(payload);

    const relatedQuestions = await this.searchService.search(payload);

    if (relatedQuestions.length > 0) {
      const acceptedAnswersIds = relatedQuestions.map(
        (item) => item.accepted_answer_id
      );

      const possibleCorrectAnswers = await this.searchService.getAcceptedAnswer(
        acceptedAnswersIds
      );

      result = possibleCorrectAnswers.map((answer) => answer.body);
    }
    return result;
  }
}

module.exports = SearchErrorsUseCase;
