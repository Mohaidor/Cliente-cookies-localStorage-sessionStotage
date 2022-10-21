"use strict";

/*

HE PUESTO LO AÑADIDO DEL EJERCICIO 5 DE LA PRÁCTICA T2_A5 PARA UNA MEJOR VISUALIZACIÓN

*/

/*----------------------------------------------------------------------------------------------------------------------------*/
//Botón borrar almacenamiento
const borrarAlmacenamiento = document.querySelector("#borrarAlmacenamiento");
borrarAlmacenamiento.addEventListener('click', borraLocalStorage, false);

//Botón recuperar información
const recupera = document.querySelector("#recupera");
recupera.addEventListener('click', recuperaInformacion, false)


//El botón cancelar(Linea 107-124) y el botón guardar(104 112)

// Guardar se hace después de validar en la linea 192. Se llama al método guardaLocalStorage(valores validados)

function guardaLocalStorage(nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok) {

  //Si se puede usar localStorage...
  if (localStorage) {
    //Si hay algo lo borro
    localStorage.clear();
    //Array de claves y valores
    let keys = ["nombre", "direccion", "nif", "fNacimiento", "cPostal", "pais", "genero", "colores", "telefono", "email", "password", "password2"]
    let values = [nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok]
    //recorro las claves y voy rellenando el localStorage
    for (let i = 0; i < keys.length; i++) {
      localStorage.setItem(keys[i], values[i]);
    }
    //Si se guarda bien aviso que todo bien
    if (localStorage.length) {
      alert("Este navegador puede trabajar con localStorage\nSe han creado correctamente los datos en localStorage")
    }

  } else {
    //Si no se pudiera usar localStorage
    alert("Este navegador no puede trabajar con localStorage")
  }
}


function borraLocalStorage() {
  //Si hay algo en localStorage 
  if (localStorage.length) {
    //Pido confirmación
    let resultado = confirm("Estas seguro de eliminar el localStorage")
    //Si es true
    if (resultado) {
      //Borro y aviso
      localStorage.clear();
      alert("Se ha borrado correctamente el localStorage")
    } else {
      return
    }
  } else {
    alert("El localStorage ya está vació")
  }
}


