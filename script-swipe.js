// Verificar si hay una sesión activa
const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));

if (!sesionActiva) {
    // Redirigir a login.html si no hay sesión activa
    window.location.href = "login.html";
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Usuarios de ejemplo para mensajes
const users = [
    {
        nombre: "nombre1",
        apellidos: "apellidos1",
        correo: "correo_user1@email.com",
        password: "pass111",
        birthdate: "1999-01-01",
        genero: "otro",
        orientacion: "otro",
        intereses: ".",
        fotos: [, , , , , ,]
    },
    {
        nombre: "nombre2",
        apellidos: "apellidos2",
        correo: "correo_user2@email.com",
        password: "pass222",
        birthdate: "2001-01-01",
        genero: "otro",
        orientacion: "otro",
        intereses: ".",
        fotos: [, , , , , ,]
    }
];

// Evitar duplicados
users.forEach(user => {
    if (!usuarios.some(u => u.correo === user.correo)) {
        usuarios.push(user);
    }
});

// Almacenar usuarios en localStorage
localStorage.setItem("usuarios", JSON.stringify(usuarios));

/////////////////////////////////////////////////////////

var personas = [
    {
        imagen: "ricardo.jpg", nombre: "Ricardo Emilio Fernández",
        descripción: "Empresario en el sector tecnológico. Fundó una startup de ciberseguridad y ha sido invitado a dar charlas en conferencias internacionales."
    },
    {
        imagen: "mariana.jpg", nombre: "Mariana Espinoza López",
        descripción: "Médica general con especialización en medicina deportiva. Ha trabajado con atletas de alto rendimiento en diversas disciplinas."
    },
    {
        imagen: "carlos.jpg", nombre: "Carlos Alberto Núñez Vázquez",
        descripción: "Músico y compositor. Toca el piano y la guitarra, y ha trabajado en la producción de bandas sonoras para cine independiente."
    },
    {
        imagen: "elena.jpg", nombre: "Elena Guzmán Salas",
        descripción: "Arquitecta con un enfoque en la sostenibilidad. Le apasiona diseñar espacios funcionales que armonicen con la naturaleza."
    },
    {
        imagen: "diego.jpg", nombre: "Diego Alejandro Ríos Mendoza",
        descripción: "Programador y entusiasta de la inteligencia artificial. Ha desarrollado varias aplicaciones innovadoras y es autodidacta en su campo."
    },
    {
        imagen: "camila.jpg", nombre: "Camila Rodríguez Herrera",
        descripción: "Psicóloga infantil con vocación por ayudar a niños con trastornos del aprendizaje. En su tiempo libre, disfruta pintar acuarelas."
    },
    {
        imagen: "andres.jpg", nombre: "Andrés Villanueva",
        descripción: "Chef con un enfoque en la cocina de autor. Ha trabajado en restaurantes con estrella Michelin y sueña con abrir su propio local."
    },
    {
        imagen: "valeria.jpg", nombre: "Valeria Contreras",
        descripción: "Escritora y periodista freelance. Su curiosidad la ha llevado a entrevistar a figuras importantes en la política y el entretenimiento."
    },
    {
        imagen: "luis.jpg", nombre: "Luis Fernando Ortega Pérez",
        descripción: "Ingeniero mecánico especializado en energías renovables. Amante del senderismo y defensor del medio ambiente."
    },
    {
        imagen: "sofia.jpg", nombre: "Sofía Martínez Ramírez",
        descripción: "Diseñadora gráfica apasionada por la ilustración digital y el arte minimalista. Vive en Barcelona y le encanta viajar en busca de inspiración."
    }
];

document.getElementById("cardsdiv").innerHTML = personas.map((persona, index) => `
    <div class="card-wrapper" id="wrapper${index + 1}">
        <div class="card" id="card${index + 1}">
            <img src="images/${persona.imagen}" class="profile-image">
            <h1>${persona.nombre}</h1>
            <p>${persona.descripción}</p>
        </div>
        <div class="controls">
            <button class="button dislike" onclick="handleSwipe('dislike', '${index + 1}')">❌</button>
            <button class="button like" onclick="handleSwipe('like', '${index + 1}')">✔️</button>
        </div>
        <div class="like-animation" id="like-animation-${index + 1}">✔️</div>
        <div class="dislike-animation" id="dislike-animation-${index + 1}">❌</div>
    </div>
`).join('');

function asignarEventos() {
    document.querySelectorAll('.card-wrapper').forEach((card) => {
        let isDragging = false;
        let startX = 0;
        let currentX =0;

        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clienteX;
            card.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX - startX;
            card.style.transform = `translateX(${currentX}px) rotate(${currentX / 20}deg)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            if (Math.abs(currentX) > 100) {
                if (currentX > 0) {
                    card.classList.add('swipe-right'); // Desliza a la derecha
                    console.log('✔️');
                } else {
                    card.classList.add('swipe-left'); // Desliza a la izquierda
                    console.log('❌');
                }
                setTimeout(() => {
                    card.remove(); // Elimina la carta después del swipe
                }, 500);
            } else {
                card.style.transition = 'transform 0.3s ease';
                card.style.transform = 'translateX(0) rotate(0)';
            }
        });
    });
}

// Llama a la funcion despues de crear las tarjetas
asignarEventos();

function handleSwipe(direction, index) {
    const cardWrapper = document.getElementById(`wrapper${index}`);
    const likeAnimation = document.getElementById(`like-animation-${index}`);
    const dislikeAnimation = document.getElementById(`dislike-animation-${index}`);

    if (direction === 'like') {
        likeAnimation.classList.add('show-animation');
        setTimeout(() => {
            likeAnimation.classList.remove('show-animation');
            cardWrapper.classList.add('swipe-right'); // Animación de deslizamiento
            setTimeout(() => cardWrapper.remove(), 500);
        }, 500);
    } else if (direction === 'dislike') {
        dislikeAnimation.classList.add('show-animation');
        setTimeout(() => {
            dislikeAnimation.classList.remove('show-animation');
            cardWrapper.classList.add('swipe-left');
            setTimeout(() => cardWrapper.remove(), 500);
        }, 500);
    }
}


/////////////////////////////////////////////////////////

const cards = document.querySelectorAll('.card-wrapper');

cards.forEach((card) => {
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    card.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        card.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        card.style.transform = `translateX(${currentX}px) rotate(${currentX / 20}deg)`;
    });

    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;

        if (Math.abs(currentX) > 100) { // Si el usuario desliza lo suficiente
            if (currentX > 0) {
                card.classList.add('swipe-right'); // Desliza a la derecha
                console.log('✔️');
            } else {
                card.classList.add('swipe-left'); // Desliza a la izquierda
                console.log('❌');
            }

            setTimeout(() => {
                card.remove(); // Elimina la carta después del swipe
            }, 500);
        } else {
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'translateX(0) rotate(0)';
        }
    });
});
