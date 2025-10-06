// AgendamentosCliente.jsx
// Componente principal para gerenciamento de agendamentos do cliente
// Permite agendar novas consultas, visualizar agendamentos existentes e cancelar

// Importações necessárias
import React, { useState, useEffect, useCallback } from "react";
import DatePicker, { registerLocale } from "react-datepicker"; // Componente de seleção de data
import "react-datepicker/dist/react-datepicker.css"; // Estilos do DatePicker
import ptBR from "date-fns/locale/pt-BR"; // Localização em português

// Registra o locale português brasileiro para o DatePicker
registerLocale("pt-BR", ptBR);

// Componente principal para agendamentos do cliente
// Recebe como props: usuario (dados do cliente) e token (autenticação)
function AgendamentosCliente({ usuario, token }) {
  // Função que gera lista de horários disponíveis para o dia selecionado
  // Marca horários ocupados e horários que já passaram como indisponíveis
  const gerarHorariosDiaSelecionado = () => {
    // Se não há data selecionada, retorna lista vazia
    if (!dataHora) return [];
    
    const horarios = [];
    const base = new Date(dataHora); // Data base selecionada pelo usuário
    base.setHours(8, 30, 0, 0); // Define horário inicial (8:30)
    
    const agora = new Date(); // Horário atual do sistema
    const tempoMinimo = new Date(agora.getTime() + 30 * 60000); // 30 min de antecedência mínima
    
    // Gera horários de 8:30 às 18:30 com intervalos específicos
    for (let h = 8; h <= 18; h++) {
      if (h === 8) {
        // Para as 8h, só disponibiliza 8:30
        const horario = new Date(base);
        horario.setHours(8, 30, 0, 0);
        
        // Verifica se este horário está ocupado consultando a lista de horários ocupados
        const ocupado = horariosOcupados.some((ho) =>
          ho.getFullYear() === horario.getFullYear() &&
          ho.getMonth() === horario.getMonth() &&
          ho.getDate() === horario.getDate() &&
          ho.getHours() === horario.getHours() &&
          ho.getMinutes() === horario.getMinutes()
        );
        
        // Verifica se é horário passado ou muito próximo (menos de 30 min)
        const horarioIndisponivel = horario < tempoMinimo;
        
        // Adiciona o horário à lista marcando se está ocupado ou indisponível
        horarios.push({ horario, ocupado: ocupado || horarioIndisponivel });
      } else {
        // Para outras horas (9h às 18h), gera horários de 30 em 30 minutos
        for (let m of [0, 30]) {
          if (h === 18 && m === 30) {
            // Inclui 18:30 como último horário do dia
            const horario = new Date(base);
            horario.setHours(18, 30, 0, 0);
            
            // Verifica ocupação
            const ocupado = horariosOcupados.some((ho) =>
              ho.getFullYear() === horario.getFullYear() &&
              ho.getMonth() === horario.getMonth() &&
              ho.getDate() === horario.getDate() &&
              ho.getHours() === horario.getHours() &&
              ho.getMinutes() === horario.getMinutes()
            );
            
            // Verifica disponibilidade temporal
            const horarioIndisponivel = horario < tempoMinimo;
            horarios.push({ horario, ocupado: ocupado || horarioIndisponivel });
            break; // Sai do loop após 18:30
          }
          
          // Para horários antes de 18:30
          if (h < 18 || (h === 18 && m === 0)) {
            const horario = new Date(base);
            horario.setHours(h, m, 0, 0);
            
            // Verifica ocupação
            const ocupado = horariosOcupados.some((ho) =>
              ho.getFullYear() === horario.getFullYear() &&
              ho.getMonth() === horario.getMonth() &&
              ho.getDate() === horario.getDate() &&
              ho.getHours() === horario.getHours() &&
              ho.getMinutes() === horario.getMinutes()
            );
            
            // Verifica disponibilidade temporal
            const horarioIndisponivel = horario < tempoMinimo;
            horarios.push({ horario, ocupado: ocupado || horarioIndisponivel });
          }
        }
      }
    }
    return horarios; // Retorna lista completa de horários com status
  };
  
  // Token de autenticação - prioriza prop, depois usuario.token, por último localStorage
  const authToken = token || usuario?.token || localStorage.getItem("token");
  
  // ================================
  // DECLARAÇÃO DOS ESTADOS
  // ================================
  const [dataHora, setDataHora] = useState(null);              // Data e hora selecionadas para agendamento
  const [historico, setHistorico] = useState([]);              // Lista de agendamentos do cliente
  const [massoterapeutas, setMassoterapeutas] = useState([]);  // Lista de massoterapeutas disponíveis
  const [massoterapeutaSelecionado, setMassoterapeutaSelecionado] = useState(""); // ID do massoterapeuta escolhido
  const [horariosOcupados, setHorariosOcupados] = useState([]); // Lista de horários já agendados (objetos Date)
  const [forceUpdate, setForceUpdate] = useState(0);           // Contador para forçar re-render dos horários
  const [horarioAtual, setHorarioAtual] = useState(new Date()); // Horário atual para verificações de disponibilidade
  const [sintomas, setSintomas] = useState("");               // Sintomas relatados pelo cliente
  
  // ================================
  // EFEITOS (useEffect)
  // ================================
  
  // Effect para atualizar horários e relógio em tempo real
  // Garante que horários passados sejam marcados como indisponíveis
  useEffect(() => {
    const interval = setInterval(() => {
      setHorarioAtual(new Date());      // Atualiza horário atual
      setForceUpdate(prev => prev + 1); // Força re-render dos componentes
    }, 60000); // Atualiza a cada 1 minuto
    
    // Cleanup: remove o interval quando componente é desmontado
    return () => clearInterval(interval);
  }, []);
  
  // Função para buscar horários ocupados do massoterapeuta selecionado
  // Usa useCallback para evitar re-renders desnecessários
  const fetchHorariosOcupados = useCallback(async (data) => {
    // Se não há massoterapeuta selecionado, limpa a lista
    if (!massoterapeutaSelecionado) return setHorariosOcupados([]);
    
    try {
      // Faz requisição para obter horários ocupados do massoterapeuta
      const resp = await fetch(`http://localhost:5000/api/massoterapeuta/horarios_ocupados/${massoterapeutaSelecionado}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
      if (resp.ok) {
        const data = await resp.json();
        
        // Converte strings de data/hora para objetos Date
        setHorariosOcupados(
          data.map((h) => {
            // h.data_hora formato: 'YYYY-MM-DD HH:mm:ss'
            const [datePart, timePart] = h.data_hora.split(' ');
            const [year, month, day] = datePart.split('-');
            const [hour, minute] = timePart.split(':');
            // Retorna objeto Date (month-1 porque Date usa índice base 0 para meses)
            return new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute));
          })
        );
      } else {
        // Em caso de erro, limpa a lista
        setHorariosOcupados([]);
      }
    } catch {
      // Em caso de erro de rede, limpa a lista
      setHorariosOcupados([]);
    }
  }, [massoterapeutaSelecionado, authToken]); // Dependências: recria quando estes valores mudam

  // Effect que atualiza horários ocupados quando massoterapeuta muda
  useEffect(() => {
    fetchHorariosOcupados();
  }, [massoterapeutaSelecionado, fetchHorariosOcupados]);

  // -------------------------------
  // Buscar histórico de agendamentos do cliente
  // -------------------------------
  useEffect(() => {
    if (!authToken) {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.reload();
      return;
    }

    const fetchHistorico = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/clientes/agendamentos", {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          setHistorico(data);
        } else {
          setHistorico([]);
        }
      } catch (err) {
        setHistorico([]);
      }
    };

    fetchHistorico();
  }, [authToken]);

  // -------------------------------
  // Buscar lista de massoterapeutas
  // -------------------------------
  useEffect(() => {
    const fetchMassoterapeutas = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/massoterapeuta/lista");
        if (resp.ok) {
          const data = await resp.json();
          setMassoterapeutas(data);
          if (data.length > 0) setMassoterapeutaSelecionado(data[0].id);
        }
      } catch (err) {}
    };

    fetchMassoterapeutas();
  }, []);

  async function limparHistorico() {
    if (!window.confirm("Tem certeza que deseja limpar todo o histórico de agendamentos?")) return;
    try {
      const resp = await fetch("http://localhost:5000/api/clientes/agendamentos/limpar", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (resp.ok) {
        alert("Histórico limpo com sucesso!");
        setHistorico([]);
      } else {
        alert("Erro ao limpar histórico.");
      }
    } catch (err) {
      alert("Erro ao limpar histórico.");
    }
  }

  // -------------------------------
  // Criar novo agendamento
  // -------------------------------
  const criarAgendamento = async () => {
    if (!authToken) return alert("Você precisa estar logado para agendar.");
    if (!dataHora) return alert("Escolha data e hora");
    if (!massoterapeutaSelecionado) return alert("Escolha um massoterapeuta");
    // Bloqueia agendamento para horários passados e com pouca antecedência
    const agora = new Date();
    const tempoMinimo = new Date(agora.getTime() + 30 * 60000); // 30 minutos de antecedência
    
    if (dataHora < agora) {
      alert("Não é possível agendar para horários passados.");
      return;
    }
    
    if (dataHora < tempoMinimo) {
      alert("Por favor, agende com pelo menos 30 minutos de antecedência.");
      return;
    }
  // Formata data para ISO local (YYYY-MM-DDTHH:mm)
  const pad = (n) => n.toString().padStart(2, '0');
  const dataFormatada = `${dataHora.getFullYear()}-${pad(dataHora.getMonth()+1)}-${pad(dataHora.getDate())}T${pad(dataHora.getHours())}:${pad(dataHora.getMinutes())}`;

    try {
      const resp = await fetch("http://localhost:5000/api/clientes/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          massoterapeuta_id: massoterapeutaSelecionado,
          data_hora: dataFormatada,
          sintomas: sintomas.trim() || null,
        }),
      });

      if (resp.ok) {
        alert("Agendamento solicitado! Aguardando confirmação da clínica.");
        setDataHora("");
        setSintomas("");

        // Atualiza histórico
        const historicoResp = await fetch("http://localhost:5000/api/clientes/agendamentos", {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (historicoResp.ok) {
          const data = await historicoResp.json();
          setHistorico(data);
        }
      } else {
        const err = await resp.json();
        alert(err.erro || "Erro ao criar agendamento.");
      }
    } catch (err) {
      alert("Erro ao criar agendamento.");
    }
  };

  async function cancelarAgendamento(id) {
    const authToken = token || usuario?.token || localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja cancelar este agendamento?")) return;
    try {
      const resp = await fetch(`http://localhost:5000/api/clientes/agendamentos/${id}/cancelar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (resp.ok) {
        alert("Agendamento cancelado com sucesso!");
        // Atualiza histórico
        const historicoResp = await fetch("http://localhost:5000/api/clientes/agendamentos", {
          method: "GET",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (historicoResp.ok) {
          const data = await historicoResp.json();
          setHistorico(data);
        }
      } else {
        alert("Erro ao cancelar agendamento.");
      }
    } catch (err) {
      alert("Erro ao cancelar agendamento.");
    }
  }

  async function excluirConta() {
    const authToken = token || usuario?.token || localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) return;
    try {
      const resp = await fetch("http://localhost:5000/api/clientes", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (resp.ok) {
        alert("Conta excluída com sucesso!");
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        alert("Erro ao excluir conta.");
      }
    } catch (err) {
      alert("Erro ao excluir conta.");
    }
  }

  return (
    <div className="agendamentos-container">
      <h2>Agendar Consulta</h2>
      
      <div style={{ 
        textAlign: 'right', 
        marginBottom: '15px', 
        fontSize: '14px', 
        color: '#666',
        fontWeight: 'bold'
      }}>
        🕐 Horário atual: {horarioAtual.toLocaleString('pt-BR')}
      </div>

      <label>
        Massoterapeuta:
        <select
          value={massoterapeutaSelecionado}
          onChange={(e) => setMassoterapeutaSelecionado(e.target.value)}
        >
          {massoterapeutas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </label>

      <label>
        Data:
        <DatePicker
          selected={dataHora}
          onChange={(date) => {
            setDataHora(date);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data"
          minDate={new Date()}
          locale="pt-BR"
          showWeekNumbers={false}
          firstDayOfWeek={1} // Segunda-feira como primeiro dia
          calendarStartDay={1} // Inicia na segunda-feira
            filterDate={(date) => {
              const today = new Date();
              today.setHours(0,0,0,0);
              const d = new Date(date);
              d.setHours(0,0,0,0);
              const day = d.getDay(); // 0=domingo, 1=segunda, ..., 6=sábado
              // Só permite datas futuras (>= hoje) e dias úteis (seg a qui)
              // Bloqueia explicitamente sexta (5), sábado (6) e domingo (0)
              return d >= today && day >= 1 && day <= 4;
            }}
            dayClassName={(date) => {
              const today = new Date();
              today.setHours(0,0,0,0);
              const d = new Date(date);
              d.setHours(0,0,0,0);
              const day = d.getDay(); // 0=domingo, 1=segunda, ..., 6=sábado
              if (d < today) return "dia-semana bloqueado";
              if (day === 0) return "dia-semana bloqueado"; // domingo
              if (day === 1) return "dia-semana segunda";
              if (day === 2) return "dia-semana terca";
              if (day === 3) return "dia-semana quarta";
              if (day === 4) return "dia-semana quinta";
              if (day === 5) return "dia-semana bloqueado"; // sexta
              if (day === 6) return "dia-semana bloqueado"; // sábado
              return "dia-semana bloqueado";
            }}
        />
      </label>
      {dataHora && (
        <div style={{ margin: '16px 0' }}>
          <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Horários disponíveis:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {gerarHorariosDiaSelecionado().map(({ horario, ocupado }) => (
              <button
                key={`${horario.toISOString()}-${forceUpdate}`}
                type="button"
                disabled={ocupado}
                style={{
                  background: ocupado ? '#ccc' : (dataHora && horario.getHours() === dataHora.getHours() && horario.getMinutes() === dataHora.getMinutes() ? '#1976d2' : '#e0f0ff'),
                  color: ocupado ? '#888' : '#1976d2',
                  border: ocupado ? '1px solid #bbb' : '1px solid #1976d2',
                  borderRadius: 6,
                  padding: '6px 14px',
                  cursor: ocupado ? 'not-allowed' : 'pointer',
                  fontWeight: ocupado ? 'normal' : 'bold',
                  opacity: ocupado ? 0.6 : 1,
                }}
                onClick={() => {
                  if (!ocupado) {
                    const novaData = new Date(dataHora);
                    novaData.setHours(horario.getHours(), horario.getMinutes(), 0, 0);
                    setDataHora(novaData);
                  }
                }}
              >
                {horario.getHours().toString().padStart(2, '0')}:{horario.getMinutes().toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ margin: '16px 0' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Descreva seus sintomas (opcional):
        </label>
        <textarea
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          placeholder="Descreva brevemente os sintomas que está sentindo, dores, desconfortos, etc. Isso ajudará o massoterapeuta a preparar o melhor atendimento para você."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
          maxLength={500}
        />
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          {sintomas.length}/500 caracteres
        </div>
      </div>
      
      <button onClick={criarAgendamento} disabled={!dataHora || dataHora.getHours() === 0 && dataHora.getMinutes() === 0}>Agendar</button>

  <h3>Histórico de Agendamentos</h3>
  <button onClick={limparHistorico} style={{marginBottom: '10px'}}>Limpar Histórico</button>
      <ul>
        {historico.length === 0 && <li>Nenhum agendamento encontrado</li>}
        {historico.map((a) => (
          <li key={a.id}>
            <div>
              <strong>{formatarDataHora(a.data_hora)}</strong> - {traduzirStatus(a.status)} - Massoterapeuta: {a.massoterapeuta_nome || "Não informado"}
              {(a.status === 'marcado' || a.status === 'pendente') && (
                <button onClick={() => cancelarAgendamento(a.id)} style={{marginLeft: '12px'}}>Cancelar</button>
              )}
            </div>
            {a.sintomas && (
              <div style={{ marginTop: '4px', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                <strong>Sintomas:</strong> {a.sintomas}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AgendamentosCliente;


// Função para formatar data/hora para o padrão brasileiro
function formatarDataHora(dataHoraStr) {
  if (!dataHoraStr) return "";
  // Aceita formatos: YYYY-MM-DDTHH:mm, YYYY-MM-DD HH:mm:ss, YYYY-MM-DD HH:mm
  let d;
  let str = dataHoraStr.replace('T', ' ');
  let [datePart, timePart] = str.split(' ');
  if (datePart && timePart) {
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    d = new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute));
  } else {
    d = new Date(dataHoraStr);
  }
  if (isNaN(d.getTime())) return "Data inválida";
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// Função para traduzir status para português
function traduzirStatus(status) {
  switch (status) {
    case 'pendente': return 'Aguardando confirmação da clínica';
    case 'confirmado': return 'Confirmado';
    case 'cancelado': return 'Cancelado';
    case 'marcado': return 'Marcado';
    case 'concluido': return 'Concluído';
    default: return status ? status.charAt(0).toUpperCase() + status.slice(1) : "";
  }
}