function recuperaInformacion() {

  //Si hay algo en localStorage
  if (localStorage.length) {
    //Establezco los valores mediante lo guardado en localStorage accediendo mediante la clave
    document.querySelector("#nombre").value = localStorage['nombre'];
    document.querySelector(`input[name="genero"][value=${localStorage['genero']}]`).click();
    document.querySelector("#direccion").value = localStorage['direccion'];
    document.querySelector("#nif").value = localStorage['nif'];
    let fechaFormat = localStorage['fNacimiento'].split(/\//);
    document.querySelector("#fecha").valueAsDate = new Date(`${fechaFormat[2]}/${fechaFormat[1]}/${+fechaFormat[0] + 1}`);
    document.querySelector("#cPostal").value = localStorage['cPostal'];
    document.querySelector("#pais").value = localStorage['pais'];
    let coloresArray = localStorage['colores'].split(",")
    coloresArray.forEach(color => {
      //if not checked
      if (!document.querySelector(`input[name="colores"][value=${color}]`).checked) {
        //click
        document.querySelector(`input[name="colores"][value=${color}]`).click()
      }
      /*Este if evita que una vez recuperada
        la información se pulse el botón de nuevo y
        quite los checks correctos*/

    });
    document.querySelector("#telefono").value = localStorage['telefono'];
    document.querySelector("#email").value = localStorage['email'];
    document.querySelector("#password").value = localStorage['password'];
    document.querySelector("#password2").value = localStorage['password2'];
  } else {
    alert("No hay información que recuperar")
  }
}

/*-----------------------------------------------------------------------------------------------*/

//Obtener el nodo del form, los span de error, los inputs, botón borrar
const form = document.querySelector("#form");
const spans = document.querySelectorAll("span");
const formInputs = document.querySelectorAll("input ,select");
const borrarForm = document.querySelector("#borrar");

//////////////////////////////////////////////////////////////////////EventListeners///////////////////////////////////////////////////////////////////////////////////////////

//añado un EventListener que será activado al pulsar el botón submit
form.addEventListener(
  "submit",
  function (e) {
    //prevenir el comportamiento por defecto
    e.preventDefault();
    //llamo al método para validar el form
    validarForm();
  },
  false
);

//añado un EventListener que será activado al pulsar el botón borrar
borrarForm.addEventListener("click", function () {
  /*
    Extra del ejercicio T2_A5
  */


  let respuesta = confirm("¿Seguro que quieres borrar el form?")

  if (!respuesta) {
    return;
  }

  //Al pulsar borrar recorro los spans y los establezco en display none
  spans.forEach((elemento) => {
    elemento.style.display = "none";
  });

  //Al pulsar borrar restablezco los fondos y los bordes de todos los formInputs
  formInputs.forEach((element) => {
    element.style.backgroundColor = "";
    element.style.border = "";
  });
});
//Al hacer obtener el foco un input borra background y bordes
formInputs.forEach((element) => {
  element.addEventListener(
    "focus",
    function () {
      element.style.backgroundColor = "";
      element.style.border = "";
    },
    false
  );
});


///////////////////////////////////////////////////Función que valida y muestra el resultados///////////////////////////////////////////////////////////////////////////////////////////
function validarForm() {
  //Obtengo el nodo de todos los campos del form
  const nombre = document.querySelector("#nombre");
  const genero = document.querySelectorAll('input[name="genero"]');
  const direccion = document.querySelector("#direccion");
  const nif = document.querySelector("#nif");
  const fNaz = document.querySelector("#fecha");
  const cPostal = document.querySelector("#cPostal");
  const pais = document.querySelector("#pais");
  const colores = document.querySelectorAll('input[name="colores"]');
  const telefono = document.querySelector("#telefono");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");

  //Este booleano devolverá true si todas las variables cumplen los criterios y false si hay algo mal
  let itsAllOk =
    ((((((((((isNombreOk(nombre) == isDireccionOk(direccion)) ==
      isNifOk(nif)) ==
      isFnazOk(fNaz)) ==
      isCpostalOk(cPostal)) ==
      isPaisOk(pais)) ==
      isColoresOK(colores)) ==
      isTelefonoOk(telefono)) ==
      isEmailOk(email)) ==
      isPasswordOK(password)) ==
      isPassword2Ok(password, password2)) ==
    isOkGenero(genero);

  //Si todo es correcto muestro los valores
  if (itsAllOk) {
    //Guardo en variables los valores
    let nombreOk = nombre.value.trim();
    let direccionOk = direccion.value.trim();
    let nifOk = nif.value.trim();
    let fechaObtenida = new Date(fNaz.value.toString());
    let fNazOk = fechaObtenida.getDate() + "/" + (fechaObtenida.getMonth() + 1) + "/" + fechaObtenida.getFullYear();
    let cPostalOk = cPostal.value.trim();
    let paisOk = pais.value;
    let generoOK = [...genero].filter(input => input.checked)[0].value;
    let coloresOk = ([...colores].filter(input => input.checked)).map(color => color.value)
    let telefonoOk = telefono.value.trim();
    let emailOk = email.value.trim();
    let passwordOk = password.value.trim();
    let password2Ok = password2.value.trim();



    let respuesta = confirm("Quieres guardar los datos en localStorage");

    if (respuesta) {
      guardaLocalStorage(nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok);
    }else {
      let respuesta = confirm("Quieres guardar los datos en sessionStorage");
      if (respuesta) {
        guardaSessionStorage(nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok)
      }
    }




  }
}
////////////////////////////////////////////////////////Validación campo a campo//////////////////////////////////////////////////////////////////////////////////////////////////////
//Pongo comentario de funcionamiento en la primera función pero las demás son muy parecidas
//
let isNombreOk = (nombre) => {
  //obtener nodo del span del error
  const errorNombre = document.querySelector("#errorNombre");

  //Control de errores. Si entra en el else es que no cumple la condición de ningún error ,por lo tanto no hay error. oculto el error si lo hubiere y devuelve true
  if (/^\s*$/.test(nombre.value)) {
    errorNombre.innerHTML = "*El nombre no puede quedar vacío";
    errorNombre.style.display = "inline";
    nombre.style.backgroundColor = "red";
  } else if (nombre.value.length < 2) {
    errorNombre.innerHTML = "*El nombre tiene que ser de mas de 2 letras";
    errorNombre.style.display = "inline";
    nombre.style.backgroundColor = "red";
  } else {
    //Si no hay error no muestro error y retorno true
    errorNombre.style.display = "none";
    nombre.style.backgroundColor = "";
    nombre.style.border = "2px solid green";
    return true;
  }
};
let isDireccionOk = (direccion) => {
  const errorDireccion = document.querySelector("#errorDireccion");
  if (/^\s*$/.test(direccion.value)) {
    errorDireccion.innerHTML = "*La direccion no puede quedar vacía";
    errorDireccion.style.display = "inline";
    direccion.style.backgroundColor = "red";
  } else if (direccion.value.length < 10) {
    errorDireccion.innerHTML =
      "*La direccion tiene que ser de mas de 10 letras";
    errorDireccion.style.display = "inline";
    direccion.style.backgroundColor = "red";
  } else {
    errorDireccion.style.display = "none";
    direccion.style.backgroundColor = "";
    direccion.style.border = "2px solid green";
    return true;
  }
};
let isNifOk = (nif) => {
  const errorNif = document.querySelector("#errorNif");

  //valida si el nif es válido
  let letras = Array.from("TRWAGMYFPDXBNJZSQVHLCKET");
  let isValid =
    nif.value.charAt(nif.value.length - 1).toUpperCase() ==
    letras[nif.value.substring(0, 8) % 23];

  if (/^\s*$/.test(nif.value)) {
    errorNif.innerHTML = "*El nif no puede quedar vacío";
    errorNif.style.display = "inline";
    nif.style.backgroundColor = "red";
  } else if (!/^([0-9]{8})\s*[a-z]$/gi.test(nif.value)) {
    errorNif.innerHTML = "*El nif deben ser 8 números y una letra";
    errorNif.style.display = "inline";
    nif.style.backgroundColor = "red";
  } else if (!isValid) {
    errorNif.innerHTML = "*La letra del nif no es correcta";
    errorNif.style.display = "inline";
    nif.style.backgroundColor = "red";
  } else {
    errorNif.style.display = "none";
    nif.style.backgroundColor = "";
    nif.style.border = "2px solid green";
    return true;
  }
};

let isFnazOk = (fNaz) => {
  const errorFecha = document.querySelector("#errorFecha");

  let fechaObtenida = new Date(fNaz.value.toString());
  let fechaAhora = new Date();

  let fechaAhoraCadena =
    fechaAhora.getDate() +
    "/" +
    fechaAhora.getMonth() +
    "/" +
    fechaAhora.getFullYear();

  if (isNaN(Date.parse(fechaObtenida))) {
    errorFecha.innerHTML = "*La fecha no pude quedar vacía";
    errorFecha.style.display = "inline";
    fNaz.style.backgroundColor = "red";
  } else if (fechaObtenida.getTime() > fechaAhora.getTime()) {
    errorFecha.innerHTML =
      "*La fecha no pude ser posterior a hoy: " + fechaAhoraCadena;
    errorFecha.style.display = "inline";
    fNaz.style.backgroundColor = "red";
  } else {
    errorFecha.style.display = "none";
    fNaz.style.backgroundColor = "";
    fNaz.style.border = "2px solid green";
    return true;
  }
};

let isCpostalOk = (cPostal) => {
  const errorCpostal = document.querySelector("#errorCpostal");

  if (isNaN(cPostal.value)) {
    errorCpostal.innerHTML = "*El código postal no es numérico";
    errorCpostal.style.display = "inline";
    cPostal.style.backgroundColor = "red";
  } else if (/^\s*$/.test(cPostal.value)) {
    errorCpostal.innerHTML = "*El código postal no puede estar vacío";
    errorCpostal.style.display = "inline";
    cPostal.style.backgroundColor = "red";
  } else if (!/^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(cPostal.value)) {
    errorCpostal.innerHTML =
      "*El código postal en España esta comprendido entre 01000 y 52999";
    errorCpostal.style.display = "inline";
    cPostal.style.backgroundColor = "red";
  } else {
    errorCpostal.style.display = "none";
    cPostal.style.backgroundColor = "";
    cPostal.style.border = "2px solid green";
    return true;
  }
};

let isPaisOk = (pais) => {
  const errorPais = document.querySelector("#errorPais");

  if (pais.value == "-1") {
    errorPais.innerHTML = "*Selecciona un país";
    errorPais.style.display = "inline";
    pais.style.backgroundColor = "red";
  } else {
    errorPais.style.display = "none";
    pais.style.backgroundColor = "";
    pais.style.border = "2px solid green";
    return true;
  }
};
let isOkGenero = (genero) => {
  const errorGenero = document.querySelector("#errorGenero");
  //Obtengo el valor checked del genero)
  let generoChecked = [...genero].filter(input => input.checked)[0];
  if (typeof generoChecked == "undefined") {
    errorGenero.innerHTML = "*Selecciona un genero";
    errorGenero.style.display = "inline";
  } else {
    errorGenero.style.display = "none";
    return true;
  }
};
let isColoresOK = (colores) => {
  const errorColores = document.querySelector("#errorColores");
  //Obtener valores de los colores checked
  let coloresChecked = [...colores].filter(input => input.checked)
  if (coloresChecked.length == 0) {
    errorColores.innerHTML = "*Selecciona al menos un color";
    errorColores.style.display = "inline";
  } else {
    errorColores.style.display = "none";
    return true;
  }
};

let isTelefonoOk = (telefono) => {
  const errorTelefono = document.querySelector("#errorTelefono");

  if (/^\s*$/.test(telefono.value)) {
    errorTelefono.innerHTML = "*El teléfono no puede quedar vacío";
    errorTelefono.style.display = "inline";
    telefono.style.backgroundColor = "red";
  } else if (isNaN(telefono.value)) {
    errorTelefono.innerHTML = "*El teléfono deben ser solo números";
    errorTelefono.style.display = "inline";
    telefono.style.backgroundColor = "red";
  } else if (telefono.value.length != 9) {
    errorTelefono.innerHTML = "*El teléfono deben ser 9 números";
    errorTelefono.style.display = "inline";
    telefono.style.backgroundColor = "red";
  } else {
    errorTelefono.style.display = "none";
    telefono.style.backgroundColor = "";
    telefono.style.border = "2px solid green";
    return true;
  }
};
let isEmailOk = (email) => {
  const errorEmail = document.querySelector("#errorEmail");
  let reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/g);
  let isValid = email.value.match(reg);

  if (/^\s*$/.test(email.value)) {
    errorEmail.innerHTML = "El email no puede quedar vacío";
    errorEmail.style.display = "inline";
    email.style.backgroundColor = "red";
  } else if (!isValid) {
    errorEmail.innerHTML = "El email debe ser de tipo texto@texto.texto";
    errorEmail.style.display = "inline";
    email.style.backgroundColor = "red";
  } else {
    errorEmail.style.display = "none";
    email.style.backgroundColor = "";
    email.style.border = "2px solid green";
    return true;
  }
};
let isPasswordOK = (password) => {
  const errorPassword = document.querySelector("#errorPassword");
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let isValid = password.value.match(reg);

  if (/^\s*$/.test(password.value)) {
    errorPassword.innerHTML = "El password no puede quedar vacío";
    errorPassword.style.display = "inline";
    password.style.backgroundColor = "red";
  } else if (!isValid) {
    errorPassword.innerHTML =
      "El password deben ser al menos 8 caracteres,al menos una mayúscula, una minúscula y un numero";
    errorPassword.style.display = "inline";
    password.style.backgroundColor = "red";
  } else {
    errorPassword.style.display = "none";
    password.style.backgroundColor = "";
    password.style.border = "2px solid green";
    return true;
  }
};
let isPassword2Ok = (password, password2) => {
  const errorPassword2 = document.querySelector("#errorPassword2");
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let isValid = password2.value.match(reg);

  if (/^\s*$/.test(password2.value)) {
    errorPassword2.innerHTML = "La verificación no puede quedar vacía";
    errorPassword2.style.display = "inline";
    password2.style.backgroundColor = "red";
  } else if (password.value !== password2.value) {
    errorPassword2.innerHTML = "Los passwords no coinciden";
    errorPassword2.style.display = "inline";
    password2.style.backgroundColor = "red";
  } else if (!isValid) {
    errorPassword2.innerHTML =
      "El password deben ser al menos 8 caracteres,al menos una mayúscula, una minúscula y un numero";
    errorPassword2.style.display = "inline";
    password2.style.backgroundColor = "red";
  } else {
    errorPassword2.style.display = "none";
    password2.style.backgroundColor = "";
    password2.style.border = "2px solid green";
    return true;
  }
};
