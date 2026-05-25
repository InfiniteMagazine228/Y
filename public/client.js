const socket = io();
const input = document.getElementById('m');
const sendBtn = document.getElementById('send');
const messages = document.getElementById('messages');

sendBtn.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
