// src/services/api.js
// Arquivo de serviços para comunicação com a API do backend
// Centraliza todas as chamadas HTTP para manter consistência e facilitar manutenção

// URL base da API - configurada para desenvolvimento local
console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ================================
// FUNÇÕES DE AUTENTICAÇÃO
// ================================

// Função para login do cliente
// Recebe: email e senha do cliente
// Retorna: dados do usuário e token JWT se bem-sucedido
export async function loginCliente(email, senha) {
  const resp = await fetch(`${API_BASE}/clientes/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Define que está enviando JSON
    body: JSON.stringify({ email, senha }), // Converte dados para JSON
  });
  
  // Se resposta não é ok, lança erro
  if (!resp.ok) throw new Error("Login falhou");
  
  // Retorna dados parseados do JSON
  return resp.json();
}

// Função para login do massoterapeuta
// Recebe: email e senha do massoterapeuta
// Retorna: dados do usuário e token JWT se bem-sucedido
export async function loginMassoterapeuta(email, senha) {
  const resp = await fetch(`${API_BASE}/massoterapeutas/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  
  if (!resp.ok) throw new Error("Login falhou");
  return resp.json();
}

// ================================
// FUNÇÕES DE CADASTRO
// ================================

// Função para cadastro de cliente
// Recebe: objeto com dados do cliente (nome, email, senha, etc.)
// Retorna: confirmação de cadastro
export async function cadastrarCliente(dados) {
  const resp = await fetch(`${API_BASE}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados), // Envia todos os dados do cliente
  });
  
  if (!resp.ok) throw new Error("Cadastro falhou");
  return resp.json();
}

// ================================
// FUNÇÕES DE RECUPERAÇÃO DE SENHA
// ================================

// Função para solicitar recuperação de senha
// Recebe: email do cliente
// Retorna: confirmação de envio do email
export async function recuperarSenha(email) {
  const resp = await fetch(`${API_BASE}/clientes/recuperar-senha`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }), // Envia apenas o email
  });
  
  if (!resp.ok) throw new Error("Erro ao solicitar recuperação de senha");
  return resp.json();
}

// Função para redefinir senha usando token
// Recebe: token de recuperação e nova senha
// Retorna: confirmação de redefinição
export async function redefinirSenha(token, nova_senha) {
  const resp = await fetch(`${API_BASE}/clientes/redefinir-senha`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, nova_senha }), // Envia token e nova senha
  });
  
  if (!resp.ok) throw new Error("Erro ao redefinir senha");
  return resp.json();
}

// ================================
// FUNÇÕES DE CONTATO
// ================================

// Função para enviar mensagem do formulário de contato
// Recebe: objeto com dados do formulário (nome, email, telefone, assunto, mensagem)
// Retorna: confirmação de envio
export async function enviarMensagemContato(dados) {
  const resp = await fetch(`${API_BASE}/contato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados), // Envia todos os dados do formulário
  });
  
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.erro || "Erro ao enviar mensagem");
  }
  
  return resp.json();
}
