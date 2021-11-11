"use strict";
var button = document.querySelector('#acudit');
var actualJoke = document.querySelector('#actualJoke');
var valor = document.querySelector('.valor');
// Muestra los grados Centígrados y la IMagen del tiempo que hace
var temperatura = document.querySelector('#temperatura');
var imagen = document.querySelector('#imagen');
//svg's de la pagina, para alternarlos
var svgCenter = document.querySelector('#svgCenter');
var svgLeft = document.querySelector('#svgLeft');
var svgRight = document.querySelector('#svgRight');
var reportJokes = new Array;
window.onload = function tiempo() {
    var url = 'http://api.openweathermap.org/data/2.5/weather?id=2510769&name=Barcelona&lang=sp&units=metric&appid=d1f83a1814a704980eecfe0316d79072';
    fetch(url, {
        headers: { 'Accept': 'application/json' }
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data.weather[0].description, data.main.temp, data.weather[0].icon);
        temperatura.textContent = data.main.temp + " \u00BAC";
        imagen.setAttribute('src', "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    });
    svgCenter.setAttribute('src', "img/svg1.svg");
    svgRight.setAttribute('src', "img/svg1Right.svg");
    svgLeft.setAttribute('src', "img/svg1Left.svg");
};
//funcion para cambiar los svg del HTML aleatoriamente segun van cambiando las bromas
function svg() {
    var random = Math.floor(Math.random() * 3);
    var num;
    if (random === 0) {
        num = 1;
    }
    else if (random === 1) {
        num = 2;
    }
    else {
        num = 3;
    }
    svgCenter.setAttribute('src', "img/svg" + num + ".svg");
    svgRight.setAttribute('src', "img/svg" + num + "Right.svg");
    svgLeft.setAttribute('src', "img/svg" + num + "Left.svg");
}
function Joke() {
    //creamos un aleatorio que nos escoge de que API tomamos el chiste
    var random = Math.floor(Math.random() * 2);
    var url = "";
    if (random === 0) {
        url = 'https://icanhazdadjoke.com/';
    }
    else if (random === 1) {
        url = 'http://api.icndb.com/jokes/random';
    }
    //Hacemos fetch y extraemos el chiste de la API que nos ha dado Random
    fetch(url, {
        headers: { 'Accept': 'application/json' }
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        //Mostramos el chiste por pantalla
        if (random === 0) {
            actualJoke.textContent = data.joke;
        }
        else if (random === 1) {
            actualJoke.textContent = data.value.joke;
        }
        valor.classList.toggle('dNone');
        button.setAttribute('disabled', '');
    })
        .catch(function (err) {
        err = "Parece que elago ha ido mal";
        actualJoke.textContent = err;
    });
    svg();
}
/**
 * Función que obtiene la valoracio, y tomando el chiste y el tiempo del momento con devolverInfo() => nos devuelve la info del chiste
 * @param num numero devuelto por la funcio, asignado al boton del HTML
 */
function valoracion(num) {
    button.removeAttribute('disabled');
    valor.classList.toggle('dNone');
    var joke = actualJoke.textContent;
    console.log(joke);
    //Devolvemos la data del momento del click de la valoración
    var data = new Date();
    var now = data.toISOString();
    //Relenamos el array qu egurda la info de valracion y consulta de las bromas
    reportJokes.push(devolverInfo(joke, num, now));
    console.log(reportJokes);
}
/**
 * Reporte de la broma con su valoracion y data de consulta
 * @param joke => la broma que se ha consultado
 * @param score => la piuntuación que ha recibido la broma
 * @param date => la fecha en que se ha realizado la valoració (y consulta)
 * @returns => devuleve el reporte de la broma
 */
function devolverInfo(joke, score, date) {
    return { joke: joke, score: score, date: date };
}
button.addEventListener('click', Joke);
