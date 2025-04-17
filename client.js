// Adiciona um listener de evento para o botão de envio quando ele for clicado
document.getElementById('send-btn').addEventListener('click', async () => {
  
  // Pega o valor da mensagem que o usuário digitou no campo de input
  const userInput = document.getElementById('user-input').value;
  
  // Pega a referência do elemento onde as mensagens do chat serão exibidas
  const chatBox = document.getElementById('chat-box');
  
  // Adiciona a mensagem do usuário na área de chat, formatando como HTML
  chatBox.innerHTML += `<div><strong>Você:</strong> ${userInput}</div>`;
  
  // Limpa o campo de input após o envio da mensagem
  document.getElementById('user-input').value = '';
  
  // Tenta fazer a requisição para o backend para obter a resposta da IA
  try {
    // Envia uma requisição POST para o servidor backend (localhost:3000/chat)
    // A mensagem do usuário é enviada no corpo da requisição em formato JSON
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST', // Define o método HTTP como POST
      headers: { 'Content-Type': 'application/json' }, // Define que o corpo da requisição é em JSON
      body: JSON.stringify({ message: userInput }) // Envia a mensagem como JSON
    });
    
    // Aguarda a resposta do servidor e converte o corpo da resposta para um objeto JSON
    const data = await res.json();
    
    // Adiciona a resposta do bot à área de chat, formatando como HTML
    chatBox.innerHTML += `<div><strong>ChocoBot:</strong> ${data.resposta}</div>`;
    
    // Faz a rolagem automática para o final da área de chat, para que a última mensagem seja visível
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    // Se ocorrer um erro na requisição (como problemas de conexão), ele será capturado aqui
    console.error(error); // Imprime o erro no console para depuração
    
    // Exibe uma mensagem de erro na área de chat
    chatBox.innerHTML += `<div><strong>ChocoBot:</strong> Erro ao se conectar.</div>`;
  }
});