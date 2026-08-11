// Responsabilidade: ScrollSpy das seções, revelar elementos em fade-in e a lógica numérica de contadores.

"use strict";

const secoesMonitoradas = document.querySelectorAll("section[id]");
const linksDesktop = document.querySelectorAll(".nav-link");
const linksMobile = document.querySelectorAll(".link-menu-mobile");
const elementosRevelaveis = document.querySelectorAll(".revelar-elemento");
const elementosContador = document.querySelectorAll(".numero-dinamico");
const containerContadores = document.querySelector(".linha-contadores-sobre");

const preferemMenosMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ScrollSpy
const opcoesScrollSpy = {
  root: null,
  rootMargin: "-30% 0px -60% 0px",
  threshold: 0,
};

const observadorScrollSpy = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      const idSecao = entrada.target.getAttribute("id");

      linksDesktop.forEach((link) => {
        if (link.getAttribute("href") === `#${idSecao}`) link.classList.add("ativo");
        else link.classList.remove("ativo");
      });

      linksMobile.forEach((link) => {
        if (link.getAttribute("href") === `#${idSecao}`) link.classList.add("ativo");
        else link.classList.remove("ativo");
      });
    }
  });
}, opcoesScrollSpy);

secoesMonitoradas.forEach((secao) => observadorScrollSpy.observe(secao));

// Revelar Elementos (Fade-in)
const observadorVisibilidade = new IntersectionObserver((entradas, observador) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

elementosRevelaveis.forEach((el) => observadorVisibilidade.observe(el));

// Contadores Numéricos Dinâmicos — uma única função, respeita reduced-motion
function animarContador(elemento) {
  const alvo = parseInt(elemento.getAttribute("data-alvo"), 10);

  if (preferemMenosMovimento) {
    elemento.textContent = alvo; // pula direto pro valor final, sem animar
    return;
  }

  let atual = 0;
  const duracaoTotal = 2000;
  const incrementoFrame = alvo / (duracaoTotal / 16);

  const incremental = () => {
    atual += incrementoFrame;
    if (atual >= alvo) {
      elemento.textContent = alvo;
    } else {
      elemento.textContent = Math.floor(atual);
      requestAnimationFrame(incremental);
    }
  };
  requestAnimationFrame(incremental);
}

if (containerContadores && elementosContador.length > 0) {
  const observadorContadores = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        elementosContador.forEach((contador) => animarContador(contador));
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.2 });

  observadorContadores.observe(containerContadores);
}