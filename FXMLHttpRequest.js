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

    open(method, url,async){
        this.method = method;
        this.url = url;
        this.ReadyState = ReadyState.OPENED;

        this.async= async;
        if (this.async == true){
            this.onload=(e) =>{
                if (this.ReadyState == ReadyState.DONE && this.status == 200){
                    return this.response;
                }
                else {
                    console.log(this.status);
                }
            }
        }
        else {
            this.onload=(e) =>{
                if (this.status == 200){
                    return this.response;
                }
                else {
                    console.log(this.status);
                }
            }
        }
    }

    send(body){ //body - ce qu'on envoie au server
        var fxhttp = null;
        var fxhttp = Network.send(body, this);
        return fxhttp;
        //this.ReadyState = fxhttp.ReadyState;
        //this.status = fxhttp.status;
        //this.response = fxhttp.response;
    }


  
}