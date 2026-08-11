// Responsabilidade: Controle do relógio digital de cabeçalho.

"use strict";

const elementoRelogio = document.getElementById("inicio-relogio-digital");

function atualizarRelogioDigital() {
  if (elementoRelogio) {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");
    elementoRelogio.textContent = `${horas}:${minutos}:${segundos} BRT`;
  }
}

atualizarRelogioDigital();
setInterval(atualizarRelogioDigital, 1000);