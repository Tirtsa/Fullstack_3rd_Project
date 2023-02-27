//etat de la connexion
const ReadyState = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
}

class FXMLHttpRequest{
    response = null;
    responseText = "";
    ReadyState = ReadyState.UNSENT;
    status = 0; // 200 OK, 404 Not Found, 403 Forbidden, 500 Internal Server Error
    onload = null;
    async= true;
    method="";
    url="";

    open(method, url){
        this.method = method;
        this.url = url;
        this.readyState = ReadyState.OPENED;

        //voir si il faut rajouter async
    }

    send(body){ //body - se qu'on envoie au server
        var fxhttp = null;
        fxhttp = Network.send(body, this);
        this.ReadyState = fxhttp.ReadyState;
        this.status = fxhttp.status;
        this.response = fxhttp.response;
    }
  

}