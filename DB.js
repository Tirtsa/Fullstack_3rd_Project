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
    constructor(title, genres, price, selectedSeats, total) {
        this.title = title;
        this.genres = genres
        this.price = price;
        this.selectedSeats = selectedSeats;
        this.total = total;
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

//window.localStorage.clear();

//2 arrays to store the users and movies
var users = [];
var movies = [];
var orders = [];



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

function get_current_user(){
    return localStorage.getItem('CurrentUser');
}

function get_current_movie(){
    return localStorage.getItem('CurrentMovie');
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

function add_to_basket() {
    var movie = get_current_movie();
    var new_user = get_current_user();
    //var new_movie = JSON.parse(movie_json);
    new_user.movies.push(movie);

    //save the user object in local storage
    localStorage.setItem('user', JSON.stringify(new_user));
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
    localStorage.setItem('movies', JSON.stringify(movies_json));
}

function set_genres() {
    localStorage.setItem('genres', JSON.stringify(genres));
}

//faire fonction update user, update movie, delete user, get_user, get_movie
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
      "price": "10$"
    },
    {
      "movieId": 2,
      "title": "Jumanji (1995)",
      "genres": "Adventure|Children|Fantasy"
    },
    {
      "movieId": 3,
      "title": "Grumpier Old Men (1995)",
      "genres": "Comedy|Romance"
    },
    {
      "movieId": 4,
      "title": "Waiting to Exhale (1995)",
      "genres": "Comedy|Drama|Romance"
    },
    {
      "movieId": 5,
      "title": "Father of the Bride Part II (1995)",
      "genres": "Comedy"
    },
    {
      "movieId": 6,
      "title": "Heat (1995)",
      "genres": "Action|Crime|Thriller"
    },
    {
      "movieId": 7,
      "title": "Sabrina (1995)",
      "genres": "Comedy|Romance"
    },
    {
      "movieId": 8,
      "title": "Tom and Huck (1995)",
      "genres": "Adventure|Children"
    },
    {
      "movieId": 9,
      "title": "Sudden Death (1995)",
      "genres": "Action"
    },
    {
      "movieId": 10,
      "title": "GoldenEye (1995)",
      "genres": "Action|Adventure|Thriller"
    },
    {
      "movieId": 11,
      "title": "American President, The (1995)",
      "genres": "Comedy|Drama|Romance"
    },
    {
      "movieId": 12,
      "title": "Dracula: Dead and Loving It (1995)",
      "genres": "Comedy|Horror"
    },
    {
      "movieId": 13,
      "title": "Balto (1995)",
      "genres": "Adventure|Animation|Children"
    },
    {
      "movieId": 14,
      "title": "Nixon (1995)",
      "genres": "Drama"
    },
    {
      "movieId": 15,
      "title": "Cutthroat Island (1995)",
      "genres": "Action|Adventure|Romance"
    },
    {
      "movieId": 16,
      "title": "Casino (1995)",
      "genres": "Crime|Drama"
    },
    {
      "movieId": 17,
      "title": "Sense and Sensibility (1995)",
      "genres": "Drama|Romance"
    },
    {
      "movieId": 18,
      "title": "Four Rooms (1995)",
      "genres": "Comedy"
    },
    {
      "movieId": 19,
      "title": "Ace Ventura: When Nature Calls (1995)",
      "genres": "Comedy"
    },
    {
      "movieId": 20,
      "title": "Money Train (1995)",
      "genres": "Action|Comedy|Crime|Drama|Thriller"
    },
    {
      "movieId": 21,
      "title": "Get Shorty (1995)",
      "genres": "Comedy|Crime|Thriller"
    },
    {
      "movieId": 22,
      "title": "Copycat (1995)",
      "genres": "Crime|Drama|Horror|Mystery|Thriller"
    },
    {
      "movieId": 23,
      "title": "Assassins (1995)",
      "genres": "Action|Crime|Thriller"
    },
    {
      "movieId": 24,
      "title": "Powder (1995)",
      "genres": "Drama|Sci-Fi"
    },
    {
      "movieId": 25,
      "title": "Leaving Las Vegas (1995)",
      "genres": "Drama|Romance"
    }
]