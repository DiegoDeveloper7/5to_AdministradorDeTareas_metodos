const listaTareas = [
  {
    id: Date.now(), 
    name: 'Escribir un libro',
    completed: false
  },
  {
    id: Date.now() + 1,
    name: 'Estudiar programación JavaScript',
    completed: false
  },
  {
    id: Date.now() + 2,
    name: 'Ir al gimnasio',
    completed: false
  }
];


const inputTarea = document.getElementById('tarea');
const btnAgregar = document.getElementById('agregarTarea');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const totalTareas = document.getElementById('totalTareas');
const tareasRealizadas = document.getElementById('tareasRealizadas');


// FUNCIÓN RENDERIZAR TAREAS

function renderizarTareas() {
  cuerpoTabla.innerHTML = ''; // Limpiar tabla

  listaTareas.forEach((tarea, index) => {
    const fila = document.createElement('tr');

    // Columna ID
    const colID = document.createElement('td');
    colID.textContent = index +1;

    // Columna Nombre de Tarea
    const colNombre = document.createElement('td');
    colNombre.textContent = tarea.name;
    if (tarea.completed) {
      colNombre.style.textDecoration = 'line-through';
      colNombre.style.color = '#39FF14'; // modificación estilos adiconales
      colNombre.style.backgroundColor = '#013220'
      colID.style.color = '#39FF14'
    }

       console.log(tarea.id) // ids Date.now

    // Columna Acciones
    const colAcciones = document.createElement('td');

    // BOTÓN PARA MARCAR TAREA COMO COMPLETADA
    const btnCompletar = document.createElement('button');
    btnCompletar.className = 'btn btn-success btn-sm me-2';
    btnCompletar.innerHTML = '<i class="fas fa-check"></i>';
    btnCompletar.onclick = () => {
      tarea.completed = !tarea.completed;
      actualizarContadores();
      renderizarTareas();
     
    };


    // BOTON PARA ELIMINAR TAREA 
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm ms-3'; // margen bt borrar modificado ms-3
    btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    btnEliminar.onclick = () => {

      const confirmar = confirm('¿Estas seguro que deseas eliminar esta tarea?');
      if(!confirmar) return;

      const indice = listaTareas.findIndex(t => t.id === tarea.id);
      if (indice !== -1) {
        listaTareas.splice(indice, 1);
        actualizarContadores();
        renderizarTareas();
      }
    };

    colAcciones.appendChild(btnCompletar);
    colAcciones.appendChild(btnEliminar);

    // Agregar columnas a la fila
    fila.appendChild(colID);
    fila.appendChild(colNombre);
    fila.appendChild(colAcciones);

    // Agregar fila al cuerpo de la tabla
    cuerpoTabla.appendChild(fila);
  });
}



// FUNCIÓN ACTUALIZAR CONTADORES 

function actualizarContadores() {
  totalTareas.textContent = listaTareas.length;
  tareasRealizadas.textContent = listaTareas.filter(t => t.completed).length;
}


// FUNCION AGREGAR TAREA

function agregarTarea() {
  const textoTarea = inputTarea.value.trim();

  if (textoTarea === '') return; // detiene la ejecucion si no se agrega texto al input 

  const nuevaTarea = {
    id: Date.now(), // ID único
    name: textoTarea.charAt(0).toUpperCase() + textoTarea.slice(1).toLowerCase(), // Formatea el texto de entrada
    completed: false
  };

  listaTareas.push(nuevaTarea);
  inputTarea.value = '';
  actualizarContadores();
  renderizarTareas();
  
}


// MÓDULOS DE EVENTOS PARA AGREGAR TAREAS 

btnAgregar.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    agregarTarea();
  }
});


renderizarTareas();
actualizarContadores();