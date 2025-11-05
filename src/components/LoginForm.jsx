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
  const [errorMessage, setErrorMessage] = useState("");
  // Modal visível para erros de login (backend / rede / não confirmado)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Função que trata o envio do formulário de login
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    e.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!email || !senha) {
      setErrorMessage("Preencha email e senha.");
      return; // Para a execução se validação falhar
    }

    // Ativa o estado de loading para mostrar ao usuário que está processando
    setLoading(true);

    // Define o endpoint da API baseado no tipo de usuário
    const endpoint =
      tipo === "cliente"
  ? "/clientes/login"     // Endpoint para login de cliente
  : "/massoterapeuta/login"; // Endpoint para login de massoterapeuta

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
          setErrorMessage("Token inválido recebido do backend.");
          return;
        }
        
        // Salva o token no localStorage para persistência
        localStorage.setItem("token", token);

        // Limpa possível mensagem de erro anterior
        setErrorMessage("");

        // Chama a função de login passada como prop para atualizar o estado global
        login({ tipo, usuario: data.usuario, token });
      } else {
        // Se houve erro de backend, mostrar modal com a mensagem (ex: email não confirmado, credenciais inválidas)
        const msg = data.erro || "Email ou senha inválidos.";
        setModalTitle("Erro ao efetuar o login");
        setModalMessage(msg);
        setModalVisible(true);
        // também preencher a caixa de erro pequena para retrocompatibilidade
        setErrorMessage(msg);
      }
    } catch (err) {
      // Captura erros de rede ou outros erros inesperados
      console.error(err);
      const msg = "Erro ao tentar logar. Verifique sua conexão.";
      setModalTitle("Erro de conexão");
      setModalMessage(msg);
      setModalVisible(true);
      setErrorMessage(msg);
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

        {/* Mensagem de erro pequena, aparece quando a requisição ou validação falham */}
        {errorMessage && (
          <div style={{
            backgroundColor: '#fdecea',
            color: '#b71c1c',
            padding: '10px 12px',
            borderRadius: '6px',
            marginBottom: '12px',
            border: '1px solid #f5c6cb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }} role="alert">
            <span>{errorMessage}</span>
            <button type="button" onClick={() => setErrorMessage("")} style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#b71c1c',
              fontWeight: 'bold'
            }}>X</button>
          </div>
        )}

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

      {/* Modal centralizado (estilo similar ao modal de sucesso do cadastro) */}
      {modalVisible && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setModalVisible(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '420px',
              maxWidth: '100%',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 6px 22px rgba(0,0,0,0.25)',
              padding: '22px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginTop: 0, color: '#0b6b8a' }}>{modalTitle || 'Aviso'}</h3>
            <p style={{ color: '#333', lineHeight: 1.4 }}>{modalMessage}</p>
            <div style={{ marginTop: 18 }}>
              <button
                onClick={() => setModalVisible(false)}
                style={{
                  background: '#0b6b8a',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exportação do componente para uso em outros arquivos
export default LoginForm;