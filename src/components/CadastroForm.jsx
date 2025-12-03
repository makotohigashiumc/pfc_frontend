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

import React, { useState } from "react";

function CadastroForm({ voltarLogin }) {

  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // -------------------------------
  // Estados para os campos do cliente
  // Cada campo do formulário tem seu próprio estado
  // -------------------------------
  const [nome, setNome] = useState("");                    
  const [telefone, setTelefone] = useState("");           
  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setTelefone(value);
  };
  const [sexo, setSexo] = useState("");                   
  const [dataNascimento, setDataNascimento] = useState(""); 
  const [email, setEmail] = useState("");                 
  // Força email para minúsculo ao digitar
  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
  const [senha, setSenha] = useState("");                
  const [loading, setLoading] = useState(false);           
  const [sucessoCadastro, setSucessoCadastro] = useState(false); 
  // -------------------------------
  // Função para submeter cadastro
  // Processa o formulário e envia dados para o backend
  // -------------------------------
  const handleSubmit = async (e) => {

    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{7,}$/.test(senha);
    if (!senhaForte) {
      alert("A senha deve ter no mínimo 7 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
      return;
    }
    e.preventDefault();

    if (!["Masculino", "Feminino"].includes(sexo)) {
      alert("Selecione um sexo válido: Masculino ou Feminino.");
      return; 
    }

    setLoading(true);

    try {
   
  const resp = await fetch(import.meta.env.VITE_API_BASE_URL + "/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          nome,
          telefone,
          sexo,
          data_nascimento: dataNascimento, 
          email,
          senha,
        }),
      });

      if (resp.ok) {

        setNome("");
        setTelefone("");
        setSexo("");
        setDataNascimento("");
        setEmail("");
        setSenha("");
        setSucessoCadastro(true); 
      } else {
  
        let errMsg;
        try {
      
          const errJson = await resp.json();
          errMsg = errJson.erro || errJson.message || JSON.stringify(errJson);
        } catch {
     
          errMsg = await resp.text();
        }
        alert(errMsg); 
      }
    } catch (err) {
    
      console.error("Erro no cadastro:", err);
      alert("Erro ao tentar cadastrar. Verifique sua conexão.");
    } finally {
    
      setLoading(false);
    }
  };

  // -------------------------------
  // Renderização do formulário
  // Interface de usuário para cadastro de clientes
  // -------------------------------
  return (
    <div className="form-container">
      {sucessoCadastro && <ModalSucesso onClose={() => setSucessoCadastro(false)} />}
      <form onSubmit={handleSubmit} className="cadastro-form">

        <h2>Cadastro de Cliente</h2>

        <label>
          Nome:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Nome completo"
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="tel" 
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(xx) xxxxx-xxxx"
            required
            maxLength={11}
          />
        </label>

        <label>
          Sexo:
          <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
            <option value="">Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </label>


        <label>
          Data de Nascimento:
          <input
            type="date" 
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email" 
            value={email}
            onChange={handleEmailChange}
            placeholder="seuemail@exemplo.com"
            required
          />
        </label>


        <label style={{ position: 'relative', display: 'block' }}>
          Senha:
          <div style={{ position: 'relative' }}>
          
            <input
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
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
   
        <div style={{ color: '#ff9800', fontSize: '0.92rem', marginTop: '0.2rem', marginBottom: '0.7rem', textAlign: 'left', fontWeight: 500 }}>
          A senha deve ter no mínimo 7 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
        </div>
     
 
        <button type="submit" disabled={loading}>
     
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

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

export default CadastroForm;