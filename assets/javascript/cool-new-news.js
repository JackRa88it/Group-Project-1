$(document).ready(()=>{

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
      console.log(nytData);
      
      var s1 = (nytData.results[0])
      var s2 = (nytData.results[1]);
      var s1Div = `<div class="story">
                        <div class="logo-img">
                           <img src="./assets/images/nytLogo.png" class="logoImg">
                        </div>

                        <div class="text">
                            <p class='title'>${s1.title}</p>
                        </div>

                        <div class="thumbnail">
                            <img src="${s1.multimedia[0].url}" class="story-img">
                        </div>

                        <div class="readMoreDisplayed">
                            <a href="${s1.url}" target="_blank">READ MORE</a>
                        </div>
                    </div>`



      var s2Div =`<div class="story">
                <div class="logo-img">
                    <img src="./assets/images/nytLogo.png" class="logoImg">
                </div>

                <div class="text">
                     <p class='title'>${s2.title}</p>
                </div>

                <div class="thumbnail">
                    <img src="${s2.multimedia[0].url}" class="story-img">
                </div>
              
                <div class="readMoreDisplayed">
                    <a href="${s2.url}" target="_blank">READ MORE</a>
                </div>
          </div>`

        $("#news").append(s1Div)
        $("#news").append(s2Div)



    results = result.results
    results.forEach(element => {
        
        $("#big-news").append(`
           <div class="row boxx largeCard">
            <div class="col-12">
              <div class="text">
              <div class="logo-img">
                    <img src="./assets/images/nytLogo.png" class="logoImg">
              </div>
               <h1 class='title lgTitle'>${element.title}</h1><br>
               <h5 class='lgCardText'>${element.byline}</h5>
               <h5 class='lgCardText'>${element.published_date}</h5>
               <h5 class='lgCardText'>Section: ${element.section}</h5><br>
               <p class='limitAbstract'>${element.abstract}</p>
               <div class="readMoreDisplayLg">
              <a href="${element.url}" target="_blank">READ MORE</a>
            </div>
            </div>
            
         <div class="large-thumbnail">
          <img src="${element.multimedia[3].url}" class="large-img">
        </div>
        
        </div>
        </div>
        `)
        
    });

    })
})