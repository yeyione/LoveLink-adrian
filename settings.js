document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos si existen en localStorage
    const cargarDatos = () => {
        const datosGuardados = JSON.parse(localStorage.getItem("ajustes"));
        if (datosGuardados) {
            document.getElementById("correo").value = datosGuardados.correo || '';
            document.getElementById("telefono").value = datosGuardados.telefono || '';
            document.getElementById("contrasena").value = datosGuardados.contrasena || '';
            document.getElementById("idioma").value = datosGuardados.idioma || 'es';
            document.getElementById("notifMensajes").checked = datosGuardados.notificaciones.mensajes || false;
            document.getElementById("notifLikes").checked = datosGuardados.notificaciones.likes || false;
            document.getElementById("notifComentarios").checked = datosGuardados.notificaciones.comentarios || false;
            document.getElementById("notifCoincidencias").checked = datosGuardados.notificaciones.coincidencias || false;
        }
    };

    cargarDatos(); // Cargar datos al iniciar la página

    const guardarBtn = document.getElementById("guardarCambios");
    const cancelarBtn = document.getElementById("cancelar");

    guardarBtn.addEventListener("click", () => {
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const contrasena = document.getElementById("contrasena").value;

        if (!correo || !telefono || !contrasena) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!correo.includes("@")) {
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        // Guardar los datos si todo está correcto
        const idioma = document.getElementById("idioma").value;
        const notificaciones = {
            mensajes: document.getElementById("notifMensajes").checked,
            likes: document.getElementById("notifLikes").checked,
            comentarios: document.getElementById("notifComentarios").checked,
            coincidencias: document.getElementById("notifCoincidencias").checked,
        };

        const ajustes = { correo, telefono, contrasena, idioma, notificaciones };
        localStorage.setItem("ajustes", JSON.stringify(ajustes));
        alert("✅ Cambios guardados correctamente");

        // Redirigir al perfil después de guardar los cambios
        window.location.href = "/perfil.html"; // Reemplaza con la URL de tu perfil
    });

    cancelarBtn.addEventListener("click", () => {
        const confirmar = confirm("¿Deseas cancelar los cambios?");
        if (confirmar) {
            alert("❌ Cambios cancelados");
            cargarDatos(); // Recargar los datos guardados al cancelar
        }
    });

    // Cerrar sesión: limpiar localStorage y redirigir al usuario
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("ajustes"); // Eliminar datos guardados
        alert("Sesión cerrada.");
        window.location.href = "/login.html"; // Redirigir al usuario a la página de inicio de sesión
    });

    // Borrar cuenta: eliminar todos los datos y redirigir al usuario
    document.getElementById("borrarCuenta").addEventListener("click", () => {
        const confirmar = confirm("¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer.");
        if (confirmar) {
            localStorage.removeItem("ajustes"); // Eliminar los datos de la cuenta
            alert("❌ Cuenta borrada.");
            window.location.href = "/login.html"; // Redirigir al usuario a la página de inicio de sesión
        }
    });
});

