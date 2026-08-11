// Responsabilidade: abrir/fechar os itens do accordion de FAQ.
"use strict";

document.querySelectorAll(".faq-pergunta").forEach((botao) => {
  botao.addEventListener("click", () => {
    const item = botao.closest(".faq-item");
    const jaAberto = item.classList.contains("aberto");

    document.querySelectorAll(".faq-item.aberto").forEach((outroItem) => {
      if (outroItem !== item) {
        outroItem.classList.remove("aberto");
        outroItem
          .querySelector(".faq-pergunta")
          .setAttribute("aria-expanded", "false");
      }
    });

    item.classList.toggle("aberto", !jaAberto);
    botao.setAttribute("aria-expanded", String(!jaAberto));
  });
});
