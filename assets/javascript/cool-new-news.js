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
                        <div class="text">
                            <p class='title'>${s1.title}</p>
                        </div>
                        <div class="thumbnail">
                            <img src="${s1.multimedia[0].url}" class="story-img">
                        </div>
                        <div>
                        <br>
                        <a class="btn btn-success" href=””> plz clich</a>
                        </div>
                    </div>`
      var s2Div =`<div class="story">
                 <div class="text">
                     <p class='title'>${s2.title}</p>
                  </div>
                   <div class="thumbnail">
          <img src="${s2.multimedia[0].url}" class="story-img">
            </div>
              <div>
              <br>
                      <a class="btn btn-success" href=””> plz clich</a>
               </div>
          </div>`
        $("#news").append(s1Div)
        $("#news").append(s2Div)
        results = result.results
        results.forEach(element => {
            
            $("#big-news").append(`
               <div class="row boxx">
                <div class="col-12 ">
                  <div class="text">
                   <h1 class='title'>${element.title}</h1><br>
                   <p>${element.abstract}</p>
                </div>
             <div class="thumbnail">
              <img src="${element.multimedia[3].url}" class="story-img">
            </div>
            </div>
            <a class="btn btn-success new" href=””> plz clich</a>
            </div>
            `)
            
        });

        
        
        
        
        
    })
})