// ********************* Variables globales y elementos del DOM ********************************************
const formulario = document.querySelector("#formulario");
const listaTareas = document.querySelector("#listaTareas");
// Array global
let tareas = [];
// En este array (tareas) guardo objeto tarea
// let tarea = {
//   tarea: "",
//   nota: "",
//   estado: false,
// };

// ********************* Funciones globales para administrar las tareas *************************************

const guardarLS = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas));
};

const recuperarLS = () => {
  const tareasLS = localStorage.getItem("tareas");  
  if (tareasLS) {
    tareas = JSON.parse(tareasLS);
  }
};

// *************** (C)REATE **********************
const agregarTarea = (tarea, nota, estado = false) => {
  let tareaItem = {
    tarea,
    nota,
    estado,
  };
  tareas.push(tareaItem);
  // Acá agregamos una tarea al array tareas
  // tambien tenemos que actualizar el LS
  guardarLS();
  listarTareas();
};

// *************** (R)EAD **********************
const listarTareas = () => {
  recuperarLS();
  // aca recorremos el array global tareas y mostremos en un elemento del DOM
  listaTareas.innerHTML = "";
  tareas.forEach((tarea, i) => {
    let tareaItem = `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <p class="fw-bold">${tarea.tarea} 
                    <span class="fw-light">- ${
                      tarea.estado ? "Listo" : "a Realizar"
                    }</span></p>
                    ${tarea.nota}
                </div>
                <span class="badge bg-primary me-1"><i class="bi bi-check-lg" data-id=${i} style="cursor: pointer"></i></span>
                <span class="badge bg-danger"><i class="bi bi-trash" data-id=${i} style="cursor: pointer"></i></span>
            </li>`;
    listaTareas.innerHTML += tareaItem;
  });
};

// *************** (U)PDATE **********************
const modificarTarea = (i) => {
  tareas[i].estado = !tareas[i].estado;
  guardarLS();
  listarTareas();
};

// *************** (D)ELETE **********************
const eliminarTarea = (i) => {
  tareas.splice(i, 1);
  guardarLS();
  listarTareas();
};

// ********************* Eventos que manejen las acciones del DOM *************************************
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarea = document.querySelector("#tarea").value;
  const nota = document.querySelector("#nota").value;
  if (tarea) {
    agregarTarea(tarea, nota);
    formulario.reset();
  }
});

window.addEventListener("load", (e) => {
  // hardcodeo dos tareas y las listo, pero deberia, solo para probar
  // agregarTarea("Aprender JS", "Quiero saber a full JS");
  // agregarTarea("Aprender React", "Quiero saber a full todo sobre React", true);
  listarTareas();
});

listaTareas.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.path[0].classList[1] === "bi-check-lg") {
    modificarTarea(e.target.dataset.id);
    console.log("Check", e.target.dataset.id);
  }
  if (e.path[0].classList[1] === "bi-trash") {
    eliminarTarea(e.target.dataset.id);
    console.log("Delete", e.target.dataset.id);
  }
  // console.log(e.path[0].classList[1]);
  // console.log(e.target.dataset.id);
});
