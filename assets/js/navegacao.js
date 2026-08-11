// Responsabilidade: Comportamento do header no scroll, menu mobile expansível e scroll suave.

"use strict";

const cabecalho = document.getElementById("cabecalho-principal");
const botaoMenuCelular = document.getElementById("botao-menu-celular");
const menuCelular = document.getElementById("menu-celular");
const cabecalhoAltura = 80;


/* ==========================================================
   HEADER AO ROLAR
========================================================== */

function processarRolagem() {
  if (cabecalho) {
    if (window.scrollY > 40) {
      cabecalho.classList.add("rolou");
    } else {
      cabecalho.classList.remove("rolou");
    }
  }
}


/* ==========================================================
   MENU MOBILE
========================================================== */

function fecharMenuMobile() {
  if (menuCelular && botaoMenuCelular) {

    menuCelular.classList.remove("aberto");
    botaoMenuCelular.classList.remove("ativo");

    botaoMenuCelular.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-aberto-trava-scroll"
    );
  }
}


function abrirMenuMobile() {
  if (menuCelular && botaoMenuCelular) {

    menuCelular.classList.add("aberto");
    botaoMenuCelular.classList.add("ativo");

    botaoMenuCelular.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "menu-aberto-trava-scroll"
    );
  }
}


/* ==========================================================
   SCROLL SUAVE
========================================================== */

function efetuarScrollSuave(elemento) {

  const posicaoAlvo =
    elemento.getBoundingClientRect().top +
    window.scrollY -
    cabecalhoAltura;

  window.scrollTo({
    top: posicaoAlvo,
    behavior: "smooth",
  });
}


/* ==========================================================
   LISTENERS
========================================================== */

window.addEventListener(
  "scroll",
  processarRolagem,
  { passive: true }
);

processarRolagem();


if (botaoMenuCelular) {

  botaoMenuCelular.addEventListener(
    "click",
    (e) => {

      e.stopPropagation();

      if (
        menuCelular.classList.contains("aberto")
      ) {
        fecharMenuMobile();
      } else {
        abrirMenuMobile();
      }

    }
  );

}


/* Fechar clicando fora */

document.addEventListener(
  "click",
  (e) => {

    if (
      menuCelular &&
      menuCelular.classList.contains("aberto")
    ) {

      if (
        !menuCelular.contains(e.target) &&
        !botaoMenuCelular.contains(e.target)
      ) {
        fecharMenuMobile();
      }

    }

  }
);


/* Fechar ao clicar nos links */

document
.querySelectorAll(".link-menu-mobile")
.forEach((link) => {

  link.addEventListener(
    "click",
    () => {
      fecharMenuMobile();
    }
  );

});


/* Scroll suave */

document
.querySelectorAll('a[href^="#"]')
.forEach((link) => {

  link.addEventListener(
    "click",
    function (e) {

      const targetId =
        this.getAttribute("href");

      if (targetId === "#") return;


      const elementoAlvo =
        document.querySelector(targetId);


      if (elementoAlvo) {

        e.preventDefault();


        const isMobileLink =
          this.classList.contains(
            "link-menu-mobile"
          );


        if (isMobileLink) {

          fecharMenuMobile();

          setTimeout(() => {
            efetuarScrollSuave(
              elementoAlvo
            );
          }, 350);

        } else {

          efetuarScrollSuave(
            elementoAlvo
          );

        }

      }

    }
  );

});


/* ==========================================================
   DISPONIBILIZA PARA OUTROS ARQUIVOS
========================================================== */

window.efetuarScrollSuave =
  efetuarScrollSuave;

window.fecharMenuMobile =
  fecharMenuMobile;

window.abrirMenuMobile =
  abrirMenuMobile;