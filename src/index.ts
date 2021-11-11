const button = document.querySelector('#acudit') as HTMLButtonElement;
let actualJoke = document.querySelector('#actualJoke') as HTMLParagraphElement;
const valor = document.querySelector('.valor') as HTMLDivElement;
// Muestra los grados Centígrados y la IMagen del tiempo que hace

const temperatura = document.querySelector('#temperatura') as HTMLParagraphElement;

const imagen = document.querySelector('#imagen') as HTMLImageElement;

//svg's de la pagina, para alternarlos

const svgCenter = document.querySelector('#svgCenter') as HTMLImageElement;
const svgLeft = document.querySelector('#svgLeft') as HTMLImageElement;
const svgRight = document.querySelector('#svgRight') as HTMLImageElement;

//para recibir la broma de la API
interface broma {

    value: {
        joke: string;
    };
          
    joke: string;
}
//guardar la info de las bromas
interface report {
    joke: string | null;
    score: number;
    date: string;
}
//guardar/mostrar el tiempo
interface meteo {
    weather: [{
        description: string;
        icon: string;
    }];
    main: { temp: number };
}


let reportJokes: report[] = new Array;


window.onload = function tiempo(){
    let url = 'http://api.openweathermap.org/data/2.5/weather?id=2510769&name=Barcelona&lang=sp&units=metric&appid=d1f83a1814a704980eecfe0316d79072';
    fetch(url,
        {
            headers: { 'Accept': 'application/json' }
        })
        .then(res => res.json())
        .then((data:meteo) => {
            console.log(data.weather[0].description, data.main.temp, data.weather[0].icon);
            temperatura.textContent = `${data.main.temp} ºC`;
            imagen.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            
        })
    
    svgCenter.setAttribute('src', `img/svg1.svg`);
    svgRight.setAttribute('src', `img/svg1Right.svg`);
    svgLeft.setAttribute('src', `img/svg1Left.svg`);
    
};
//funcion para cambiar los svg del HTML aleatoriamente segun van cambiando las bromas
function svg():void {
    let random:number = Math.floor(Math.random() * 3);
    let num: number;
    if (random === 0) {
        num = 1;
    } else if (random === 1) {
        num = 2;
    
    } else {
        num = 3;
    }

    svgCenter.setAttribute('src', `img/svg${num}.svg`);
    svgRight.setAttribute('src', `img/svg${num}Right.svg`);
    svgLeft.setAttribute('src', `img/svg${num}Left.svg`);
}

function Joke(): void {

//creamos un aleatorio que nos escoge de que API tomamos el chiste

    let random:number = Math.floor(Math.random() * 2);
    let url: string = "";
    if (random === 0) {
        url = 'https://icanhazdadjoke.com/';
    } else if (random === 1) {
        url = 'http://api.icndb.com/jokes/random';
    }
    
    //Hacemos fetch y extraemos el chiste de la API que nos ha dado Random

        fetch(url, {
            headers: { 'Accept': 'application/json' }
        })
            .then(res => res.json())
            .then((data: broma) => {

                //Mostramos el chiste por pantalla
           if (random === 0) { 
                actualJoke.textContent = data.joke;
            } else if (random === 1) {
               actualJoke.textContent = data.value.joke;
            }
    
            valor.classList.toggle('dNone');
            button.setAttribute('disabled', '');
            })
        .catch(err => {
            err = "Parece que elago ha ido mal"
        actualJoke.textContent = err;
           
        })
    
    svg();
    
    
    } 
        
/**
 * Función que obtiene la valoracio, y tomando el chiste y el tiempo del momento con devolverInfo() => nos devuelve la info del chiste
 * @param num numero devuelto por la funcio, asignado al boton del HTML
 */

function valoracion(num: number): void {
    button.removeAttribute('disabled');
    valor.classList.toggle('dNone');

    let joke:string | null = actualJoke.textContent;
    console.log(joke);
     
//Devolvemos la data del momento del click de la valoración
    const data = new Date();
    let now = data.toISOString();

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

function devolverInfo(joke:string|null, score:number, date:string): report {
    
    return { joke, score, date };
    
}

button.addEventListener('click', Joke);



