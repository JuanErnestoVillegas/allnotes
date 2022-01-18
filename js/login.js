
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

let userLogged;	
let idUser;

function loginCheck(event) {
	event.preventDefault();	
	let usuario = document.querySelector('#input_usuario').value;
	let pass = document.querySelector('#input_pass').value; 
	//Buscar el elemento		
	userLogged = usuarios.find(item=>item.user === `${usuario}`);	
	console.log(usuarios);
	console.log(userLogged);
	idUser = userLogged.id;
	console.log(idUser);
	if(userLogged.user=== usuario && userLogged.contraseña === pass){
		//Modificar el array
		const newUsuarios = usuarios.map(obj => {
			if (obj.id === idUser) {
			  return {...obj, activo: true};
			}		  
			return obj;
		  });
		usuarios=newUsuarios; //Actualizo el array
		let usulog = [];
		usulog[0]=idUser;
		usulog[1]=usuario;
		console.log(usulog);
		localStorage.setItem('userlog',JSON.stringify(usulog));
		console.log(usuarios);	
				
		console.log('Usuario logueado');
		//Actualizar el LS
		localStorage.setItem('usuarios',JSON.stringify(usuarios));

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

const logout = (idUser) =>{	
	usuarios = JSON.parse(localStorage.getItem("usuarios"));
	const tareasLS = JSON.parse(localStorage.getItem('tareas'));
	const newUsuarios = usuarios.map(obj => {
		if (obj.id === idUser) {
		  return {...obj, tareas: tareasLS, activo: false};
		}		  
		return obj;
	  });
	usuarios=newUsuarios; //Actualizo el array
	console.log(usuarios);		
	console.log('Usuario Deslogueado');
	//Actualizar el LS
	localStorage.setItem('usuarios',JSON.stringify(usuarios));
	localStorage.removeItem('userlog');
	window.location.assign(window.location.origin);
  }


