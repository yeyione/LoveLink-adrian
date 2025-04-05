const chatContainer = document.getElementById("chat-container");
const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let currentUser = JSON.parse(localStorage.getItem("sesionActiva"));
let otherUser = null;
let messages = JSON.parse(localStorage.getItem("mensajes")) || [];

// Función para mostrar mensajes
function displayMessages() {
    messagesDiv.innerHTML = "";
    messages.forEach((message, index) => {
        if ((message.from === currentUser.nombre && message.to === otherUser) || 
            (message.from === otherUser && message.to === currentUser.nombre)) {

            const messageElement = document.createElement("div");
            messageElement.classList.add("message");

            // Solo mostrar botón si el usuario actual envió el mensaje
            const deleteBtn = (message.from === currentUser.nombre) 
                ? `<button class="delete-btn" onclick="deleteMessage(${index})">🗑️</button>`
                : "";

            messageElement.innerHTML = `<strong>${message.from} (${message.time}):</strong>
                                        ${message.text} ${deleteBtn}`;
            messagesDiv.appendChild(messageElement);
        }
    });
}

// Función para mostrar usuarios
function displayUsers() {
    const usersData = JSON.parse(localStorage.getItem("usuarios"));
    usersDiv.innerHTML = "";
    usersData.forEach(user => {
        if (user.nombre !== currentUser.nombre) {
            const userElement = document.createElement("div");
            userElement.textContent = user.nombre;
            userElement.addEventListener("click", () => {
                otherUser = user.nombre;
                displayMessages();
            });
            usersDiv.appendChild(userElement);
        }
    });
}

// Evento de envío de mensaje
sendButton.addEventListener("click", () => {
    const text = messageInput.value;
    if (text && otherUser) {
        const message = {
            from: currentUser.nombre,
            to: otherUser,
            text: text,
            time: new Date().toLocaleTimeString()
        };
        messages.push(message);
        localStorage.setItem("mensajes", JSON.stringify(messages));
        messageInput.value = "";
        displayMessages();
    }
});

displayUsers();
displayMessages();

// Función para borrar mensajes
function clearMessages(user1, user2) {
    messages = messages.filter(message => !((message.from === user1 && message.to === user2) || (message.from === user2 && message.to === user1)));
    localStorage.setItem("mensajes", JSON.stringify(messages));
    console.log(`Mensajes entre ${user1} y ${user2} eliminados.`);
}

function deleteMessage(index) {
    messages.splice(index, 1); // Elimina el mensaje
    localStorage.setItem("mensajes", JSON.stringify(messages)); // Guarda los cambios
    displayMessages(); // Vuelve a mostrar los mensajes
}