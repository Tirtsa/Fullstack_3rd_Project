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
      let new_user = new User(uname,email,pwd,time,0, []);

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

    document.querySelector("#category").addEventListener("change", e => {
      e.preventDefault();
      document.querySelector("#movies").classList.remove("select-hidden");
      document.querySelector("#movies").classList.add("select-visible");
      
      set_movies();

      var fxhttp = new FXMLHttpRequest();
      fxhttp.open("GET", "http://localhost:3000/get_movies", true);
      fxhttp.send();
      var movies_list = fxhttp.response;

      movies_list.forEach(m => {
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