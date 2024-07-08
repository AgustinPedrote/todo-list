// Obtener referencias a los elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// Obtener los datos de localStorage y convertirlos de nuevo en un array de objetos
const todos = JSON.parse(localStorage.getItem('todos'));

// Si hay datos en localStorage, se las muestra
if (todos) {
    todos.forEach(todo => addTodo(todo));
}

// Evitar que se recargue la página al enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});

// Función para agregar una nueva tarea a la lista
function addTodo(todo) {
    let todoText = input.value; // Obtener el texto ingresado en el input

    if (todo) {
        todoText = todo.text;
    }

    // Verificar que el texto no esté vacío antes de agregar la tarea
    if (todoText) {
        const todoEl = document.createElement('li');

        // Si el objeto 'todo' tiene la propiedad 'completed' y es verdadera, agregar la clase 'completed' al <li>
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        // Establecer el texto de la tarea en el <li>
        todoEl.innerText = todoText;

        // Escuchar el evento 'click' en el <li> para marcar la tarea como completada o incompleta
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        // Escuchar el evento 'contextmenu' (clic derecho) en el <li> para eliminar la tarea
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = '';

        updateLS();
    }
}

// Función para actualizar los datos en localStorage
function updateLS() {
    // Obtener todos los elementos <li> de la lista
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    // Iterar sobre todos los elementos <li> y crear un array de objetos para guardar en localStorage
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    // Guardar el array de objetos en localStorage con clave 'todos'
    localStorage.setItem('todos', JSON.stringify(todos));
}
