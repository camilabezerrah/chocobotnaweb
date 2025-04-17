document.getElementById('send-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value.trim();
  const chatBox = document.getElementById('chatHistory');

  if (userInput === '') return;

  chatBox.innerHTML += `<div class="user-msg"><strong>Você:</strong> ${userInput}</div>`;
  document.getElementById('user-input').value = '';

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div class="bot-msg"><strong>ChocoBot:</strong> ${data.resposta}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    console.error(error);
    chatBox.innerHTML += `<div class="bot-msg"><strong>ChocoBot:</strong> Erro ao se conectar.</div>`;
  }
});