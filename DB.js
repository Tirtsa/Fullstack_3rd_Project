//define user class with name and movies array
class User {
    constructor(username,mail,password,movies) {
        this.name = username;
        this.mail = mail;
        this.password = password;
        this.movies = movies;
    }
}

let user = new User('John Doe', []);

//define movie class with title, price, selectedSeats and total
class Movie {
    constructor(title, price, selectedSeats, total) {
        this.title = title;
        this.price = price;
        this.selectedSeats = selectedSeats;
        this.total = total;
    }
}

function add_to_basket(movie_json, user_json) {

    var new_user = JSON.parse(user_json);
    var new_movie = JSON.parse(movie_json);

    new_user.movies.push(new_movie);

    //save the user object in local storage
    localStorage.setItem('user', JSON.stringify(new_user));
    
}