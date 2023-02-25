var drinkSearchTypeEl = $("#drinkSearchType");
var drinkIngFormEl = $("#drinkIngForm");
var drinkCatFormEl = $("#drinkCatForm");
var catSelect = [
  null,
  "Ordinary Drink",
  "Cocktail",
  "Shake",
  "Other / Unknown",
  "Cocoa",
  "Shot",
  "Coffee / Tea",
  "Homemade Liqueur",
  "Punch / Party Drink",
  "Beer",
  "Soft Drink",
];
var drinkIngInput = $("#drinkIngredientSearch");
var ingredientSearchList = [
  "Light rum",
  "Applejack",
  "Gin",
  "Dark rum",
  "Sweet Vermouth",
  "Strawberry schnapps",
  "Scotch",
  "Apricot brandy",
  "Triple sec",
  "Southern Comfort",
  "Orange bitters",
  "Brandy",
  "Lemon vodka",
  "Blended whiskey",
  "Dry Vermouth",
  "Amaretto",
  "Tea",
  "Champagne",
  "Coffee liqueur",
  "Bourbon",
  "Tequila",
  "Vodka",
  "Añejo rum",
  "Bitters",
  "Sugar",
  "Kahlua",
  "demerara Sugar",
  "Dubonnet Rouge",
  "Watermelon",
  "Lime juice",
  "Irish whiskey",
  "Apple brandy",
  "Carbonated water",
  "Cherry brandy",
  "Creme de Cacao",
  "Grenadine",
  "Port",
  "Coffee brandy",
  "Red wine",
  "Rum",
  "Grapefruit juice",
  "Ricard",
  "Sherry",
  "Cognac",
  "Sloe gin",
  "Apple juice",
  "Pineapple juice",
  "Lemon juice",
  "Sugar syrup",
  "Milk",
  "Strawberries",
  "Chocolate syrup",
  "Yoghurt",
  "Mango",
  "Ginger",
  "Lime",
  "Cantaloupe",
  "Berries",
  "Grapes",
  "Kiwi",
  "Tomato juice",
  "Cocoa powder",
  "Chocolate",
  "Heavy cream",
  "Galliano",
  "Peach Vodka",
  "Ouzo",
  "Coffee",
  "Spiced rum",
  "Water",
  "Espresso",
  "Angelica root",
  "Orange",
  "Cranberries",
  "Johnnie Walker",
  "Apple cider",
  "Everclear",
  "Cranberry juice",
  "Egg yolk",
  "Egg",
  "Grape juice",
  "Peach nectar",
  "Lemon",
  "Firewater",
  "Lemonade",
  "Lager",
  "Whiskey",
  "Absolut Citron",
  "Pisco",
  "Irish cream",
  "Ale",
  "Chocolate liqueur",
  "Midori melon liqueur",
  "Sambuca",
  "Cider",
  "Sprite",
  "7-Up",
  "Blackberry brandy",
  "Peppermint schnapps",
  "Creme de Cassis",
];
var userDrinkIngredients = [];

var catDropdown = $("#category");
var drinksUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?";
var selectedDrinkID;

function drinkCatForm() {
  var catDropdown = $("#category");
  $.each(catSelect, function (val, text) {
    catDropdown.append($("<option></option>").val(val).html(text));
  });
  drinkCatFormEl.show();
  drinkIngFormEl.hide();
}

function drinkIngForm() {
  drinkIngFormEl.show();
  drinkIngInput.autocomplete({
    source: ingredientSearchList,
  });
  drinkCatFormEl.hide();
}

