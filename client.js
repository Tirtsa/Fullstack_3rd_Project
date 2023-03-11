const app = {
  pages: [],
  show: new Event('show'),
  init: function(){
    if(document.getElementById("container").querySelector("#createAccount") != null) {
      document.getElementById("container").removeChild(document.querySelector("#createAccount"))
    }

    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg)=>{
        pg.addEventListener('show', app.pageShown);
    })

    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById("container").appendChild(clon);
    
    
    
    document.querySelector("#linkCreateAccount").addEventListener("click", app.register);
    document.querySelector("#btnLogin").addEventListener("click", e => {
      e.preventDefault();

      //don't allow sign up if there is an input error
      document.querySelectorAll(".input").forEach(inputElement => {
          // check input error only for login's inputs
          if(inputElement.parentElement.parentElement.id == "login") {
              if(inputElement.parentElement.querySelector(".input-error-message").textContent !== "") {
                  setFormMessage(createAccountForm, "error", "Please correct all errors before continue");
              }
          }
      }); 
      
      var loginForm = document.querySelector("#login")
      //get input values to do some verifications
      var uname = document.querySelector("#username").value;
      var pwd = document.querySelector("#pwd").value;
      var currentdate = new Date(); 
      var time = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +" "
          + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();


      //check if user exists
      // first request - get users list
      var fxhttp = new FXMLHttpRequest();
      fxhttp.open("GET", "http://localhost:3000/get_users", true);
      var users_list = fxhttp.send();
      //var users_list = fxhttp.response;
      //var users_list = fxhttp;

      //check if the uname of the user is in the users_list
      //let obj = arr.find(o => o.name === 'string 1');
      let user = users_list.find(o => o.name === uname);
      if (user == null) {
          setFormMessage(loginForm, "error", "User not found, please sign up first");
      }
      else {
        if(user.password == pwd){
          //new request - update current user
          var fxhttp = new FXMLHttpRequest();
          fxhttp.open("PUT", "http://localhost:3000/update_current_user", true);
          fxhttp.send(user);

          //alert("successfull go in!");
          setFormMessage(loginForm, "success", "Successfully log in !");

          app.booking();

        }
        else {
          setFormMessage(loginForm, "error", "Incorrect password, please try again");

        }
      }
    });   
  },

  register: function() {
    var container = document.getElementById("container");
    actual_child = document.querySelector("#login");
    container.removeChild(actual_child);

    var temp = document.getElementsByTagName("template")[1];
    var clon = temp.content.cloneNode(true);
    container.appendChild(clon);

    document.querySelector("#linkLogin").addEventListener("click", app.init);
    document.querySelector("#btnCreateAccount").addEventListener("click", e => {
      e.preventDefault();
      
      //don't allow sign up if there is an input error
      document.querySelectorAll(".input").forEach(inputElement => {
          // check input error only for login's inputs
          if(inputElement.parentElement.parentElement.id == "createAccount") {
              if(inputElement.parentElement.querySelector(".input-error-message").textContent !== "") {
                  setFormMessage(createAccountForm, "error", "Please correct all errors before continue");
              }
          }
          
      });
      
      //Get all input values to do some verifications
      var uname = document.querySelector("#signupUsername").value;
      var email = document.querySelector("#email").value;
      var pwd = document.querySelector("#signupPwd").value;
      var currentdate = new Date(); 
      var time = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +" " 
          + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();


      //create a new user object
      let new_user = new User(uname,email,pwd,time, []);

      var fxhttp = new FXMLHttpRequest();
      fxhttp.open("POST", "http://localhost:3000/add_user", true);
      fxhttp.send(new_user);
    });
  },
  booking: function() {
    var container = document.getElementById("container");
    actual_child = document.querySelector("#login");
    container.removeChild(actual_child);

    var temp = document.getElementsByTagName("template")[2];
    var clon = temp.content.cloneNode(true);
    container.appendChild(clon);

    set_movies();
    set_genres();

    var fxhttp = new FXMLHttpRequest();
    fxhttp.open("GET", "http://localhost:3000/get_movies", true);
    var movies_list = fxhttp.send();
    //var movies_list = fxhttp.response;

    document.querySelector("#category").addEventListener("change", e => {
      e.preventDefault();
      document.querySelector("#movies").classList.remove("select-hidden");
      document.querySelector("#movies").classList.add("select-visible");

      movies_list.forEach(m => {
        const newMovieOption = document.createElement('option');
        const movieOptionText = document.createTextNode(m.title);
        // set option text
        newMovieOption.appendChild(movieOptionText);
        // and option value
        newMovieOption.setAttribute('value',m.movieId);
        document.getElementById("movies").appendChild(newMovieOption);
      });

    });


    document.querySelector("#btnBooking").addEventListener("click", e => {
      var selected_genre = document.querySelector("#category").value;
      var selected_movie = document.querySelector("#movies").value;

      var intmovie = parseInt(selected_movie);
      let movie = movies_list.find(m => m.movieId == parseInt(selected_movie));

      var fxhttp = new FXMLHttpRequest();
        fxhttp.open("PUT", "http://localhost:3000/update_current_movie", true);
        fxhttp.send(movie);

        app.seats();
    });

  },
  seats: function() {
    var container = document.getElementById("container");
    actual_child = document.querySelector("#booking");
    container.removeChild(actual_child);

    var temp = document.getElementsByTagName("template")[3];
    var clon = temp.content.cloneNode(true);
    container.appendChild(clon);

    const seatsContainer = document.querySelector('.seats-container');
    // Seat click event
    seatsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
      }});

      //get the current movie to update the title
      var fxhttp = new FXMLHttpRequest();
      fxhttp.open("GET", "http://localhost:3000/get_current_movie", true);
      var current_movie = fxhttp.send();
      //var current_movie = fxhttp.response;

      movie_title.innerText = "Movie : " + current_movie.title;
    document.querySelector("#add_to_basket_btn").addEventListener("click", app.basket);

  } ,
  basket: function() {
    var container = document.getElementById("container");
    actual_child = document.querySelector("#seats");
    container.removeChild(actual_child);

    var temp = document.getElementsByTagName("template")[4];
    var clon = temp.content.cloneNode(true);
    container.appendChild(clon);

    //afficher détails current_movie
    //afficher nb de places prises
    //afficher total

    //get the current movie to update the title
    var fxhttp = new FXMLHttpRequest();
    fxhttp.open("GET", "http://localhost:3000/get_current_movie", true);
    var current_movie = fxhttp.send();
    //var current_movie = fxhttp.response;

    var tbodyRef = document.getElementById('basket-table').getElementsByTagName('tbody')[0];

    //insert a row in the table at the last row
    var newRow = tbodyRef.insertRow();
    //insert the movie title, price, quantity and total
    var newCell = newRow.insertCell();
    var newText = document.createTextNode(current_movie.title);
    newCell.appendChild(newText);
    
    //insert the movie price
    newCell = newRow.insertCell();
    newText = document.createTextNode(current_movie.price);
    newCell.appendChild(newText);

    //get the seats count
    var fxhttp = new FXMLHttpRequest();
    fxhttp.open("GET", "http://localhost:3000/get_seats_count", true);
    var seats_count = fxhttp.send();
    //var seats_count = fxhttp.response;

    //insert the movie quantity
    newCell = newRow.insertCell();
    newText = document.createTextNode(seats_count);
    newCell.appendChild(newText);

    //insert the movie total
    newCell = newRow.insertCell();
    newText = document.createTextNode(current_movie.price * seats_count);
    newCell.appendChild(newText);

    //insert cell for the delete button and edit button
    newCell = newRow.insertCell();
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    newCell.appendChild(btnEdit);

    let btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    newCell.appendChild(btnDelete);



    /*valider panier :
      orderselements = []
      foreach orderleement in current_user.movies
        orderselements.push(orderelement)
        current_user.movies.remove(orderelement)
      var order = new Order(order_id, orderselements, total_order)
    */


      //get_seats_count
      //add_order
  }
}

document.addEventListener('DOMContentLoaded', app.init);

//All helper's functions
//Set form's error messages functions
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".message");

  messageElement.textContent = message;
  messageElement.classList.remove("message-success", "message-error");
  messageElement.classList.add(`message-${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("input-error");
  inputElement.parentElement.querySelector(".input-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("input-error");
  inputElement.parentElement.querySelector(".input-error-message").textContent = "";
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

  var fxhttp = new FXMLHttpRequest();
  fxhttp.open("GET", "http://localhost:3000/get_current_movie", true);
  var current_movie = fxhttp.send();
  //var current_movie = fxhttp.response; 
  
  var ticketPrice = current_movie.price;
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  fxhttp.open("PUT", "http://localhost:3000/update_seats_count", true);
  fxhttp.send(selectedSeatsCount);
  
}