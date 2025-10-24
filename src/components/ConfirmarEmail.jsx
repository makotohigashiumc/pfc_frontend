// Importações necessárias do React
import React, { useEffect, useState } from "react";

// Componente para confirmação de email após cadastro
// Recebe como prop: voltarLogin (função para retornar à tela de login)
function ConfirmarEmail({ voltarLogin }) {
  // Estado para armazenar a mensagem de status da confirmação
  const [mensagem, setMensagem] = useState("Validando...");

  // Effect que executa quando o componente é montado
  // Responsável por processar a confirmação do email
  useEffect(() => {
    // Extrai o token de confirmação da URL atual
    const url = window.location.pathname;
    const token = url.split("/confirmar-email/")[1]; // Pega a parte após "/confirmar-email/"
    
    // Verifica se o token existe na URL
    if (!token) {
      setMensagem("Token de confirmação inválido.");
      return; // Para a execução se não houver token
    }
    
    // Faz requisição ao backend para confirmar o email usando o token
  fetch(`${import.meta.env.VITE_API_BASE_URL}/clientes/confirmar-email/${token}`, {
      method: "POST" // Método POST para confirmar email
    })
      .then(async (resp) => {
        // Verifica se a resposta foi bem-sucedida
        if (resp.ok) {
          // Atualiza mensagem de sucesso
          setMensagem("E-mail confirmado com sucesso! Você pode fazer login.");
          
          // Aguarda 2.5 segundos e redireciona para login
          setTimeout(() => {
            if (voltarLogin) voltarLogin(); // Usa callback se disponível
            else window.location.href = "/"; // Senão redireciona para página inicial
          }, 2500);
        } else {
          // Trata erro retornado pelo backend
          const err = await resp.json();
          setMensagem(err.erro || "Falha ao confirmar e-mail.");
        }
      })
      .catch(() => {
        // Captura erros de rede ou outros erros inesperados
        setMensagem("Erro de conexão ao confirmar e-mail.");
      });
  }, [voltarLogin]); // Dependência: re-executa se voltarLogin mudar

  // Renderização do componente
  return (
    <div className="confirmar-email-container">
      {/* Título da página */}
      <h2>Confirmação de E-mail</h2>
      {/* Mensagem dinâmica baseada no estado da confirmação */}
      <p>{mensagem}</p>
    </div>
  );
}

// Exportação do componente
export default ConfirmarEmail;
