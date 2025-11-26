// Importação do React
import React from "react";
// Importação dos estilos específicos do footer
import "./Footer.css";

// Componente Footer - rodapé da aplicação
// Componente simples que exibe informações de copyright
function Footer() {
  return (
    // Elemento footer com classe CSS para estilização
    <footer className="footer">
      {/* Símbolo de copyright e informação do desenvolvedor */}
      <span>&copy; Desenvolvido por Makoto Higashi e Nicolas Henrique</span>
      <span style={{ marginLeft: "16px" }}>
        <a href="/politica-privacidade" style={{ color: "#007bff", textDecoration: "underline" }}>
          Política de Privacidade
        </a>
      </span>
    </footer>
  );
}

// Exportação do componente
export default Footer;
