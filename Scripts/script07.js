"use strict";


let ejercicio = document.querySelector('#ejer07');

//Creación de un objeto con los ciclos
let cursos = {
    SMR: "Sistemas microinformáticos",
    ASIR: "Administración de sistemas informáticos y redes",
    DAW: "Desarrollo de aplicaciones web",
    DAM: "Desarrollo de aplicaciones multiplataforma",
};
//crear Json
let jsonCreado = JSON.stringify(cursos);

//contador de veces pulsadas el botón guardar
let contador = 0;

//Botón cargar
let cargar = document.querySelector('#cargar');
cargar.addEventListener('click', cargaCursos, false)


function cargaCursos() {

    //Aumento contador a 1
    contador++
    //Si ya se han mostrado los cursos una vez no mostrarlos más veces
    if (contador > 1) {
        alert("Ya se han cargado los cursos");
        return
    }

    //Añadir el Json al localStorage
    localStorage.setItem('cursos', jsonCreado);
    //creo objeto del json creado
    let objectCurso = JSON.parse(localStorage['cursos']);

    //Creo una lista con los valores del objeto
    let lista = document.createElement('ul')
    for (const [key, value] of Object.entries(objectCurso)) {

        let elemento = document.createElement('li')
        let texto = document.createTextNode(key + " - " + value);
        elemento.appendChild(texto)
        lista.appendChild(elemento);
    }

    //Creo un titulo
    let titulo = document.createElement('p').appendChild(document.createTextNode('Ciclos de informática'))
    //Añado titulo y la lista
    ejercicio.appendChild(titulo);
    ejercicio.appendChild(lista);
    //para que entre en conflicto con los elementos del form
    localStorage.removeItem('cursos');
    //muevo la vista hacia la lista para que se vea(si no habría que hacer scroll)
    document.querySelector('#ejer07>ul').scrollIntoView();

}