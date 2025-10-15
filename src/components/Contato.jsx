// Importação do React
import React, { useState } from "react";
import { enviarMensagemContato } from "../services/Api";
import "./PaginaInicial.css"; // Importa estilos CSS

// Componente de página de contato
// Exibe informações de contato, formulário e detalhes da clínica
function Contato() {
  // ===== ESTADOS DO FORMULÁRIO =====
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" ou "error"

  // ===== FUNÇÃO PARA ATUALIZAR CAMPOS =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ===== FUNÇÃO PARA ENVIAR FORMULÁRIO =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Validação básica no front-end
      if (!formData.nome.trim() || !formData.email.trim() || 
          !formData.assunto.trim() || !formData.mensagem.trim()) {
        throw new Error("Por favor, preencha todos os campos obrigatórios.");
      }

      // Envia dados para a API
      const response = await enviarMensagemContato(formData);
      
      // Sucesso
      setMessage(response.mensagem);
      setMessageType("success");
      
      // Limpa o formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: ""
      });

    } catch (error) {
      // Erro
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="contato-container">
      {/* Cabeçalho da página de contato */}
      <div className="contato-header">
        <h1>Entre em Contato</h1>
        <p>Estamos aqui para esclarecer suas dúvidas e ajudar no que precisar</p>
      </div>

      {/* Conteúdo principal dividido em informações e formulário */}
      <div className="contato-content">
        {/* Seção com informações de contato */}
        <div className="contato-info">
          <h2>Fale Conosco</h2>
          <p>Nossa equipe está sempre disponível para oferecer suporte, esclarecer dúvidas sobre tratamentos ou ajudar com agendamentos.</p>
          
          {/* Item de contato: E-mail */}
          <div className="contato-item">
            <div className="contato-icone">📧</div>
            <div className="contato-detalhes">
              <h3>E-mail</h3>
              {/* Link clicável que abre cliente de email */}
              <a href="mailto:hmmassoterapia7@gmail.com">hmmassoterapia7@gmail.com</a>
              <p>Resposta em até 24 horas</p>
            </div>
          </div>

          {/* Item de contato: Telefone */}
          <div className="contato-item">
            <div className="contato-icone">📞</div>
            <div className="contato-detalhes">
              <h3>Telefone</h3>
              {/* Link clicável que abre discador do telefone */}
              <a href="tel:+5511999430693">(11) 99943-0693</a>
              <p>Seg à Sex: 8h às 18h</p>
            </div>
          </div>

          {/* Item de contato: Endereço físico */}
          <div className="contato-item">
            <div className="contato-icone">📍</div>
            <div className="contato-detalhes">
              <h3>Endereço</h3>
              <p>Rua dos Ipês, 66<br />Arujá, SP<br />CEP: 07429-815</p>
            </div>
          </div>

          {/* Item de contato: Redes sociais */}
          <div className="contato-item">
            <div className="contato-icone">📸</div>
            <div className="contato-detalhes">
              <h3>Redes Sociais</h3>
              {/* Link para Instagram (target="_blank" abre em nova aba) */}
              <a href="" target="_blank" rel="noopener noreferrer">
                @hmmassoterapia
              </a>
              <p>Acompanhe nossas dicas de bem-estar</p>
            </div>
          </div>
        </div>

        {/* Seção do formulário de contato */}
        <div className="contato-formulario">
          <h2>Envie uma Mensagem</h2>
          
          {/* Mensagem de feedback */}
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
          
          {/* Formulário para envio de mensagens */}
          <form className="formulario-contato" onSubmit={handleSubmit}>
            {/* Campo Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                name="nome" 
                value={formData.nome}
                onChange={handleChange}
                required 
                disabled={isLoading}
              />
            </div>
            
            {/* Campo Email */}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                disabled={isLoading}
              />
            </div>
            
            {/* Campo Telefone (opcional) */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input 
                type="tel" 
                id="telefone" 
                name="telefone" 
                value={formData.telefone}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            
            {/* Seletor de Assunto */}
            <div className="form-group">
              <label htmlFor="assunto">Assunto</label>
              <select 
                id="assunto" 
                name="assunto" 
                value={formData.assunto}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="">Selecione um assunto</option>
                <option value="agendamento">Dúvidas sobre Agendamento</option>
                <option value="tratamentos">Informações sobre Tratamentos</option>
                <option value="valores">Consulta de Valores</option>
                <option value="suporte">Suporte Técnico</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            
            {/* Campo de Mensagem */}
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                rows="5" 
                placeholder="Descreva sua dúvida ou solicitação..."
                value={formData.mensagem}
                onChange={handleChange}
                required
                disabled={isLoading}
              ></textarea>
            </div>
            
            {/* Botão de envio */}
            <button 
              type="submit" 
              className="btn-enviar"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>

      {/* Seção de horários de funcionamento */}
      <div className="contato-horarios">
        <h2>Horários de Funcionamento</h2>
        {/* Grid com horários organizados */}
        <div className="horarios-grid">
          {/* Horário de segunda a quinta */}
          <div className="horario-item">
            <span className="dia">Segunda à Quinta</span>
            <span className="hora">8h30 às 18h30</span>
          </div>
          
          {/* Horário de sexta */}
          <div className="horario-item">
            <span className="dia">Sexta</span>
            <span className="hora">Fechado</span>
          </div>
          
          {/* Horário de final de semana */}
          <div className="horario-item">
            <span className="dia">Sábado e Domingo</span>
            <span className="hora">Fechado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportação do componente
export default Contato;
