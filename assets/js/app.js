//VARIABLES 
const listaTweets = document.getElementById('lista-tweets');

//eventos

eventListeners(); 

function eventListeners(){
    //envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //cargar contenido
    document.addEventListener('DOMContentLoaded', localStorageListo);
};
//funciones
//añadir tweet 
function agregarTweet(e){
    e.preventDefault();
    //lee valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton borrar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList  = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //crear contenido y añadirlo a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade boton borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la vista
    listaTweets.appendChild(li);
    //añadir tweet a localstorage
    agregarTweetLocalStorage(tweet);
};
//borrar tweet
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet')
        {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement);
        alert('Seguro que desea eliminar este tweet?');
        }
};
//agregar tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //agregar nuevo tweet
    tweets.push(tweet);
    //agregar a localstorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
};
//comprobar que hayan elementos en localstorage y retornar un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos valores de localstorage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }  else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
};
//Mostrar datos de localc storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function name(tweet) {
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        //crear contenido y añadirlo a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade boton borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la vista
        listaTweets.appendChild(li);    
    });
}
//Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet, index) {
    let tweet,
        tweetBorrar;
    //Elimina la X del tweeet
    tweetBorrar = tweet.substring(0, tweet.lenght, -1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function() {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}