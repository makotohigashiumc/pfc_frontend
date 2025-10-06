// Importação da biblioteca React para criar componentes
import React from "react";
// Importação do ReactDOM para renderizar a aplicação no navegador
import ReactDOM from "react-dom/client";
// Importação do componente principal da aplicação
import App from "./App";
// Importação dos estilos globais da aplicação
import "./App.css";

// Criação da raiz da aplicação React e renderização do componente principal
// O método createRoot é usado no React 18+ para criar uma raiz de renderização
// Busca o elemento HTML com id "root" onde a aplicação será montada
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode é um wrapper que ajuda a detectar problemas durante o desenvolvimento
  // Ativa verificações adicionais e avisos para componentes filhos
  <React.StrictMode>
    {/* Componente principal que contém toda a lógica da aplicação */}
    <App />
  </React.StrictMode>
);
