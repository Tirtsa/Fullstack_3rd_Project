const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//global variable selectedMovie
let selectedMovie = '';
let moviesArray = [];


// //define user class with name and movies array
// class User {
//     constructor(name, movies) {
//         this.name = name;
//         this.movies = movies;
//     }
// }

// let user = new User('John Doe', []);

// //define movie class with title, price, selectedSeats and total
// class Movie {
//     constructor(title, price, selectedSeats, total) {
//         this.title = title;
//         this.price = price;
//         this.selectedSeats = selectedSeats;
//         this.total = total;
//     }
// }


var add_to_basket_btn = document.getElementById('add_to_basket_btn');
add_to_basket_btn.addEventListener('click', add_to_basket);



populateUI();
let ticketPrice = +movieSelect.value; // + converts string to number

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats index into arr
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //storing the seleted seats in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  selectedMovie = new Movie(movieSelect.options[movieSelect.selectedIndex].text, +movieSelect.options[movieSelect.selectedIndex].value, seatsIndex, selectedSeatsCount * ticketPrice);
  //console.log(mySelectedMovie);
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();

function add_to_basket() {


    // //get the selected seats
    // const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // //get the selected movie
    // const selectedMovie = document.getElementById('movie').value;
    // //get the selected movie title
    // const selectedMovieTitle = document.getElementById('movie').options[document.getElementById('movie').selectedIndex].text;
    // //get the selected movie price
    // const selectedMoviePrice = +document.getElementById('movie').options[document.getElementById('movie').selectedIndex].value;
    // //get the selected seats count
    // const selectedSeatsCount = selectedSeats.length;
    // //get the selected seats indexes
    // const selectedSeatsIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // //get the total price
    // const totalPrice = selectedSeatsCount * selectedMoviePrice;

    // let myMovie = new Movie(selectedMovieTitle, selectedMoviePrice, selectedSeatsIndexes, totalPrice);
    //create a new user object
    console.log(selectedMovie);

    //---------------------------------
    var fxhttp = new FXMLHttpRequest();
    fxhttp.open("POST", "http://localhost:3000/movies", true);
    fxhttp.send(JSON.stringify(selectedMovie));
    //var rep = fxhttp.onload();
    //---------------------------------
    
    //user.movies.push(selectedMovie);

    //save the user object in local storage
    //localStorage.setItem('user', JSON.stringify(user));

    const row = document.createElement("tr");

  const movieNameCell = document.createElement("td");
  movieNameCell.innerText = selectedMovie.title;

  const ticketPriceCell = document.createElement("td");
  ticketPriceCell.innerText = selectedMovie.price;

  const ticketQuantityCell = document.createElement("td");
  ticketQuantityCell.innerText = selectedMovie.selectedSeats.length;

  const totalPriceCell = document.createElement("td");
  totalPriceCell.innerText = selectedMovie.total;

  //add button edit and delete
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function() {
    const selectedRows = document.querySelectorAll(".selected");
    selectedRows.forEach(function(row) {
      row.remove();
    });
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete-button";
  // deleteButton.addEventListener("click", function() {
  //   const selectedRows = document.querySelectorAll(".selected");
  //   selectedRows.forEach(function(row) {
  //     row.remove();
  //   });
  // });

  row.appendChild(movieNameCell);
  row.appendChild(ticketPriceCell);
  row.appendChild(ticketQuantityCell);
  row.appendChild(totalPriceCell);
  row.appendChild(editButton);
  row.appendChild(deleteButton);

  basketItemsContainer.appendChild(row);

    // add the selected movie to the user basket
    // addMovieToBasket(selectedMovie);
    

}

// Basket items array
let basketItems = [];

// Get references to the DOM elements
const basketTable = document.getElementById("basket-table");
const basketItemsContainer = document.getElementById("basket-items");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const addForm = document.getElementById("add-form");
const movieNameInput = document.getElementById("movie-name");
const ticketQuantityInput = document.getElementById("ticket-quantity");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const showAddFormButton = document.getElementById("show-add-form-button");
const deleteAllButton = document.getElementById("delete-all-button");
const deleteButton = document.getElementById("delete-button");
const editButton = document.getElementById("edit-button");

// Show the add form
showAddFormButton.addEventListener("click", function() {
  addForm.style.display = "block";
  basketTable.style.display = "none";
});

// Cancel the add form
cancelButton.addEventListener("click", function() {
  addForm.style.display = "none";
  basketTable.style.display = "table";
  movieNameInput.value = "";
  ticketQuantityInput.value = "";
});

//delete an item from the basket
deleteButton.addEventListener("click", function() {
  
  const selectedRows = document.querySelectorAll(".selected");
  selectedRows.forEach(function(row) {
    row.remove();
  });
});

// add function that receives a movie object and add it to the basket table
function addMovieToBasket(movie) {
  const row = document.createElement("tr");

  const movieNameCell = document.createElement("td");
  movieNameCell.innerText = movie.title;

  const ticketPriceCell = document.createElement("td");
  ticketPriceCell.innerText = movie.price;

  const ticketQuantityCell = document.createElement("td");
  ticketQuantityCell.innerText = movie.selectedSeats.length;

  const totalPriceCell = document.createElement("td");
  totalPriceCell.innerText = movie.total;

  //add button edit and delete
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function() {
    const selectedRows = document.querySelectorAll(".selected");
    selectedRows.forEach(function(row) {
      row.remove();
    });
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete-button";
  // deleteButton.addEventListener("click", function() {
  //   const selectedRows = document.querySelectorAll(".selected");
  //   selectedRows.forEach(function(row) {
  //     row.remove();
  //   });
  // });

  row.appendChild(movieNameCell);
  row.appendChild(ticketPriceCell);
  row.appendChild(ticketQuantityCell);
  row.appendChild(totalPriceCell);
  row.appendChild(editButton);
  row.appendChild(deleteButton);

  basketItemsContainer.appendChild(row);
}

// Add a new item to the basket
addButton.addEventListener("click", function() {
  const movieName = movieNameInput.value;
  const ticketQuantity = ticketQuantityInput.value;
  basketItems.push({ movieName, ticketQuantity });
  renderBasketItems();
  addForm.style.display = "none";
  basketTable.style.display = "table";
  movieNameInput.value = "";
  ticketQuantityInput.value = "";
});

// Delete all items from the basket
deleteAllButton.addEventListener("click", function() {
  basketItems = [];
  renderBasketItems();
});

// Render the basket items
function renderBasketItems() {
  basketItemsContainer.innerHTML = "";
  for (let i = 0; i < basketItems.length; i++) {
    const basketItem = basketItems[i];
    const row = document.createElement("tr");
    const movieNameCell = document.createElement("td");
    movieNameCell.innerText = basketItem.movieName;
    const ticketQuantityCell = document.createElement("td");
    ticketQuantityCell.innerText = basketItem.ticketQuantity;
    const actionsCell = document.createElement("td");
    const changeButton = document.createElement("button");
    changeButton.innerText = "Change";
    changeButton.addEventListener("click", function() {
      movieNameInput.value = basketItem.movieName;
      ticketQuantityInput.value = basketItem.ticketQuantity;
      addForm.style.display = "block";
      basketTable.style.display = "none";
      basketItems.splice(i, 1);
    });
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      basketItems.splice(i, 1);
      renderBasketItems();
    });
    actionsCell.appendChild(changeButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(movieNameCell);
    row.appendChild(ticketQuantityCell);
    row.appendChild(actionsCell);
    basketItemsContainer.appendChild(row);
  }
}

// Search for an item in the basket
searchButton.addEventListener("click", function() {
  const searchTerm = searchInput.value.toLowerCase();
  basketItemsContainer.innerHTML = "";
  for (let i = 0; i < basketItems.length; i++) {
    const basketItem = basketItems[i];
    if (basketItem.movieName.toLowerCase().indexOf(searchTerm) !== -1) {
      const row = document.createElement("tr");
      const movieNameCell = document.createElement("td");
      movieNameCell.innerText = basketItem.movieName;
      const ticketQuantityCell = document.createElement("td");
      ticketQuantityCell.innerText = basketItem.ticketQuantity;
      const actionsCell = document.createElement("td");
      const changeButton = document.createElement("button");
      changeButton.innerText = "Change";
      changeButton.addEventListener("click", function() {
        movieNameInput.value = basketItem.movieName;
        ticketQuantityInput.value = basketItem.ticketQuantity;
        addForm.style.display = "block";
        basketTable.style.display = "none";
        basketItems.splice(i, 1);
      });
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function() {
        basketItems.splice(i, 1);
        renderBasketItems();
      });
      actionsCell.appendChild(changeButton);
      actionsCell.appendChild(deleteButton);
      row.appendChild(movieNameCell);
      row.appendChild(ticketQuantityCell);
      row.appendChild(actionsCell);
      basketItemsContainer.appendChild(row);
    }
  }
});
