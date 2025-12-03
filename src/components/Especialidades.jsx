import React from "react";

function Especialidades() {
  // Handler reutilizável: se cliente logado -> agendamentos, senão -> login
  const handleAgendarClick = () => {
    try {
      const usuarioSalvo = localStorage.getItem("usuario");
      const usuarioObj = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
      if (usuarioObj && usuarioObj.tipo === "cliente") {
        window.dispatchEvent(new CustomEvent("mostrarSecao", { detail: "agendamentos" }));
      } else {
        window.dispatchEvent(new CustomEvent("mostrarSecao", { detail: "login" }));
      }
    } catch (err) {
      window.dispatchEvent(new CustomEvent("mostrarSecao", { detail: "login" }));
    }
  };
  const especialidades = [
    {
      nome: "Quiropraxia",
      descricao: "Técnica de manipulação da coluna vertebral para correção de problemas posturais e alívio de dores.",
      icone: "🦴",
      beneficios: ["Equilíbrio e harmonização articular", "Alinha a coluna", "Elimina dores nas costas"]
    },
    {
      nome: "Ventosaterapia",
      descricao: "Terapia com ventosas que estimula a circulação sanguínea e promove a desintoxicação ao longo da musculatura.",
      icone: "🔵",
      beneficios: ["Melhora a circulação", "Desintoxica", "Relaxa os músculos"]
    },
    {
      nome: "Acupuntura",
      descricao: "Técnica milenar chinesa que utiliza agulhas para equilibrar a energia do corpo e tratar diversos problemas.",
      icone: "📍",
      beneficios: ["Equilibra a energia vital", "Trata dores", "Melhora a circulação"]
    },
    {
      nome: "Shiatsu",
      descricao: "Massagem japonesa que utiliza pressão com os dedos para estimular pontos específicos do corpo.",
      icone: "👐",
      beneficios: ["Estimula pontos frágeis de tensão", "Relaxa os músculos", "Melhora o alinhamento de fibras musculares"]
    },
    {
      nome: "Moxaterapia",
      descricao: "Técnica da medicina tradicional chinesa que utiliza o calor para estimular pontos de tensão e energia.",
      icone: "🔥",
      beneficios: ["Estimula pontos nevrálgicos", "Aquece pontos na inércia", "Fortalece o Qi de pontos específicos "]
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
              onClick={handleAgendarClick}
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
          onClick={handleAgendarClick}
        >
          Agende Sua Consulta
        </button>
      </div>
    </div>
  );
}

// Exportação do componente
export default Especialidades;
