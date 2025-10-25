// Importações necessárias do React
import React, { useState, useEffect } from "react";
// Importação dos componentes principais da aplicação
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Importação dos estilos globais
import "./App.css";

// Componente principal da aplicação que gerencia o estado global do usuário
function App() {
  // Estado que armazena as informações do usuário logado
  // Estrutura: { tipo: 'cliente'|'massoterapeuta', usuario: {dados}, token: 'jwt' }
  const [usuario, setUsuario] = useState(null);

  // Effect que executa quando o componente é montado
  // Verifica se existe um usuário logado salvo no localStorage
  useEffect(() => {
    // Recupera o token JWT do armazenamento local
    const token = localStorage.getItem("token");
    // Recupera os dados do usuário do armazenamento local
    const usuarioSalvo = localStorage.getItem("usuario");
    
    // Se ambos existem, restaura a sessão do usuário
    if (token && usuarioSalvo) {
      // Converte a string JSON de volta para objeto e atualiza o estado
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []); // Array vazio significa que executa apenas uma vez na montagem

  // Função para realizar login do usuário
  // Recebe um objeto com { tipo, usuario, token } do componente de login
  const login = ({ tipo, usuario: dadosUsuario, token }) => {
    // Cria objeto completo com todas as informações do usuário
    const usuarioCompleto = { tipo, usuario: dadosUsuario, token };
    
    // Atualiza o estado da aplicação com os dados do usuário
    setUsuario(usuarioCompleto);
    
    // Salva o token no localStorage para persistir a sessão
    localStorage.setItem("token", token);
    // Salva os dados completos do usuário no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
  };

  // Função para realizar logout do usuário
  const logout = () => {
    // Remove o usuário do estado da aplicação
    setUsuario(null);
    // Remove o token do armazenamento local
    localStorage.removeItem("token");
    // Remove os dados do usuário do armazenamento local
    localStorage.removeItem("usuario");
    // Força o recarregamento da página para garantir reset completo do estado
    window.location.reload();
  };

  // Renderização do componente principal
  return (
    <>
      <Header usuario={usuario?.usuario} tipoUsuario={usuario?.tipo} />
      <Main usuario={usuario} login={login} logout={logout} />
      <Footer />
    </>
  );
}

// Exportação do componente para uso em outros arquivos
export default App;