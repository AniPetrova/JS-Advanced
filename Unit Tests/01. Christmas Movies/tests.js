const describe = require('mocha').describe;
const assert = require('chai').assert;
const ChristmasMovies = require('./02. Christmas Movies_Resources');

describe ('All Tests',() => {
    let christmas = new ChristmasMovies();

    describe ('Instant', () => {

        it ('Input', ()=> {
            assert.deepEqual(new ChristmasMovies, {movieCollection: [], watched: {}, actors: []});
        })
        
    })

    describe ('Method Buy Movie', ()=> {
        it ('New Movie', () => {
            assert.equal(christmas.buyMovie('Friends', ['Jenifer Aniston', 'Mathew Perry', 'David Shuimer']), 'You just got Friends to your collection in which Jenifer Aniston, Mathew Perry, David Shuimer are taking part!' );
        })

        it ('Unique actors', () => {
            assert.equal(christmas.buyMovie('New test', ['Jenifer Aniston', 'Mathew Perry', 'Jenifer Aniston', 'David Shuimer']), 'You just got New test to your collection in which Jenifer Aniston, Mathew Perry, David Shuimer are taking part!' );
        })

        it ('Old movie', () => {
            christmas.buyMovie('shiban movie', ['Jenifer Aniston', 'Mathew Perry', 'David Shuimer']);
            assert.throw(() => christmas.buyMovie('shiban movie', ['Jenifer Aniston', 'Mathew Perry', 'David Shuimer']), 'You already own shiban movie in your collection!');
        })

        it ('buy movie you dont own and check length',()=>{
           let newchr = new ChristmasMovies;
            newchr.buyMovie('Goodfellas', ['dfd','dfgfd']);
            assert.equal(newchr.movieCollection.length, 1);
        })
    })

    describe('Method discard movie', () => {

        it ('Correct input and watched movie', () => {
            christmas.buyMovie('Bought movie', ['actor1', 'actor2']);
            christmas.watchMovie('Bought movie');
            assert.equal(christmas.discardMovie('Bought movie'), `You just threw away Bought movie!`);
        })

        it ('Try to delete movie you didnot watch', () => {
            christmas.buyMovie('Not watched', ['actor1', 'actor2']);
            assert.throw(() => christmas.discardMovie('Not watched'), `Not watched is not watched!`);
        })

        it ('Movie is not in the collection', ()=> {
            assert.throw(()=> christmas.discardMovie('Tottaly new movie'), `Tottaly new movie is not at your collection!`);
        })

        it ('discard existing movie => if watched watched size shrinks by 1',()=>{
            let movies = new ChristmasMovies;
            movies.buyMovie('Goodfellas', ['DeNiro', 'Pesci']);
            movies.watchMovie('Goodfellas');
            movies.discardMovie('Goodfellas');
            assert.deepEqual(movies.watched,{});
        })

    })

    describe ('Watch movie function', ()=> {
        it ('Movie is not in the collection', ()=> {
            assert.throw(()=> christmas.watchMovie('Fucking movie'), `No such movie in your collection!`);
        })
        it ('Movie is already watched', ()=> {
            christmas.buyMovie('The Grinch', ['Benedict Cumberbatch', 'Rashida Jones']);
            christmas.watchMovie('The Grinch');
            christmas.watchMovie('The Grinch');
            christmas.watchMovie('The Grinch');
            christmas.watchMovie('The Grinch');
            assert.deepEqual(christmas.watched['The Grinch'], 4);
        })
        it ('Movie is watched for the first time', ()=> {
            christmas.buyMovie('Skapan film', ['Benedict Cumberbatch', 'Rashida Jones']);
            christmas.watchMovie('Skapan film');
            assert.deepEqual(christmas.watched['Skapan film'], 1);
        })


    })

    describe ('Favourite movie', ()=> {
        it ('You have favourite movie', ()=> {
            christmas.buyMovie('First movie', ['act4', 'act5']);
            christmas.buyMovie('Second movie', ['act6', 'act8']);
            christmas.watchMovie('First movie');
            christmas.watchMovie('First movie');
            christmas.watchMovie('First movie');
            christmas.watchMovie('First movie');
            christmas.watchMovie('First movie');
            christmas.watchMovie('Second movie');
            christmas.watchMovie('Second movie');

            assert.equal(christmas.favouriteMovie(), `Your favourite movie is First movie and you have watched it 5 times!`);
        })

        it ('You dont have fav movie', ()=> {
            christmas.watched = [];
            assert.throw(()=> christmas.favouriteMovie(), `You have not watched a movie yet this year!`);
        })
    })

    describe ('best actor', ()=> {
        it ('There is best actor', ()=> {
            assert.equal(christmas.mostStarredActor(), 'The most starred actor is Jenifer Aniston and starred in 3 movies!');
            
        })

        it ('There is NO best actor', ()=> {
            christmas.movieCollection = [];
            assert.throw(() => christmas.mostStarredActor(), `You have not watched a movie yet this year!`);
            
        })

        it ('try most starred actor with 1 participance',()=>{
            let movies = new ChristmasMovies;
            movies.buyMovie('Goodfellas', ['DeNiro']);
            assert.equal(movies.mostStarredActor(),`The most starred actor is DeNiro and starred in 1 movies!`);
        })
    })
})