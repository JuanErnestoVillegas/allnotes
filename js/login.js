
let usuario = document.querySelector('#input_usuario');
let pass = document.querySelector('#input_pass'); 

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo	
	password: /^[a-z0-9_-]{6,18}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}   

const checkInput = (expression, element, inputValue)=>{
  let isOk = false
  if(expression.test(inputValue)){
    isOk=true;
    if(element.classList.contains('is-invalid')){
      element.classList.remove('is-invalid');
    }
    element.classList.add('is-valid')
  }else{
    if(element.classList.contains('is-valid')){
      element.classList.remove('is-valid');
    }
    element.classList.add('is-invalid');
  }
  return isOk
}

const verification = (user, password) =>{
  let userCorrect = false;
  let passwordCorrect = false;

  userCorrect= checkInput(expresiones.usuario, usuario, user);
  passwordCorrect = checkInput(expresiones.password, pass, password);

  return {userCorrect, passwordCorrect}
}

const error = () => {
	let dataError = document.createElement('div');
	dataError.innerText='Los datos ingresados no son correctos';
	dataError.classList.add('alert','alert-danger','mt-3', 'text-center')
	let form = document.querySelector('#login');
	form.appendChild(dataError);
	setTimeout(function(){
		form.removeChild(dataError);
	}, 5000)
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
	
	// let usuario = document.querySelector('#input_usuario').value;
	// let pass = document.querySelector('#input_pass').value; 
	const {userCorrect, passwordCorrect} = verification(usuario.value, pass.value);
  //! COMPARAMOS QUE LOS DATOS COINCIDAN CON LOS GUARDADOS
  	if(userCorrect===true && passwordCorrect===true){
	//Buscar el elemento		
	console.log(usuario.value);
	userLogged = usuarios.find(item=>item.user === `${usuario.value}`);	
	if(userLogged === undefined) {
		error();
	} else{
		console.log(usuarios);
		console.log(userLogged);	
		console.log(idUser);
		if(userLogged.contraseña === pass.value){
			//Modificar el array
			idUser = userLogged.id;
			const newUsuarios = usuarios.map(obj => {
				if (obj.id === idUser) {
				  return {...obj, activo: true};
				}		  
				return obj;
			  });
			usuarios=newUsuarios; //Actualizo el array
			let usulog = [];
			usulog[0]=idUser;
			usulog[1]=usuario.value;
			console.log(usulog);
			localStorage.setItem('userlog',JSON.stringify(usulog));
			console.log(usuarios);	
					
			console.log('Usuario logueado');
			//Actualizar el LS
			localStorage.setItem('usuarios',JSON.stringify(usuarios));
	
			window.location.assign(window.location.origin+'/index.html');	
		} else {error(); }				
		}
}
}

const logout = () =>{	
	usuarios = JSON.parse(localStorage.getItem("usuarios"));
	const tareasLS = JSON.parse(localStorage.getItem('tareas'));
	

	let usuLog = document.querySelector('#labeluser').textContent;
	let idUser = parseInt(document.querySelector('#idusuario').textContent); 
	console.log(usuLog);
	console.log(idUser);
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


