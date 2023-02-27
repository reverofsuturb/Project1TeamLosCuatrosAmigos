var moviesAPIUrl = localStorage.getItem("moviesAPI");

//calls the getMovies function
getMovies(moviesAPIUrl);

// function that uses the moviesAPI store in localStorage to fetch and get the movies data
function getMovies(moviesAPIUrl) {
  console.log(moviesAPIUrl);
  // fetch
  fetch(moviesAPIUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.results);
      showMovies(data.results);
    });
}
// gets more details info from movie API using movie_id as argument
function getMovieDetails(movie_ID) {
  var movieDetailsUrl =
    "https://api.themoviedb.org/3/movie/" +
    movie_ID +
    "?" +
    APIKey +
    "&language=en-US";
  //console.log(movieDetailsUrl);
  // fetch
  fetch(movieDetailsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      //console.log(details);
      //console.log(details.runtime);
      runtimeStuff = details.runtime;
      var movieId = details.id;
      var watchNow = details.homepage; //link for watch now
      storeMovieIDs(movieId, runtimeStuff, watchNow);
    });
}
// gets more details info from movie API using movie_id as argument
function getMovieProviders(movie_ID) {
  var movieProvidersUrl =
    "https://api.themoviedb.org/3/movie/" +
    movie_ID +
    "/watch/providers?" +
    APIKey +
    "&language=en-US&watch_region=US";
  //console.log(movieDetailsUrl);
  // https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=<<api_key>>
  // fetch
  fetch(movieProvidersUrl)
    .then(function (response) {
      //.log(response);
      return response.json();
    })
    .then(function (providers) {
      //console.log(providers.results);
      // console.log(providers.results.US.link);
      // console.log(providers.results.US.flatrate[0].provider_name);
      //console.log(details.runtime);
      // runtimeStuff = details.runtime;

      if (providers.results !== undefined) {
        if (providers.results.US !== undefined) {
          //console.log("paso por aqui US");
          if (providers.results.US.link !== undefined) {
            //console.log("paso por aqui link");
            var movieProviderLink = providers.results.US.link || "No provider";
          } else {
            var movieProviderLink = "No provider";
          }
        } else {
          var movieProviderLink = "No provider link";
        }
      } else {
        var movieProviderLink = "No provider link";
      }

      if (providers.results !== undefined) {
        if (providers.results.US !== undefined) {
          console.log("paso por aqui US");
          if (providers.results.US.flatrate !== undefined) {
            console.log("paso por aqui name");

            if (providers.results.US.flatrate[0].provider_name !== undefined) {
              var movieProvider =
                providers.results.US.flatrate[0].provider_name || "No name";
            } else {
              var movieProvider = "No provider name";
            }
          } else {
            var movieProvider = "No provider name";
          }
        } else {
          var movieProvider = "No provider name";
        }
      } else {
        var movieProvider = "No provider name";
      }

      console.log("name: " + movieProvider);
      console.log("link: " + movieProviderLink);

      storeMovieProviders(movieProvider, movieProviderLink);
    });
}
//stores runtimes in an array, then adds array values to each movie card
function storeMovieIDs(movieId, runtime, watchNow) {
  movieRunTimesArr.push(runtime);
  //console.log(movieRunTimesArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    if (movieRunTimesArr[i].value != 0) {
      var runtimeEl = $("#runtime-" + [i]);
      runtimeEl.text(movieRunTimesArr[i] + " min");
    }
  }
}
//stores runtimes in an array, then adds array values to each movie card
function storeMovieProviders(movieProvider, movieProviderLink) {
  movieProvidersArr.push(movieProvider);
  movieProvidersLinkArr.push(movieProviderLink);
  //console.log(movieProvidersArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    var providerNameEl = $("#provider-" + [i]);
    providerNameEl.text(movieProvidersArr[i]);
    providerNameEl.attr("href", movieProvidersLinkArr[i]);
  }
}

//displays the top 5 movie results based on the fetched data
function showMovies(data) {
  movieContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var movieContentEl = document.createElement("div");
    console.log(data[i].id);
    var movie_ID = data[i].id;

    getMovieDetails(movie_ID);

    getMovieProviders(movie_ID);

    movieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="movie-poster"
    src="${IMGUrl + data[i].poster_path}"
    class="img-fluid"
    />
    </div>
    <div id="movie-content" class="col-md-10 p-5">
    <h2 id="movie-name" class="display-5 col-md-9">${data[i].title}</h2>
    <p id="runtime-${i}" class="">${"runtime"}</p>
    <p id="overview" class="">${data[i].overview}</p>
    <a id="provider-${i}" class="">${"provider name"}</a>
    <h3 id="rating" class="mb-3">Rating<span class="rating">${
      data[i].vote_average
    }</span></h3>
    <p style="display:none;">${movie_ID}</p>
    <button id="movieselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    movieContainerEl.append(movieContentEl);
  }
}

// // food section
getrecipe();

function getrecipe() {
  var foodshow = localStorage.getItem("foodresult");
  fetch(foodshow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.count === 0) {
        showDinnerError();
      } else {
        showDinner(data);
      }
    });
}

var dinnerContainerEl = $("#dinner-container");

function showDinner(data) {
  dinnerContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var dinnerContentEl = document.createElement("div");

    dinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="food-img"
    src="${data.hits[i].recipe.image}"
    class="img-fluid"
    />
    </div>
    <div id="food-content" class="col-md-10 p-5">
    <h2 id="food-name" class="display-5 col-md-9">${data.hits[i].recipe.label}</h2>
    <p id="ingredients" class="">${data.hits[i].recipe.ingredientLines}</p>
    <p id="foodID" style="display:none;">${data.hits[i]._links.self.href}</p>
    <button id="foodselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    dinnerContainerEl.append(dinnerContentEl);
  }
}

function showDinnerError() {
  dinnerContainerEl.empty();

  var dinnerContentEl = document.createElement("div");

  dinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="food-img"
    src="assets/Images/sarah-kilian-icecream-unsplash.jpg"
    class="img-fluid"
    />
    </div>
    <div id="food-content" class="col-md-10 p-5">
    <h2 id="food-name" class="display-5 col-md-9">We're Sorry your results were inconclusive, please try different parameters and try again, please go back to search!</h2>
    
    </div>
    </div>`;

  dinnerContainerEl.append(dinnerContentEl);
}
// Drinks section
var drinkContainerEl = $("#drink-container");
var drinksUrl1 = localStorage.getItem("drinksUrl1");
var drinksUrlID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
function getDrinks(drinksUrl1) {
  console.log(drinksUrl1);
  // fetch
  fetch(drinksUrl1)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.drinks);
      showDrinks(data.drinks);
    });
}
function showDrinks(arr) {
  drinkContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var drinkContentEl = document.createElement("div");

    drinkContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="drink-img"
    src="${arr[i].strDrinkThumb}"
    class="img-fluid"
    />
    </div>
    <div id="drink-content" class="col-md-10 p-5">
    <h2 id="drink-name" class="display-5 col-md-9">${arr[i].strDrink}</h2>
    <p id="drinkID" style="display:none;">${arr[i].idDrink}</p>
    <button id="drinkselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    drinkContainerEl.append(drinkContentEl);
  }
}

getDrinks(drinksUrl1);
