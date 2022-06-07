window.okeReviewsWidgetOnInit = function() {
    setUpHeader();
}

// Move reviews aggegrate and review button into reviews controls
function setUpHeader(){
    var reviewsControl = document.querySelector('.okeReviews-reviews-controls');
    var aggregateRating = document.querySelector('.okeReviews-reviewsAggregate-summary-rating');
    var reviewsCount = document.querySelector('.okeReviews-reviews-controls-reviewCount');
    var writeAReviewButton = document.querySelector('.js-okeReviews-writeReview');
    aggregateRating.append(reviewsCount);
    reviewsControl.prepend(writeAReviewButton);
    reviewsControl.prepend(aggregateRating);
}