// PT. 1 PRELOADED TOP HEADLINES //

$(document).ready(function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.

  // Empty the region associated with the articles
  clear();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  var nytData 
  
  var topURL = "https://api.nytimes.com/svc/topstories/v2/home.json";
  topURL += '?' + $.param({
  'api-key': "b21e5d9c06f44ce09f28df3b32da3e84"
  });

  $.ajax({
    url: topURL,
    method: 'GET',
    }).done(function(result) {
    //console.log(result);
    nytData = result;
    loadPage();
    }).fail(function(err) {
    throw err;
    });

function loadPage() {

// Get from the form the number of results to display
// API doesn't have a "limit" parameter, so we have to do this ourselves
var numTopArticles = 5;

// Log the NYTData to console, where it will show up as an object
console.log(nytData);
//   console.log("------------------------------------");

// Loop through and build elements for the defined number of articles
for (var i = 0; i < numTopArticles + 1; i++) {
  // Get specific article info for current index
  // console.log(nytData);
  var results = nytData.results;
  var topArticle = nytData.results[i];
  console.log(topArticle);

  // Increase the articleCount (track article # - starting at 1)
  var articleCount = i + 1;

  // Create the  list group to contain the articles and add the article content for each
  var $topArticleList = $("<ul>");
  $topArticleList.addClass("list-group");

  // Add the newly created element to the DOM
  $("#article-section").append($topArticleList);

  // If the article has a headline, log and append to $articleList
  var headline = results[i].title;
  var $topArticleListItem = $("<li class='list-group-item articleHeadline'>");

  if (headline) {
    console.log(headline);
    $topArticleListItem.append(
      "<span class='label label-primary'>" +
        articleCount +
        "</span>" +
        "<strong> " +
        headline +
        "</strong>"
    );
  }

  // If the article has a byline, log and append to $articleList
  var byline = results[i].byline;

  if (byline) {
    console.log();
    $topArticleListItem.append("<h5>" + byline + "</h5>");
  }

  // Log section, and append to document if exists
  var logSection = results[i].section;
  console.log(results[i].section);
  if (logSection) {
    $topArticleListItem.append("<h5>Section: " + logSection + "</h5>");
  }

  // Log published date, and append to document if exists
  var publishedDate = results[i].published_date;    
  
  console.log(results[i].published_date);
  if (publishedDate) {
    $topArticleListItem.append("<h5>" + results[i].published_date + "</h5>");
  }

  // Append the snippet
  var snippetValue = results[i].abstract;
  $topArticleListItem.append(snippetValue);
  // Append and log url
  $topArticleListItem.append("<a href='" + results[i].abstract + "'>" + " READ MORE" + "</a>");
  console.log(results[i].abstract);

  // Append the article
  $topArticleList.append($topArticleListItem);
}
}

// Function to empty out the articles
function clear() {
$("#article-section").empty();
}

});






// PT 2. SEARCHED HEADLINES //

/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "api-key": "b21e5d9c06f44ce09f28df3b32da3e84" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#search-term")
    .val()
    .trim();

  // If the user provides a startYear, include it in the queryParams object
  var startYear = $("#start-year")
    .val()
    .trim();

  if (parseInt(startYear)) {
    queryParams.begin_date = startYear + "0101";
  }

  // If the user provides an endYear, include it in the queryParams object
  var endYear = $("#end-year")
    .val()
    .trim();

  if (parseInt(endYear)) {
    queryParams.end_date = endYear + "0101";
  }

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
//  * @param {object} NYTData - object containing NYT API data
 */

// Function to pre-load top headlines
// $(document).ready(function(NYTData) {
//     var headlines = 
    
//     $("#article-section").append(NYTData.)

// });

function updatePage(NYTData) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  var numArticles = $("#article-count").val();

  // Log the NYTData to console, where it will show up as an object
  console.log(NYTData);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < numArticles; i++) {
    // Get specific article info for current index
    var article = NYTData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      console.log(headline.main);
      $articleListItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline.main +
          "</strong>"
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    }

    // Append the snippet
    var snippetValue = article.snippet;
    $articleListItem.append(snippetValue);
    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + " READ MORE" + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
