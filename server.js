// methods: POST-creating data, GET, PUT-updating data, DELETE


class Server{
    static carry_request(body, obj){
        if(obj.method == 'POST'){
            var obj = JSON.parse(body);
            if(obj.type == 'User'){
                add_user(obj);
                obj.status = 200;
                obj.ReadyState = ReadyState.DONE;
                return obj;
            }
            else if(obj.type == 'Movie'){
                add_to_basket(obj);
                return obj;
            }
        }
        else if(obj.method == 'GET'){
            var obj = JSON.parse(body);
            if(obj.type == 'User'){
                return get_user();
            }
            else if(obj.type == 'Movie'){
                return get_movie();
            }
        }
        else if(obj.method == 'PUT'){
            var obj = JSON.parse(body);
            if(obj.type == 'User'){
                update_user(obj);
                return obj;
            }
            else if(obj.type == 'Movie'){
                update_movie(obj);
                return obj;
            }
        }
        else if(obj.method == 'DELETE'){
            var obj = JSON.parse(body);
            if(obj.type == 'User'){
                delete_user(obj);
                return obj;
            }
            else if(obj.type == 'Movie'){
                delete_movie(obj);
                return obj;
            }
        }

    }
}