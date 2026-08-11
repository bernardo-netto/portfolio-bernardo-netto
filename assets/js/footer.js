
/**
 * Gerenciador de Rolagem e Relógio Local para Bernardo Netto
 * 2026
 */

// 1. Utilitário de Scroll Lock (Sem trancos de layout)
const ScrollManager = {
  scrollY: 0,

  lock() {
    if (document.body.classList.contains('scroll-locked')) return;

    // Calcula a largura exata da barra de rolagem para prevenir o "pulo" lateral
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Aplica o padding também a elementos que usam posição fixa (evita o tranco neles)
    const fixedElements = document.querySelectorAll('.header, .navbar-fixa, .botao-voltar-topo');
    fixedElements.forEach(el => {
      el.style.paddingRight = `${scrollbarWidth}px`;
    });

    this.scrollY = window.scrollY;
    
    document.body.style.top = `-${this.scrollY}px`;
    document.body.classList.add('scroll-locked');
    document.body.style.overflow = 'hidden';
  },

  unlock() {
    if (!document.body.classList.contains('scroll-locked')) return;

    document.body.classList.remove('scroll-locked');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.style.top = '';

    const fixedElements = document.querySelectorAll('.header, .navbar-fixa, .botao-voltar-topo');
    fixedElements.forEach(el => {
      el.style.paddingRight = '';
    });

    window.scrollTo(0, this.scrollY);
  }
};

// 2. Relógio Local (Estilo Portfolio Internacional)
function iniciarRelogioLocal() {
  const elementoRelogio = document.getElementById('relogio-local');
  if (!elementoRelogio) return;

  function atualizarHorario() {
    // Retorna a hora atual ajustada para o fuso horário de São Paulo (BR)
    const opcoes = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const horaFormatada = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date());
    elementoRelogio.textContent = `${horaFormatada} BRT`;
  }

  atualizarHorario();
  setInterval(atualizarHorario, 1000);
}

// Inicializações básicas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  iniciarRelogioLocal();
});