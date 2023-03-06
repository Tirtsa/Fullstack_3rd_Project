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


//Document event listener
document.addEventListener("DOMContentLoaded", () => {

    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById("container").appendChild(clon);


    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();

        var temp = document.getElementsByTagName("template")[1];
        var clon = temp.content.cloneNode(true);
        document.getElementById("container").appendChild(clon);
        
    });










    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const form_pwd = document.querySelector("#pwd");
    const bookingForm = document.querySelector("#booking")
    const seatsForm = document.querySelector("#seats")
    const basketForm = document.querySelector("#basket")

    const seatsContainer = document.querySelector('.seats-container');


    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    document.querySelector("#btnBooking").addEventListener("click", e => {
        e.preventDefault();
        seatsForm.classList.remove("form-hidden");
        bookingForm.classList.add("form-hidden");
    });

    document.querySelector("#add_to_basket_btn").addEventListener("click", e => {
        e.preventDefault();
        basketForm.classList.remove("form-hidden");
        seatsForm.classList.add("form-hidden");
    });

    document.querySelector("#category").addEventListener("change", e => {
        e.preventDefault();
        document.querySelector("#movies").classList.remove("select-hidden");
        document.querySelector("#movies").classList.add("select-visible");
        
        set_movies();

        var fxhttp = new FXMLHttpRequest();
        fxhttp.open("GET", "http://localhost:3000/get_movies", true);
        fxhttp.send();
        var movies_list = fxhttp.response;

        movies_list.forEach(m => function() {
            const newMovieOption = document.createElement('option');
            const movieOptionText = document.createTextNode(m.title);
            // set option text
            newMovieOption.appendChild(movieOptionText);
            // and option value
            newMovieOption.setAttribute('value',m.movieId);
            document.getElementById("movies").appendChild(newMovieOption);
        });

        for (let i=1; i<movies_list.length();i++) {
            const newMovieOption = document.createElement('option');
            const movieOptionText = document.createTextNode(movies_list[i].title);
            // set option text
            newMovieOption.appendChild(movieOptionText);
            // and option value
            newMovieOption.setAttribute('value',movies_list[i].movieId);
            document.getElementById("movies").appendChild(newMovieOption);
        }
    });

    createAccountForm.addEventListener("submit", e => {
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
        let new_user = new User(uname,email,pwd,time,0, []);

        var fxhttp = new FXMLHttpRequest();
        fxhttp.open("POST", "http://localhost:3000/add_user", true);
        fxhttp.send(new_user);

        //check if a same user exists ans set errror or insert user to localstorage
        /*if (localStorage.getItem(uname) == undefined) {
            var user = {Password: pwd.value, Email: email.value, Trials: 0, LastConnexion: time, Scores: {Trivia: 0, Sudoku: 0}};
            localStorage.setItem(uname, JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(uname));
            //alert("Successfully Added!");
            //location.replace("index.html");
            setFormMessage(createAccountForm, "success", "Successfully added ! Please log in to start gaming");
        }
        else {
            //alert("The user already exist!");
            setFormMessage(createAccountForm, "error", "The user already exist !");
        }*/

    });

    loginForm.addEventListener("submit", e => {
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
        fxhttp.send();
        var users_list = fxhttp.response;
        //var users_list = fxhttp.onload();

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

                loginForm.classList.add("form-hidden");
                bookingForm.classList.remove("form-hidden");

            }
            else {
                setFormMessage(loginForm, "error", "Incorrect password, please try again");

            }
        }
        
    });

    bookingForm.addEventListener("submit", e => {
        e.preventDefault();

        bookingForm.classList.add("form-hidden");
        seatsForm.classList.remove("form-hidden");
    });

    document.querySelectorAll(".input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.value.length == 0) {
                setInputError(inputElement, "Please enter " + inputElement.placeholder);
            }

            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
            
            if (e.target.id === "confirmPwd" ) {
                if (e.target.value != document.querySelector("#signupPwd").value) {
                    setInputError(inputElement, "The password confirmation does not match");
                }
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    // Seat click event
    seatsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
      console.log("Toggle selected")
      window.alert("Toggle selected")
      updateSelectedCount();
    }
  });
});


const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');


var add_to_basket_btn = document.getElementById('add_to_basket_btn');
add_to_basket_btn.addEventListener('click', add_to_basket);

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
}
