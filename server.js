// methods: POST-creating data, GET, PUT-updating data, DELETE


class Server{
    static carry_request(body, obj){
        //POST
        if(obj.method == 'POST' && obj.url =="http://localhost:3000/add_user"){
            //var new_user = JSON.parse(body);
            add_user(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'POST' && obj.url =="http://localhost:3000/add_movie"){
            add_to_basket(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'POST' && obj.url =="http://localhost:3000/add_seats"){
            add_seats(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'POST' && obj.url =="http://localhost:3000/add_order"){
            add_order(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        //GET
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_user"){
            var objet = JSON.parse(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_current_user();
            return obj;
        }

        else if (obj.method == 'GET' && obj.url =="http://localhost:3000/get_users"){
            obj.response = get_users();
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_movies"){
            obj.response = get_movies();
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_current_movie"){
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_current_movie();
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_selected_seats"){
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_selected_seats();
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_selected_seats_by_movie_id"){
            var movie_id = JSON.parse(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_selected_seats_by_movie_id(movie_id);
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_orders"){
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_orders();
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_order_by_user_id"){
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_order_by_user_id(user_id);
            return obj;
        }
        else if(obj.method == 'GET' && obj.url =="http://localhost:3000/get_seats_count"){
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            obj.response = get_seats_count();
            return obj;
        }
        //PUT
        else if(obj.method == 'PUT' && obj.url =="http://localhost:3000/update_current_user"){
            update_current_user(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'PUT' && obj.url =="http://localhost:3000/update_current_movie"){
            update_current_movie(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'PUT' && obj.url =="http://localhost:3000/update_seats_count"){
            update_seats_count(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }

        //DELETE
        else if(obj.method == 'DELETE' && obj.url =="http://localhost:3000/delete_current_user"){
            delete_current_user();
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }
        else if(obj.method == 'DELETE' && obj.url =="http://localhost:3000/delete_movie"){
            delete_movie(body);
            obj.status = 200;
            obj.ReadyState = ReadyState.DONE;
            return obj;
        }

    }
    

}