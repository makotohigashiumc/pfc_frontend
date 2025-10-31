// Importações necessárias do React

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CadastroForm from "./components/CadastroForm";
import LoginForm from "./components/LoginForm";
import Especialidades from "./components/Especialidades";
import Contato from "./components/Contato";
import PerfilCliente from "./components/Perfil/PerfilCliente";
import PerfilMassoterapeuta from "./components/Perfil/PerfilMassoterapeuta";
import AgendamentosCliente from "./components/Agendamentos/AgendamentosCliente";
import AgendamentosMassoterapeuta from "./components/Agendamentos/AgendamentosMassoterapeuta";
import GerenciarClientes from "./components/GerenciarClientes";
import PaginaInicial from "./components/PaginaInicial";
import "./App.css";

// Componente principal da aplicação que gerencia o estado global do usuário

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");
    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const login = ({ tipo, usuario: dadosUsuario, token }) => {
    const usuarioCompleto = { tipo, usuario: dadosUsuario, token };
    setUsuario(usuarioCompleto);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Header usuario={usuario} tipoUsuario={usuario?.tipo} />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<CadastroForm voltarLogin={() => {}} />} />
        <Route path="/login" element={<LoginForm login={login} abrirCadastro={() => {}} abrirRecuperarSenha={() => {}} />} />
        <Route path="/especialidades" element={<Especialidades />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/perfil-cliente" element={<PerfilCliente usuario={usuario?.usuario} token={usuario?.token} />} />
        <Route path="/perfil-massoterapeuta" element={<PerfilMassoterapeuta usuario={usuario?.usuario} token={usuario?.token} />} />
        <Route path="/agendamentos-cliente" element={<AgendamentosCliente usuario={usuario?.usuario} token={usuario?.token} />} />
        <Route path="/agendamentos-massoterapeuta" element={<AgendamentosMassoterapeuta usuario={usuario?.usuario} token={usuario?.token} />} />
        <Route path="/clientes" element={<GerenciarClientes usuario={usuario?.usuario} token={usuario?.token} />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// Exportação do componente para uso em outros arquivos
export default App;