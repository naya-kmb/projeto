// Renderiza a lista de itens e cuida do formulário.
(function () {
  "use strict";

  // Ano automático no rodapé
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Renderiza cards
  const lista = document.getElementById("lista-itens");
  if (lista && Array.isArray(ITENS)) {
    lista.innerHTML = ITENS.map(function (item) {
      return (
        '<li class="card">' +
          '<h3>' + escape(item.name) + '</h3>' +
          '<p>' + escape(item.description) + '</p>' +
          '<p class="price">' + escape(item.price) + '</p>' +
        '</li>'
      );
    }).join("");
  }

  // Formulário com validação acessível
  const form = document.querySelector(".form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if (!name || !email) {
        status.textContent = "⚠ enter your email address.";
        status.className = "form-status error";
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = "⚠ Invalid email.";
        status.className = "form-status error";
        return;
      }
      status.textContent = "✓ Message sent! We will contact you.";
      status.className = "form-status ok";
      form.reset();
    });
  }

  function escapar(txt) {
    const div = document.createElement("div");
    div.textContent = String(txt == null ? "" : txt);
    return div.innerHTML;
  }
})();
