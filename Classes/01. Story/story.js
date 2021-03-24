class Story {
    
    #comments;
    #likes;
    

    constructor (title, creator) {
        this.title = title;
        this.creator = creator;
        this.#comments = [];
        this.#likes = [];

    }    

    get likes(){
           if(this.#likes.length == 0){
            return `${this.title} has 0 likes`;
        } else if(this.#likes.length == 1)  {
            return `${this.#likes[0]} likes this story!`;
        } else  if(this.#likes.length > 1){
            return `${this.#likes[0]} and ${this.#likes.length - 1} others like this story!`;
        }

    }


    like (username){

        if (this.creator === username) {
            throw new Error(`You can't like your own story!`);
        }

        if (this.#likes.includes(username)) {
            throw new Error(`You can't like the same story twice!`);
        }

        this.#likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike (username) {
        if(!this.#likes.includes(username)) {
         throw new Error(`You can't dislike this story!`);
        }

        let index = this.#likes.indexOf(username);
        this.#likes.splice(index,1);
        return `${username} disliked ${this.title}`;
    }

    comment(username,content, id) {
        let check = this.#comments.find(comment => comment.Id === id);
        let comindex = this.#comments.length+1;

        if (check == undefined ) {
               this.#comments.push({
                   Id: comindex,
                   Username: username,
                   Content: content,
                   Replies: []
               })
               
               return `${username} commented on ${this.title}`
        } else {
             
            let repindex = check.Replies.length+1;

            check.Replies.push({
                Id: `${check.Id}.${repindex}`,
                Username: username,
               Content: content
            })
            
            return `You replied successfully`
        }
    }

    toString(sortingType) {
       let info = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this.#likes.length}\nComments:`;

       if (this.#comments.length>0) {

       if (sortingType == 'asc') {
        
         this.#comments
         .sort((a,b)=> a.Id > b.Id)
         
         .forEach(el => {

            info += `\n-- ${el.Id}. ${el.Username}: ${el.Content}`;

             if(el.Replies.length>0) {
                 el.Replies
                   .sort((a,b)=> a.Id > b.Id)
                   .forEach(reply => 
                    info += `\n--- ${reply.Id}. ${reply.Username}: ${reply.Content}`);
                   
             } else{
                 info += ``;
             }
         })

        }  else 
        
        if (sortingType == 'desc') {
        
            this.#comments
            .sort((a,b)=> { return b.Id - a.Id})
            
            .forEach(el => {
   
               info += `\n-- ${el.Id}. ${el.Username}: ${el.Content}`;
   
                if(el.Replies.length>0) {
                    el.Replies
                      .sort((a,b)=> { return b.Id - a.Id})
                      .forEach(reply => 
                       info += `\n--- ${reply.Id}. ${reply.Username}: ${reply.Content}`);
                      
                } else{
                    info += ``;
                }
            })
   
           }    else if (sortingType == 'username') {
        
            this.#comments
            .sort((a,b)=> a.Username.localeCompare(b.Username))
            
            .forEach(el => {
   
               info += `\n-- ${el.Id}. ${el.Username}: ${el.Content}`;
   
                if(el.Replies.length>0) {
                    el.Replies
                      .sort((a,b)=>  a.Username.localeCompare(b.Username))
                      .forEach(reply => 
                       info += `\n--- ${reply.Id}. ${reply.Username}: ${reply.Content}`);
                      
                } else{
                    info += ``;
                }
            })
   
           } 



       }

       return info.trim();
    }
    
    


}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));


