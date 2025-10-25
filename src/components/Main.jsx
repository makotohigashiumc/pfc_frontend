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
    window.addEventListener("mostrarSecao", handler);
    return () => window.removeEventListener("mostrarSecao", handler);
  }, []);

  const tipoUsuario = usuario?.tipo;
  const urlParams = new URLSearchParams(window.location.search);
  const tokenRedefinir = urlParams.get("token");
  const isConfirmarEmail = window.location.pathname.startsWith("/confirmar-email/");
  const isRedefinirSenha = window.location.pathname.startsWith("/redefinir-senha") && tokenRedefinir;

  if (isConfirmarEmail) {
    return <main><ConfirmarEmail voltarLogin={() => { setSecaoAtual("login"); setMostrarCadastro(false); window.history.replaceState({}, '', '/'); }} /></main>;
  }
  if (isRedefinirSenha) {
    return <main><RedefinirSenha token={tokenRedefinir} onRedefinido={() => { setSecaoAtual("login"); setMostrarCadastro(false); window.history.replaceState({}, '', '/'); }} /></main>;
  }
  if (mostrarRecuperar) {
    return <main><RecuperarSenha onVoltar={() => setMostrarRecuperar(false)} /></main>;
  }
  if (secaoAtual === "login" && !mostrarCadastro) {
    return <main><LoginForm login={login} abrirCadastro={() => setMostrarCadastro(true)} abrirRecuperarSenha={() => setMostrarRecuperar(true)} /></main>;
  }
  if (secaoAtual === "login" && mostrarCadastro) {
    return <main><CadastroForm voltarLogin={() => setMostrarCadastro(false)} /></main>;
  }
  if (secaoAtual === "perfil" && tipoUsuario === "cliente") {
    return <main><PerfilCliente usuario={usuario.usuario} token={usuario.token} /></main>;
  }
  if (secaoAtual === "perfil" && tipoUsuario === "massoterapeuta") {
    return <main><PerfilMassoterapeuta usuario={usuario.usuario} token={usuario.token} /></main>;
  }
  if (secaoAtual === "agendamentos" && tipoUsuario === "cliente") {
    return <main><AgendamentosCliente usuario={usuario.usuario} token={usuario.token} /></main>;
  }
  if (secaoAtual === "agendamentos" && tipoUsuario === "massoterapeuta") {
    return <main><AgendamentosMassoterapeuta usuario={usuario.usuario} token={usuario.token} /></main>;
  }
  if (secaoAtual === "clientes" && tipoUsuario === "massoterapeuta") {
    return <main><GerenciarClientes usuario={usuario.usuario} token={usuario.token} /></main>;
  }
  if (secaoAtual === "especialidades") {
    return <main><Especialidades /></main>;
  }
  if (secaoAtual === "contato") {
    return <main><Contato /></main>;
  }
  if (secaoAtual === "" && !usuario) {
    return <main><PaginaInicial /></main>;
  }
  if (secaoAtual === "inicio" && tipoUsuario === "cliente") {
    return <main><PaginaInicial /></main>;
  }
  if (secaoAtual === "" && tipoUsuario === "cliente") {
    return <main><PaginaInicial /></main>;
  }
  return <main />;
}

// Exportação do componente para uso em outros arquivos
export default Main;