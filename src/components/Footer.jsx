import React from "react";
import "./Footer.css";

function Footer() {
  return (
 
    <footer className="footer">
    
      <span>&copy; Desenvolvido por Makoto Higashi e Nicolas Henrique</span>
      <span style={{ marginLeft: "16px" }}>
        <a href="/politica-privacidade" style={{ color: "#007bff", textDecoration: "underline" }}>
          Política de Privacidade
        </a>
      </span>
    </footer>
  );
}

export default Footer;
