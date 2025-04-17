// Importa o framework Express para criar o servidor web
import express from 'express';

// Importa o dotenv para carregar variáveis de ambiente do arquivo .env
import dotenv from 'dotenv';

// Importa o CORS para permitir que o frontend se comunique com o backend em portas diferentes
import cors from 'cors';

// Importa a classe principal da biblioteca do Google Gemini AI (IA generativa)
import { GoogleGenerativeAI } from '@google/generative-ai';

// Carrega as variáveis do arquivo .env (como a API_KEY)
dotenv.config();

// Cria uma instância do servidor Express
const app = express();

// Define a porta onde o servidor vai rodar (pega do .env ou usa 3000 como padrão)
const port = process.env.PORT || 3000;

// Permite que o backend aceite requisições de outros domínios (como o frontend)
app.use(cors());

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// Cria uma instância do cliente da IA generativa da Google com a chave da API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Rota POST para receber as mensagens do usuário e retornar as respostas geradas pela IA
app.post('/chat', async (req, res) => {
  // Extrai a mensagem enviada pelo usuário no corpo da requisição
  const userInput = req.body.message;

  try {
    // Seleciona o modelo de IA que será usado (gemini-pro é o modelo padrão da Google)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Envia a mensagem do usuário para o modelo e gera uma resposta
    const result = await model.generateContent(userInput);

    // Extrai o conteúdo textual da resposta gerada
    const response = await result.response;
    const text = response.text();

    // Retorna a resposta em formato JSON para o frontend
    res.json({ resposta: text });
  } catch (error) {
    // Caso ocorra algum erro, mostra no terminal e envia uma mensagem genérica ao usuário
    console.error('Erro na API:', error);
    res.status(500).json({ resposta: 'Desculpe, algo deu errado!' });
  }
});

// Importa módulos para lidar com caminhos de arquivos no sistema
import path from 'path';
import { fileURLToPath } from 'url';

// Necessário para usar __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permite que o Express sirva arquivos estáticos (como HTML, CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Quando alguém acessar localhost:3000, envia o index.html da pasta public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicia o servidor na porta definida e mostra uma mensagem no terminal
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});