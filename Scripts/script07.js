"use strict";


let ejercicio = document.querySelector('#ejer07');

//Creación del json con los ciclos
let cursos = {
    SMR: "Sistemas microinformáticos",
    ASIR: "Administración de sistemas informáticos y redes",
    DAW: "Desarollo de aplicaciones web",
    DAM: "Desarollo de aplicaciones multiplataforma",
};

let jsonCreado = JSON.stringify(cursos);
let contador = 0;

let cargar = document.querySelector('#cargar');


cargar.addEventListener('click', function () {

    contador++

    if (contador > 1) {
        return;
    }


    let objectCurso = JSON.parse(jsonCreado);
    let lista = document.createElement('ul')
    for (const [key, value] of Object.entries(objectCurso)) {

        let elemento = document.createElement('li')
        let texto = document.createTextNode(key + " - " + value);
        elemento.appendChild(texto)
        lista.appendChild(elemento);
    }


    let titulo = document.createElement('p').appendChild(document.createTextNode('Ciclos de informática'))

    ejercicio.appendChild(titulo);
    ejercicio.appendChild(lista);
    document.querySelector('#ejer07>ul').scrollIntoView();
}, false)