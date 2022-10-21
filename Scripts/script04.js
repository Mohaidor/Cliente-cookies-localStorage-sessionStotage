'use strict'

//EJERCICIO 4

//Nodo botón insertar
let insertar = document.querySelector('#insertarCookie');
insertar.addEventListener('click', anadeCookieSegundos, false);

function anadeCookieSegundos() {
    //Se obtienen los datos; si alguno no es correcto o está vacío se sale
    let nombre = prompt("Nombre de la cookie:");
    if ((/^\s*$/gi).test(nombre)) {
        alert("El nombre no puede quedar vació")
        return
    } else if (!nombre) {
        return
    }
    let valor = prompt("Valor de la cookie:")
    if ((/^\s*$/gi).test(valor)) {
        alert("El valor no puede quedar vació")
        return
    } else if (!valor) {
        return
    }

    let caducidad = prompt("Caducidad en segundos:");
    if ((/^0-9+$/).test(caducidad) || (/^\s*$/).test(caducidad) || caducidad == 0) {
        alert("No se ha proporcionado la caducidad en segundos");
        return
    }

    //Si ha llegado hasta aquí...Añadir la cookie
    document.cookie = `${nombre}= ${valor};max-age=${+caducidad};SameSite=Lax;path=/`;


    //////////////////////////////TIMER COMPRUEBA COOKIE/////////////////////////////////

    //nodo donde se escribirá si esta vigente o no la cookie
    let code = document.querySelector("#existeOno")

    let contador = 1
    //función que determina si existe la cookie o no
    let checkCookie = () => {
        //Obtener array de cookies y filtrar la que acabamos de insertar
        let cookies = document.cookie;
        let arrayCookies = cookies.split('; ');
        let existe = arrayCookies.filter(cookie => cookie.startsWith(nombre))

        //Si existe la cookie muestra que existe
        if (existe.length) {
            code.innerHTML = `La cookie : ${existe} está Vigente; (${contador++})`;
        } else {
            //Si no existe avisa; para el interval y pasados 10s borro el aviso
            code.innerHTML = `La cookie ha Expirado`;
            clearInterval(timer)
            setTimeout(() => {
                code.innerHTML = ``;
            }, 10000);
        }
    }

    //Cada segundo llamara a la función que comprueba si existe la cookie
    let timer = window.setInterval(checkCookie, 1000);
}