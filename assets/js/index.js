// Arreglo inicial con tareas predefinidas
const listaTareas = [
  {
    id: Date.now(), // Primera tarea con un id basado en la hora actual
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

// Referencias a elementos del DOM
const inputTarea = document.getElementById('tarea');
const btnAgregar = document.getElementById('agregarTarea');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const totalTareas = document.getElementById('totalTareas');
const tareasRealizadas = document.getElementById('tareasRealizadas');


// Mostrar todas las tareas actuales en la tabla
function renderizarTareas() {
  cuerpoTabla.innerHTML = ''; // Limpiar tabla

  listaTareas.forEach((tarea, index) => {
    const fila = document.createElement('tr');

    // Columna ID
    const colID = document.createElement('td');
    colID.textContent = index + 1;

    // Columna Nombre de Tarea
    const colNombre = document.createElement('td');
    colNombre.textContent = tarea.name;
    if (tarea.completed) {
      colNombre.style.textDecoration = 'line-through';
      colNombre.style.color = '#39FF14'; // mi modificacion color texto tarea realizada quede aquiiiiiiiiiiiiiiiiiiiiiiiii
      colNombre.style.backgroundColor = '#013220'
      colID.style.color = '#39FF14'
    }

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

     console.log(tarea.id) // verificar por que se genrar 4 id por cada click ******************************************

    // BOTON PARA ELIMINAR TAREA 
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm ms-3'; // ⬅️ MODIFICADO: se añadió 'ms-3'
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


// FUNCION AGREGAR TAREA: Agregar nueva tarea desde el input

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

// Evento click del botón Agregar
btnAgregar.addEventListener('click', agregarTarea);

// Inicializar la aplicación
renderizarTareas();
actualizarContadores();