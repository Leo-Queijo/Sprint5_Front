document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".botao-contato");
  
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const metodo = btn.dataset.metodo;
  
        switch (metodo) {
          case "chat":
            alert("Iniciando chat com um especialista...");
            break;
          case "ligacao":
            alert("Discando para nossa central de especialistas...");
            break;
          case "agendar":
            alert("Redirecionando para o sistema de agendamento...");
            break;
          case "email":
            window.location.href = "mailto:especialistas@saudeinfantil.com.br";
            break;
          default:
            alert("Método de contato não identificado.");
        }
      });
    });
  });
  