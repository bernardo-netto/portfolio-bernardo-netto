// Responsabilidade: Construção dinâmica do HTML do modal baseado no card clicado, navegação do carrossel e acessibilidade.
"use strict";

(function () {
  // Base de dados padrão para garantir funcionamento autônomo do modal
  const projetosPadrao = [
    {
      titulo: "Crono Clinic",
      descricao: "CRM de saúde com gestão de pacientes e agenda, construído em HTML, CSS e JavaScript puro.",
      features: [
        "Gestão completa de prontuários médicos",
        "Agendamento inteligente de consultas com notificações",
        "Relatórios dinâmicos de atendimento e caixa"
      ],
      aprendizados: "Arquitetura modular em JS Vanilla com controle de estado centralizado, persistência local e interface focada em acessibilidade UX.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      url: "#",
      github: "https://github.com/bernardo-netto",
      galeria: [
        "https://placehold.co/720x405/130d0c/fc6549?text=Crono+Clinic+-+Dashboard",
        "https://placehold.co/720x405/181211/ffffff?text=Crono+Clinic+-+Agenda",
        "https://placehold.co/720x405/221917/ffffff?text=Crono+Clinic+-+Pacientes"
      ]
    },
    {
      titulo: "Solid Tech",
      descricao: "Site institucional premium para agência de software, com design editorial e foco em conversão.",
      features: [
        "Design System autoral com Dark/Light theme",
        "Animações fluidas de alto desempenho com Scroll",
        "Formulários com validação em tempo real"
      ],
      aprendizados: "Uso avançado de CSS Grid, Custom Properties e otimização de renderização para taxa de quadros a 60fps.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      url: "#",
      github: "https://github.com/bernardo-netto",
      galeria: [
        "https://placehold.co/720x405/130d0c/fc6549?text=Solid+Tech+-+Home",
        "https://placehold.co/720x405/181211/ffffff?text=Solid+Tech+-+Servicos",
        "https://placehold.co/720x405/221917/ffffff?text=Solid+Tech+-+Contato"
      ]
    },
    {
      titulo: "IABotz",
      descricao: "Landing page para plataforma de chatbot com IA, destacando funcionalidades e planos.",
      features: [
        "Simulador interativo de conversas com IA",
        "Tabela comparativa de planos de assinatura",
        "Integração com chamadas à ação (CTAs) estratégicos"
      ],
      aprendizados: "Construção de componentes dinâmicos em JS Vanilla com suporte a acessibilidade e navegação por teclado.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      url: "#",
      github: "https://github.com/bernardo-netto",
      galeria: [
        "https://placehold.co/720x405/130d0c/fc6549?text=IABotz+-+Hero",
        "https://placehold.co/720x405/181211/ffffff?text=IABotz+-+Recursos",
        "https://placehold.co/720x405/221917/ffffff?text=IABotz+-+Precos"
      ]
    },
    {
      titulo: "Converta.app",
      descricao: "Página de vendas para SaaS de conversão de aplicativos, com foco em performance e clareza.",
      features: [
        "Calculadora interativa de ROI de conversão",
        "Carrossel autoral de depoimentos e cases",
        "Estrutura otimizada para SEO e alta pontuação no Lighthouse"
      ],
      aprendizados: "Foco em Core Web Vitals, otimização de imagens, técnicas de preload e carregamento assíncrono.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      url: "#",
      github: "https://github.com/bernardo-netto",
      galeria: [
        "https://placehold.co/720x405/130d0c/fc6549?text=Converta+-+Landing",
        "https://placehold.co/720x405/181211/ffffff?text=Converta+-+Calculadora",
        "https://placehold.co/720x405/221917/ffffff?text=Converta+-+Cases"
      ]
    }
  ];

  let indiceSlideAtual = 0;
  let totalSlides = 0;
  let elementoFocoAnterior = null;

  function atualizarVisualCarrossel() {
    const trilho = document.getElementById("modal-trilho-carrossel");
    const indicadores = document.querySelectorAll(".modal-carrossel-indicador");
    const btnEsq = document.getElementById("btn-seta-esq");
    const btnDir = document.getElementById("btn-seta-dir");

    if (trilho) {
      trilho.style.transform = `translateX(-${indiceSlideAtual * 100}%)`;
    }

    if (btnEsq) {
      btnEsq.style.display = indiceSlideAtual > 0 ? "flex" : "none";
    }

    if (btnDir) {
      btnDir.style.display = indiceSlideAtual < totalSlides - 1 ? "flex" : "none";
    }

    indicadores.forEach((ind, i) => {
      if (i === indiceSlideAtual) {
        ind.classList.add("ativo");
        ind.setAttribute("aria-current", "true");
      } else {
        ind.classList.remove("ativo");
        ind.removeAttribute("aria-current");
      }
    });
  }

  function slideProximo() {
    if (totalSlides === 0 || indiceSlideAtual >= totalSlides - 1) return;
    indiceSlideAtual++;
    atualizarVisualCarrossel();
  }

  function slideAnterior() {
    if (totalSlides === 0 || indiceSlideAtual <= 0) return;
    indiceSlideAtual--;
    atualizarVisualCarrossel();
  }

  function mudarParaSlide(index) {
    if (index >= 0 && index < totalSlides) {
      indiceSlideAtual = index;
      atualizarVisualCarrossel();
    }
  }

  function abrirModal(i) {
    const listaProjetos = (window.projetos && Array.isArray(window.projetos) && window.projetos.length > 0) 
      ? window.projetos 
      : projetosPadrao;

    const p = listaProjetos[i] || projetosPadrao[i] || projetosPadrao[0];

    elementoFocoAnterior = document.activeElement;

    const overlay = document.getElementById("overlay-modal");
    const modTit = document.getElementById("modal-tit");
    const corpoMod = document.getElementById("modal-corpo");
    const btnFchr = document.getElementById("btn-fechar");

    if (!overlay || !corpoMod) return;

    let galeria = Array.isArray(p.galeria) && p.galeria.length > 0 ? p.galeria.slice(0, 3) : [];
    if (galeria.length === 0) {
      galeria = [
        "https://placehold.co/720x405/130d0c/ffffff?text=Imagem+1",
        "https://placehold.co/720x405/181211/ffffff?text=Imagem+2",
        "https://placehold.co/720x405/221917/ffffff?text=Imagem+3"
      ];
    }

    indiceSlideAtual = 0;
    totalSlides = galeria.length;

    if (modTit) modTit.textContent = p.titulo;

    corpoMod.innerHTML = `
      <div class="modal-carrossel-container">
        <button type="button" class="modal-carrossel-seta seta-esquerda" id="btn-seta-esq" aria-label="Slide anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button type="button" class="modal-carrossel-seta seta-direita" id="btn-seta-dir" aria-label="Próximo slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div class="modal-carrossel-janela">
          <div class="modal-carrossel-trilho" id="modal-trilho-carrossel">
            ${galeria.map((slideUrl, idx) => `
              <div class="modal-carrossel-slide">
                <img 
                  src="${slideUrl}" 
                  alt="Screenshot ${idx + 1} do projeto ${p.titulo}" 
                  loading="lazy"
                />
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="modal-carrossel-indicadores" role="tablist" aria-label="Navegação de slides">
        ${galeria.map((_, idx) => `
          <button 
            type="button" 
            class="modal-carrossel-indicador ${idx === 0 ? "ativo" : ""}" 
            data-slide-index="${idx}"
            aria-label="Ir para imagem ${idx + 1}"
          ></button>
        `).join("")}
      </div>

      <div class="modal-tags-container">
        ${p.tags ? p.tags.map((t) => `<span class="proj-tag">${t}</span>`).join("") : ""}
      </div>

      <div class="rm-sec">
        <h4 class="rm-h3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="2" width="6" height="4" rx="1"/>
            <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/>
            <path d="M9 12h6M9 16h6"/>
          </svg> 
          Sobre o projeto
        </h4>
        <p class="rm-p">${p.descricao}</p>
      </div>
      
      <div class="rm-sec">
        <h4 class="rm-h3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg> 
          Funcionalidades-chave
        </h4>
        ${p.features ? p.features.map((f) => `
          <div class="rm-feat">
            <span class="rm-chk" aria-hidden="true">✓</span>
            <span>${f}</span>
          </div>`).join("") : ""}
      </div>

      <div class="rm-sec modal-solucoes-box">
        <h4 class="rm-h3 rm-h3-solucoes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
          </svg> 
          Soluções &amp; Decisões Arquiteturais
        </h4>
        <p class="rm-p">${p.aprendizados}</p>
      </div>

      <div class="modal-acoes">
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="bp bp-online btn-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          Ver online
        </a>
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="bp bp-github btn-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.7.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
          </svg>
          Código no GitHub
        </a>
      </div>
    `;

    const btnEsq = document.getElementById("btn-seta-esq");
    const btnDir = document.getElementById("btn-seta-dir");

    if (btnEsq) btnEsq.addEventListener("click", slideAnterior);
    if (btnDir) btnDir.addEventListener("click", slideProximo);

    const conteinerIndicadores = corpoMod.querySelector(".modal-carrossel-indicadores");
    if (conteinerIndicadores) {
      conteinerIndicadores.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-slide-index]");
        if (btn) {
          const index = parseInt(btn.getAttribute("data-slide-index"), 10);
          mudarParaSlide(index);
        }
      });
    }

    overlay.classList.add("aberto");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (btnFchr) btnFchr.focus();

    atualizarVisualCarrossel();
  }

  function fecharMod() {
    const overlay = document.getElementById("overlay-modal");
    if (!overlay) return;

    overlay.classList.remove("aberto");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    if (elementoFocoAnterior) {
      elementoFocoAnterior.focus();
    }
  }

  window.projetos = projetosPadrao;
  window.abrirModal = abrirModal;
  window.fecharModal = fecharMod;

  document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay-modal");
    const btnFchr = document.getElementById("btn-fechar");
    const pontoFechar = document.getElementById("ponto-fechar-modal");

    if (btnFchr) btnFchr.addEventListener("click", fecharMod);

    if (pontoFechar) {
      pontoFechar.addEventListener("click", fecharMod);
      pontoFechar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fecharMod();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) fecharMod();
      });
    }

    document.addEventListener("click", (e) => {
      const btnDetalhes = e.target.closest(".btn-modal-detalhes");
      if (btnDetalhes) {
        const projId = btnDetalhes.getAttribute("data-proj-id");
        if (projId !== null) {
          abrirModal(parseInt(projId, 10));
        }
      }
    });

    const btnVerMais = document.getElementById("btn-ver-mais-projetos-id");
    if (btnVerMais) {
      btnVerMais.addEventListener("click", () => {
        const cardsSecundarios = document.querySelectorAll(".card-proj.projeto-card-secundario");
        const estaExpandido = btnVerMais.getAttribute("aria-expanded") === "true";

        cardsSecundarios.forEach((card) => {
          if (estaExpandido) {
            card.classList.remove("revelado");
          } else {
            card.classList.add("revelado");
          }
        });

        btnVerMais.setAttribute("aria-expanded", !estaExpandido);
        const spanTexto = btnVerMais.querySelector("span");
        if (spanTexto) {
          spanTexto.textContent = estaExpandido ? "Ver mais projetos" : "Ver menos projetos";
        }
      });
    }

    // Navegação por teclado: Esc (Fechar), Setas (Slide) e Tab (Focus Trap)
    document.addEventListener("keydown", (e) => {
      if (!overlay || !overlay.classList.contains("aberto")) return;

      if (e.key === "Escape") {
        fecharMod();
      } else if (e.key === "ArrowLeft") {
        slideAnterior();
      } else if (e.key === "ArrowRight") {
        slideProximo();
      } else if (e.key === "Tab") {
        const elementosFocaveis = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (elementosFocaveis.length === 0) return;

        const primeiroElemento = elementosFocaveis[0];
        const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];

        if (e.shiftKey && document.activeElement === primeiroElemento) {
          e.preventDefault();
          ultimoElemento.focus();
        } else if (!e.shiftKey && document.activeElement === ultimoElemento) {
          e.preventDefault();
          primeiroElemento.focus();
        }
      }
    });
  });
})();