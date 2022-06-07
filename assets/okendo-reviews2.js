window.okeReviewsWidgetOnInit = function() {
  var rules = ".okeReviews-review-reviewer-product-thumbnail,.okeReviews-review-reviewer-product-details-link  {pointer-events: none;cursor:default;text-decoration:none;color:black;}";
  removeLinks(rules)
}



function removeLinks(rules){
  var div = $("<div />", {
    html: '&shy;<style>' + rules + '</style>'
  }).appendTo("body");

}