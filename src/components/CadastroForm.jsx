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
  // Modal para exibir Termos de Uso específicos para agendamento de massoterapia
  const ModalTermos = ({ onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 10, width: 'min(900px, 96vw)', maxHeight: '84vh', overflow: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>Termos de Uso</h3>
        <div style={{ color: '#333', lineHeight: 1.5 }}>
          <p><strong>1. Objeto</strong><br/>Estes Termos regulam o uso do site e da Plataforma de agendamento de massoterapia ("Plataforma"), que permite o agendamento, reagendamento e cancelamento de sessões com profissionais cadastrados.</p>
          <p><strong>2. Cadastro e veracidade</strong><br/>O Usuário concorda em fornecer informações verdadeiras e atualizadas. A conta é pessoal e intransferível. O Usuário é responsável por manter a confidencialidade de suas credenciais.</p>
          <p><strong>3. Agendamentos</strong><br/>Ao agendar, o Usuário assume a responsabilidade de fornecer informações relevantes (como contraindicações e condições de saúde). O horário reservado depende da disponibilidade do profissional.</p>
          <p><strong>4. Cancelamento e reagendamento</strong><br/>Políticas de cancelamento são definidas pelo profissional ou estabelecimento e são apresentadas no fluxo de agendamento. Podem existir prazos para cancelamento sem custo e taxas para cancelamentos tardios.</p>
          <p><strong>5. Pagamentos</strong><br/>Quando aplicável, o preço dos serviços e as condições de pagamento serão informados no momento da reserva. O processamento de pagamento pode ser realizado por terceiros; consulte os termos do provedor de pagamento.</p>
          <p><strong>6. Responsabilidade</strong><br/>A Plataforma atua como intermediária. Não nos responsabilizamos por condutas dos profissionais, diagnósticos, tratamentos ou resultados das sessões. O Usuário deve seguir orientações médicas quando necessário.</p>
          <p><strong>7. Conduta</strong><br/>É proibido o uso da Plataforma para fins ilegais, assédio ou condutas que coloquem em risco outras pessoas. Violações podem resultar em suspensão ou cancelamento de conta.</p>
          <p><strong>8. Propriedade intelectual</strong><br/>O conteúdo da Plataforma é protegido por direitos autorais. Não é permitida reprodução sem autorização.</p>
          <p><strong>9. Alterações</strong><br/>Podemos alterar estes Termos. Mudanças relevantes serão notificadas e o uso continuado da Plataforma constituirá aceitação.</p>
          <p><strong>10. Lei aplicável</strong><br/>Estes Termos são regidos pela legislação brasileira; o foro aplicável será o definido para resolução de disputas.</p>
          <p style={{ marginTop: 12 }}><em>Marque a caixa "Aceito os Termos de Uso" para prosseguir com o cadastro.</em></p>
        </div>
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <button onClick={onClose} style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 6 }}>Fechar</button>
        </div>
      </div>
    </div>
  );

  // Modal para exibir Política de Privacidade específica para a Plataforma
  const ModalPolitica = ({ onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 10, width: 'min(900px, 96vw)', maxHeight: '84vh', overflow: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>Política de Privacidade</h3>
        <div style={{ color: '#333', lineHeight: 1.5 }}>
          <p><strong>1. Dados coletados</strong><br/>Coletamos dados fornecidos pelo Usuário (nome, e-mail, telefone, data de nascimento, informações de saúde relevantes), bem como dados técnicos (IP, dispositivo, dados de uso) para operação da Plataforma.</p>
          <p><strong>2. Finalidades</strong><br/>Os dados são usados para: viabilizar agendamentos; enviar confirmações e lembretes; melhorar a Plataforma; cumprir obrigações legais.</p>
          <p><strong>3. Compartilhamento</strong><br/>Compartilhamos informações necessárias com profissionais e estabelecimentos para execução do serviço. Também podemos compartilhar com provedores de pagamento e serviços terceirizados que operam a Plataforma, sempre com contratos que exigem proteção dos dados.</p>
          <p><strong>4. Segurança</strong><br/>Adotamos medidas técnicas e administrativas para proteger os dados. Contudo, nenhuma transmissão pela Internet é totalmente segura.</p>
          <p><strong>5. Retenção</strong><br/>Reteremos dados enquanto necessários para as finalidades descritas, observando prazos legais. Quando não mais necessários, os dados serão eliminados ou anonimizados.</p>
          <p><strong>6. Direitos</strong><br/>O Usuário pode solicitar acesso, correção, exclusão, limitação ao tratamento, portabilidade dos dados e retirar consentimento, quando aplicável. Solicitações devem ser feitas via contato disponível na Plataforma.</p>
          <p><strong>7. Cookies</strong><br/>Utilizamos cookies para melhorar a experiência e coletar estatísticas de uso. É possível controlar cookies pelo navegador.</p>
          <p style={{ marginTop: 12 }}><em>Ao marcar "Aceito a Política de Privacidade" você concorda com o tratamento de dados conforme descrito.</em></p>
        </div>
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <button onClick={onClose} style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 6 }}>Fechar</button>
        </div>
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
  const [termosChecked, setTermosChecked] = useState(false); // Checkbox termos de uso
  const [politicaChecked, setPoliticaChecked] = useState(false); // Checkbox política de privacidade
  const [showModalTermos, setShowModalTermos] = useState(false);
  const [showModalPolitica, setShowModalPolitica] = useState(false);
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

    // Verifica se o usuário aceitou os Termos e a Política
    if (!termosChecked || !politicaChecked) {
      alert("Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar.");
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
          setTermosChecked(false);
          setPoliticaChecked(false);
          setShowModalPolitica(false);
          setShowModalTermos(false);
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
      {showModalTermos && <ModalTermos onClose={() => setShowModalTermos(false)} />}
      {showModalPolitica && <ModalPolitica onClose={() => setShowModalPolitica(false)} />}
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
        {/* Checkboxes para Termos e Política */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8, marginBottom: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={termosChecked} onChange={(e) => setTermosChecked(e.target.checked)} />
            <span style={{ fontSize: '0.95rem' }}>
              Aceito os
              <button type="button" onClick={(e) => { e.preventDefault(); setShowModalTermos(true); }} style={{ background: 'none', border: 'none', color: '#1976d2', marginLeft: 6, cursor: 'pointer' }}>Termos de Uso</button>
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={politicaChecked} onChange={(e) => setPoliticaChecked(e.target.checked)} />
            <span style={{ fontSize: '0.95rem' }}>
              Aceito a
              <button type="button" onClick={(e) => { e.preventDefault(); setShowModalPolitica(true); }} style={{ background: 'none', border: 'none', color: '#1976d2', marginLeft: 6, cursor: 'pointer' }}>Política de Privacidade</button>
            </span>
          </label>
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
