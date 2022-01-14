
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}   

//Usuarios LocalStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (usuarios == null) {
  usuarios = [];
}


function loginCheck(event) {
	event.preventDefault();
	
	let usuario = document.querySelector('#input_usuario').value;
	let pass = document.querySelector('#input_pass').value;    	
	let userLogged = usuarios.find(item=>item.user === `${usuario}`);	

	if(userLogged.user=== usuario && userLogged.contraseña === pass){
        userLogged.activo=true; //Usuario logueado
		console.log('Usuario logueado');
		// localStorage.setItem('usuarios',JSON.stringify(userLogged));
		window.location.assign(window.location.origin+'/index.html');
	}else {
		let dataError = document.createElement('div');
		dataError.innerText='Los datos ingresados no son correctos';
		dataError.classList.add('alert','alert-danger','mt-3', 'text-center')
		let form = document.querySelector('#login');
		form.appendChild(dataError);
		setTimeout(function(){
			form.removeChild(dataError);
		}, 5000)
	}
}
