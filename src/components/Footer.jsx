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
      &copy; Desenvolvido por Makoto Higashi
    </footer>
  );
}

// Exportação do componente
export default Footer;
