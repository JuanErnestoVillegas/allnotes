const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
let userVerificado = false;

const expresiones = {
  input_names: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos. (nombre)
  input_lastname: /^[a-zA-ZÀ-ÿ\s]{2,30}$/, // Letras y espacios, pueden llevar acentos. (apellido)
  input_state: Option, //pais
  input_email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //e-mail
  input_user: /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, //user  
  input_password: /^.{4,12}$/, // 4 a 12 digitos. (contraseña)  
};

const campos = {
  input_names: false,
  input_lastname: false,
  input_email: false,
  input_user: false,
  input_state: true,
  input_password: false,
  input_passwordconfirm: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "input_email":
      validarCampo(expresiones.input_email, e.target, "input_email");
      break;
    case "input_names":
      validarCampo(expresiones.input_names, e.target, "input_names");
      if(campos.input_names){			
				document.getElementById('input_names').value=FirstLetterWords(e.target.value);
      }
      break;
    case "input_lastname":
        validarCampo(expresiones.input_lastname, e.target, "input_lastname");
        if(campos.input_lastname){			
          document.getElementById('input_lastname').value=FirstLetterWords(e.target.value);
        }
      break;
    case "input_user":
      validarCampo(expresiones.input_user, e.target, "input_user");
      break;
    case "input_password":
      validarCampo(expresiones.input_password, e.target, "input_password");
      break;
    case "input_passwordconfirm":
      validarCampo(expresiones.input_password, e.target, "input_passwordconfirm");
      validarPassword2();
      break;
  }
};
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`${campo}`).classList.remove("is-invalid");
    document.getElementById(`${campo}`).classList.add("is-valid");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.add("is-invalid");
    document.getElementById(`${campo}`).classList.remove("is-valid");
    campos[campo] = false;
  }
};

const validarPassword = (e) => {
  switch (e.target.name) {
    case "input_password":
      validarCampo(expresiones.input_password, e.target, "input_password");
      validarPassword2();
      break;
    case "input_passwordconfirm":      
      validarPassword2();
      break;
  }
};

//Ambas contraseñas deben coincidir:
const validarPassword2 = () => {
  const input_password1 = document.getElementById("input_password");
  const input_passwordconfirm1 = document.getElementById("input_passwordconfirm");

  if (input_password1.value !== input_passwordconfirm1.value) {
    document.getElementById(`input_passwordconfirm`).classList.add("is-invalid");
    document.getElementById(`input_passwordconfirm`).classList.remove("is-valid");
    campos["input_password"] = false;
  } else {
    document.getElementById(`input_passwordconfirm`).classList.add("is-valid");
    document.getElementById(`input_passwordconfirm`).classList.remove("is-invalid");
    campos["input_password"] = true;
  }
};

//Primera letra de cada palabra a mayúsculas
function FirstLetterWords(str)
{
    var partes = str.split(" ");
    for ( var i = 0; i < partes.length; i++ )
    {
        var j = partes[i].charAt(0).toUpperCase();
        partes[i] = j + partes[i].substr(1);
    }
    return partes.join(" ");
}

//tipeo
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

const recuperarLS_usuarios = () => {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios == null) {
    usuarios = [];
  }
};

function buscarUsuario(array, campo, nombreusuario){
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios == null) {
    usuarios = [];
  }
  console.log(usuarios);
   let resultado = usuarios.find(item=>item.user === `${nombreusuario}`); //Bien
  // let resultado = `${array}`.find(item=>item`.${campo} === '${nombreusuario}'`); //aun no
  console.log(`${nombreusuario}`);
  console.log(resultado);

  if(typeof resultado === 'undefined'){
    console.log(`NO ENCONTRADO`);   
    return false;
  } else {
    return true;
    console.log(`ENCONTRADO`);  
  } 
}

function verificarDisponibilidad(){
    if(!buscarUsuario("usuarios", "user", document.getElementById("input_user").value)){ 
      console.log('Usuario disponible.');
      userVerificado=true;
  } else{
      setTimeout(function() { alert('El usuario ya existe. Ingrese uno diferente.'); }, 1000);
      document.getElementById("input_user").value='';
      document.getElementById("input_user").focus(); 
  }

}

//GUARDAR DATOS EN EL LOCALSTORAGE

function guardarUsuario() {
  const nombre = document.getElementById("input_names").value;
  const apellido = document.getElementById("input_lastname").value;
  const email = document.getElementById("input_email").value;  
  const usuario = document.getElementById("input_user").value;
  const pais = document.getElementById("input_state").value;
  const contraseña = document.getElementById("input_password").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios == null) {
    usuarios = [];
  }
 
  const newUsuario = {
    id: usuarios.length + 1,
    nombre: nombre,
    apellido: apellido,
    email: email,
    user: usuario,
    pais: pais,
    contraseña: contraseña,
    activo: false,
  };
  console.log(newUsuario);

//FIN DEL LOCALSTORAGE
  usuarios.push(newUsuario);
  let usuarioLS = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", usuarioLS);

  // guardarUserJson(newUsuario);

}
/*

    //! Guardo User en DB Json-server

    async function guardarUserJson(newUsuario) {

      const url = 'http://localhost:3000/usuarios';
      const response = await fetch(url, {
          method: 'CREATE',
          headers: {              
              'Content-Type': 'application/json'
          },
  
          body: JSON.stringify(newUsuario)  
        });
   }

*/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    campos.input_email &&
    campos.input_names &&
    campos.input_lastname &&
    campos.input_user &&
    campos.input_password &&
    campos.input_passwordconfirm
  ) {
    
    if(userVerificado){  
    guardarUsuario();
    formulario.reset();

    document.getElementById("checkFormulario").classList.add("on-hidden");
    setTimeout(() => {
      document.getElementById("checkFormulario").classList.remove("is-valid");
    }, 5000);

    document.querySelectorAll(".valid-feedback").forEach((icono) => {
      icono.classList.remove("is-valid");
      window.location.assign(window.location.origin + '/index.html');
    });
  } 
  }
   else {
    document.getElementById("checkFormulario").classList.add();
   }
});
