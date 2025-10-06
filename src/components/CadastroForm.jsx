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
  const [sexo, setSexo] = useState("");                    // Sexo: Masculino/Feminino/Outro
  const [dataNascimento, setDataNascimento] = useState(""); // Data de nascimento
  const [email, setEmail] = useState("");                  // Email para login e contato
  const [senha, setSenha] = useState("");                  // Senha para acesso
  const [loading, setLoading] = useState(false);           // Evita duplo clique durante requisição
  // -------------------------------
  // Função para submeter cadastro
  // Processa o formulário e envia dados para o backend
  // -------------------------------
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão do formulário (recarregar página)
    e.preventDefault();

    // Validação do campo sexo antes de enviar
    if (!["Masculino", "Feminino", "Outro"].includes(sexo)) {
      alert("Selecione um sexo válido: Masculino, Feminino ou Outro.");
      return; // Para execução se validação falhar
    }

    // Ativa estado de loading para feedback visual
    setLoading(true);

    try {
      // Faz requisição POST para cadastrar cliente no backend
      const resp = await fetch("http://localhost:5000/api/clientes", {
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
        // Não volta para tela de login automaticamente - usuário deve confirmar email
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
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(xx) xxxxx-xxxx"
            required
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
              minLength={6} // Mínimo de 6 caracteres
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

        {/* Botão de submissão */}
        <button type="submit" disabled={loading}>
          {/* Texto dinâmico baseado no estado de loading */}
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {/* Link para voltar ao login */}
        <p>
          Já tem conta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Previne navegação padrão
              voltarLogin(); // Chama função para voltar ao login
            }}
          >
            Login
          </a>
        </p>
        
        {/* Aviso sobre confirmação de email */}
        <div style={{ marginTop: "2rem", color: "#0077b6", fontWeight: "bold" }}>
          Após o cadastro, você receberá um e-mail para confirmar sua conta antes de acessar o sistema.
        </div>
      </form>
    </div>
  );
}

// Exportação do componente
export default CadastroForm;
