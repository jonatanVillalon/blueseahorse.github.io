//Variables

//boton hamburguesa
const menuToggle = document.querySelector('.menu-toggle');

//formulario de contacto
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');

//Eventos
eventos();
function eventos(){
	//boton hamburguesa
	menuToggle.addEventListener('click', apareceMenu, false);
	//formularion de contacto
	//inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);
    //campos del formulario
	nombre.addEventListener('blur', validarCampo);
	apellido.addEventListener('blur', validarCampo);
	email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    //enviar formulario
    formularioEnviar.addEventListener('submit', enviarEmail);
    //boton de reset
    resetBtn.addEventListener('click', resetFormulario);
}
//Funciones

//funcion boton hamburguesa
function apareceMenu(e){
	this.classList.toggle('open');
	document.querySelector('#header').classList.toggle('open');
	document.querySelector('.navegacion').classList.toggle('open');
	e.preventDefault();
}

//Funciones del formulario de contacto
function inicioApp(){
    //deshabilitar el boton enviar
    btnEnviar.disabled = true;
    btnEnviar.style.backgroundColor = 'gray';
}
//funcion para validar los campos escritos
function validarCampo() {
    //se valida longitud del texto y que este no esté vacio
    validarLongitud(this);
    //validar email
    if(this.type === 'email'){
        validarEmail(this);
    }
    let errores = document.querySelectorAll('.error');
    if(nombre.value !== '' && apellido.value !== '' && email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if(errores.length === 0){
            btnEnviar.disabled = false;
            btnEnviar.style.backgroundColor = '#4CAF50';
        }
    }
}
//funcion para resetear formulario
function resetFormulario (e) {
    formularioEnviar.reset();
    e.preventDefault();
}
//funcion para detectar un caracter escrito
function validarLongitud(campo) {
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'blue';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}
//funcion para enviar el correo
function enviarEmail(e) {
    //spinner al presionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';
    //gif que envia el mail
    const enviado = document.createElement('img');
    enviado.src = 'images/mail.gif';
    enviado.style.display = 'block';
    //ocultar spinner y mostrar gif enviado
    setTimeout( function () {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function () {
            enviado.remove();
            //enviarEmail.reset();
        }, 5000);
    }, 3000);
    e.preventDefault();
}
//verifica la longitud del texto en los campos
function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'blue';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

//jquery flechas y Top
$('.scrollTo').click( function() { 
				let page = $(this).attr('href'); 
				let speed = 3000; 
				$('html, body').animate( { scrollTop: $(page).offset().top }, speed );
				return false;
			});	

$(window).scroll(function(){
  if ( $(this).scrollTop() > 100) {
      $(".Top").fadeIn();
  }
  else {
    $(".Top").fadeOut();
  }
  });
  $(".Top").click(function(){
    $("html,body").stop().animate({scrollTop : 0}, 2000);
  });

