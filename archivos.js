window.onload = function () {
    const imagenesGuardadas = JSON.parse(localStorage.getItem('misImagenes')) || [];
    mostrarImagenes(imagenesGuardadas);
  };

  let nuevasImagenes = [];

  function guardarImagenes(event) {
    const archivos = event.target.files;
    nuevasImagenes = [];

    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];

      if (archivo.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function(e) {
          nuevasImagenes.push(e.target.result);

          if (nuevasImagenes.length === archivos.length) {
            const almacenadas = JSON.parse(localStorage.getItem('misImagenes')) || [];
            const actualizadas = almacenadas.concat(nuevasImagenes);
            localStorage.setItem('misImagenes', JSON.stringify(actualizadas));
            mostrarImagenes(actualizadas);
          }
        };

        reader.readAsDataURL(archivo);
      }
    }
  }

  function mostrarImagenes(lista) {
    const preview = document.getElementById('preview');
    preview.innerHTML = "";
    lista.forEach(dataURL => {
      const img = document.createElement('img');
      img.src = dataURL;
      preview.appendChild(img);
    });
  }

  function guardarYRedirigir() {
    // Redirige al perfil después de 500ms para simular "guardar"
    setTimeout(() => {
      window.location.href = "perfil.html"; // Cambia esto por la ruta real a tu perfil
    }, 500);
  }

