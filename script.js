const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//global variable selectedMovie
let selectedMovie = '';
let moviesArray = [];

//define user Object with an array of movies Object
let user = {
    name: 'John Doe',
    movies: []
}

//define user class with name and movies array
class User {
    constructor(name, movies) {
        this.name = name;
        this.movies = movies;
    }
}

//define movie class with title, price, selectedSeats and total
class Movie {
    constructor(title, price, selectedSeats, total) {
        this.title = title;
        this.price = price;
        this.selectedSeats = selectedSeats;
        this.total = total;
    }
}


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
    let newUser = new User(user.name, user.movies);
    newUser.movies.push(selectedMovie);

    //save the user object in local storage
    localStorage.setItem('user', JSON.stringify(newUser));
    

}