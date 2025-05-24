// Arreglo inicial con tareas predefinidas
const listaTareas = [
  {
    id: Date.now(), // Primera tarea con un id basado en la hora actual
    name: 'Ir al trabajo',
    completed: false
  },
  {
    id: Date.now() + 1,
    name: 'Estudiar Programación',
    completed: false
  },
  {
    id: Date.now() + 2,
    name: 'Ir al Gimnasio',
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
    }

    // Columna Acciones
    const colAcciones = document.createElement('td');

    // Botón de marcar como completada
    const btnCompletar = document.createElement('button');
    btnCompletar.className = 'btn btn-success btn-sm me-2';
    btnCompletar.innerHTML = '<i class="fas fa-check"></i>';
    btnCompletar.onclick = () => {
      tarea.completed = !tarea.completed;
      actualizarContadores();
      renderizarTareas();
    };

    // Botón eliminar tarea
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    btnEliminar.onclick = () => {
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