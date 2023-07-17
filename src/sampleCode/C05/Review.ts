type ReviewSubmitMode = "CREATE" | "UPDATE";

type ReviewParameterType = {
  stars: number;
  content: string;
};

const apiCall = <T>(method: string, param: T) => {
  return { method, param };
};

class ReviewModel {
  stars: number;
  content: string;
  mode: ReviewSubmitMode;

  constructor(review?: ReviewParameterType) {
    this.stars = review?.stars ?? 0;
    this.content = review?.content ?? "";
    this.mode = review ? "UPDATE" : "CREATE";
  }

  protected callCreate() {
    return apiCall("POST", { stars: this.stars, content: this.content });
  }

  protected callUpdate() {
    return apiCall("PATCH", { stars: this.stars, content: this.content });
  }

  updateReviewContent({ stars, content }: ReviewParameterType) {
    this.stars = stars;
    this.content = content;
  }

  isValidReviewContent() {
    const starsValid = this.stars >= 1 && this.stars <= 5;
    const contentLengthValid =
      Object.is(this.content.length, 0) ||
      (this.content.length >= 10 && this.content.length <= 1000);

    return starsValid && contentLengthValid;
  }

  submit() {
    if (!this.isValidReviewContent()) throw new Error("Invalid Review Content");

    return Object.is(this.mode, "CREATE")
      ? this.callCreate()
      : this.callUpdate();
  }
}

export default ReviewModel;

const review = new ReviewModel();
review.updateReviewContent({
  stars: 5,
  content: "This is a good product!",
});
console.log(review.submit());
