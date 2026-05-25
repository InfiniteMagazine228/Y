import Pusher from "pusher-js";

const pusher = new Pusher("YOUR_PUSHER_KEY", {
  cluster: "ap1"
});

const channel = pusher.subscribe("chat-channel");
const input = document.getElementById("m");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");

sendBtn.addEventListener("click", async () => {
  if (input.value.trim() !== "") {
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input.value })
    });
    input.value = "";
  }
});

channel.bind("new-message", (data) => {
  const li = document.createElement("li");
  li.textContent = data.text;
  messages.appendChild(li);
});
