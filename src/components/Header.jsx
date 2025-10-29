// Importações necessárias do React e React Router
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

// Componente Header que exibe o cabeçalho da aplicação
// Recebe como props: usuario (dados do usuário logado) e tipoUsuario (cliente ou massoterapeuta)
function Header({ usuario, tipoUsuario }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Hook do React Router para navegação programática entre páginas
  const navigate = useNavigate();

  // Função que trata o clique no nome do site/logo
  const handleSiteClick = () => {
    // Se ninguém está logado, vai para a página principal
    if (!usuario) {
      navigate("/"); // página principal se ninguém logado
    } else if (tipoUsuario === "cliente") {
      // Se é cliente, vai para o menu do cliente
      navigate("/menu-cliente"); // menu do cliente
    } else if (tipoUsuario === "massoterapeuta") {
      // Se é massoterapeuta, vai para o menu do massoterapeuta
      navigate("/menu-massoterapeuta"); // menu do massoterapeuta
    }
  };

  // Função que trata o logout do usuário
  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem("token");
    // Redireciona para a página de login ou home
    navigate("/");
    // Força o recarregamento da página para garantir que o estado seja resetado
    window.location.reload(); // garante que o estado seja resetado
  };

  // Renderização do componente header
  // Função para renderizar os itens do menu
  const renderMenuItems = (isMobile = false) => (
    <>
      {tipoUsuario === "cliente" && (
        <>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/agendamentos-cliente">Agendamentos</Link></li>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/perfil-cliente">Perfil</Link></li>
          <li onClick={() => { handleLogout(); if(isMobile) setSidebarOpen(false); }} style={{ cursor: "pointer" }}>Sair</li>
        </>
      )}
      {tipoUsuario === "massoterapeuta" && (
        <>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/agendamentos-massoterapeuta">Agendamentos</Link></li>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/clientes">Clientes</Link></li>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/perfil-massoterapeuta">Perfil</Link></li>
          <li onClick={() => { handleLogout(); if(isMobile) setSidebarOpen(false); }} style={{ cursor: "pointer" }}>Sair</li>
        </>
      )}
      {!usuario && (
        <>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/login">Login</Link></li>
          <li onClick={isMobile ? () => setSidebarOpen(false) : undefined}><Link to="/cadastro">Cadastro</Link></li>
        </>
      )}
    </>
  );

  return (
    <header>
      <nav>
        {/* Botão hambúrguer para mobile */}
        <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
          &#9776;
        </button>
        {/* Menu normal para desktop */}
        <ul className="desktop-menu">
          <li style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleSiteClick}>
            HM Massoterapia
          </li>
          {renderMenuItems(false)}
        </ul>
        {/* Nome do site para mobile */}
        <div className="site-name-mobile" onClick={handleSiteClick}>
          HM Massoterapia
        </div>
      </nav>
      {/* Barra lateral para mobile */}
      <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <ul>
          {/* Botão para fechar barra lateral */}
          <li style={{textAlign: "right", marginBottom: "1rem"}}>
            <button onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" style={{background: "none", border: "none", fontSize: "2rem", color: "#fff", cursor: "pointer"}}>&times;</button>
          </li>
          {renderMenuItems(true)}
        </ul>
      </div>
      {/* Overlay para fechar barra lateral */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </header>
  );
}

// Exportação do componente para uso em outros arquivos
export default Header;
