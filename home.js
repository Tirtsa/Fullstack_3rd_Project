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

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const form_pwd = document.querySelector("#pwd");
    const bookingForm = document.querySelector("#booking")
    const seatsForm = document.querySelector("#seats")
    const basketForm = document.querySelector("#basket")

    const seatsContainer = document.querySelector('.seats-container');
    window.alert(seatsContainer);

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

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
        document.querySelector("#movie").classList.remove("select-hidden");
        document.querySelector("#movie").classList.add("select-visible");
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
        var email = document.querySelector("#email");
        var pwd = document.querySelector("#signupPwd");
        var currentdate = new Date(); 
        var time = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +" " 
            + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        //check if a same user exists ans set errror or insert user to localstorage
        if (localStorage.getItem(uname) == undefined) {
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
        }

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
        var user = localStorage.getItem(uname);
        if (user != null) {
            user = JSON.parse(user);
            //check password for username
            if (user['Password'] == pwd) {
                localStorage.setItem('currentUser', JSON.stringify(uname));
                user['Trials'] = 0;
                user['LastConnexion'] = time;
                localStorage.setItem(uname, JSON.stringify(user));
                //alert("successfull go in!");
                setFormMessage(loginForm, "success", "Successfully log in !");
                
                loginForm.classList.add("form-hidden");
                bookingForm.classList.remove("form-hidden");
            }
            // if password wrong, increment num of trials
            else {
                user['Trials'] += 1;
                localStorage.setItem(uname, JSON.stringify(user));
                if (Number(user['Trials']) < 4) {
                    //alert("InCorrect Password, Try Again:(");
                    setFormMessage(loginForm, "error", "Incorrect password, please try again");
                }
                // user blocked (emoved) after 4 wrong trials
                else {
                    localStorage.removeItem(uname);
                    //alert("InCorrect Password, the user is block!!");
                    setFormMessage(loginForm, "error", "InCorrect Password ! The user is blocked because of too more trials !!");
                    location.replace("index.html");
                }
            }
        }
        else {
            //alert("InCorrect UserName:(");
            setFormMessage(loginForm, "error", "Incorrect username");
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
