class Comment{
    #user;
    #comment;
    #date;
    constructor(user, comment, date){
        this.user = user;
        this.comment = comment;
        this.date = (new Date()).toJSON().toString();
    }
    set user(user){
        this.#user = user;
    }
    get user(){
        return this.#user;
    }
    set comment(comment){
        this.#comment = comment;
    }
    get comment(){
        return this.#comment;
    }
    set date(date){
        this.#date = date;
    }
    get date(){
        return this.#date;
    }
}
