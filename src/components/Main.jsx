// Importações necessárias do React
import React, { useState, useEffect } from "react";
// Importação de todos os componentes da aplicação
import ConfirmarEmail from "./ConfirmarEmail";        // Confirmação de email após cadastro
import LoginForm from "./LoginForm";                  // Formulário de login
import RecuperarSenha from "./RecuperarSenha";        // Formulário para recuperar senha
import RedefinirSenha from "./RedefinirSenha";        // Formulário para redefinir senha
import CadastroForm from "./CadastroForm";            // Formulário de cadastro
import PerfilCliente from "./Perfil/PerfilCliente";   // Perfil do cliente
import PerfilMassoterapeuta from "./Perfil/PerfilMassoterapeuta"; // Perfil do massoterapeuta
import AgendamentosCliente from "./Agendamentos/AgendamentosCliente"; // Agendamentos do cliente
import AgendamentosMassoterapeuta from "./Agendamentos/AgendamentosMassoterapeuta"; // Agendamentos do massoterapeuta
import GerenciarClientes from "./GerenciarClientes";  // Gerenciamento de clientes (massoterapeuta)
import Especialidades from "./Especialidades";       // Página de especialidades
import Contato from "./Contato";                     // Página de contato
import PaginaInicial from "./PaginaInicial";         // Página inicial da aplicação
import "../App.css";                                 // Estilos globais

