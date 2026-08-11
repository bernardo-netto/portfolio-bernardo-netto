
// Responsabilidade: Gerenciamento do Dark/Light mode e persistência no localStorage.

"use strict";

const alternadorTemaDesktop = document.getElementById("alternador-tema-desktop");
const alternadorTemaCelular = document.getElementById("alternador-tema-celular");

function aplicarTemaVisual(ativarModoClaro) {
  if (ativarModoClaro) {
    document.documentElement.setAttribute("data-tema", "claro");
    localStorage.setItem("temaAtivo", "claro");
  } else {
    document.documentElement.removeAttribute("data-tema");
    localStorage.setItem("temaAtivo", "escuro");
  }
}

const temaSalvo = localStorage.getItem("temaAtivo");
const preferenciaSistema = window.matchMedia("(prefers-color-scheme: light)").matches;
const modoClaroInicial = temaSalvo === "claro" || (!temaSalvo && preferenciaSistema);

aplicarTemaVisual(modoClaroInicial);

[alternadorTemaDesktop, alternadorTemaCelular].forEach((botao) => {
  if (botao) {
    botao.addEventListener("click", () => {
      const estaClaro = document.documentElement.getAttribute("data-tema") === "claro";
      aplicarTemaVisual(!estaClaro);
    });
  }
});