function fetchData(url) {
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.drinks);
      //creates table for potential options
      for (var i = 0; i < data.drinks.length; i++) {
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var label = document.createElement("h3");
        var IDEl = document.createElement("p");
        var drinkimage = document.createElement("img");
        var drinkSelectBtn = document.createElement("button");
        drinkSelectBtn.textContent = "Select Beverage";

        drinkimage.src = data.drinks[i].strDrinkThumb;
        label.textContent = data.drinks[i].strDrink;
        IDEl.textContent = data.drinks[i].idDrink;
        IDEl.style.display = "none";

        tableData.append(label);
        tableData.append(drinkimage);
        tableData.append(drinkSelectBtn);
        tableData.append(IDEl);
        createTableRow.append(tableData);
        $("#drinkrecs").append(createTableRow);
      }

      //   var drinkID = data.drinks[i].idDrink;
      //   drinkInfoUrl =
      //     "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
      //   console.log(drinkInfoUrl);

      //   fetch(drinkInfoUrl)
      //     .then(function (response) {
      //       console.log(response);
      //       return response.json();
      //     })
      //     .then(function (data) {
      //       console.log(data.drinks);
      //       alcYN = data.drinks[0].strAlcoholic;
      //       drinkInstructions = data.drinks[0].strInstructions;
      //       alcYNEl.textContent = alcYN;
      //       console.log(alcYN);
      //       drinkInstructEl.textContent = drinkInstructions;
      //       tableData.append(alcYNEl);
      //       tableData.append(drinkInstructEl);
      //       return alcYN;
      //     });
      //   console.log(alcYN);
      //   console.log(alcYNEl);
      console.log(tableData);
      createTableRow.append(tableData);
      $("#drinkrecs").append(createTableRow);
    });
}

// function

//Listens for user selection on search type
$("#drinkSearchType").on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target.id);
  console.log(event.target.id === "searchCategory");
  if (event.target.id === "searchCategory") {
    //create dropdown options for category select
    drinkCatForm();
  } else if ((event.target.id = "searchIngredients")) {
    drinkIngForm();
  }
  //   drinkSearchTypeEl.hide();
});

//Listens for add ingredient to list from user input field
$("#addDrinkIngredient").on("click", function (event) {
  event.preventDefault(); //prevent refresh
  if (ingredientSearchList.includes(drinkIngInput.val())) {
    // add user ingredient to array
    userDrinkIngredients.push(drinkIngInput.val());
    //create list item for ingredient to show user what ingredients they've added
    var drinkIngItem = document.createElement("li");
    drinkIngItem.textContent = drinkIngInput.val();
    drinkIngItem.setAttribute("style", "color:white;");
    $("#userDrinkIngList").append(drinkIngItem);
    drinkIngInput.val("");
  }
});

//listens for submit on drink search by ingredients form
drinkIngFormEl.on("submit", function (event) {
  event.preventDefault();
  if (userDrinkIngredients.length > 0) {
    //Hide input form
    drinkIngFormEl.hide();

    //change request link accordingly if there is user ingredient input
    if (userDrinkIngredients.length > 0) {
      drinksUrl += "i=";
      //loop through user ingredients arraty
      for (var i = 0; i < userDrinkIngredients.length; i++) {
        userDrinkIngredients[i] = userDrinkIngredients[i].replace(/\s+/g, "_");
        drinksUrl += userDrinkIngredients[i];
        //add comma to url if not on last one
        if (i < userDrinkIngredients.length - 1) {
          drinksUrl += ",";
        }
      }
      //   console.log(userDrinkIngredients);
      //   console.log(drinksUrl);
      //fetch the data
      fetchData(drinksUrl);
    }
  }
});
//listens for submit on drink search by category form
drinkCatFormEl.on("submit", function (event) {
  event.preventDefault();
  //Hide input form
  drinkCatFormEl.hide();
  //  get user input for category
  catChoice = catSelect[catDropdown.val()];
  //change request link accordingly
  if (catChoice !== null) {
    catChoice = catChoice.replace(/\s+/g, "_");
    // console.log(catChoice);
    drinksUrl += "c=" + catChoice;
    // console.log(drinksUrl);
    fetchData(drinksUrl);
  }
});

//listens for selection on results table
$("#drinkrecs").on("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target);
});