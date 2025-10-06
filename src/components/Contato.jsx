// Importação do React
import React from "react";

// Componente de página de contato
// Exibe informações de contato, formulário e detalhes da clínica
function Contato() {
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
          {/* Formulário para envio de mensagens (atualmente apenas front-end) */}
          <form className="formulario-contato">
            {/* Campo Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" name="nome" required />
            </div>
            
            {/* Campo Email */}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            {/* Campo Telefone (opcional) */}
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" />
            </div>
            
            {/* Seletor de Assunto */}
            <div className="form-group">
              <label htmlFor="assunto">Assunto</label>
              <select id="assunto" name="assunto" required>
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
                required
              ></textarea>
            </div>
            
            {/* Botão de envio */}
            <button type="submit" className="btn-enviar">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      {/* Seção do mapa de localização */}
      <div className="contato-mapa">
        <h2>Nossa Localização</h2>
        {/* Placeholder para mapa (pode ser integrado com Google Maps posteriormente) */}
        <div className="mapa-placeholder">
          <p>🗺️ Mapa da localização da clínica</p>
          <p>Estamos localizados em uma região de fácil acesso, com estacionamento disponível.</p>
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
