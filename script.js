document.addEventListener("DOMContentLoaded", () => {
  // Variáveis
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const increaseFont = document.getElementById("increase-font")
  const decreaseFont = document.getElementById("decrease-font")
  const toggleContrast = document.getElementById("toggle-contrast")

  // Tamanho da fonte
  let currentFontSize = Number.parseInt(getComputedStyle(document.documentElement).fontSize)

  // Menu mobile
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Acessibilidade - ARIA
    const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false
    menuToggle.setAttribute("aria-expanded", !expanded)

    // Animação do ícone do menu
    const spans = menuToggle.querySelectorAll("span")
    spans.forEach((span) => span.classList.toggle("active"))
  })

  // Fechar menu ao clicar em um link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuToggle.setAttribute("aria-expanded", "false")
    })
  })

  // Aumentar tamanho da fonte
  increaseFont.addEventListener("click", () => {
    if (currentFontSize < 24) {
      currentFontSize += 2
      document.documentElement.style.fontSize = currentFontSize + "px"
    }
  })

  // Diminuir tamanho da fonte
  decreaseFont.addEventListener("click", () => {
    if (currentFontSize > 12) {
      currentFontSize -= 2
      document.documentElement.style.fontSize = currentFontSize + "px"
    }
  })

  // Alternar contraste
  toggleContrast.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast")

    // Salvar preferência no localStorage
    if (document.body.classList.contains("high-contrast")) {
      localStorage.setItem("high-contrast", "true")
    } else {
      localStorage.setItem("high-contrast", "false")
    }
  })

  // Verificar preferência de contraste salva
  if (localStorage.getItem("high-contrast") === "true") {
    document.body.classList.add("high-contrast")
  }

  // Animação ao scroll
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  document.querySelectorAll(".section-content, .card, .benefit-item").forEach((el) => {
    observer.observe(el)
  })
})
