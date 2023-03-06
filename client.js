const app = {
  pages: [],
  show: new Event('show'),
  init: function(){

    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg)=>{
        pg.addEventListener('show', app.pageShown);
    })

    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById("container").appendChild(clon);
    
    
    
    document.querySelector("#linkCreateAccount").addEventListener("click", app.register);
      
  },
  register: function() {
    var container = document.getElementById("container");
    actual_child = document.querySelector("#login");
    container.removeChild(actual_child);

    var temp = document.getElementsByTagName("template")[1];
    var clon = temp.content.cloneNode(true);
    container.appendChild(clon);

    document.querySelector("#linkLogin").addEventListener("click", app.init);
  }
  
}

document.addEventListener('DOMContentLoaded', app.init);