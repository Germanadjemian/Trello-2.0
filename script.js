// Cambiar entre modo claro y oscuro
const theme_switch_button = document.getElementById("theme-switcher");
theme_switch_button.addEventListener("click", () => {
    // Cambiar tema en el HTML
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark");

    // Cambiar el ícono del botón
    const iconSpan = theme_switch_button.querySelector("span");
    const icon = iconSpan.innerText;
    iconSpan.innerText = (icon === "dark_mode") ? "light_mode" : "dark_mode";
});

// Obtener referencias a los elementos del DOM
const exit_modal = document.getElementsByClassName("modal-background")[0];
exit_modal.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.remove("is-active");
});


// Lógica para el modal y agregar tareas
const addTaskButton = document.getElementById("add-task");
const modal = document.querySelector(".modal");
const cancelModalButton = modal.querySelector(".delete");
const acceptModalButton = modal.querySelector(".is-success");
const backlogColumn = document.getElementById("backlog");

// Mostrar el modal cuando se haga clic en "Agregar tarea"
addTaskButton.addEventListener("click", () => {
    modal.classList.add("is-active");
});

// Ocultar el modal
cancelModalButton.addEventListener("click", () => {
    modal.classList.remove("is-active");
});

modal.querySelector(".modal-background").addEventListener("click", () => {
    modal.classList.remove("is-active");
});

function dragDrop(){
  const cells = document.querySelectorAll('.card');
  const tables = document.querySelectorAll('.columna');

  tables.forEach(table => {
    table.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necesario para permitir el drop
    });

    table.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('text/plain'); // Obtener el ID del elemento arrastrado
        console.log("El id es: "+draggedElementId);
        if(draggedElementId){
            console.log(typeof(draggedElementId));
        }
        //console.log(typeof(draggedElementId));
        const draggedElement = document.getElementById(draggedElementId); // Buscar el elemento arrastrado por su ID
        console.log("puede ser que en el id de arriba no imprime nada pero aun asi no se corta la ejecucion");
        console.log(draggedElement);

        if (draggedElement) {
            table.appendChild(draggedElement); // Mover el elemento arrastrado a la nueva columna
            saveColumnsContent();
        } else {
            console.error('El elemento arrastrado no existe en el DOM:', draggedElementId);
        }
    });
});
}

dragDrop();

