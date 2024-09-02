document.addEventListener("DOMContentLoaded", () => {
  fetchMessages();
  const messageForm = document.getElementById("message-form");
  if (messageForm) {
    messageForm.addEventListener("submit", handleSubmit);
  }
});

async function fetchMessages() {
  const response = await fetch("https://guestbook-server-lqgh.onrender.com/messages");
  const messages = await response.json();
  displayMessages(messages);
}

function displayMessages(messages) {
  const container = document.getElementById("guestbook");
  container.innerHTML = "";
  messages.forEach((message) => {
    if (!message.content) return;

    const messageElement = document.createElement("div");
    messageElement.className = "message";

    const contentElement = document.createElement("p");
    contentElement.innerText = message.content;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.dataset.id = message.id;

    messageElement.appendChild(contentElement);
    messageElement.appendChild(deleteButton);
    container.appendChild(messageElement);

    deleteButton.addEventListener("click", () => {
      deleteMessage(deleteButton.dataset.id);
    });
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const content = document.getElementById("message-input").value;
  await fetch("https://guestbook-server-lqgh.onrender.com/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  window.location.href = "index.html";
}

async function deleteMessage(id) {
  await fetch(`https://guestbook-server-lqgh.onrender.com/messages/${id}`, { method: "DELETE" });
  console.log(`DELETE : http://localhost:3000/messages/${id}`);
  fetchMessages();
}
