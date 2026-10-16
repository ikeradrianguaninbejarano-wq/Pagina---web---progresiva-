const NOMBRE_BD = "TaskFlowDB";
const VERSION_BD = 1;
const ALMACEN_TAREAS = "tareas";

function abrirBD() {
    return new Promise((resolve, reject) => {
        const solicitud = indexedDB.open(NOMBRE_BD, VERSION_BD);

        solicitud.onupgradeneeded = function (evento) {
            const db = evento.target.result;

            if (!db.objectStoreNames.contains(ALMACEN_TAREAS)) {
                db.createObjectStore(ALMACEN_TAREAS, {
                    keyPath: "id"
                });
            }
        };

        solicitud.onsuccess = function (evento) {
            resolve(evento.target.result);
        };

        solicitud.onerror = function () {
            reject("Error al abrir IndexedDB");
        };
    });
}

async function guardarTareas(tareas) {
    const db = await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(
            ALMACEN_TAREAS,
            "readwrite"
        );

        const almacen = transaccion.objectStore(ALMACEN_TAREAS);

        tareas.forEach(tarea => {
            almacen.put(tarea);
        });

        transaccion.oncomplete = function () {
            resolve();
        };

        transaccion.onerror = function () {
            reject("Error al guardar las tareas");
        };
    });
}

async function obtenerTareasLocales() {
    const db = await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(
            ALMACEN_TAREAS,
            "readonly"
        );

        const almacen = transaccion.objectStore(ALMACEN_TAREAS);
        const solicitud = almacen.getAll();

        solicitud.onsuccess = function () {
            resolve(solicitud.result);
        };

        solicitud.onerror = function () {
            reject("Error al leer las tareas locales");
        };
    });
}

async function guardarTarea(tarea) {
    const db = await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(
            ALMACEN_TAREAS,
            "readwrite"
        );

        const almacen = transaccion.objectStore(ALMACEN_TAREAS);

        almacen.put(tarea);

        transaccion.oncomplete = function () {
            resolve();
        };

        transaccion.onerror = function () {
            reject("Error al guardar la tarea");
        };
    });
}
async function actualizarTarea(tarea) {
    const db = await abrirBD();

    return new Promise((resolve, reject) => {
        const transaccion = db.transaction(
            ALMACEN_TAREAS,
            "readwrite"
        );

        const almacen = transaccion.objectStore(ALMACEN_TAREAS);

        almacen.put(tarea);

        transaccion.oncomplete = function () {
            resolve();
        };

        transaccion.onerror = function () {
            reject("Error al actualizar la tarea");
        };
    });
}