function crearCartaConModal() {
    // Obtener el título y la descripción del modal
    const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;
    const asignated = modal.querySelectorAll("input[type='text']")[2].value;
    const priority = modal.querySelectorAll("input[type='text']")[3].value;
    const stateQ = modal.querySelectorAll("input[type='text']")[4].value;

    // Verificar si se ingresó un título
    if (title) {
        // Crear un elemento div para la carta principal
        const cartaPrincipal = document.createElement("div");
        cartaPrincipal.className = "card";
        cartaPrincipal.classList.add("contenedor_tarea")

        // Asignar un ID único a la carta principal
        const uniqueId = 'task-' + new Date().getTime();
        cartaPrincipal.setAttribute("id", uniqueId);
        //ERA ESTO POR LO QUE SE ME ROMPIOO TODO LPM de el id de mierda que no se genera solo

        // Crear un elemento div para la carta secundaria
        const cartaSecundaria = document.createElement("div");
        cartaSecundaria.className = "card2";
        cartaSecundaria.addEventListener('input', saveColumnsContent);
        

        // CREANDO EL CONTENIDO DE LA CARTA

        //Titulo
        const titulo = document.createElement("p");
        titulo.className = "cardtext";
        titulo.textContent = title;
        titulo.contentEditable = true;
        titulo.classList.add("forzarCentrado");

        //Descripcion de la task
        const desc = document.createElement("span");
        desc.contentEditable = false; //Esto aparte de vitar que cambien la prop en la carta hace que se escriba del color adecuado (cardText en vez de labelForCard)
        desc.className = "labelForCard";
        desc.textContent = "Descripción: ";

        const descriptionSpan = document.createElement("span");
        descriptionSpan.textContent = description;

        const descripcion = document.createElement("p");
        descripcion.className = "cardtext";
        descripcion.appendChild(desc);
        descripcion.appendChild(descriptionSpan);
        descripcion.contentEditable = true;
        descripcion.addEventListener('input', saveColumnsContent);

        //Persona Asignada
        const asig = document.createElement("span");
        asig.contentEditable = false
        asig.className = "labelForCard"
        asig.textContent = "Asignado: "

        const asignadoSpan = document.createElement("span");
        asignadoSpan.textContent = asignated;

        const asignado = document.createElement("p");
        asignado.className = "cardtext";
        asignado.appendChild(asig);
        asignado.appendChild(asignadoSpan);
        asignado.contentEditable = true;
        asignado.addEventListener('input', saveColumnsContent);

        //Prioridad de la tarea
        const prio = document.createElement("span");
        prio.contentEditable = false
        prio.className = "labelForCard";
        prio.textContent = "Prioridad: "; 

        const prioridadSpan = document.createElement("span");
        prioridadSpan.textContent = priority;

        const prioridad = document.createElement("p");
        prioridad.className = "cardtext";
        prioridad.appendChild(prio);
        prioridad.appendChild(prioridadSpan);
        prioridad.contentEditable = true;
        prioridad.addEventListener('input', saveColumnsContent);

        //Estado de la tarjeta
        const state = document.createElement("span");
        state.contentEditable = false
        state.className = "labelForCard";
        state.textContent = "Estado: ";

        stateSpan = document.createElement("span");
        stateSpan.textContent = stateQ;

        const estado = document.createElement("p");
        estado.className = "cardtext";
        estado.appendChild(state);
        estado.appendChild(stateSpan);
        estado.contentEditable = true;
        estado.addEventListener('input', saveColumnsContent);

        // Crear botón de eliminar
        let eliminar = document.createElement("button");
        eliminar.className = "eliminar";
        eliminar.onclick = function() { borrarCarta(this) };

        let eliminar_lg = document.createElement("span");
        let eliminar_sl = document.createElement("span");
        let eliminar_text = document.createElement("span");
        eliminar_lg.className = "eliminar_lg";
        eliminar_sl.className = "eliminar_sl";
        eliminar_text.className = "eliminar_text";
        eliminar_text.textContent = "ELIMINAR";

        // Anidar elementos
        eliminar_lg.appendChild(eliminar_sl);
        eliminar_lg.appendChild(eliminar_text);
        eliminar.appendChild(eliminar_lg);
        cartaSecundaria.appendChild(eliminar);
        cartaSecundaria.appendChild(titulo);
        cartaSecundaria.appendChild(descripcion);
        cartaSecundaria.appendChild(asignado);
        cartaSecundaria.appendChild(prioridad);
        cartaSecundaria.appendChild(estado);
        cartaPrincipal.appendChild(cartaSecundaria);
        
        //intentando que se pueda arrastrar la carta
      // Para la carta principal
    cartaPrincipal.setAttribute("draggable", "true");
    cartaPrincipal.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    cartaPrincipal.classList.add('dragging');
    });
    cartaPrincipal.addEventListener('dragend', () => {
    cartaPrincipal.classList.remove('dragging');
    });

    

        // Agregar la carta principal al contenedor de cartas (e.g., backlogColumn)
        backlogColumn.appendChild(cartaPrincipal);

        // Limpiar y cerrar el modal
        modal.querySelectorAll("input").forEach(input => input.value = "");
        modal.classList.remove("is-active");

        saveColumnsContent();
    
    }
}

acceptModalButton.addEventListener("click",crearCartaConModal);

function borrarCarta(botonEliminar){
    //Borra la carta 
    const cartaPorEliminar= botonEliminar.parentElement.parentElement;
    cartaPorEliminar.remove();
    saveColumnsContent();
  }
 
  function saveColumnsContent() {
    const columns = ['backlog', 'to-do', 'in-progress', 'blocked', 'done'];

    columns.forEach(columnId => {
        const columnContent = document.getElementById(columnId).innerHTML;
        localStorage.setItem(columnId, columnContent);
    });

    console.log("Contenido guardado en localStorage.");
}

function reasginarEventos() {
    // Reasignar el evento de clic para los botones de eliminar
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', function() {
            borrarCarta(this); //3 horas jodido por este this  ._.
        });
        console.log("Evento eliminar reasignado");
    });

    // Reasignar eventos de arrastrar y soltar para las cartas
    document.querySelectorAll('.contenedor_tarea').forEach(taskDiv => {
        taskDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            taskDiv.classList.add('dragging');
        });

        taskDiv.addEventListener('dragend', () => {
            taskDiv.classList.remove('dragging');
        });
    });
}

function loadColumnsContent() {
    const columns = ['backlog', 'to-do', 'in-progress', 'blocked', 'done'];

    columns.forEach(columnId => {
        const savedContent = localStorage.getItem(columnId);
        if (savedContent) {
            document.getElementById(columnId).innerHTML = savedContent;
        }
    });

    // Reasignar eventos después de cargar el contenido
    reasginarEventos();

    console.log("Contenido cargado desde localStorage.");
}

window.addEventListener("load", loadColumnsContent);
