class Network{
    static send(body, obj){
        obj.ReadyState = ReadyState.HEADERS_RECEIVED;
        var fxhttp = null;
        fxhttp = Server.carry_request(body, obj);
        return fxhttp;
    }
}