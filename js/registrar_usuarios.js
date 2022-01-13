const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

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
      break;
    case "input_lastname":
        validarCampo(expresiones.input_lastname, e.target, "input_lastname");
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
//tipeo

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

let array, campo, nombreusuario = '';

function buscarUsuario(array, campo, nombreusuario){
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarios == null) {
    usuarios = [];
  }
  if(array.find(campo=> array.campo===nombreusuario)){
    return true;
  } else {
    return false;
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

  // let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  // if (usuarios == null) {
  //   usuarios = [];
  // }
 
  if(!buscarUsuario("usuarios", "user", usuario)){

  const newUsuario = {
    id: usuarios.length + 1,
    nombre: nombre,
    apellido: apellido,
    email: email,
    user: user,
    pais: pais,
    contraseña: contraseña,
  };
  console.log(newUsuario);

//FIN DEL LOCALSTORAGE
  usuarios.push(newUsuario);
  let usuarioLS = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", usuarioLS);

  // guardarUserJson(newUsuario);
} else{
  console.log('El usuario ya existe. Ingrese otro');
}
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
  } else {
    document.getElementById("checkFormulario").classList.add();
   }
});
