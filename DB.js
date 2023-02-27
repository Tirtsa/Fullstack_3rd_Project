//define user class with name and movies array
class User {
    constructor(username,mail,password,movies) {
        this.name = username;
        this.mail = mail;
        this.password = password;
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


function add_user(user_json){
    var new_user = JSON.parse(user_json);
    localStorage.setItem('user', JSON.stringify(new_user));
}

//doit etre add_movie et pas add_to_basket - A CHANGER
function add_to_basket(movie_json, user_json) {

    var new_user = JSON.parse(user_json);
    var new_movie = JSON.parse(movie_json);

    new_user.movies.push(new_movie);

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