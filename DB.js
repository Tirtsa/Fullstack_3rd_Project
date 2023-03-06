//define user class with name and movies array
class User {
    constructor(username,mail,password,time,trials,movies) {
        this.name = username;
        this.mail = mail;
        this.password = password;
        this.time = time;
        this.trials = trials;
        this.movies = movies;
    }
}

//define movie class with title, price, selectedSeats and total
class Movie {
    constructor(movieId, title, genres, price) {
      this.movieId = movieId  
      this.title = title;
      this.genres = genres
      this.price = price;
    }
}

class Order {
    constructor(user_id, movie_id, seats, total) {
        this.user_id = user_id;
        this.movie_id = movie_id;
        this.seats = seats;
        this.total = total;
    }
}

class SelectedSeat {
    constructor(movie_id, selected_seats) {
        this.movie_id = movie_id;
        this.selected_seats = selected_seats;
    }
}

//window.localStorage.clear();

//2 arrays to store the users and movies
var users = [];
var movies = [];
var orders = [];
var allMoviesSelectedSeats = [];


//function to get the users array from local storage
function get_users(){
    var users = JSON.parse(localStorage.getItem('users'));
    return users;
}

//function to get the movies array from local storage
function get_movies(){
    var movies = JSON.parse(localStorage.getItem('movies'));
    return movies;
}

function get_orders(){
    var orders = JSON.parse(localStorage.getItem('orders'));
    return orders;
}

function get_selected_seats(){
    var allMoviesSelectedSeats = JSON.parse(localStorage.getItem('allMoviesSelectedSeats'));
    return allMoviesSelectedSeats;
}

function get_current_user(){
    return localStorage.getItem('CurrentUser');
}

function get_current_movie(){
    return localStorage.getItem('CurrentMovie');
}

//get order by user id
function get_order_by_user_id(user_id){
    var orders = get_orders();
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].user_id == user_id) {
            return orders[i];
        }
    }
}

function get_selected_seats_by_movie_id(movie_id){
  var selectedSeats = get_selected_seats();
  for (var i = 0; i < selectedSeats.length; i++) {
      if (selectedSeats[i].movie_id == movie_id) {
          return selectedSeats[i]; 
      }
  }
}

function update_current_user(user){
    localStorage.setItem('CurrentUser', JSON.stringify(user));
}

function update_current_movie(movie){
    localStorage.setItem('CurrentMovie', JSON.stringify(movie));
}

function delete_current_user(){
    localStorage.removeItem('CurrentUser');
}

function add_user(user){
    users.push(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(users));
}

function add_seats(selected_seats_obj){
  //pass through the selected seats array and check if the movie id is already there
  //if it is, update the seats array
  //if it is not, add a new object to the array
  var selectedSeats = get_selected_seats();
  var found = false;
  for (var i = 0; i < selectedSeats.length; i++) {
    if (selectedSeats[i].movie_id == selected_seats_obj.movie_id) {
      selectedSeats[i].selected_seats=selected_seats_obj.seats;
      found = true;
    }
  }
  if (!found) {
    allMoviesSelectedSeats.push(selected_seats_obj);
    localStorage.setItem('allMoviesSelectedSeats', JSON.stringify(allMoviesSelectedSeats));
  }
}

function add_to_basket() {
    var movie = get_current_movie();
    var new_user = get_current_user();
    //var new_movie = JSON.parse(movie_json);
    new_user.movies.push(movie);

    //save the user object in local storage
    localStorage.setItem('user', JSON.stringify(new_user));
}

