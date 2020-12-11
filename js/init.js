//Aqui voy a marcar la aplicacion en su estado iniciada sesion (ocultar lo que tenga que ocultar y mostrar lo
//que tenga que mostrar)
const marcarSesionIniciada = ()=>{
    //1. Ocultar el boton de login
    document.querySelector("#iniciar-btn").classList.add('d-none');
    //2. Mostrar los datos del usuario en el body
    //3. Mostrar el botón de cierre de sesión
    document.querySelector('#cerrar-btn').classList.remove('d-none');
    let usuario = getUsuario();
    document.querySelector("#nombre-usuario").innerText = usuario.name;
    document.querySelector("#correo-usuario").innerText = usuario.mail;
    document.querySelector("#imagen-usuario").src = usuario.image;
    document.querySelector('#datos-usuario').classList.remove("d-none");
    //4. Mostrar el formulario y la funcionalidad de la agenda
};

//Aqui voy a marcar la aplicacion en su estado cerrada sesión (ocultar lo que tenga que ocultar y mostrar lo que tenga que mostrar)
const marcarSesionCerrada = ()=>{
    //1. Mostrar el boton de login
    document.querySelector("#iniciar-btn").classList.remove('d-none');
    //2. Ocultar los datos del usuario en el body
    //3. Ocultar el botón de cierre de sesión
    document.querySelector("#cerrar-btn").classList.add("d-none");
    //4. Ocultar el formulario y la funcionalidad de la agende
    document.querySelector("#datos-usuario").classList.add("d-none");
};

const getUsuario = ()=>{
    let usuario = localStorage.getItem("usuario");
    if(usuario){
        //Convertir desde JSON a JS
        usuario = JSON.parse(usuario);
    }else {
        usuario = null;
    }
    return usuario;
};

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let usuario = {};
    usuario.id = profile.getId();
    usuario.name = profile.getName();
    usuario.image = profile.getImageUrl();
    usuario.mail = profile.getEmail();
    //crea un key en el localstorage con los datos del usuario
    //EN LOCAL STORAGE SE GUARDAN STRINGS
    localStorage.setItem("usuario",JSON.stringify(usuario));
    marcarSesionIniciada();
}
  
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //Borrar todo lo almacenado en el local storage
      localStorage.clear();
      marcarSesionCerrada();
    });
  }

  window.addEventListener('DOMContentLoaded', ()=>{
     if(getUsuario() != null){
        marcarSesionIniciada();
     } else{
         marcarSesionCerrada();
     }
  });

document.querySelector("#cerrar-btn").addEventListener("click",signOut);