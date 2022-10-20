'use strict'

//EJERCICIO 3

//nodos donde se muestra la lista de cookies y el error si lo hubiere 
let span = document.querySelector('span');
let lista = document.querySelector('#listaCookies')


//Añadir cookie
let anyadir = document.querySelector('#btnAnyadir');
anyadir.addEventListener('click', anyadirCoockie, false)
function anyadirCoockie() {
    //peimero borro la lista y el error si existiese
    borralistaSpan()

    //Obtener el numero de cookies 
    let cookie = prompt("¿Cuantas cookies quieres crear?");
    //si no es un número o son espacios..
    if (isNaN(cookie) || (/^\s*$/gi).test(cookie)) {
        alert("Error: introduce el numero de cookies a introducir");
        //salir
        return
    }



    for (let i = 0; i < cookie; i++) {

        let nombreOk = nombre(i);

        if (!nombreOk) {
            return
        }
        let valorOk = valor(i);

        if (!valorOk) {
            return
        }
        let caducidadOk = caducidad(i)

        if (!caducidadOk) {
            return
        }


        if (nombreOk && valorOk && caducidadOk) {
            document.cookie = encodeURIComponent(nombreOk.trim()) + "=" + encodeURIComponent(valorOk.trim()) + ";expires=" + caducidadOk.trim() + ";SameSite=Lax;path=/";
            alert("Cookie añadida");
        } else {
            alert("Error en los datos")
        }
    }
}
/*validar datos*/
let nombre = (index) => {
    let nombre = prompt(`Nombre de la cookie ${index + 1}:`);
    //(a-zAZ09_)
    if (!(/^\w*$/gi).test(nombre) || !nombre) {
        alert("Error: el nombre debe estar en formato a-zA-Z-_")
        return
    } else {
        return nombre;
    }
}
let valor = (index) => {
    let valor = prompt(`Valor de la cookie ${index + 1}:`);

    if (!valor) {
        alert("Error: valor no válido");
        return;
    } else {
        return valor;
    }
}
let caducidad = (index) => {
    let fechaHoy = new Date();

    let caducidad = prompt(`Caducidad de la cookie ${index + 1}:`);
    let regex = (/^([0][1-9]|[12][0-9]|3[01])[\/]([0][1-9]|1[012])[\/]\d{4}( (0?[1-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/)

    if (!regex.test(caducidad)) {
        alert("La fecha tiene que estar en formato \ndd/mm/yyyy\ndd/mm/yyyy hh:mm\n dd/mm/yyyy hh:mm:ss\n dd-mm-yyyy\n dd-mm-yyyy hh:mm\n dd-mm-yyyy hh:mm:ss");
        return
    }

    let arrayFecha = caducidad.split("/");
    let caducidadOk = new Date(`${arrayFecha[1]}/${+arrayFecha[0] + 1}/${arrayFecha[2]}`);
    if (caducidadOk == "Invalid Date") {
        alert("Fecha inválida");
        return
    }
    if (caducidadOk < fechaHoy) {
        alert("La fecha no puede ser menor a hoy: \n" + fechaHoy);
        return
    } else {
        return caducidadOk.toUTCString();
    }
}

//consultar cookie
let consultar = document.querySelector('#btnConsultar');
consultar.addEventListener('click', consultarCoockie, false)
function consultarCoockie() {
    borralistaSpan()

    let cookies = document.cookie
    if (cookies) {
        //cortar las seccciones de las cookies
        cookies = cookies.split(";")
        //Añadir a la lista
        cookies.forEach(element => {
            let nodo = document.createElement('li');
            let textoFormateado = (element.split("=")).join(" = ")
            let texto = document.createTextNode(textoFormateado);
            nodo.appendChild(texto)

            lista.appendChild(nodo);
        });
    } else {
        //Error
        span.style.color = "red";
        span.innerHTML = "- Error no hay cookies"
    }
}

let modificar = document.querySelector('#btnModificar');

modificar.addEventListener('click', modificarCoockie, false)

function modificarCoockie() {

    let cookies = document.cookie;

    if (cookies.length) {

        let cookieBorrar = prompt("Introduce el nombre de la cookie que quieres modificar:");

        if (!cookieBorrar) {
            return
        }

        if (!(/^\w*$/gi).test(cookieBorrar)) {
            alert("Error: el nombre debe estar en formato a-zA-Z-_")
            return
        }
        let arrayCookies = cookies.split('; ');
        let cookie = arrayCookies.filter(cookie => cookie.startsWith(cookieBorrar))

        if (cookie.length) {
            let valorNuevo = prompt("Que valor quieres poner");

            if (!valorNuevo) {
                alert("Error: el valor no es válido")
                return
            }
            document.cookie = `${cookieBorrar}=${valorNuevo};SameSite=Lax;path=/`
            consultar.click()
        } else {
            alert("No existe la cookie: " + cookieBorrar + "\n\nTip: pulsa sobre el botón consultar para ver las cookies existentes")
        }
    } else {
        alert("No hay cookies. Primero crea una cookie para poder modificarla")
    }
}

let borrar = document.querySelector('#btnBorrar');
borrar.addEventListener('click', borrarCoockie, false)
function borrarCoockie() {

    let cookies = document.cookie;

    if (cookies.length) {

        let cookieBorrar = prompt("Introduce el nombre de la cookie que quieres Borrar:");

        if (!cookieBorrar) {
            return
        }

        if (!(/^\w*$/gi).test(cookieBorrar.trim())) {
            alert("Error: el nombre debe estar en formato a-zA-Z-_")
            return
        }
        let arrayCookies = cookies.split('; ');
        let cookie = arrayCookies.filter(cookie => cookie.startsWith(cookieBorrar.trim()))

        if (cookie.length) {

            document.cookie = `${cookieBorrar}=;max-age=0;SameSite=Lax;path=/`
            alert("Se ha borrado la cookie correctamente")
        } else {
            alert("No existe la cookie: " + cookieBorrar + "\n\nTip: pulsa sobre el botón consultar para ver las cookies existentes")
        }
    } else {
        alert("No hay cookies. Primero crea una cookie para poder borrarla")
    }

}


















//Borra la lista y el span de error
function borralistaSpan() {
    span.innerHTML = "";
    lista.innerHTML = "";
}