function add_order(order){
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function delete_movie(movie_json, user_json) {
    var new_user = JSON.parse(user_json);
    var new_movie = JSON.parse(movie_json);

    var index = new_user.movies.indexOf(new_movie);
    if (index > -1) {
        new_user.movies.splice(index, 1);
    }

    //remove the movie from the user from local storage
    localStorage.setItem('user', JSON.stringify(new_user));
}

function set_movies() {
  movies_json.forEach(element => {
    movies.push(new Movie(element["movieId"], element["title"], element["genres"], element["price"]));
  });
    localStorage.setItem('movies', JSON.stringify(movies));
}

function set_genres() {
    localStorage.setItem('genres', JSON.stringify(genres));
}

var genres = ['Action',
    'Adventure',
    'Animation',
    'Childrens',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Fantasy',
    'Film-Noir',
    'Horror',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'War',
    'Western']
var movies_json = [
    {
      "movieId": 1,
      "title": "Toy Story (1995)",
      "genres": "Adventure|Animation|Children|Comedy|Fantasy",
      "price": 10
    },
    {
      "movieId": 2,
      "title": "Jumanji (1995)",
      "genres": "Adventure|Children|Fantasy",
      "price": 15
    },
    {
      "movieId": 3,
      "title": "Grumpier Old Men (1995)",
      "genres": "Comedy|Romance",
      "price": 13
    },
    {
      "movieId": 4,
      "title": "Waiting to Exhale (1995)",
      "genres": "Comedy|Drama|Romance",
      "price": 14
    },
    {
      "movieId": 5,
      "title": "Father of the Bride Part II (1995)",
      "genres": "Comedy",
      "price": 9
    },
    {
      "movieId": 6,
      "title": "Heat (1995)",
      "genres": "Action|Crime|Thriller",
      "price": 10
    },
    {
      "movieId": 7,
      "title": "Sabrina (1995)",
      "genres": "Comedy|Romance",
      "price": 10
    },
    {
      "movieId": 8,
      "title": "Tom and Huck (1995)",
      "genres": "Adventure|Children",
      "price": 11
    },
    {
      "movieId": 9,
      "title": "Sudden Death (1995)",
      "genres": "Action",
      "price": 12
    },
    {
      "movieId": 10,
      "title": "GoldenEye (1995)",
      "genres": "Action|Adventure|Thriller",
      "price": 10
    },
    {
      "movieId": 11,
      "title": "American President, The (1995)",
      "genres": "Comedy|Drama|Romance",
      "price": 12
    },
    {
      "movieId": 12,
      "title": "Dracula: Dead and Loving It (1995)",
      "genres": "Comedy|Horror",
      "price": 10
    },
    {
      "movieId": 13,
      "title": "Balto (1995)",
      "genres": "Adventure|Animation|Children",
      "price": 10
    },
    {
      "movieId": 14,
      "title": "Nixon (1995)",
      "genres": "Drama",
      "price": 12
    },
    {
      "movieId": 15,
      "title": "Cutthroat Island (1995)",
      "genres": "Action|Adventure|Romance",
      "price": 10
    },
    {
      "movieId": 16,
      "title": "Casino (1995)",
      "genres": "Crime|Drama",
      "price": 10
    },
    {
      "movieId": 17,
      "title": "Sense and Sensibility (1995)",
      "genres": "Drama|Romance",
      "price": 9
    },
    {
      "movieId": 18,
      "title": "Four Rooms (1995)",
      "genres": "Comedy",
      "price": 14
    },
    {
      "movieId": 19,
      "title": "Ace Ventura: When Nature Calls (1995)",
      "genres": "Comedy",
      "price": 13
    },
    {
      "movieId": 20,
      "title": "Money Train (1995)",
      "genres": "Action|Comedy|Crime|Drama|Thriller",
      "price": 10
    },
    {
      "movieId": 21,
      "title": "Get Shorty (1995)",
      "genres": "Comedy|Crime|Thriller",
      "price": 15
    },
    {
      "movieId": 22,
      "title": "Copycat (1995)",
      "genres": "Crime|Drama|Horror|Mystery|Thriller",
      "price": 14
    },
    {
      "movieId": 23,
      "title": "Assassins (1995)",
      "genres": "Action|Crime|Thriller",
      "price": 12
    },
    {
      "movieId": 24,
      "title": "Powder (1995)",
      "genres": "Drama|Sci-Fi",
      "price": 10
    },
    {
      "movieId": 25,
      "title": "Leaving Las Vegas (1995)",
      "genres": "Drama|Romance",
      "price": 10
    }
]