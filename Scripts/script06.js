'use strict'


function guardaSessionStorage(nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok) {

    if (sessionStorage) {
  
      sessionStorage.clear();
  
      let keys = ["nombre", "direccion", "nif", "fNacimiento", "cPostal", "pais", "genero", "colores", "telefono", "email", "password", "password2"]
      let values = [nombreOk, direccionOk, nifOk, fNazOk, cPostalOk, paisOk, generoOK, [...coloresOk], telefonoOk, emailOk, passwordOk, password2Ok]
  
      for (let i = 0; i < keys.length; i++) {
        sessionStorage.setItem(keys[i], values[i]);
      }
  
      if (sessionStorage.length) {
        alert("Este navegador puede trabajar con sessionStorage\nSe han creado correctamente los datos en sessionStorage")
      }
  
    } else {
      alert("Este navegador no puede trabajar con sessionStorage")
    }
  }