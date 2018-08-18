// PRELOADED 2 TOP HEADLINES //

$(document).ready(function(event) {

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
var numTopArticles = 10;

// Log the NYTData to console, where it will show up as an object
// console.log(nytData);
//   console.log("------------------------------------");

// Loop through and build elements for the defined number of articles
for (var i = 0; i < numTopArticles; i++) {
  // Get specific article info for current index
  // console.log(nytData);
  var results = nytData.results;
  var topArticle = nytData.results[i];
  console.log(topArticle);

  // Create the  list group to contain the articles and add the article content for each
  var $topArticleList = $("<ul>");
  $topArticleList.addClass("list-group");

  // Add the newly created element to the DOM
  $("#article-section").append($topArticleList);

  // If the article has a headline, log and append to $articleList
  var headline = results[i].title;
  var $topArticleListItem = $("<li class='list-group-item articleHeadline'>");

  // Newspaper logo above headline

  var sourceLogo = $('<img>');
  sourceLogo.attr('src', './assets/images/nytLogo.png');
  sourceLogo.attr('class', 'nytlogo');
  $topArticleListItem.prepend(sourceLogo);

  if (headline) {
    $topArticleListItem.append(
        "<strong> " +
        headline +
        "</strong>"
    );
  }


// If the article has an image, append it - otherwise append NY
  var thumbnailIMG = $('<img>');
  var thumbnailUrl = topArticle.multimedia[0].url;
//   console.log(JSON.stringify(thumbnailUrl));
  thumbnailIMG.attr('src', thumbnailUrl);
  thumbnailIMG.attr('class', 'articleImg');
  $topArticleListItem.append(thumbnailIMG);


// Append READ MORE 1
// var readMore = $('<p>')
// readMore.text("READ MORE");
// readMore.attr('target', "_blank")
// $topArticleListItem.append(readMore);
// readMore.html('<a href="' + topArticle.url + '">' + "READ MORE" + '</a>');

// readMore.att('src', topArticle.url);

// Append READ MORE 2
var readMore = $("<div>");
var aTag = document.createElement('a');
aTag.setAttribute('href', topArticle.url);
aTag.setAttribute('target', "_blank");
aTag.innerHTML = "READ MORE";
readMore.attr('class', 'readmore')
readMore.append(aTag);
$topArticleListItem.append(readMore);

  // Append the article
  $topArticleList.append($topArticleListItem);
}
}

// Function to empty out the articles
function clear() {
$("#article-section").empty();
}

});


