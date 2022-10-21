'use strict'

//nodos donde se muestra la lista de cookies y el error si lo hubiere 
//let span = document.querySelector('span');
let lista = document.querySelector('#listaCookies')


//Botón añadir cookie
let anyadir = document.querySelector('#btnAnyadir');
anyadir.addEventListener('click', anyadirCoockie, false)
function anyadirCoockie() {
    //primero borro la lista y el error si existiese
    borralista()

    //Obtener el numero de cookies 
    let cookie = prompt("¿Cuantas cookies quieres crear?");
    //si no es un número o son espacios..
    if (isNaN(cookie) || (/^\s*$/gi).test(cookie)) {
        alert("Error: introduce el numero de cookies a introducir");
        //salir
        return
    }
    //Recorrer el numero de veces de cookies a introducir
    for (let i = 0; i < cookie; i++) {

        //Obtener datos; Si no se especifica algún valor se sale 
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
        //Si son correctos los valores...
        if (nombreOk && valorOk && caducidadOk) {
            //añadir cookie codificada (samsite para evitar warning y el path para poder modificar,borrar...)
            document.cookie = encodeURIComponent(nombreOk.trim()) + "=" + encodeURIComponent(valorOk.trim()) + ";expires=" + caducidadOk.trim() + ";SameSite=Lax;path=/";
            alert("Cookie añadida");
        } else {
            alert("Error en los datos")
        }
    }
}
/*validar datos cookie*/
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
    borralista()

    let cookies = document.cookie
    if (cookies) {
        //cortar las secciones de las cookies
        cookies = cookies.split(";")
        //Añadir a la lista
        cookies.forEach(element => {
            let nodo = document.createElement('li');
            let textoFormateado = (element.split("=")).join(" = ")
            let texto = document.createTextNode(textoFormateado);
            nodo.appendChild(texto)
            //Añadir lista
            lista.appendChild(nodo);
        });
    } else {
        //Si no hay cookies->Error
        alert('No hay cookies')
    }
}
//Botón modificar
let modificar = document.querySelector('#btnModificar');
modificar.addEventListener('click', modificarCoockie, false)
function modificarCoockie() {
    //obtener cookies
    let cookies = document.cookie;
    //Si hay cookies...
    if (cookies.length) {
        //Obtener nombre; Si no se especifica se sale
        let cookieBorrar = prompt("Introduce el nombre de la cookie que quieres modificar:");
        if (!cookieBorrar) {
            return
        }
        //Si no cumple el formato sale
        if (!(/^\w*$/gi).test(cookieBorrar)) {
            alert("Error: el nombre debe estar en formato a-zA-Z-_")
            return
        }
        //Creación de array de cookies
        let arrayCookies = cookies.split('; ');
        //obtengo la cookie a modificar del array
        let cookie = arrayCookies.filter(cookie => cookie.startsWith(cookieBorrar))
        //si existe la cookie que se quiere modificar...
        if (cookie.length) {
            //Pido valor
            let valorNuevo = prompt("Que valor quieres poner");
            //Si no hay valor salir
            if (!valorNuevo) {
                alert("Error: el valor no es válido")
                return
            }
            //Sobrescrita valor de la cookie
            document.cookie = `${cookieBorrar}=${valorNuevo};SameSite=Lax;path=/`
            //muestro el cambio
            consultar.click()
        } else {
            //si no existe la cookie
            alert("No existe la cookie: " + cookieBorrar + "\n\nTip: pulsa sobre el botón consultar para ver las cookies existentes")
        }
    } else {
        //Si se pulsa modificar y no hay cookies
        alert("No hay cookies. Primero crea una cookie para poder modificarla")
    }
}
//Botón borrar
let borrar = document.querySelector('#btnBorrar');
borrar.addEventListener('click', borrarCoockie, false)
function borrarCoockie() {
    //Obtener cookie
    let cookies = document.cookie;
    //Si hay cookies
    if (cookies.length) {
        //Obtener cookie
        let cookieBorrar = prompt("Introduce el nombre de la cookie que quieres Borrar:");
        //si no se introduce valor o escape o cancelar sale
        if (!cookieBorrar) {
            return
        }
        //Si no cumple formato sale
        if (!(/^\w*$/gi).test(cookieBorrar.trim())) {
            alert("Error: el nombre debe estar en formato a-zA-Z-_")
            return
        }
        //Obtengo array de cookies y filtro la que interesa
        let arrayCookies = cookies.split('; ');
        let cookie = arrayCookies.filter(cookie => cookie.startsWith(cookieBorrar.trim()))
        //Si existe la cookie a borrar
        if (cookie.length) {
            //La hago caducar con max-age:0
            document.cookie = `${cookieBorrar}=;max-age=0;SameSite=Lax;path=/`
            alert("Se ha borrado la cookie correctamente")
            borralista();
        } else {
            //Si no existe la cookie a borrar
            alert("No existe la cookie: " + cookieBorrar + "\n\nTip: pulsa sobre el botón consultar para ver las cookies existentes")
        }
    } else {
        //Si no hay cookies para borrar
        alert("No hay cookies. Primero crea una cookie para poder borrarla")
    }

}


//Método extra que borra el span de error y la lista de cookies
function borralista() {
    lista.innerHTML = "";
}