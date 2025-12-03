  // Modal de sucesso
  const ModalSucesso = ({ onClose }) => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#fff',
        padding: '32px 24px',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
        textAlign: 'center',
        minWidth: '320px',
        maxWidth: '90vw',
        position: 'relative'
      }}>
        <h3 style={{ color: '#00796b', marginBottom: '16px' }}>Cadastro realizado!</h3>
        <p style={{ marginBottom: '24px', color: '#333', fontSize: '1.1em' }}>
          Por favor, confirme seu e-mail antes de acessar o sistema.<br />
          Você receberá um e-mail para ativar sua conta.
        </p>
        <button onClick={onClose} style={{
          background: '#00796b',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 24px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1em'
        }}>Fechar</button>
      </div>
    </div>
  );
// CadastroForm.jsx
// Formulário exclusivo para CLIENTES se cadastrarem no sistema
// Não permite cadastro de massoterapeutas - eles são cadastrados separadamente

// Importação do React e hook useState
import React, { useState } from "react";

// Componente de formulário de cadastro para clientes
// Recebe como prop: voltarLogin (função para retornar à tela de login)
function CadastroForm({ voltarLogin }) {
  // Estado para controlar visibilidade da senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // -------------------------------
  // Estados para os campos do cliente
  // Cada campo do formulário tem seu próprio estado
  // -------------------------------
  const [nome, setNome] = useState("");                    // Nome completo do cliente
  const [telefone, setTelefone] = useState("");            // Telefone para contato
  // Validação para aceitar apenas números no campo telefone
  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
    setTelefone(value);
  };
  const [sexo, setSexo] = useState("");                    // Sexo: Masculino/Feminino/Outro
  const [dataNascimento, setDataNascimento] = useState(""); // Data de nascimento
  const [email, setEmail] = useState("");                  // Email para login e contato
  const [senha, setSenha] = useState("");                  // Senha para acesso
  const [senhaConfirm, setSenhaConfirm] = useState("");    // Confirmação de senha
  const [loading, setLoading] = useState(false);           // Evita duplo clique durante requisição
  const [sucessoCadastro, setSucessoCadastro] = useState(false); // Exibe mensagem de sucesso
  // -------------------------------
  // Função para submeter cadastro
  // Processa o formulário e envia dados para o backend
  // -------------------------------
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar página)
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (senha !== senhaConfirm) {
      alert("As senhas não coincidem. Por favor verifique.");
      return;
    }

    // Validação de senha forte no frontend
    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{7,}$/.test(senha);
    if (!senhaForte) {
      alert("A senha deve ter no mínimo 7 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
      return;
    }

    // Validação do campo sexo antes de enviar
    if (!["Masculino", "Feminino", "Outro"].includes(sexo)) {
      alert("Selecione um sexo válido: Masculino, Feminino ou Outro.");
      return; // Para execução se validação falhar
    }

    // Ativa estado de loading para feedback visual
    setLoading(true);

    try {
      // Faz requisição POST para cadastrar cliente no backend
  const resp = await fetch(import.meta.env.VITE_API_BASE_URL + "/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define que está enviando JSON
        body: JSON.stringify({
          nome,
          telefone,
          sexo,
          data_nascimento: dataNascimento, // Converte camelCase para snake_case
          email,
          senha,
        }),
      });

      // Verifica se cadastro foi bem-sucedido
      if (resp.ok) {
        // Limpa todos os campos após cadastro bem-sucedido
        setNome("");
        setTelefone("");
        setSexo("");
        setDataNascimento("");
        setEmail("");
          setSenha("");
          setSenhaConfirm("");
        setSucessoCadastro(true); // Exibe mensagem de sucesso
      } else {
        // Trata erros retornados pelo backend
        let errMsg;
        try {
          // Tenta extrair mensagem de erro do JSON
          const errJson = await resp.json();
          errMsg = errJson.erro || errJson.message || JSON.stringify(errJson);
        } catch {
          // Se não conseguir parsear JSON, pega texto da resposta
          errMsg = await resp.text();
        }
        alert(errMsg); // Mostra erro ao usuário
      }
    } catch (err) {
      // Captura erros de rede ou outros erros inesperados
      console.error("Erro no cadastro:", err);
      alert("Erro ao tentar cadastrar. Verifique sua conexão.");
    } finally {
      // Sempre desativa loading, independente de sucesso ou erro
      setLoading(false);
    }
  };

  // -------------------------------
  // Renderização do formulário
  // Interface de usuário para cadastro de clientes
  // -------------------------------
  return (
    <div className="form-container">
      {/* Formulário principal com handler de submissão */}
      {sucessoCadastro && <ModalSucesso onClose={() => setSucessoCadastro(false)} />}
      <form onSubmit={handleSubmit} className="cadastro-form">
        {/* Título do formulário */}
        <h2>Cadastro de Cliente</h2>

        {/* Campo para nome completo */}
        <label>
          Nome:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)} // Atualiza estado a cada digitação
            placeholder="Nome completo"
            required // Campo obrigatório
          />
        </label>

        {/* Campo para telefone */}
        <label>
          Telefone:
          <input
            type="tel" // Tipo específico para telefone
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(xx) xxxxx-xxxx"
            required
            maxLength={11}
          />
        </label>

        {/* Seletor de sexo */}
        <label>
          Sexo:
          <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
            <option value="">Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </label>

        {/* Campo para data de nascimento */}
        <label>
          Data de Nascimento:
          <input
            type="date" // Input nativo de data do HTML5
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </label>

        {/* Campo para email */}
        <label>
          Email:
          <input
            type="email" // Validação nativa de email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            required
          />
        </label>

        {/* Campo de senha com botão de mostrar/ocultar */}

        <label style={{ position: 'relative', display: 'block' }}>
          Senha:
          <div style={{ position: 'relative' }}>
            {/* Input de senha que alterna entre texto e password */}
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              minLength={7} // Mínimo de 7 caracteres
              required
              style={{
                paddingRight: '38px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              // Efeitos visuais de foco
              onFocus={e => e.target.style.borderColor = '#1976d2'}
              onBlur={e => e.target.style.borderColor = '#ccc'}
            />
            {/* Botão para alternar visibilidade da senha */}
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)} // Inverte estado atual
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
              aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
            >
              {/* Ícones de olho para mostrar/ocultar */}
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </label>
        {/* Campo de confirmação de senha */}
        <label style={{ position: 'relative', display: 'block', marginTop: 8 }}>
          Confirmar Senha:
          <div style={{ position: 'relative' }}>
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senhaConfirm}
              onChange={(e) => setSenhaConfirm(e.target.value)}
              placeholder="Repita sua senha"
              minLength={7}
              required
              style={{
                paddingRight: '38px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#1976d2'}
              onBlur={e => e.target.style.borderColor = '#ccc'}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)}
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
              tabIndex={-1}
              aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </label>

        {/* Aviso de requisitos de senha abaixo do campo, visual mais discreto */}
        <div style={{ color: '#ff9800', fontSize: '0.92rem', marginTop: '0.2rem', marginBottom: '0.7rem', textAlign: 'left', fontWeight: 500 }}>
          A senha deve ter no mínimo 7 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
        </div>
     
        {/* Botão de submissão */}
        <button type="submit" disabled={loading}>
          {/* Texto dinâmico baseado no estado de loading */}
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {/* Link para voltar ao login (estilizado) */}
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <span style={{ color: '#666', fontSize: '0.95rem' }}>Já tem conta?</span>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); voltarLogin(); }}
            style={{ marginLeft: 10 }}
          >
            Entrar
          </button>
        </div>
        
      </form>
    </div>
  );
}
// Exportação do componente
export default CadastroForm;
