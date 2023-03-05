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
    constructor(title, price, selectedSeats, total) {
        this.title = title;
        this.price = price;
        this.selectedSeats = selectedSeats;
        this.total = total;
    }
}

//window.localStorage.clear();

//2 arrays to store the users and movies
var users = [];
var movies = [];



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



//faire fonction update user, update movie, delete user, get_user, get_movie