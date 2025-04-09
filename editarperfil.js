for (let i = 1; i <= 9; i++) {
    const input = document.getElementById(`foto${i}`);
    input.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let preview = document.getElementById(`preview${i}`);
                if (!preview) {
                    preview = document.createElement("img");
                    preview.id = `preview${i}`;
                    preview.style.width = "100px";
                    preview.style.borderRadius = "10px";
                    preview.style.marginTop = "8px";
                    input.parentNode.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}
// Muestra la vista previa de la imagen seleccionada
function mostrarVistaPrevia(input, previewId) {
    const preview = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result; // Establece la imagen como fuente
            preview.style.display = "block"; // Muestra la vista previa
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src = "";
        preview.style.display = "none";
    }
}

// Elimina la imagen seleccionada y oculta la vista previa
function eliminarFoto(inputId, previewId) {
    const inputFile = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (inputFile) {
        inputFile.value = ""; // Limpia el valor del campo de archivo
    }
    if (preview) {
        preview.src = ""; // Limpia la vista previa
        preview.style.display = "none"; // Oculta la vista previa
    }
    alert("La imagen ha sido eliminada.");
}