document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado');
    mostrarTareas();

    document.getElementById('task_form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Formulario enviado');
        agregarTarea();
    });
});

function agregarTarea() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    const nuevaTarea = {
        id: Date.now(),
        titulo: document.getElementById('task_title').value,
        plazo: document.getElementById('task_due').value,
        estado: document.getElementById('task_status').value
    };

    console.log('Nueva tarea:', nuevaTarea); // Mostrar la nueva tarea en la consola
    
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    
    mostrarTareas();
    document.getElementById('task_form').reset();
}

function mostrarTareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    let contenedorTareas = document.getElementById('task_container');
    
    contenedorTareas.innerHTML = '';
    
    tareas.forEach(tarea => {
        console.log('Mostrando tarea:', tarea); // Mostrar cada tarea en la consola

        let tareaElemento = document.createElement('div');
        tareaElemento.className = 'task';
        
        let tituloElemento = document.createElement('h3');
        tituloElemento.textContent = tarea.titulo;
        tareaElemento.appendChild(tituloElemento);
        
        let plazoElemento = document.createElement('p');
        plazoElemento.textContent = `Plazo: ${tarea.plazo}`;
        tareaElemento.appendChild(plazoElemento);
        
        let estadoElemento = document.createElement('p');
        estadoElemento.textContent = `Estado: ${tarea.estado}`;
        tareaElemento.appendChild(estadoElemento);

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'delete-button';
        botonEliminar.setAttribute('data-id', tarea.id);
        tareaElemento.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', eliminarTarea);
        
        contenedorTareas.appendChild(tareaElemento);
    });
}

function eliminarTarea(event) {
    console.log('Eliminar tarea:', event.target.getAttribute('data-id'));
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const tareaId = event.target.getAttribute('data-id');

    tareas = tareas.filter(tarea => tarea.id != tareaId);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    
    mostrarTareas();
}

    
    // al final lo mas importante , calculo que todo deberia funcionar bien, sobre todo mostrar las tareas en la consola después de mostrarlas en el DOM.


