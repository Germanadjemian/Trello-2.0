// Cambiar entre modo claro y oscuro
const theme_switch_button = document.getElementById("theme-switcher");
theme_switch_button.addEventListener("click", () => {
    // Cambiar tema en el HTML
    document.getElementsByTagName("html")[0].classList.toggle("theme-dark"); //el toogle hace que si no tiene la clase se lo agrega y si la tiene la elimina

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
const cancelModalButton2 = modal.querySelector(".delete2");
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
cancelModalButton2.addEventListener("click", () => {
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

function crearCartaConModal(tarjeta) {
    // Obtener el título, la descripción y otros datos del modal
    /*const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;
    const asignated = document.gettarjetaById("asignado").value;
    const priority = document.gettarjetaById("prioridad").value;
    const fecha_limite_value = modal.querySelector("input[type='date']").value; // Cambié el nombre de la variable*/
    title = tarjeta.titulo;
    description = tarjeta.descripcion;
    asignated = tarjeta.asignado;
    priority = tarjeta.prioridad;
    fecha_limite_value = tarjeta.fecha;
    id_carta = tarjeta.id;

    // Verificar si se ingresó un título
    if (title) {
        // Crear un elemento div para la carta principal
        const cartaPrincipal = document.createElement("div");
        cartaPrincipal.className = "card";
        cartaPrincipal.classList.add("contenedor_tarea");

        // Asignar un ID único a la carta principal, esto es para el drag and drop
        const uniqueId = 'task-' + new Date().getTime();
        cartaPrincipal.setAttribute("id", uniqueId);

        // Crear un elemento div para la carta secundaria
        const cartaSecundaria = document.createElement("div");
        cartaSecundaria.className = "card2";
        cartaSecundaria.addEventListener('input', saveColumnsContent);

        // CREANDO EL CONTENIDO DE LA CARTA

        // Título
        const titulo = document.createElement("p");
        titulo.className = "cardtext";
        titulo.textContent = title;
        titulo.contentEditable = true;
        titulo.classList.add("forzarCentrado");

        // Descripción de la tarea
        const desc = document.createElement("span");
        desc.contentEditable = false;
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

        // Persona Asignada
        const asig = document.createElement("span");
        asig.contentEditable = false;
        asig.className = "labelForCard";
        asig.textContent = "Asignado: ";

        const asignadoSpan = document.createElement("span");
        asignadoSpan.textContent = asignated;

        const asignado = document.createElement("p");
        asignado.className = "cardtext";
        asignado.appendChild(asig);
        asignado.appendChild(asignadoSpan);
        asignado.contentEditable = true;
        asignado.addEventListener('input', saveColumnsContent);

        // Prioridad de la tarea
        const prio = document.createElement("span");
        prio.contentEditable = false;
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

        // Estado de la tarjeta (Fecha límite)
        const fechaLimiteLabel = document.createElement("span");
        fechaLimiteLabel.contentEditable = false;
        fechaLimiteLabel.className = "labelForCard";
        fechaLimiteLabel.textContent = "Fecha límite: ";

        const fechaLimiteInput = document.createElement("input");
        fechaLimiteInput.type = "date";
        fechaLimiteInput.value = fecha_limite_value;
        fechaLimiteInput.className = "dateInput";

        // Crear un elemento p para contener el texto de la fecha
        const fechaLimiteSpan = document.createElement("span");
        fechaLimiteSpan.textContent = fecha_limite_value;

        const estado = document.createElement("p");
        estado.className = "cardtext";
        estado.appendChild(fechaLimiteLabel);
        estado.appendChild(fechaLimiteSpan);
        estado.appendChild(fechaLimiteInput);
        estado.contentEditable = true;

        // Actualizar el texto del span cuando cambie la fecha
        fechaLimiteInput.addEventListener('input', (event) => {
            const newDate = event.target.value;
            fechaLimiteSpan.textContent = newDate;
        });

        estado.addEventListener('input', saveColumnsContent);

        // Crear botón de eliminar
        let eliminar = document.createElement("button");
        eliminar.className = "eliminar";
        eliminar.setAttribute("id",id_carta); //para tener una referencia de que borrar en el server
        eliminar.onclick = function() { borrarCarta(this, eliminar.id) };//Me eliminaba solo el ultimo porque tenia id_carta en vez de eliminar.id, al tener id_carta se actualizaba todo el rato la referencia cuando creaba una carta nueva
        console.log("El id de la carta es: ")
        console.log(id_carta)
        
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
        
        // Intentando que se pueda arrastrar la carta
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


acceptModalButton.addEventListener("click",fetchPostCards);

function borrarCarta(botonEliminar, id){
    //Borra la carta 
    const cartaPorEliminar= botonEliminar.parentElement.parentElement;
    cartaPorEliminar.remove();
    fetchDeleteCard(id);
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
        //console.log("Evento eliminar reasignado");
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
    //Reasignar el evento de edicion de texto cuando se cambia la fecha
    document.querySelectorAll('.dateInput').forEach(fechaInput=>{
        fechaInput.addEventListener('input', (event) => {
            const newDate = event.target.value;
            fechaInput.previousElementSibling.textContent = newDate;
            saveColumnsContent();
        });
    })
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



async function fetchGetCardsData() {
    try{
        const cards = await fetch('http://localhost:3000/api/tasks');
        if (cards.ok) {
            const data = await cards.json();
            console.log(data)
            return data
        }
    }
    catch(error) {
        console.error(error)
    }
  }

  //fetchGetCardsData()

  async function fetchGetCards() {
    const url = "";
    const tarjeta = {
        titulo: "asignar_titulo",
        descripcion: "asginar_desc",
        asignado: "yo",
        fecha: new Date("2024-09-04"), //Asi es el formato para crear la fecha en el json
        prioridad: "asginar_prio"
    }

    try{
        const cards =  await fetchGetCardsData();
        if(cards){
            //asignar datos del server a las cards
            console.log(typeof(cards))
            cards.forEach(element => {
                tarjeta.titulo = element.title;
                tarjeta.descripcion = element.description;
                tarjeta.asignado = element.assignedTo;
                tarjeta.fecha = element.endDate;
                tarjeta.prioridad = element.priority;
                tarjeta.id = element.id;
                crearCartaConModal(tarjeta)
                console.log("Exito")
            });
        }
        else{
            console.log("No se pudo obtener el array de cartas")
        }
    }
    catch(error){
        console.log("Error: "+error)
    }
  }
  //fetchGetCards();

  async function fetchPostCards() {
    const title = modal.querySelector("input[type='text']").value;
    const description = modal.querySelectorAll("input[type='text']")[1].value;
    const asignated = document.getElementById("asignado").value;
    const priority = document.getElementById("prioridad").value;
    const fecha_limite_value = modal.querySelector("input[type='date']").value;

    const tarjeta = {
        titulo: title,
        descripcion: description,
        asignado: asignated,
        fecha: fecha_limite_value, // Formato para crear la fecha en el JSON
        prioridad: priority
    }
    try {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tarjeta)
        });
        
        if(response.ok){
            const textResponse = await response.text()
            console.log(textResponse);
            tarjeta.id = textResponse;
            crearCartaConModal(tarjeta);
        } else {
            console.log("El estado es: " + response.status);
        }

    } catch (error) { // Corregido
        console.log("ERROR: " + error);
    }
}


async function fetchDeleteCard(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            console.log("Tarea eliminada exitosamente");
        } else {
            console.log("El estado es: " + response.status);
        }

    } catch (error) {
        console.log("ERROR: " + error);
    }
}

//fetchDeleteCard("7b36f20989a"); Funciona

