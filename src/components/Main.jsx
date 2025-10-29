// Importações necessárias do React
import React, { useState, useEffect } from "react";
import Header from "./Header";
import ConfirmarEmail from "./ConfirmarEmail";
import LoginForm from "./LoginForm";
import RecuperarSenha from "./RecuperarSenha";
import RedefinirSenha from "./RedefinirSenha";
import CadastroForm from "./CadastroForm";
import PerfilCliente from "./Perfil/PerfilCliente";
import PerfilMassoterapeuta from "./Perfil/PerfilMassoterapeuta";
import AgendamentosCliente from "./Agendamentos/AgendamentosCliente";
import AgendamentosMassoterapeuta from "./Agendamentos/AgendamentosMassoterapeuta";
import GerenciarClientes from "./GerenciarClientes";
import Especialidades from "./Especialidades";
import Contato from "./Contato";
import PaginaInicial from "./PaginaInicial";
import "../App.css";

// Componente principal que gerencia toda a navegação e roteamento da aplicação
// Recebe como props: usuario (dados do usuário logado), login e logout (funções de autenticação)
function Main({ usuario, login, logout }) {
  const [secaoAtual, setSecaoAtual] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
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
      // Limpa a seção atual para mostrar a interface padrão do usuário logado
      setSecaoAtual("");
    }
  }, [usuario]); // Executa sempre que o estado 'usuario' mudar

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
      <Header usuario={usuario} tipoUsuario={tipoUsuario} />
      <main>
        {isConfirmarEmail ? (
          <ConfirmarEmail voltarLogin={() => { 
            setSecaoAtual("login"); 
            setMostrarCadastro(false); 
            window.history.replaceState({}, '', '/'); 
          }} />
        ) : isRedefinirSenha ? (
          <RedefinirSenha token={tokenRedefinir} onRedefinido={() => {
            setSecaoAtual("login");
            setMostrarCadastro(false);
            window.history.replaceState({}, '', '/');
          }} />
        ) : mostrarRecuperar ? (
          <RecuperarSenha onVoltar={() => setMostrarRecuperar(false)} />
        ) : (
          <>
            {secaoAtual === "login" && !mostrarCadastro && (
              <LoginForm 
                login={login} 
                abrirCadastro={() => setMostrarCadastro(true)} 
                abrirRecuperarSenha={() => setMostrarRecuperar(true)} 
              />
            )}
            {secaoAtual === "login" && mostrarCadastro && (
              <CadastroForm voltarLogin={() => setMostrarCadastro(false)} />
            )}
            {secaoAtual === "perfil" && tipoUsuario === "cliente" && (
              <PerfilCliente usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "perfil" && tipoUsuario === "massoterapeuta" && (
              <PerfilMassoterapeuta usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "agendamentos" && tipoUsuario === "cliente" && (
              <AgendamentosCliente usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "agendamentos" && tipoUsuario === "massoterapeuta" && (
              <AgendamentosMassoterapeuta usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "clientes" && tipoUsuario === "massoterapeuta" && (
              <GerenciarClientes usuario={usuario.usuario} token={usuario.token} />
            )}
            {secaoAtual === "especialidades" && <Especialidades />}
            {secaoAtual === "contato" && <Contato />}
            {secaoAtual === "" && !usuario && <PaginaInicial />}
            {secaoAtual === "inicio" && tipoUsuario === "cliente" && <PaginaInicial />}
            {secaoAtual === "" && tipoUsuario === "cliente" && <PaginaInicial />}
          </>
        )}
      </main>
    </>
  );
}

// Exportação do componente para uso em outros arquivos
export default Main;