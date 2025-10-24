// Importação do React e hook useState para gerenciar estado
import React, { useState } from "react";

// Componente de formulário de login
// Recebe como props: login (função para autenticar), abrirCadastro e abrirRecuperarSenha (funções de navegação)
function LoginForm({ login, abrirCadastro, abrirRecuperarSenha }) {
  // Estado para controlar se a senha está visível ou oculta
  const [mostrarSenha, setMostrarSenha] = useState(false);
  // Estado para armazenar o email digitado pelo usuário
  const [email, setEmail] = useState("");
  // Estado para armazenar a senha digitada pelo usuário
  const [senha, setSenha] = useState("");
  // Estado para o tipo de usuário (cliente ou massoterapeuta)
  const [tipo, setTipo] = useState("cliente");
  // Estado para indicar se está fazendo requisição (mostra loading)
  const [loading, setLoading] = useState(false);

  // Função que trata o envio do formulário de login
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!email || !senha) {
      alert("Preencha email e senha.");
      return; // Para a execução se validação falhar
    }

    // Ativa o estado de loading para mostrar ao usuário que está processando
    setLoading(true);

    // Define o endpoint da API baseado no tipo de usuário
    const endpoint =
      tipo === "cliente"
        ? "/api/clientes/login"     // Endpoint para login de cliente
        : "/api/massoterapeuta/login"; // Endpoint para login de massoterapeuta

    try {
      // Faz requisição POST para o backend com as credenciais
  const resp = await fetch(import.meta.env.VITE_API_BASE_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define que está enviando JSON
        body: JSON.stringify({ email, senha }), // Converte dados para JSON
      });

      // Converte a resposta para JSON
      const data = await resp.json();

      // Verifica se a requisição foi bem-sucedida
      if (resp.ok) {
        // Extrai o token da resposta (pode estar em data.token ou data.usuario.token)
        const token = data.token || data.usuario?.token;
        
        // Valida se o token é válido
        if (!token || token === "undefined") {
          alert("Token inválido recebido do backend.");
          return;
        }
        
        // Salva o token no localStorage para persistência
        localStorage.setItem("token", token);
        
        // Mostra mensagem de sucesso
        alert("Login realizado com sucesso!");
        
        // Chama a função de login passada como prop para atualizar o estado global
        login({ tipo, usuario: data.usuario, token });
      } else {
        // Se houve erro, mostra a mensagem de erro do backend ou uma padrão
        alert(data.erro || "Email ou senha inválidos.");
      }
    } catch (err) {
      // Captura erros de rede ou outros erros inesperados
      console.error(err);
      alert("Erro ao tentar logar. Verifique sua conexão.");
    } finally {
      // Sempre desativa o loading, independente de sucesso ou erro
      setLoading(false);
    }
  };

  // Renderização do componente de login
  return (
    <div className="form-container">
      {/* Formulário de login com handler de submissão */}
      <form onSubmit={handleSubmit}>
        {/* Título do formulário */}
        <h2>Login</h2>

        {/* Seletor do tipo de usuário */}
        <label>
          Tipo de usuário:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="cliente">Cliente</option>
            <option value="massoterapeuta">Massoterapeuta</option>
          </select>
        </label>

        {/* Campo de entrada para email */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza estado a cada digitação
            placeholder="Email"
            required
          />
        </label>

        {/* Campo de entrada para senha com botão de mostrar/ocultar */}
        <label style={{ position: 'relative', display: 'block' }}>
          Senha:
          <div style={{ position: 'relative' }}>
            {/* Input de senha que muda o tipo baseado no estado mostrarSenha */}
            <input
              type={mostrarSenha ? "text" : "password"} // Alterna entre text e password
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza estado a cada digitação
              placeholder="Senha"
              required
              style={{ 
                paddingRight: '38px', 
                width: '100%', 
                borderRadius: '8px', 
                border: '1px solid #ccc', 
                fontSize: '1rem', 
                boxSizing: 'border-box', 
                outline: 'none', 
                transition: 'border-color 0.2s' 
              }}
              // Efeitos visuais de foco para melhor UX
              onFocus={e => e.target.style.borderColor = '#1976d2'}
              onBlur={e => e.target.style.borderColor = '#ccc'}
            />
            {/* Botão para mostrar/ocultar senha */}
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)} // Inverte o estado atual
              style={{ 
                position: 'absolute', 
                right: 8, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                fontSize: 18, 
                color: '#888', 
                padding: 0 
              }}
              tabIndex={-1} // Remove do tab order
              aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'} // Acessibilidade
            >
              {/* Ícones para mostrar/ocultar senha */}
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </label>
        
        {/* Link para recuperação de senha */}
        <a
          href="#"
          className="forgot-password"
          onClick={e => { 
            e.preventDefault(); // Previne navegação padrão do link
            abrirRecuperarSenha(); // Chama função para abrir recuperação
          }}
        >
          Esqueceu a senha?
        </a>
        
        {/* Botão de submissão do formulário */}
        <button type="submit" disabled={loading}>
          {/* Texto dinâmico baseado no estado de loading */}
          {loading ? "Entrando..." : "Entrar"}
        </button>
        
        {/* Seção para criar nova conta */}
        <div style={{ marginTop: "18px", textAlign: "center" }}>
          <span>Não tem uma conta?</span>
          {/* Botão para abrir formulário de cadastro */}
          <button
            type="button"
            className="criar-conta-btn"
            onClick={abrirCadastro} // Chama função para abrir cadastro
            style={{ marginLeft: "8px" }}
          >
            Crie a sua conta
          </button>
        </div>
      </form>
    </div>
  );
}

// Exportação do componente para uso em outros arquivos
export default LoginForm;