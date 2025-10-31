// Importações necessárias do React e React Router
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Componente Header que exibe o cabeçalho da aplicação
// Recebe como props: usuario (dados do usuário logado) e tipoUsuario (cliente ou massoterapeuta)
function Header({ usuario, tipoUsuario }) {
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
  return (
    <header>
      <nav>
        <ul>
          {/* Nome do site/logo que é clicável e navega conforme o tipo de usuário */}
          <li style={{ cursor: "pointer", fontWeight: "bold" }} onClick={handleSiteClick}>
            Nome do Site
          </li>

          {/* Menu específico para clientes logados */}
          {tipoUsuario === "cliente" && (
            <>
              {/* Link para a página de agendamentos do cliente */}
              <li><Link to="/agendamentos-cliente">Agendamentos</Link></li>
              {/* Link para o perfil do cliente */}
              <li><Link to="/perfil-cliente">Perfil</Link></li>
              {/* Botão de logout para cliente */}
              <li onClick={handleLogout} style={{ cursor: "pointer" }}>Sair</li>
            </>
          )}

          {/* Menu específico para massoterapeutas logados */}
          {tipoUsuario === "massoterapeuta" && (
            <>
              {/* Link para a página de agendamentos do massoterapeuta */}
              <li><Link to="/agendamentos-massoterapeuta">Agendamentos</Link></li>
              {/* Link para a página de clientes do massoterapeuta */}
              <li><Link to="/clientes">Clientes</Link></li>
              {/* Link para o perfil do massoterapeuta */}
              <li><Link to="/perfil-massoterapeuta">Perfil</Link></li>
              {/* Botão de logout para massoterapeuta */}
              <li onClick={handleLogout} style={{ cursor: "pointer" }}>Sair</li>
            </>
          )}

          {/* Menu para usuários não logados */}
          {!usuario && (
            <>
              {/* Link para a página de login */}
              <li><Link to="/login">Login</Link></li>
              {/* Link para a página de cadastro */}
              <li><Link to="/cadastro">Cadastro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

// Exportação do componente para uso em outros arquivos
export default Header;
