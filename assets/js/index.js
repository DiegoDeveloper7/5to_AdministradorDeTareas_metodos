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