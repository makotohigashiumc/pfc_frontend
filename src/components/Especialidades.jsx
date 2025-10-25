import React from "react";

function Especialidades() {
  const especialidades = [
    {
      nome: "Quiropraxía",
      descricao: "Técnica de manipulação da coluna vertebral para correção de problemas posturais e alívio de dores.",
      icone: "🦴",
      beneficios: ["Corrige postura", "Alinha coluna", "Reduz dores nas costas"]
    },
    {
      nome: "Ventosaterapia",
      descricao: "Terapia com ventosas que estimula a circulação sanguínea e promove a desintoxicação do organismo.",
      icone: "🔵",
      beneficios: ["Melhora circulação", "Desintoxica", "Relaxa músculos"]
    },
    {
      nome: "Acupuntura",
      descricao: "Técnica milenar chinesa que utiliza agulhas para equilibrar a energia do corpo e tratar diversos problemas.",
      icone: "📍",
      beneficios: ["Equilibra energia", "Trata dores", "Melhora bem-estar"]
    },
    {
      nome: "Shiatsu",
      descricao: "Massagem japonesa que utiliza pressão com os dedos para estimular pontos específicos do corpo.",
      icone: "👐",
      beneficios: ["Estimula pontos", "Relaxa músculos", "Melhora energia"]
    },
    {
      nome: "Moxaterapia",
      descricao: "Técnica da medicina tradicional chinesa que utiliza calor para estimular pontos de acupuntura.",
      icone: "�",
      beneficios: ["Estimula pontos", "Aquece organismo", "Fortalece energia"]
    }
  ];

  // Renderização do componente
  return (
    <div className="especialidades-container">
      {/* Cabeçalho da página com título e descrição */}
      <div className="especialidades-header">
        <h1>Nossas Especialidades</h1>
        <p>Conheça os tratamentos oferecidos pela HM Massoterapia</p>
      </div>
      
      {/* Grid responsivo com cards das especialidades */}
      <div className="especialidades-grid">
        {/* Mapeia o array de especialidades para criar cards dinâmicos */}
        {especialidades.map((esp, index) => (
          <div key={index} className="especialidade-card">
            {/* Ícone visual da especialidade */}
            <div className="especialidade-icone">{esp.icone}</div>
            
            {/* Nome da especialidade */}
            <h3>{esp.nome}</h3>
            
            {/* Descrição detalhada da especialidade */}
            <p className="especialidade-descricao">{esp.descricao}</p>
            
            {/* Lista de benefícios da especialidade */}
            <div className="beneficios-lista">
              <h4>Benefícios:</h4>
              <ul>
                {/* Mapeia os benefícios para criar lista dinâmica */}
                {esp.beneficios.map((beneficio, idx) => (
                  <li key={idx}>✓ {beneficio}</li>
                ))}
              </ul>
            </div>
            
            {/* Botão para agendar consulta específica */}
            <button 
              className="btn-agendar"
              onClick={() => window.dispatchEvent(new CustomEvent("mostrarSecao", { detail: "login" }))}
            >
              Agendar Consulta
            </button>
          </div>
        ))}
      </div>
      
      {/* Seção final de call-to-action */}
      <div className="especialidades-cta">
        {/* Título motivacional */}
        <h2>Pronto para começar seu tratamento?</h2>
        
        {/* Texto explicativo sobre o atendimento */}
        <p>Nossa equipe está preparada para oferecer o melhor atendimento personalizado para suas necessidades.</p>
        
        {/* Botão principal de call-to-action */}
        <button 
          className="btn-primary-large"
          onClick={() => window.dispatchEvent(new CustomEvent("mostrarSecao", { detail: "login" }))}
        >
          Agende Sua Consulta
        </button>
      </div>
    </div>
  );
}

// Exportação do componente
export default Especialidades;
