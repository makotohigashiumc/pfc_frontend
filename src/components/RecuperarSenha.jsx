// Importações necessárias
import React, { useState } from "react";
import { recuperarSenha } from "../services/Api"; // Função da API para recuperar senha

// Componente para recuperação de senha
// Recebe como prop: onVoltar (função para retornar à tela anterior)
function RecuperarSenha({ onVoltar }) {
  // Estado para armazenar o email digitado pelo usuário
  const [email, setEmail] = useState("");
  // Estado para mensagens de sucesso
  const [mensagem, setMensagem] = useState("");
  // Estado para mensagens de erro
  const [erro, setErro] = useState("");
  // Estado para indicar se está processando a requisição
  const [loading, setLoading] = useState(false);

  // Função que trata o envio do formulário de recuperação
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário
    e.preventDefault();
    
    // Limpa mensagens anteriores
    setMensagem("");
    setErro("");
    
    // Ativa o estado de loading
    setLoading(true);
    
    try {
      // Chama a função da API para enviar email de recuperação
      const resp = await recuperarSenha(email);
      
      // Define mensagem de sucesso
      setMensagem(resp.mensagem || "Verifique seu email para redefinir a senha.");
    } catch (err) {
      // Captura e trata erros da requisição
      setErro(err.response?.data?.erro || "Erro ao enviar email de recuperação.");
    } finally {
      // Sempre desativa o loading
      setLoading(false);
    }
  };

  // Renderização do componente
  return (
    <div className="form-container">
      {/* Formulário de recuperação de senha */}
      <form onSubmit={handleSubmit}>
        {/* Título do formulário */}
        <h2>Recuperar senha</h2>
        
        {/* Label e input para email */}
        <label htmlFor="email">Email cadastrado</label>
        <input
          id="email"
          type="email" // Validação nativa de email
          value={email}
          onChange={e => setEmail(e.target.value)} // Atualiza estado a cada digitação
          required // Campo obrigatório
        />
        
        {/* Exibe mensagem de sucesso se existir */}
        {mensagem && <div className="sucesso">{mensagem}</div>}
        
        {/* Exibe mensagem de erro se existir */}
        {erro && <div className="erro-login">{erro}</div>}
        
        {/* Botão para enviar link de recuperação */}
        <button type="submit" disabled={loading} className="enviar-recuperacao">
          {/* Texto dinâmico baseado no estado de loading */}
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </button>
        
        {/* Botão para voltar à tela anterior */}
        <button type="button" onClick={onVoltar} style={{ marginLeft: 12 }}>
          Voltar
        </button>
      </form>
    </div>
  );
}

// Exportação do componente
export default RecuperarSenha;
