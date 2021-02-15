//variables 
const btnEnviar = document.querySelector('#enviar');
const btnResetar = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListener();
function  eventListener(){
	//Caundo arranca la app
	document.addEventListener('DOMContentLoaded', iniciarApp);
	//campos del formulario
	email.addEventListener('blur',validarFormulario);
	asunto.addEventListener('blur',validarFormulario);
	mensaje.addEventListener('blur',validarFormulario);
	//resetar formulario
	btnResetar.addEventListener('click',reseterFormulario);
	//enviar email
	formulario.addEventListener('submit',enviarEmail);
}
//funciones
function iniciarApp(){
	botonBloqueado();
}

function validarFormulario(e){	
	if(e.target.value.length > 0){ 
		const error = document.querySelector('p.error');
		if(error !== null || error === true){
			error.remove();
		}
		if(e.target.id == "email"){
			verificarEmail(e);
		}else{
			campoCorrecto(e);
		}
	}else{
		campoIncorrecto(e);
		mostrarError('Llena el campo '+e.target.id+' de manera correcta');
	}
	botonDesbloqueado();
}

function mostrarError(mensaje){
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');
	
	const errores = document.querySelectorAll('.error');
	if(errores.length === 0){
		formulario.appendChild(mensajeError);	
	}
	
}

function campoCorrecto(e){
	e.target.classList.remove('border','border-red-500');
	e.target.classList.add('border','border-green-500');
}
function campoIncorrecto(e){
	e.target.classList.remove('border','border-green-500');
	e.target.classList.add('border','border-red-500');	
}
function verificarEmail(e){
	const expresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(expresion.test(e.target.value)){
		campoCorrecto(e);
	}else{
		campoIncorrecto(e);
		mostrarError('Email no valido');
	}
}
function botonBloqueado(){
	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}
function botonDesbloqueado(){
	const expresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(expresion.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
	}
}
function enviarEmail(e){
	e.preventDefault();
	//mostrar spinner
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';
	setTimeout( () => {
		spinner.style.display = 'none';
		const parrafo  = document.createElement('p');
		parrafo.textContent = "El mensaje se envio correctamente";
		parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase');
		formulario.insertBefore(parrafo,spinner);	
		setTimeout( () => {
			formulario.reset();
			parrafo.remove();
			iniciarApp();
		},3000);
	}, 3000);
}

function reseterFormulario(){
	formulario.reset();
	iniciarApp();
}