// Componente principal que gerencia toda a navegação e roteamento da aplicação
// Recebe como props: usuario (dados do usuário logado), login e logout (funções de autenticação)
function Main({ usuario, login, logout }) {
  // Estado que controla qual seção/página está sendo exibida atualmente
  const [secaoAtual, setSecaoAtual] = useState("");
  // Estado que controla se o formulário de cadastro está sendo exibido
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  // Estado que controla se o formulário de recuperação de senha está sendo exibido
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  // Effect que escuta eventos customizados para mudança de seção
  // Permite que outros componentes alterem a seção atual através de eventos
  useEffect(() => {
    // Handler que captura o evento customizado e atualiza a seção atual
    const handler = (e) => setSecaoAtual(e.detail);
    // Adiciona o listener para o evento "mostrarSecao"
    window.addEventListener("mostrarSecao", handler);
    // Cleanup: remove o listener quando o componente é desmontado
    return () => window.removeEventListener("mostrarSecao", handler);
  }, []);

  // Effect que reseta a seção atual quando um usuário faz login
  // Isso garante que o usuário seja direcionado para a tela apropriada após o login
  useEffect(() => {
    if (usuario) {
      // Se o usuário for massoterapeuta, abrir diretamente a seção de agendamentos
      if (usuario.tipo === "massoterapeuta") {
        setSecaoAtual("agendamentos");
      } else {
        // Caso contrário, mantém o comportamento anterior (cliente vê a interface padrão)
        setSecaoAtual("");
      }
    }
  }, [usuario]); // Executa sempre que o estado 'usuario' mudar

  // Extrai o tipo de usuário (cliente ou massoterapeuta) dos dados do usuário
  const tipoUsuario = usuario?.tipo;

  // Detecta se a URL atual é uma rota de confirmação de email
  // Verifica se o pathname começa com "/confirmar-email/"
  const isConfirmarEmail = window.location.pathname.startsWith("/confirmar-email/");
  
  // Detecta se há um token de redefinição de senha na URL
  // Cria um objeto URLSearchParams para analisar os parâmetros da query string
  const urlParams = new URLSearchParams(window.location.search);
  // Extrai o token da query string
  const tokenRedefinir = urlParams.get("token");
  // Verifica se é uma página de redefinição de senha com token válido
  const isRedefinirSenha = window.location.pathname.startsWith("/redefinir-senha") && tokenRedefinir;

  // Renderização do componente Main
  return (
    <>
      {/* Cabeçalho da aplicação com título e navegação */}
      <header>
        {/* Título principal da aplicação que funciona como botão home */}
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            // Lógica de navegação baseada no tipo de usuário
            if (!usuario) setSecaoAtual(""); // Página inicial pública se não logado
            else if (tipoUsuario === "cliente") setSecaoAtual("inicio"); // Cliente vai para página inicial personalizada
            else if (tipoUsuario === "massoterapeuta") setSecaoAtual("agendamentos"); // Massoterapeuta vai para agendamentos
          }}
        >
          HM Massoterapia
        </h1>
        
        {/* Menu de navegação que muda conforme o estado de autenticação */}
        <nav>
          {/* Menu para usuários não logados - mostra opções públicas */}
          {!usuario && (
            <>
              {/* Link para página inicial */}
              <a onClick={() => setSecaoAtual("")}>Início</a>
              {/* Link para página de especialidades */}
              <a onClick={() => setSecaoAtual("especialidades")}>Especialidades</a>
              {/* Link para página de contato */}
              <a onClick={() => setSecaoAtual("contato")}>Contato</a>
              {/* Link para login (também esconde cadastro se estiver aberto) */}
              <a onClick={() => { setSecaoAtual("login"); setMostrarCadastro(false); }}>Login</a>
            </>
          )}
          
          {/* Menu específico para clientes logados */}
          {usuario && tipoUsuario === "cliente" && (
            <>
              {/* Link para página inicial - mantém acesso às informações públicas */}
              <a 
                onClick={() => setSecaoAtual("inicio")}
              >
                🏠 Início
              </a>
              {/* Link para especialidades - mantém acesso às informações de serviços */}
              <a 
                onClick={() => setSecaoAtual("especialidades")}
              >
                ⚕️ Especialidades
              </a>
              {/* Link para contato - mantém acesso ao formulário de contato */}
              <a 
                onClick={() => setSecaoAtual("contato")}
              >
                📞 Contato
              </a>
              {/* Link para agendamentos do cliente */}
              <a 
                onClick={() => setSecaoAtual("agendamentos")}
              >
                📅 Agendamentos
              </a>
              {/* Link para perfil do cliente */}
              <a 
                onClick={() => setSecaoAtual("perfil")}
              >
                👤 Perfil
              </a>
              {/* Botão de logout */}
              <a 
                onClick={logout}
                className="cliente"
              >
                🚪 Sair
              </a>
            </>
          )}
          
          {/* Menu específico para massoterapeutas logados */}
          {usuario && tipoUsuario === "massoterapeuta" && (
            <>
              {/* Link para gerenciar clientes */}
              <a 
                onClick={() => setSecaoAtual("clientes")}
              >
                👥 Clientes
              </a>
              {/* Link para agendamentos do massoterapeuta */}
              <a 
                onClick={() => setSecaoAtual("agendamentos")}
              >
                📅 Agendamentos
              </a>
              {/* Link para perfil do massoterapeuta */}
              <a 
                onClick={() => setSecaoAtual("perfil")}
              >
                👤 Perfil
              </a>
              {/* Botão de logout */}
              <a 
                onClick={logout}
              >
                🚪 Sair
              </a>
            </>
          )}
        </nav>
      </header>

      {/* Conteúdo principal que muda conforme a seção selecionada */}
      <main>
        {/* Verifica primeiro se é uma página especial (confirmação de email) */}
        {isConfirmarEmail ? (
          // Página de confirmação de email com callback para voltar ao login
          <ConfirmarEmail voltarLogin={() => { 
            setSecaoAtual("login"); 
            setMostrarCadastro(false); 
            window.history.replaceState({}, '', '/'); 
          }} />
        ) : isRedefinirSenha ? (
          // Página de redefinição de senha com token e callback de sucesso
          <RedefinirSenha token={tokenRedefinir} onRedefinido={() => {
            setSecaoAtual("login");
            setMostrarCadastro(false);
            window.history.replaceState({}, '', '/');
          }} />
        ) : mostrarRecuperar ? (
          // Página de recuperação de senha com callback para voltar
          <RecuperarSenha onVoltar={() => setMostrarRecuperar(false)} />
        ) : (
          // Conteúdo principal baseado na seção atual
          <>
            {/* Seção de Login e Cadastro */}
            {secaoAtual === "login" && !mostrarCadastro && (
              // Formulário de login com callbacks para cadastro e recuperação
              <LoginForm 
                login={login} 
                abrirCadastro={() => setMostrarCadastro(true)} 
                abrirRecuperarSenha={() => setMostrarRecuperar(true)} 
              />
            )}
            {secaoAtual === "login" && mostrarCadastro && (
              // Formulário de cadastro com callback para voltar ao login
              <CadastroForm voltarLogin={() => setMostrarCadastro(false)} />
            )}

            {/* Seções de Perfil baseadas no tipo de usuário */}
            {secaoAtual === "perfil" && tipoUsuario === "cliente" && (
              // Perfil do cliente com dados e token de autenticação
              <PerfilCliente usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "perfil" && tipoUsuario === "massoterapeuta" && (
              // Perfil do massoterapeuta com dados e token de autenticação
              <PerfilMassoterapeuta usuario={usuario.usuario} token={usuario.token} />
            )}

            {/* Seções de Agendamentos baseadas no tipo de usuário */}
            {secaoAtual === "agendamentos" && tipoUsuario === "cliente" && (
              // Agendamentos do cliente com dados e token de autenticação
              <AgendamentosCliente usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "agendamentos" && tipoUsuario === "massoterapeuta" && (
              // Agendamentos do massoterapeuta com dados e token de autenticação
              <AgendamentosMassoterapeuta usuario={usuario.usuario} token={usuario.token} />
            )}

            {/* Seção de Gerenciamento de Clientes (apenas para massoterapeutas) */}
            {secaoAtual === "clientes" && tipoUsuario === "massoterapeuta" && (
              // Gerenciamento de clientes com pesquisa e exclusão
              <GerenciarClientes usuario={usuario.usuario} token={usuario.token} />
            )}

            {/* Seções públicas acessíveis sem login */}
            {secaoAtual === "especialidades" && <Especialidades />}
            {secaoAtual === "contato" && <Contato />}
            
            {/* Página inicial - mostrada quando nenhuma seção está selecionada e usuário não está logado */}
            {secaoAtual === "" && !usuario && <PaginaInicial />}
            
            {/* Página inicial personalizada para cliente logado */}
            {secaoAtual === "inicio" && tipoUsuario === "cliente" && <PaginaInicial />}
            
            {/* Página padrão para cliente logado (quando secaoAtual está vazia) */}
            {secaoAtual === "" && tipoUsuario === "cliente" && <PaginaInicial />}
          </>
        )}
      </main>
    </>
  );
}

// Exportação do componente para uso em outros arquivos
export default Main;