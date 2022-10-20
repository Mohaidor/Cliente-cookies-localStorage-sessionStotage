'use strict'

//EJERCICIO 4

//Nodo boton insertar
let insertar = document.querySelector('#insertarCookie');

//Evento click
insertar.addEventListener('click', function () {

    //Se obienen los datos; si alguno no es correcto se sale
    let nombre = prompt("Nombre de la cookie:");
    if (!nombre) {
        alert("No se ha proporcionado el nombre")
        return
    }
    let valor = prompt("Valor de la cookie:")
    if (!valor) {
        alert("No se ha proporcionado el valor")
        return
    }

    let caducidad = prompt("Caducidad en segundos:");
    if ((/^0-9+$/).test(caducidad) || (/^\s*$/).test(caducidad) || caducidad == 0) {
        alert("No se ha proporcionado la caducidad en segundos");
        return
    }

    //Añadir la cookie
    document.cookie = `${nombre}= ${valor};max-age=${+caducidad};SameSite=Lax;path=/`;
    
    //nodo donde se escribirá si esta vigente o no la cookie
    let code = document.querySelector("#existeOno")

    let contador = 1
    //funcion que determina si existe la cookie o no
    let checkCookie = () => {
        let cookies = document.cookie;
        let arrayCookies = cookies.split('; ');
        let existe = arrayCookies.filter(cookie => cookie.startsWith(nombre))

        if (existe.length) {
            code.innerHTML = `La coockie : ${existe} está Vigente; (${contador++})`;
        } else {
            code.innerHTML = `La coockie ha Expirado`;
            //cuando expira se paara el intervalo y se pone un timeout para borra el texto en 10 segundos
            clearInterval(timer)
            setTimeout(() => {
                code.innerHTML = ``;
            }, 10000);
        }
        code.scrollIntoView();
    }

    //Cada segundo llamara a la función que comprueba si existe la coockie
    let timer = window.setInterval(checkCookie, 1000);
    

}, false);